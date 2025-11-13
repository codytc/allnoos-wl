"use client"

import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import CountryMapLayout from "@/components/country-map-layout"
import { useCountryProjection } from "@/hooks/use-country-projection"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"

export default function VietnamMapPage({
  searchParams,
}: {
  searchParams: { userId?: string }
}) {
  const userId = searchParams.userId || "1"

  const { config, isLoading } = useCountryProjection("Vietnam", geoUrl)

  if (isLoading) {
    return (
      <CountryMapLayout countryName="Vietnam" userId={userId}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-gray-500">Loading map...</div>
        </div>
      </CountryMapLayout>
    )
  }

  return (
    <CountryMapLayout countryName="Vietnam" userId={userId}>
      <ComposableMap projectionConfig={config} style={{ width: "100%", height: "100%" }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies
              .filter((geo) => geo.properties.name === "Vietnam")
              .map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#D4D4D4"
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#FDB484", outline: "none" },
                    pressed: { fill: "#FDB484", outline: "none" },
                  }}
                />
              ))
          }
        </Geographies>
      </ComposableMap>
    </CountryMapLayout>
  )
}
