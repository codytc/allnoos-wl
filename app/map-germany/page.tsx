"use client"

import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import CountryMapLayout from "@/components/country-map-layout"
import { useCountryProjection } from "@/hooks/use-country-projection"
import { useState } from "react"

export default function GermanyMapPage({
  searchParams,
}: {
  searchParams: { userId?: string }
}) {
  const userId = searchParams.userId || "1"
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const geoUrl = "https://raw.githubusercontent.com/AliceWi/TopoJSON-Germany/master/germany.json"

  const { config, isLoading } = useCountryProjection("Germany", geoUrl)

  const handleRegionClick = (regionName: string) => {
    setSelectedRegion(regionName)
  }

  if (isLoading || !config) {
    return (
      <CountryMapLayout countryName="Germany" userId={userId}>
        <div className="flex items-center justify-center h-full text-gray-500">Loading map...</div>
      </CountryMapLayout>
    )
  }

  return (
    <CountryMapLayout countryName="Germany" userId={userId}>
      <ComposableMap
        projectionConfig={config}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const regionName = geo.properties.name || "Unknown"
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
    </CountryMapLayout>
  )
}
