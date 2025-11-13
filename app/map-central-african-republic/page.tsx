import { CountryMapLayout } from "@/components/country-map-layout"

export default function CentralAfricanRepublicMap() {
  return (
    <CountryMapLayout
      countryName="Central African Rep."
      geoUrl="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json"
    />
  )
}
