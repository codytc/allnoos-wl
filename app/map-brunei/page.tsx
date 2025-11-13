"use client"

import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import CountryMapLayout from "@/components/country-map-layout"
import { useCountryProjection } from "@/hooks/use-country-projection"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

export default function BruneiMapPage({ searchParams }: { searchParams: { userId?: string } }) {
  const userId = searchParams.userId || ""
  const { config, isLoading } = useCountryProjection("Brunei", geoUrl)

  return (
    <CountryMapLayout countryName="Brunei" userId={userId}>
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
                  .filter((geo) => geo.properties.name === "Brunei")
                  .map((geo) => (
                    <Geography key={geo.rsmKey} geography={geo} fill="#E5E7EB" stroke="#FFFFFF" strokeWidth={0.5} />
                  ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      )}
    </CountryMapLayout>
  )
}
