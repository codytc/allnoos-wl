"use client"

import CountryMapLayout from "@/components/country-map-layout"
import { D3CountryMap } from "@/components/d3-country-map"

export default function AfghanistanMapPage({ searchParams }: { searchParams: { userId?: string } }) {
  const userId = searchParams.userId || "1"

  return (
    <CountryMapLayout countryName="Afghanistan" userId={userId}>
      <D3CountryMap iso3Code="AFG" fillColor="#E5E7EB" strokeColor="#FFFFFF" strokeWidth={0.5} />
    </CountryMapLayout>
  )
}
