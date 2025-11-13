import { CountryMapLayout } from "@/components/country-map-layout"

export default function SouthSudanMap() {
  return (
    <CountryMapLayout
      countryName="South Sudan"
      geoUrl="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"
    />
  )
}
