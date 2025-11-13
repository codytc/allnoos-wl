"use client"

import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { CountryMapLayout } from "@/components/country-map-layout"
import { useCountryProjection } from "@/hooks/use-country-projection"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json"

export default function RwandaMap({ searchParams }: { searchParams: { userId?: string } }) {
  const userId = searchParams.userId
  const { config, isLoading } = useCountryProjection("Rwanda", geoUrl)

  if (isLoading) {
    return (
      <CountryMapLayout countryName="Rwanda" userId={userId}>
        <div className="flex items-center justify-center h-full">Loading map...</div>
      </CountryMapLayout>
    )
  }

  return (
    <CountryMapLayout countryName="Rwanda" userId={userId}>
      <ComposableMap projection="geoMercator" projectionConfig={config}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies
              .filter((geo) => geo.properties.name === "Rwanda")
              .map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#D4D4D4"
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "#FDB484" },
                    pressed: { outline: "none", fill: "#FDB484" },
                  }}
                />
              ))
          }
        </Geographies>
      </ComposableMap>
    </CountryMapLayout>
  )
}
