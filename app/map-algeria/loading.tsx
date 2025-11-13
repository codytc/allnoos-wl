import { CountryMapLayout } from "@/components/country-map-layout"

export default function Loading() {
  return (
    <CountryMapLayout countryName="Algeria" userId="1">
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading Algeria map...</div>
      </div>
    </CountryMapLayout>
  )
}
