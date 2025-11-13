import { CountryMapLayout } from "@/components/country-map-layout"

export default function SierraLeoneMap() {
  return (
    <CountryMapLayout
      countryName="Sierra Leone"
      geoUrl="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"
    />
  )
}
