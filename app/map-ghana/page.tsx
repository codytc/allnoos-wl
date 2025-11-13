"use client"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { CountryMapLayout } from "@/components/country-map-layout"
import { useCountryProjection } from "@/hooks/use-country-projection"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"

export default function GhanaMapPage({
  searchParams,
}: {
  searchParams: { userId?: string }
}) {
  const userId = searchParams.userId || "1"

  const { config, isLoading } = useCountryProjection("Ghana", geoUrl)

  return (
    <CountryMapLayout countryName="Ghana" userId={userId}>
      {isLoading || !config ? (
        <div className="flex items-center justify-center h-full text-gray-500">Loading map...</div>
      ) : (
        <ComposableMap projectionConfig={config} style={{ width: "100%", height: "100%" }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies
                .filter((geo) => geo.properties.name === "Ghana")
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
                      pressed: { outline: "none", fill: "#FDB484" },
                    }}
                  />
                ))
            }
          </Geographies>
        </ComposableMap>
      )}
    </CountryMapLayout>
  )
}
