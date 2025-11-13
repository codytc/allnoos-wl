"use client"

import { useState, useCallback, useMemo, memo } from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

interface InteractiveWorldMapProps {
  onCountryClick?: (countryName: string, countryCode: string) => void
  activeCountries?: string[]
}

function InteractiveWorldMap({ onCountryClick, activeCountries = [] }: InteractiveWorldMapProps) {
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

  return (
    <div className="w-full h-full flex items-center justify-center">
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{
          scale: 170,
          center: [0, 0],
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        width={1000}
        height={500}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isHovered = hoveredCountry === geo.properties.name
              const isActive = isActiveCountry(geo.properties.name)

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setHoveredCountry(geo.properties.name)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() => handleCountryClick(geo)}
                  style={{
                    default: {
                      fill: isActive ? "#FDB484" : isHovered ? "#FDB484" : "#D6D3D1",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.5,
                      outline: "none",
                      transition: "all 0.2s ease-in-out",
                    },
                    hover: {
                      fill: isActive ? "#FCA05A" : "#FDB484",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.75,
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: {
                      fill: "#FCA05A",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.75,
                      outline: "none",
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
