import CountryMapLayout from "@/components/country-map-layout"

export default function Loading() {
  return (
    <CountryMapLayout countryName="Iran" userId={1}>
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
      </div>
    </CountryMapLayout>
  )
}
