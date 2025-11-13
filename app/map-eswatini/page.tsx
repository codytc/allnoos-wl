"use client"

import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { CountryMapLayout } from "@/components/country-map-layout"
// Migrating to use useCountryProjection hook for dynamic projection
import { useCountryProjection } from "@/hooks/use-country-projection"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"

export default function EswatiniMap() {
  const { config, isLoading } = useCountryProjection("Eswatini", geoUrl)

  if (isLoading) {
    return (
      <CountryMapLayout countryName="Eswatini" geoUrl={geoUrl}>
        <div className="flex items-center justify-center h-full">Loading map...</div>
      </CountryMapLayout>
    )
  }

  return (
    <CountryMapLayout countryName="Eswatini" geoUrl={geoUrl}>
      <ComposableMap projection="geoMercator" projectionConfig={config}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies
              .filter((geo) => geo.properties.name === "Eswatini")
              .map((geo) => (
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
