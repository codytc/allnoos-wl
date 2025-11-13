import { CountryMapLayout } from "@/components/country-map-layout"

export default function GuineaBissauMap() {
  return (
    <CountryMapLayout
      countryName="Guinea-Bissau"
      geoUrl="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"
    />
  )
}
