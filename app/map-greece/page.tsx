"use client"

import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import CountryMapLayout from "@/components/country-map-layout"
import { useCountryProjection } from "@/hooks/use-country-projection"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"

export default function GreeceMapPage({
  searchParams,
}: {
  searchParams: { userId?: string }
}) {
  const userId = searchParams.userId || "1"

  const { config, isLoading } = useCountryProjection("Greece", geoUrl)

  if (isLoading || !config) {
    return (
      <CountryMapLayout userId={userId} countryName="Greece">
        <div className="flex items-center justify-center h-full text-gray-500">Loading map...</div>
      </CountryMapLayout>
    )
  }

  return (
    <CountryMapLayout userId={userId} countryName="Greece">
      <ComposableMap
        projection={config.projection}
        projectionConfig={config.projectionConfig}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup center={[config.projectionConfig.center[0], config.projectionConfig.center[1]]} zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies
                .filter((geo) => geo.properties.name === "Greece")
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
