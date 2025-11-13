import { geoBounds, geoPath, geoMercator } from "d3-geo"
import type { Feature } from "geojson"

/**
 * Calculate optimal projection configuration for a country to fill the viewport
 * while maintaining proper aspect ratio and avoiding logo overlap
 */
export function calculateProjectionConfig(countryGeometry: Feature, viewportWidth = 1920, viewportHeight = 1080) {
  // Calculate geographic bounds [minLon, minLat, maxLon, maxLat]
  const bounds = geoBounds(countryGeometry)

  // Calculate center point
  const centerLon = (bounds[0][0] + bounds[1][0]) / 2
  const centerLat = (bounds[0][1] + bounds[1][1]) / 2

  // Create a temporary projection to measure the country's pixel dimensions
  const tempProjection = geoMercator().center([centerLon, centerLat]).scale(1000)

  const tempPath = geoPath(tempProjection)
  const pixelBounds = tempPath.bounds(countryGeometry)

  // Calculate pixel dimensions of the country at scale 1000
  const pixelWidth = pixelBounds[1][0] - pixelBounds[0][0]
  const pixelHeight = pixelBounds[1][1] - pixelBounds[0][1]

  // Logo is positioned at 15% left, 64% top with approximate dimensions
  const logoLeft = viewportWidth * 0.15
  const logoTop = viewportHeight * 0.64
  const logoWidth = 120
  const logoHeight = 32

  // Calculate safe area (viewport minus margins and logo exclusion zone)
  const marginPx = 20
  const safeWidth = viewportWidth - 2 * marginPx
  const safeHeight = viewportHeight - 2 * marginPx

  // Calculate scale to fit within safe area
  const scaleByWidth = (safeWidth / pixelWidth) * 1000
  const scaleByHeight = (safeHeight / pixelHeight) * 1000

  // Use the smaller scale to ensure the entire country fits
  let optimalScale = Math.min(scaleByWidth, scaleByHeight)

  // Apply a 0.85 factor to provide some breathing room
  optimalScale *= 0.85

  // Adjust center to avoid logo if necessary
  let adjustedCenterLon = centerLon
  const adjustedCenterLat = centerLat

  // Check if country would overlap with logo area
  const countryPixelCenterX = viewportWidth / 2
  const countryPixelCenterY = viewportHeight / 2

  // If logo is in the way, shift the map slightly to the right
  if (
    Math.abs(countryPixelCenterX - logoLeft) < logoWidth * 2 &&
    Math.abs(countryPixelCenterY - logoTop) < logoHeight * 2
  ) {
    // Shift center slightly away from logo
    const shiftFactor = 0.1 // 10% shift
    adjustedCenterLon += (bounds[1][0] - bounds[0][0]) * shiftFactor
  }

  return {
    scale: Math.round(optimalScale),
    center: [adjustedCenterLon, adjustedCenterLat] as [number, number],
  }
}

/**
 * Country-specific geographic metadata for optimal map display
 */
export const countryMetadata: Record<string, { id: string; defaultCenter?: [number, number] }> = {
  Armenia: { id: "ARM", defaultCenter: [45, 40.5] },
  Azerbaijan: { id: "AZE", defaultCenter: [47.5, 40.5] },
  Bahrain: { id: "BHR", defaultCenter: [50.5, 26.1] },
  Georgia: { id: "GEO", defaultCenter: [43.5, 42] },
  Kuwait: { id: "KWT", defaultCenter: [47.5, 29.5] },
  Bolivia: { id: "BOL", defaultCenter: [-65, -17] },
}
