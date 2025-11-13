"use client"

import { useEffect, useState } from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import CountryMapLayout from "@/components/country-map-layout"
import { useCountryProjection } from "@/hooks/use-country-projection"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"

function KosovoMapContent({ searchParams }: { searchParams: { userId?: string } }) {
  const userId = searchParams?.userId || "1"
  const [geoData, setGeoData] = useState(null)
  const { config, isLoading } = useCountryProjection("Kosovo", geoUrl)

  useEffect(() => {
    fetch(geoUrl)
      .then((response) => response.json())
      .then((data) => {
        const kosovo = data.features.filter(
          (feature: any) => feature.properties.ISO_A2 === "XK" || feature.properties.name === "Kosovo",
        )
        setGeoData({ type: "FeatureCollection", features: kosovo })
        console.log("[v0] Kosovo loaded:", kosovo.length)
      })
      .catch((error) => console.error("[v0] Error loading Kosovo map data:", error))
  }, [])

  if (isLoading || !config || !geoData) {
    return (
      <CountryMapLayout countryName="Kosovo" userId={userId}>
        <div className="flex items-center justify-center h-full">Loading map...</div>
      </CountryMapLayout>
    )
  }

  return (
    <CountryMapLayout countryName="Kosovo" userId={userId}>
      <ComposableMap projection="geoMercator" projectionConfig={config}>
        <ZoomableGroup center={config.center} zoom={1}>
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} fill="#E5E7EB" stroke="#FFFFFF" strokeWidth={0.5} />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </CountryMapLayout>
  )
}

export default function KosovoMapPage({ searchParams }: { searchParams: { userId?: string } }) {
  return <KosovoMapContent searchParams={searchParams} />
}
