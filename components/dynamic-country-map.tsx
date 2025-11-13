"use client"

import { useState, useEffect } from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { calculateProjectionConfig, countryMetadata } from "@/lib/map-utils"

interface DynamicCountryMapProps {
  countryName: string
  geoUrl?: string
  fillColor?: string
  strokeColor?: string
  strokeWidth?: number
}

export function DynamicCountryMap({
  countryName,
  geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json",
  fillColor = "#EAEAEC",
  strokeColor = "#D6D6DA",
  strokeWidth = 0.5,
}: DynamicCountryMapProps) {
  const [projectionConfig, setProjectionConfig] = useState<{
    scale: number
    center: [number, number]
  }>({
    scale: 1000,
    center: countryMetadata[countryName]?.defaultCenter || [0, 0],
  })

  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1920,
    height: typeof window !== "undefined" ? window.innerHeight : 1080,
  })

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate projection when geography loads
  const handleGeographiesLoad = (geographies: any[]) => {
    const countryGeo = geographies.find((geo) => geo.properties.name === countryName)

    if (countryGeo) {
      const config = calculateProjectionConfig(countryGeo, viewportSize.width, viewportSize.height)
      setProjectionConfig(config)
    }
  }

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={projectionConfig}
      style={{ width: "100%", height: "100%" }}
    >
      <ZoomableGroup center={projectionConfig.center} zoom={1}>
        <Geographies geography={geoUrl}>
          {({ geographies }) => {
            // Calculate projection on first render
            if (projectionConfig.scale === 1000) {
              setTimeout(() => handleGeographiesLoad(geographies), 0)
            }

            return geographies
              .filter((geo) => geo.properties.name === countryName)
              .map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "#D1D5DB" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
          }}
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  )
}

export default DynamicCountryMap
