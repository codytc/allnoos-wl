"use client"

import { CountryMapLayout } from "@/components/country-map-layout"

export default function DominicanRepublicMap() {
  return (
    <CountryMapLayout
      countryName="Dominican Rep."
      geoUrl="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
    />
  )
}
