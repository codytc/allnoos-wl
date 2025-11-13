import { CountryMapLayout } from "@/components/country-map-layout"

export default function TurkmenistanMap() {
  return (
    <CountryMapLayout
      countryName="Turkmenistan"
      geoUrl="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json"
    />
  )
}
