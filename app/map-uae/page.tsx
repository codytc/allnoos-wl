"use client"

import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import CountryMapLayout from "@/components/country-map-layout"
import { useCountryProjection } from "@/hooks/use-country-projection"

const geoUrl = "https://cdn.jsdelivr.net/npm/natural-earth-vector@1.0.0/geojson/ne_10m_admin_1_states_provinces.json"

export default function UAEMapPage({
  searchParams,
}: {
  searchParams: { userId?: string }
}) {
  const { config, isLoading } = useCountryProjection("United Arab Emirates", geoUrl, "AE")
  const userId = searchParams.userId ? Number.parseInt(searchParams.userId) : 1

  if (isLoading || !config) {
    return (
      <CountryMapLayout countryName="United Arab Emirates" userId={userId}>
        <div className="flex items-center justify-center h-full">
          <div className="text-muted-foreground">Loading map...</div>
        </div>
      </CountryMapLayout>
    )
  }

  return (
    <CountryMapLayout countryName="United Arab Emirates" userId={userId}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={config}
        width={800}
        height={600}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup center={[config.center[0], config.center[1]]} zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies
                .filter((geo: any) => geo.properties.iso_a2 === "AE")
                .map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#D1D5DB"
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "#9CA3AF" },
                      pressed: { outline: "none" },
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
