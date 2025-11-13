"use client"

import { useSearchParams } from "next/navigation"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import CountryMapLayout from "@/components/country-map-layout"
import { useCountryProjection } from "@/hooks/use-country-projection"

export default function IndiaMapPage() {
  const searchParams = useSearchParams()
  const userId = searchParams.userId

  const geoUrl = "https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@dc5d493/geojson/india.geojson"
  const { config, isLoading } = useCountryProjection("India", geoUrl)

  if (isLoading) {
    return (
      <CountryMapLayout countryName="India" userId={userId}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-gray-500">Loading map...</div>
        </div>
      </CountryMapLayout>
    )
  }

  return (
    <CountryMapLayout countryName="India" userId={userId}>
      <div className="w-full h-full flex items-center justify-center">
        <ComposableMap
          projectionConfig={config}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const regionName = geo.properties.ST_NM || "Unknown"

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: "#D4D4D4",
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
