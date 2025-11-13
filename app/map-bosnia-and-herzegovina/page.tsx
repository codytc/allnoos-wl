import { CountryMapLayout } from "@/components/country-map-layout"

export default function BosniaAndHerzegovinaMap() {
  return (
    <CountryMapLayout
      countryName="Bosnia and Herz."
      geoUrl="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json"
    />
  )
}
