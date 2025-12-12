import { geoBounds, geoPath, geoMercator } from "d3-geo"
import type { Feature } from "geojson"

// Country-specific geographic metadata for optimal map display
export const countryMetadata: Record<string, { id: string; defaultCenter?: [number, number] }> = {
  Armenia: { id: "ARM", defaultCenter: [45, 40.5] },
  Azerbaijan: { id: "AZE", defaultCenter: [47.5, 40.5] },
  Bahrain: { id: "BHR", defaultCenter: [50.5, 26.1] },
  Georgia: { id: "GEO", defaultCenter: [43.5, 42] },
  Kuwait: { id: "KWT", defaultCenter: [47.5, 29.5] },
  Bolivia: { id: "BOL", defaultCenter: [-65, -17] },
}
