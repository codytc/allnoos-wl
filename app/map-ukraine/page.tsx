"use client"

import { useSearchParams } from "next/navigation"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import CountryMapLayout from "@/components/country-map-layout"
import { useCountryProjection } from "@/hooks/use-country-projection"

export default function UkraineMapPage() {
  const searchParams = useSearchParams()
  const userId = searchParams.get("userId")

  const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"
  const { config, isLoading } = useCountryProjection("Ukraine", geoUrl)

  if (!userId || isLoading || !config) {
    return null
  }

  return (
    <CountryMapLayout userId={userId} countryName="Ukraine">
      <ComposableMap
        projection={config.projection}
        projectionConfig={config.projectionConfig}
        width={config.width}
        height={config.height}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies
              .filter((geo) => geo.properties.name === "Ukraine")
              .map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#D4D4D4"
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  style={{
                    hover: {
                      fill: "#FDB484",
                      cursor: "pointer",
                    },
                    pressed: {
                      fill: "#FDB484",
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
