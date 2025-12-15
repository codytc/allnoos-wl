# Country Maps with States/Provinces/Regions

This document lists all countries that have administrative subdivision boundaries (states, provinces, regions, etc.) implemented in the map system.

## Major Countries with Full State/Province Implementation

### Americas
- **United States** - 50 states via `us-atlas@3/states-10m.json`
- **Canada** - Provinces/territories via GitHub gist
- **Brazil** - States via `geodata-br-states`
- **Mexico** - States via `latam-atlas`

### Europe
- **United Kingdom** - Not yet implemented (TODO)
- **France** - Regions via `france-geojson`
- **Germany** - States via `TopoJSON-Germany`
- **Italy** - Regions via `leaflet-geojson-selector`
- **Spain** - Autonomous communities via `click_that_hood`

### Asia
- **China** - Provinces via `cn-atlas@3/provinces.json`
- **India** - States via `india-maps-data`
- **Japan** - Prefectures via `topojson/japan-prefectures`

### Oceania
- **Australia** - States/territories via `GeoJson-Data`

### South America
- **Bolivia** - Departments via geoBoundaries API

## How State/Province Boundaries Work

Each country map uses one of these data sources:

1. **CDN-hosted GeoJSON/TopoJSON** - Most common, using GitHub raw content or npm packages
2. **geoBoundaries API** - International boundary database with ADM1 (first-level administrative divisions)
3. **Custom GitHub repos** - Community-maintained GeoJSON files

## Adding State Boundaries to More Countries

Use the helper utility in `lib/country-codes.ts`:

```typescript
import { getCountryWithStatesUrl } from "@/lib/country-codes"

const geoUrl = getCountryWithStatesUrl("Argentina") // Returns geoBoundaries API URL
```

This automatically generates the correct geoBoundaries API endpoint for any country.

## Countries Still Using World Atlas (No Subdivisions)

About 150+ smaller countries still use `world-atlas` which only shows country outlines without internal divisions. These can be updated to use geoBoundaries API as needed.
