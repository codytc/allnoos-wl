import { CountryMapLayout } from "@/components/country-map-layout"

export default function Loading() {
  return (
    <CountryMapLayout countryName="Mozambique" userId="1">
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading Mozambique map...</div>
      </div>
    </CountryMapLayout>
  )
}
