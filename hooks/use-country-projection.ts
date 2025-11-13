"use client"

import { useState, useEffect } from "react"
import { geoBounds } from "d3-geo"
import type { Feature } from "geojson"

interface ProjectionConfig {
  scale: number
  center: [number, number]
}

/**
 * Hook to calculate optimal projection settings for a country
 * Accounts for CountryMapLayout's viewport constraints:
 * - 20px margins on all sides (via p-5 on container)
 * - Logo position at 15% left, 64% top
 * - Entire country must fit within viewport
 * - Map should fill available space maximally
 */
export function useCountryProjection(countryName: string, geoUrl: string) {
  const [config, setConfig] = useState<ProjectionConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadAndCalculate() {
      try {
        // Fetch the TopoJSON/GeoJSON data
        const response = await fetch(geoUrl)
        const data = await response.json()

        // Find the country in the data
        let countryFeature: Feature | null = null

        if (data.type === "Topology" && data.objects) {
          // Handle TopoJSON
          const { feature } = await import("topojson-client")
          const countries = feature(data, data.objects.countries)
          countryFeature = countries.features.find((f: any) => f.properties.name === countryName)
        } else if (data.type === "FeatureCollection") {
          // Handle GeoJSON
          countryFeature = data.features.find((f: Feature) => f.properties?.name === countryName)
        }

        if (!countryFeature || !isMounted) return

        // Calculate geographic bounds
        const bounds = geoBounds(countryFeature)
        const centerLon = (bounds[0][0] + bounds[1][0]) / 2
        const centerLat = (bounds[0][1] + bounds[1][1]) / 2

        // Calculate geographic span
        const lonSpan = Math.abs(bounds[1][0] - bounds[0][0])
        const latSpan = Math.abs(bounds[1][1] - bounds[0][1])

        // Get viewport dimensions (default to typical screen size for SSR)
        const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1920
        const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 1080

        const PADDING = 20
        const availableWidth = viewportWidth - 2 * PADDING
        const availableHeight = viewportHeight - 2 * PADDING

        // For react-simple-maps with Mercator projection:
        // scale represents the zoom level, where higher = more zoomed in
        // We need to find a scale where the geographic span fits within available pixels

        // Mercator projection formula: scale affects how many pixels per degree
        // At scale=147, the full world (360 degrees) is about 800px wide
        // So pixels per degree = scale * (800 / 360) / 147 = scale * 0.0151

        // Calculate required scale to fit the country
        const pixelsPerDegreeAtScale1 = 800 / 360 / 147 // ~0.0151
        const requiredScaleForWidth = availableWidth / (lonSpan * pixelsPerDegreeAtScale1)
        const requiredScaleForHeight = availableHeight / (latSpan * pixelsPerDegreeAtScale1)

        // Use the smaller scale to ensure the entire country fits
        let baseScale = Math.min(requiredScaleForWidth, requiredScaleForHeight)

        const SAFETY_FACTOR = 0.85 // Leave 15% buffer for proper padding
        baseScale *= SAFETY_FACTOR

        // Apply reasonable bounds - prevent extreme zooms
        const scale = Math.min(Math.max(baseScale, 800), 80000)

        console.log("[v0] Calculated projection for", countryName, {
          lonSpan,
          latSpan,
          viewportWidth,
          viewportHeight,
          availableWidth,
          availableHeight,
          baseScale,
          finalScale: scale,
          center: [centerLon, centerLat],
        })

        if (isMounted) {
          setConfig({
            scale: Math.round(scale),
            center: [centerLon, centerLat],
          })
          setIsLoading(false)
        }
      } catch (error) {
        console.error("[v0] Error calculating country projection:", error)
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadAndCalculate()

    return () => {
      isMounted = false
    }
  }, [countryName, geoUrl])

  // Handle window resize
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleResize = () => {
      setIsLoading(true)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return { config, isLoading }
}
