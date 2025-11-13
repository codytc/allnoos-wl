"use client"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { useState } from "react"
import CountryMapLayout from "@/components/country-map-layout"

const CHINA_PROVINCES_JSON = "https://cdn.jsdelivr.net/npm/cn-atlas@3/provinces.json"

export default function ChinaMapPage({
  searchParams,
}: {
  searchParams: { userId?: string }
}) {
  const userId = searchParams.userId || null
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null)
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)

  return (
    <CountryMapLayout countryName="China" userId={userId}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 800,
          center: [105, 35],
        }}
        className="w-full h-full"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Geographies geography={CHINA_PROVINCES_JSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isHovered = hoveredProvince === geo.properties?.name
              const isSelected = selectedProvince === geo.properties?.name
              const isActive = isHovered || isSelected

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setHoveredProvince(geo.properties?.name || null)}
                  onMouseLeave={() => setHoveredProvince(null)}
                  onClick={() => setSelectedProvince(geo.properties?.name || null)}
                  style={{
                    default: {
                      fill: isActive ? "#FDB484" : "#D4D4D4",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.75,
                      outline: "none",
                      transition: "all 0.2s ease-in-out",
                    },
                    hover: {
                      fill: "#FDB484",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.75,
                      outline: "none",
                      filter: "brightness(1.1)",
                    },
                    pressed: {
                      fill: "#FDB484",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
    </CountryMapLayout>
  )
}
