"use client"

import { useState, useCallback, useMemo, memo } from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

interface InteractiveWorldMapProps {
  onCountryClick?: (countryName: string, countryCode: string) => void
  activeCountries?: string[]
  countryHeatData?: Record<string, string>
}

function InteractiveWorldMap({ onCountryClick, activeCountries = [], countryHeatData }: InteractiveWorldMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)

  const activeCountriesSet = useMemo(() => {
    return new Set(activeCountries.map((c) => c.toLowerCase()))
  }, [activeCountries])

  const handleCountryClick = useCallback(
    (geo: any) => {
      const countryName = geo.properties.name
      const countryCode = geo.id
      onCountryClick?.(countryName, countryCode)
    },
    [onCountryClick],
  )

  const isActiveCountry = useCallback(
    (countryName: string) => {
      const lowerName = countryName.toLowerCase()
      for (const activeCountry of activeCountriesSet) {
        if (lowerName.includes(activeCountry) || activeCountry.includes(lowerName)) {
          return true
        }
      }
      return false
    },
    [activeCountriesSet],
  )

  const getCountryColor = useCallback((countryName: string) => {
    if (countryHeatData) {
      if (countryHeatData[countryName]) {
        return countryHeatData[countryName]
      }
      return '#D6D3D1' // Stone-300 gray for zero-post countries
    }
    
    // If no heat data, use active country highlighting (for user-specific maps)
    if (isActiveCountry(countryName)) {
      return '#FDB484' // Allnoos brand orange color
    }
    
    return '#D6D3D1' // Stone-300 gray for inactive countries (default)
  }, [countryHeatData, isActiveCountry])

  const hasStories = useCallback((countryName: string) => {
    if (countryHeatData) {
      // Check if country has a color assigned (meaning it has posts)
      return countryHeatData[countryName] && countryHeatData[countryName] !== '#D6D3D1'
    }
    return isActiveCountry(countryName)
  }, [countryHeatData, isActiveCountry])

  return (
    <div 
      className="w-full h-full flex items-center justify-center"
      style={{
        imageRendering: 'crisp-edges',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{
          scale: 185,
          center: [0, 5], // shifted map northward to [0, 5]
        }}
        style={{
          width: "100%",
          height: "100%",
          shapeRendering: 'geometricPrecision',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
        width={1000}
        height={500}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isHovered = hoveredCountry === geo.properties.name
              const isActive = isActiveCountry(geo.properties.name)
              const heatColor = getCountryColor(geo.properties.name)
              const countryHasStories = hasStories(geo.properties.name)

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => countryHasStories && setHoveredCountry(geo.properties.name)}
                  onMouseLeave={() => countryHasStories && setHoveredCountry(null)}
                  onClick={() => countryHasStories && handleCountryClick(geo)}
                  style={{
                    default: {
                      fill: heatColor,
                      stroke: "#FFFFFF",
                      strokeWidth: 0.5,
                      outline: "none",
                      transition: "all 0.2s ease-in-out",
                      vectorEffect: 'non-scaling-stroke',
                    },
                    hover: {
                      fill: countryHasStories ? (heatColor ? `${heatColor}DD` : "#D6D3D1") : heatColor,
                      stroke: "#FFFFFF",
                      strokeWidth: countryHasStories ? 1.5 : 0.5,
                      outline: "none",
                      cursor: countryHasStories ? "pointer" : "default",
                      vectorEffect: 'non-scaling-stroke',
                      filter: countryHasStories ? 'brightness(1.1)' : 'none',
                    },
                    pressed: {
                      fill: countryHasStories ? (heatColor ? `${heatColor}BB` : "#D6D3D1") : heatColor,
                      stroke: "#FFFFFF",
                      strokeWidth: countryHasStories ? 1.5 : 0.5,
                      outline: "none",
                      vectorEffect: 'non-scaling-stroke',
                      filter: countryHasStories ? 'brightness(0.9)' : 'none',
                    },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}

export default memo(InteractiveWorldMap)
