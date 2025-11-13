"use client"

import { useState } from "react"

interface Region {
  id: string
  name: string
  path: string
}

interface SimpleCountryMapProps {
  regions: Region[]
  viewBox: string
  className?: string
}

export function SimpleCountryMap({ regions, viewBox, className = "" }: SimpleCountryMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  return (
    <svg viewBox={viewBox} className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      {regions.map((region) => {
        const isHovered = hoveredRegion === region.id
        const isSelected = selectedRegion === region.id
        const isActive = isHovered || isSelected

        return (
          <path
            key={region.id}
            d={region.path}
            fill={isActive ? "#FDB484" : "#D4D4D4"}
            stroke="#FFFFFF"
            strokeWidth="1.5"
            style={{
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              filter: isHovered ? "brightness(1.1)" : "none",
            }}
            onMouseEnter={() => setHoveredRegion(region.id)}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => setSelectedRegion(region.id)}
          >
            <title>{region.name}</title>
          </path>
        )
      })}
    </svg>
  )
}
