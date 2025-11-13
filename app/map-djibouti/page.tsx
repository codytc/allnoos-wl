"use client"

import { useSearchParams } from "next/navigation"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import CountryMapLayout from "@/components/country-map-layout"
import { useCountryProjection } from "@/hooks/use-country-projection"

export default function DjiboutiMapPage() {
  const searchParams = useSearchParams()
  const userId = searchParams.get("userId")

  const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"
  const { config, isLoading } = useCountryProjection("Djibouti", geoUrl)

  if (isLoading) {
    return (
      <CountryMapLayout countryName="Djibouti" userId={userId}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-gray-500">Loading map...</div>
        </div>
      </CountryMapLayout>
    )
  }

  return (
    <CountryMapLayout countryName="Djibouti" userId={userId}>
      <ComposableMap
        projection={config.projection}
        projectionConfig={config.projectionConfig}
        width={config.width}
        height={config.height}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies
              .filter((geo) => geo.properties.name === "Djibouti")
              .map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "#D4D4D4",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    hover: {
                      fill: "#FDB484",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.75,
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: {
                      fill: "#FDB484",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                  }}
                />
              ))
          }
        </Geographies>
      </ComposableMap>
    </CountryMapLayout>
  )
}
