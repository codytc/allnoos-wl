import { CountryMapLayout } from "@/components/country-map-layout"

export default function Loading() {
  return (
    <CountryMapLayout countryName="Solomon Islands" userId="1">
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading Solomon Islands map...</div>
      </div>
    </CountryMapLayout>
  )
}
