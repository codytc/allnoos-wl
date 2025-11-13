"use client"

import { useState } from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import type { CountryMapConfig } from "@/lib/country-map-config"

interface GenericCountryMapProps {
  config: CountryMapConfig
}

export default function GenericCountryMap({ config }: GenericCountryMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const handleRegionClick = (regionName: string) => {
    setSelectedRegion(regionName)
  }

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <ComposableMap
        projection={config.projection}
        projectionConfig={config.projectionConfig}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
        width={config.width}
        height={config.height}
      >
        <Geographies geography={config.geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const regionName = geo.properties[config.regionNameProperty] || "Unknown"
              const isHovered = hoveredRegion === regionName
              const isSelected = selectedRegion === regionName

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setHoveredRegion(regionName)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => handleRegionClick(regionName)}
                  style={{
                    default: {
                      fill: isSelected ? "#FDB484" : "#D4D4D4",
                      stroke: "#FFFFFF",
                      strokeWidth: 1.5,
                      outline: "none",
                      transition: "all 0.2s ease-in-out",
                    },
                    hover: {
                      fill: "#FDB484",
                      stroke: "#FFFFFF",
                      strokeWidth: 1.5,
                      outline: "none",
                      cursor: "pointer",
                      filter: "brightness(1.1)",
                    },
                    pressed: {
                      fill: "#FDB484",
                      stroke: "#FFFFFF",
                      strokeWidth: 1.5,
                      outline: "none",
                      filter: "brightness(1.1)",
                    },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}
