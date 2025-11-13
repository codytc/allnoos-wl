"use client"

import { useSearchParams } from "next/navigation"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import CountryMapLayout from "@/components/country-map-layout"
import { useCountryProjection } from "@/hooks/use-country-projection"

export default function BelarusMapPage() {
  const searchParams = useSearchParams()
  const userId = searchParams.get("userId")

  const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"
  const { config, isLoading } = useCountryProjection("Belarus", geoUrl)

  if (!userId || isLoading || !config) {
    return null
  }

  return (
    <CountryMapLayout userId={userId} countryName="Belarus">
      <ComposableMap projection={config.projection} projectionConfig={config.projectionConfig}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies
              .filter((geo) => geo.properties.name === "Belarus")
              .map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} fill="#D1D5DB" stroke="#FFFFFF" strokeWidth={0.5} />
              ))
          }
        </Geographies>
      </ComposableMap>
    </CountryMapLayout>
  )
}
