"use client"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { CountryMapLayout } from "@/components/country-map-layout"
import { useCountryProjection } from "@/hooks/use-country-projection"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json"

export default function GuatemalaMapPage({
  searchParams,
}: {
  searchParams: { userId?: string }
}) {
  const userId = searchParams.userId || "1"
  const { config, isLoading } = useCountryProjection("Guatemala", geoUrl)

  if (isLoading || !config) {
    return (
      <CountryMapLayout countryName="Guatemala" userId={userId}>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </CountryMapLayout>
    )
  }

  return (
    <CountryMapLayout countryName="Guatemala" userId={userId}>
      <ComposableMap projection="geoMercator" projectionConfig={config} className="w-full h-full">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies
              .filter((geo) => geo.properties.name === "Guatemala")
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
