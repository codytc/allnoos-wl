"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import CountryMapLayout from "@/components/country-map-layout"
import { useCountryProjection } from "@/hooks/use-country-projection"

export default function RomaniaMapPage() {
  const searchParams = useSearchParams()
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const geoUrl =
    "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson"
  const { config, isLoading } = useCountryProjection("Romania", geoUrl)

  useEffect(() => {
    const userId = searchParams.get("userId")
    setCurrentUserId(userId)
    console.log("[v0] Romania map page loaded for user:", userId)
  }, [searchParams])

  const handleRegionClick = (regionName: string) => {
    setSelectedRegion(regionName)
    console.log("[v0] Selected region:", regionName)
  }

  if (!currentUserId || isLoading || !config) {
    return null
  }

  return (
    <CountryMapLayout countryName="Romania" userId={currentUserId}>
      <div className="w-full h-full flex items-center justify-center">
        <ComposableMap
          projection={config.projection}
          projectionConfig={config.projectionConfig}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies
                .filter((geo) => geo.properties.iso_a2 === "RO")
                .map((geo) => {
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
      </div>
    </CountryMapLayout>
  )
}
