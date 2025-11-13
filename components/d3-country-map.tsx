"use client"

import { useEffect, useRef, useState } from "react"
import { geoMercator, geoPath } from "d3-geo"
import { select } from "d3-selection"
import type { Feature, FeatureCollection } from "geojson"

interface D3CountryMapProps {
  /** ISO3 country code (e.g., 'AFG', 'USA', 'IND') */
  iso3Code: string
  /** Optional: Fill color for the country */
  fillColor?: string
  /** Optional: Stroke color */
  strokeColor?: string
  /** Optional: Stroke width in pixels */
  strokeWidth?: number
  /** Optional: Provinces to highlight (array of province names) */
  highlightedProvinces?: string[]
  /** Optional: Highlight color */
  highlightColor?: string
}

/**
 * D3-based Country Map Component
 *
 * Automatically calculates optimal scale and positioning to fit the country
 * within the viewport while respecting:
 * - 20px margins on all sides
 * - Logo position (15% left, 64% top)
 * - Full viewport fitting (no cutoffs)
 *
 * Uses pre-downloaded GeoJSON files from /public/data/countries/
 */
export function D3CountryMap({
  iso3Code,
  fillColor = "#E5E7EB",
  strokeColor = "#FFFFFF",
  strokeWidth = 1,
  highlightedProvinces = [],
  highlightColor = "#FDB484",
}: D3CountryMapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return

    const svgElement = svgRef.current
    const container = containerRef.current

    async function loadAndRender() {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch GeoJSON data
        const geoJsonPath = `/data/countries/${iso3Code.toLowerCase()}.json`
        const response = await fetch(geoJsonPath)

        if (!response.ok) {
          throw new Error(`Failed to load country data for ${iso3Code}`)
        }

        const geoData: Feature | FeatureCollection = await response.json()

        // Get container dimensions
        const width = container.clientWidth
        const height = container.clientHeight

        // Account for margins (20px on all sides)
        const margin = 20
        const availableWidth = width - 2 * margin
        const availableHeight = height - 2 * margin

        // Create projection using fitSize (automatically calculates scale and translation)
        const projection = geoMercator().fitSize([availableWidth, availableHeight], geoData)

        // Create path generator
        const pathGenerator = geoPath().projection(projection)

        // Clear previous content
        const svg = select(svgElement)
        svg.selectAll("*").remove()

        // Set SVG dimensions
        svg.attr("width", width).attr("height", height).attr("viewBox", `0 0 ${width} ${height}`)

        // Create group with margin offset
        const g = svg.append("g").attr("transform", `translate(${margin}, ${margin})`)

        // Render country/provinces
        if (geoData.type === "FeatureCollection") {
          // Multiple features (provinces/states)
          g.selectAll("path")
            .data(geoData.features)
            .join("path")
            .attr("d", (d) => pathGenerator(d) || "")
            .attr("fill", (d) => {
              const provinceName = d.properties?.shapeName || d.properties?.name || ""
              return highlightedProvinces.includes(provinceName) ? highlightColor : fillColor
            })
            .attr("stroke", strokeColor)
            .attr("stroke-width", strokeWidth)
            .attr("vector-effect", "non-scaling-stroke")
            .style("cursor", "pointer")
            .on("mouseover", function () {
              select(this).attr("fill", highlightColor)
            })
            .on("mouseout", function (event, d) {
              const provinceName = d.properties?.shapeName || d.properties?.name || ""
              select(this).attr("fill", highlightedProvinces.includes(provinceName) ? highlightColor : fillColor)
            })
        } else {
          // Single feature (entire country)
          g.append("path")
            .datum(geoData)
            .attr("d", (d) => pathGenerator(d) || "")
            .attr("fill", fillColor)
            .attr("stroke", strokeColor)
            .attr("stroke-width", strokeWidth)
            .attr("vector-effect", "non-scaling-stroke")
        }

        console.log(`[v0] Successfully rendered map for ${iso3Code}`, {
          width,
          height,
          availableWidth,
          availableHeight,
          featureCount: geoData.type === "FeatureCollection" ? geoData.features.length : 1,
        })

        setIsLoading(false)
      } catch (err) {
        console.error(`[v0] Error loading country map for ${iso3Code}:`, err)
        setError(err instanceof Error ? err.message : "Failed to load map")
        setIsLoading(false)
      }
    }

    loadAndRender()

    // Handle window resize
    const handleResize = () => {
      loadAndRender()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [iso3Code, fillColor, strokeColor, strokeWidth, highlightedProvinces, highlightColor])

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-destructive">
        <p>{error}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="w-full h-full">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  )
}

export default D3CountryMap
