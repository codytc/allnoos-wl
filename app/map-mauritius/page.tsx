"use client"

import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import CountryMapLayout from "@/components/country-map-layout"
import { useCountryProjection } from "@/hooks/use-country-projection"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"

export default function MauritiusMapPage({
  searchParams,
}: {
  searchParams: { userId?: string }
}) {
  const userId = searchParams.userId || "1"
  const config = useCountryProjection(geoUrl, "Mauritius")

  if (!config) {
    return (
      <CountryMapLayout countryName="Mauritius" userId={userId}>
        <div className="flex items-center justify-center h-full">Loading map...</div>
      </CountryMapLayout>
    )
  }

  return (
    <CountryMapLayout countryName="Mauritius" userId={userId}>
      <ComposableMap projection="geoMercator" projectionConfig={config}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies
              .filter((geo) => geo.properties.name === "Mauritius")
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
