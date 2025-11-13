"use client"

import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import CountryMapLayout from "@/components/country-map-layout"
import { useCountryProjection } from "@/hooks/use-country-projection"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"

export default function KyrgyzstanMapPage({ searchParams }: { searchParams: { userId?: string } }) {
  const userId = searchParams.userId || "1"
  const { config, isLoading } = useCountryProjection("Kyrgyzstan", geoUrl)

  if (isLoading || !config) {
    return (
      <CountryMapLayout countryName="Kyrgyzstan" userId={userId}>
        <div className="flex items-center justify-center h-full">Loading...</div>
      </CountryMapLayout>
    )
  }

  return (
    <CountryMapLayout countryName="Kyrgyzstan" userId={userId}>
      <ComposableMap projection="geoMercator" projectionConfig={config}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies
              .filter((geo: any) => geo.id === "417")
              .map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#E5E7EB"
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "#D1D5DB" },
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
