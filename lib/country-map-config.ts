export interface CountryMapConfig {
  name: string
  displayName: string
  geoUrl: string
  projection: "geoAlbersUsa" | "geoMercator" | "geoEqualEarth"
  projectionConfig: {
    scale: number
    center?: [number, number]
  }
  width: number
  height: number
  regionNameProperty: string // property name in GeoJSON for region names
}

export const countryMapConfigs: Record<string, CountryMapConfig> = {
  "united-states": {
    name: "united-states",
    displayName: "United States",
    geoUrl: "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json",
    projection: "geoAlbersUsa",
    projectionConfig: {
      scale: 1700,
    },
    width: 1100,
    height: 800,
    regionNameProperty: "name",
  },
  canada: {
    name: "canada",
    displayName: "Canada",
    geoUrl: "https://gist.githubusercontent.com/Saw-mon-and-Natalie/a11f058fc0dcce9343b02498a46b3d44/raw/canada.json",
    projection: "geoMercator",
    projectionConfig: {
      scale: 650,
      center: [-96, 62],
    },
    width: 1100,
    height: 800,
    regionNameProperty: "name",
  },
  mexico: {
    name: "mexico",
    displayName: "Mexico",
    geoUrl: "https://raw.githubusercontent.com/ccalobeto/latam-atlas/master/topojson/MEX_2.json",
    projection: "geoMercator",
    projectionConfig: {
      scale: 1000,
      center: [-102, 23.5],
    },
    width: 1100,
    height: 800,
    regionNameProperty: "name",
  },
  uk: {
    name: "uk",
    displayName: "United Kingdom",
    geoUrl: "https://raw.githubusercontent.com/martinjc/UK-GeoJSON/master/json/electoral/eng/eer.json",
    projection: "geoMercator",
    projectionConfig: {
      scale: 2200,
      center: [-2, 54],
    },
    width: 1100,
    height: 800,
    regionNameProperty: "EER13NM",
  },
  australia: {
    name: "australia",
    displayName: "Australia",
    geoUrl: "https://raw.githubusercontent.com/tonywr71/GeoJson-Data/master/australian-states.min.geojson",
    projection: "geoMercator",
    projectionConfig: {
      scale: 600,
      center: [133, -27],
    },
    width: 1100,
    height: 800,
    regionNameProperty: "STATE_NAME",
  },
  brazil: {
    name: "brazil",
    displayName: "Brazil",
    geoUrl: "https://raw.githubusercontent.com/giuliano-macedo/geodata-br-states/main/geojson/br_states.json",
    projection: "geoMercator",
    projectionConfig: {
      scale: 600,
      center: [-52, -14],
    },
    width: 1100,
    height: 800,
    regionNameProperty: "name",
  },
  france: {
    name: "france",
    displayName: "France",
    geoUrl: "https://gist.githubusercontent.com/katossky/e0b0e1e0e8e4e0e0e0e0e0e0e0e0e0e0/raw/france.json",
    projection: "geoMercator",
    projectionConfig: {
      scale: 2000,
      center: [2, 47],
    },
    width: 1100,
    height: 800,
    regionNameProperty: "nom",
  },
  germany: {
    name: "germany",
    displayName: "Germany",
    geoUrl: "https://raw.githubusercontent.com/AliceWi/TopoJSON-Germany/master/germany.json",
    projection: "geoMercator",
    projectionConfig: {
      scale: 2200,
      center: [10.5, 51],
    },
    width: 1100,
    height: 800,
    regionNameProperty: "name",
  },
  japan: {
    name: "japan",
    displayName: "Japan",
    geoUrl: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/japan/japan-prefectures.json",
    projection: "geoMercator",
    projectionConfig: {
      scale: 1200,
      center: [138, 38],
    },
    width: 1100,
    height: 800,
    regionNameProperty: "NAME_1",
  },
  india: {
    name: "india",
    displayName: "India",
    geoUrl: "https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@dc5d493/geojson/india.geojson",
    projection: "geoMercator",
    projectionConfig: {
      scale: 900,
      center: [78, 22],
    },
    width: 1100,
    height: 800,
    regionNameProperty: "ST_NM",
  },
}

export function getCountryConfig(countrySlug: string): CountryMapConfig | null {
  return countryMapConfigs[countrySlug] || null
}
