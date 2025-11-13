"use client"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { useSearchParams } from "next/navigation"
import CountryMapLayout from "@/components/country-map-layout"
import { useCountryProjection } from "@/hooks/use-country-projection"

export default function HungaryMapPage() {
  const searchParams = useSearchParams()
  const userId = searchParams.get("userId")

  const geoUrl =
    "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson"
  const { config, isLoading } = useCountryProjection("Hungary", geoUrl)

  if (!userId || isLoading || !config) {
    return null
  }

  return (
    <CountryMapLayout userId={userId} countryName="Hungary">
      <ComposableMap projection={config.projection} projectionConfig={config.projectionConfig}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies
              .filter((geo) => geo.properties.iso_a2 === "HU")
              .map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} fill="#D1D5DB" stroke="#FFFFFF" strokeWidth={0.5} />
              ))
          }
        </Geographies>
      </ComposableMap>
    </CountryMapLayout>
  )
}
