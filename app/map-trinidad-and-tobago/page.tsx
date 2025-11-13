"use client"

import { CountryMapLayout } from "@/components/country-map-layout"

export default function TrinidadAndTobagoMap() {
  return (
    <CountryMapLayout
      countryName="Trinidad and Tobago"
      geoUrl="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
    />
  )
}
