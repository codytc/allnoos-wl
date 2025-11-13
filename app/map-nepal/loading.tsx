import { CountryMapLayout } from "@/components/country-map-layout"

export default function Loading() {
  return (
    <CountryMapLayout countryName="Nepal" userId="1">
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading Nepal map...</div>
      </div>
    </CountryMapLayout>
  )
}
