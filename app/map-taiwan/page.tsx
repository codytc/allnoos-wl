"use client"

import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import CountryMapLayout from "@/components/country-map-layout"
import { useCountryProjection } from "@/hooks/use-country-projection"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

export default function TaiwanMapPage({ searchParams }: { searchParams: { userId?: string } }) {
  const userId = searchParams.userId || "1"
  const { config, isLoading } = useCountryProjection("Taiwan", geoUrl)

  if (isLoading || !config) {
    return (
      <CountryMapLayout countryName="Taiwan" userId={userId}>
        <div className="flex items-center justify-center h-full">Loading...</div>
      </CountryMapLayout>
    )
  }

  return (
    <CountryMapLayout countryName="Taiwan" userId={userId}>
      <ComposableMap projection="geoMercator" projectionConfig={config}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies
              .filter((geo: any) => geo.properties.name === "Taiwan")
              .map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#D1D5DB"
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "#9CA3AF" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
          }
        </Geographies>
      </ComposableMap>
    </CountryMapLayout>
  )
}
