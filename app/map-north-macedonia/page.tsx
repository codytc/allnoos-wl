"use client"

import { CountryMapLayout } from "@/components/country-map-layout"

export default function NorthMacedoniaMap() {
  return (
    <CountryMapLayout
      countryName="North Macedonia"
      geoUrl="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
    />
  )
}
