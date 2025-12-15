# D3 Auto-Fitting Map System - Migration Guide

## Overview

The new D3-based map system eliminates manual scale adjustments by automatically calculating optimal viewport fitting using D3's `.fitSize()` method. No more manual tweaking for each country!

## How It Works

1. **Download Script**: Run `/scripts/download-country-maps.js` once to fetch all 195 country GeoJSON files from geoBoundaries API
2. **Auto-Fitting**: The `D3CountryMap` component uses D3's `geoMercator().fitSize()` to automatically scale and center each country
3. **Viewport Constraints**: Respects 20px margins and logo positioning (15% left, 64% top)

## Setup Instructions

### Step 1: Download Country Data

```bash
# In v0, navigate to /scripts/download-country-maps.js and click "Run"
# This downloads all 195 country GeoJSON files to /public/data/countries/
```

The script will:
- Fetch metadata from geoBoundaries API
- Download simplified GeoJSON boundaries (ADM0 level)
- Save to `/public/data/countries/{iso3}.json`
- Process in batches to avoid API rate limits

### Step 2: Update Country Pages

Replace the old manual approach with the new D3 component:

**OLD (Manual Scaling):**
```tsx
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { useCountryProjection } from "@/hooks/use-country-projection"

export default function CountryPage({ searchParams }) {
  const { config, isLoading } = useCountryProjection("CountryName", geoUrl)
  
  return (
    <CountryMapLayout countryName="CountryName" userId={userId}>
      <ComposableMap projection="geoMercator" projectionConfig={config}>
        {/* Manual geography rendering */}
      </ComposableMap>
    </CountryMapLayout>
  )
}
```

**NEW (Auto-Fitting):**
```tsx
import { D3CountryMap } from "@/components/d3-country-map"

export default function CountryPage({ searchParams }) {
  const userId = searchParams.userId || "1"
  
  return (
    <CountryMapLayout countryName="CountryName" userId={userId}>
      <D3CountryMap iso3Code="ISO" />
    </CountryMapLayout>
  )
}
```

### Step 3: ISO3 Code Reference

Common country ISO3 codes:
- Afghanistan: `AFG`
- United States: `USA`
- India: `IND`
- Canada: `CAN`
- Brazil: `BRA`
- United Kingdom: `GBR`
- France: `FRA`
- Germany: `DEU`
- Japan: `JPN`
- Australia: `AUS`

[Full list in `/scripts/download-country-maps.js`]

## Component API

### D3CountryMap Props

```tsx
interface D3CountryMapProps {
  iso3Code: string                  // Required: ISO3 country code
  fillColor?: string                // Default: "#E5E7EB"
  strokeColor?: string              // Default: "#FFFFFF"
  strokeWidth?: number              // Default: 1
  highlightedProvinces?: string[]   // For province-level highlighting
  highlightColor?: string           // Default: "#FDB484"
}
```

### Example with Province Highlighting

```tsx
<D3CountryMap 
  iso3Code="CAN" 
  highlightedProvinces={["Ontario", "Quebec"]}
  highlightColor="#FDB484"
/>
```

## Benefits

1. **Zero Manual Scaling**: No more adjusting scale values for each country
2. **Perfect Viewport Fitting**: Always fits within margins automatically
3. **Responsive**: Auto-recalculates on window resize
4. **Province Support**: Built-in support for highlighting provinces/states
5. **Performance**: Pre-downloaded files = instant loading

## Migration Checklist

- [ ] Run `/scripts/download-country-maps.js` to download all country data
- [ ] Commit `/public/data/countries/` to your repository
- [ ] Update country pages to use `<D3CountryMap />`
- [ ] Remove old `useCountryProjection` hook imports
- [ ] Test a few countries to verify proper fitting
- [ ] Deploy and verify all 195 countries work correctly

## Troubleshooting

**Map not loading?**
- Check browser console for fetch errors
- Verify `/public/data/countries/{iso3}.json` exists
- Confirm ISO3 code is lowercase in file system

**Map too small/large?**
- The component auto-calculates based on container size
- Ensure `CountryMapLayout` is wrapping the component
- Check that margins (20px) are being respected

**Province highlighting not working?**
- Province names must match exactly (case-sensitive)
- Check GeoJSON file's `properties.shapeName` or `properties.name` field
- Log the feature properties to see available names
