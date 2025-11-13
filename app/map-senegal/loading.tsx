import CountryMapLayout from "@/components/country-map-layout"

export default function Loading() {
  return (
    <CountryMapLayout countryName="Senegal" userId="">
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading map...</div>
      </div>
    </CountryMapLayout>
  )
}
