"use client"

import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import CountryMapLayout from "@/components/country-map-layout"
import { useCountryProjection } from "@/hooks/use-country-projection"

const geoUrl =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson"

export default function PakistanMapPage({ searchParams }: { searchParams: { userId?: string } }) {
  const userId = searchParams.userId || "1"
  const { config, isLoading } = useCountryProjection("Pakistan", geoUrl)

  if (isLoading || !config) {
    return (
      <CountryMapLayout countryName="Pakistan" userId={userId}>
        <div className="flex items-center justify-center h-full">Loading...</div>
      </CountryMapLayout>
    )
  }

  return (
    <CountryMapLayout countryName="Pakistan" userId={userId}>
      <ComposableMap projection="geoMercator" projectionConfig={config}>
        <ZoomableGroup center={config.center as [number, number]} zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies
                .filter((geo: any) => geo.properties.iso_a2 === "PK")
                .map((geo: any) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#E5E7EB"
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#D1D5DB", outline: "none" },
                      pressed: { fill: "#9CA3AF", outline: "none" },
                    }}
                  />
                ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </CountryMapLayout>
  )
}
