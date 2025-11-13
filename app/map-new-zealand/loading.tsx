import { CountryMapLayout } from "@/components/country-map-layout"

export default function Loading() {
  return (
    <CountryMapLayout countryName="New Zealand" userId="1">
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading New Zealand map...</div>
      </div>
    </CountryMapLayout>
  )
}
