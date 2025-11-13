"use client"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { useState } from "react"
import CountryMapLayout from "@/components/country-map-layout"
import { useCountryProjection } from "@/hooks/use-country-projection"

const geoUrl = "https://gist.githubusercontent.com/Saw-mon-and-Natalie/a11f058fc0dcce9343b02498a46b3d44/raw/canada.json"

export default function CanadaMapPage({
  searchParams,
}: {
  searchParams: { userId?: string }
}) {
  const userId = searchParams.userId || null
  const { config, isLoading } = useCountryProjection("Canada", geoUrl)
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const handleRegionClick = (regionName: string) => {
    setSelectedRegion(regionName)
  }

  if (isLoading || !config) {
    return (
      <CountryMapLayout countryName="Canada" userId={userId}>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </CountryMapLayout>
    )
  }

  return (
    <CountryMapLayout countryName="Canada" userId={userId}>
      <div className="w-full h-full flex items-center justify-center">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={config}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
          width={1100}
          height={800}
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
      </div>
    </CountryMapLayout>
  )
}
