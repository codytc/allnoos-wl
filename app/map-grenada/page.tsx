"use client"

import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import CountryMapLayout from "@/components/country-map-layout"
import { useCountryProjection } from "@/hooks/use-country-projection"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"

export default function GrenadaMapPage({
  searchParams,
}: {
  searchParams: { userId?: string }
}) {
  const userId = searchParams.userId || "1"
  const { config, isLoading } = useCountryProjection("Grenada", geoUrl)

  return (
    <CountryMapLayout countryName="Grenada" userId={userId}>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      ) : (
        <ComposableMap projection="geoMercator" projectionConfig={config}>
          <ZoomableGroup zoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies
                  .filter((geo) => geo.properties.name === "Grenada")
                  .map((geo) => (
                    <Geography key={geo.rsmKey} geography={geo} fill="#D1D5DB" stroke="#FFFFFF" strokeWidth={0.5} />
                  ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      )}
    </CountryMapLayout>
  )
}
