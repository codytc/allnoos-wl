"use client"

import CountryMapLayout from "@/components/country-map-layout"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { useCountryProjection } from "@/hooks/use-country-projection"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json"

export default function IvoryCoastMapPage({
  searchParams,
}: {
  searchParams: { userId?: string }
}) {
  const userId = searchParams.userId || "1"
  const { config, isLoading } = useCountryProjection("Ivory Coast", geoUrl)

  if (isLoading || !config) {
    return (
      <CountryMapLayout countryName="Ivory Coast" userId={userId}>
        <div className="flex items-center justify-center h-full">
          <div className="text-muted-foreground">Loading map...</div>
        </div>
      </CountryMapLayout>
    )
  }

  return (
    <CountryMapLayout countryName="Ivory Coast" userId={userId}>
      <ComposableMap projection="geoMercator" projectionConfig={config} style={{ width: "100%", height: "100%" }}>
        <ZoomableGroup center={config.center} zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies
                .filter((geo) => geo.properties.name === "Ivory Coast" || geo.properties.name === "Côte d'Ivoire")
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
        </ZoomableGroup>
      </ComposableMap>
    </CountryMapLayout>
  )
}
