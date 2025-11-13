"use client"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { useState } from "react"
import CountryMapLayout from "@/components/country-map-layout"

const US_TOPO_JSON = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"

export default function UnitedStatesMapPage({
  searchParams,
}: {
  searchParams: { userId?: string }
}) {
  const userId = searchParams.userId || null
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)

  return (
    <CountryMapLayout countryName="United States" userId={userId}>
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{
          scale: 1200,
        }}
        className="w-full h-full"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Geographies geography={US_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isHovered = hoveredState === geo.properties.name
              const isSelected = selectedState === geo.properties.name
              const isActive = isHovered || isSelected

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setHoveredState(geo.properties.name)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => setSelectedState(geo.properties.name)}
                  style={{
                    default: {
                      fill: isActive ? "#FDB484" : "#D4D4D4",
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
                      filter: "brightness(1.1)",
                    },
                    pressed: {
                      fill: "#FDB484",
                      stroke: "#FFFFFF",
                      strokeWidth: 1.5,
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
