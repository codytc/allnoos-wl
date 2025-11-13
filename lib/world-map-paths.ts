"use client"

// ============================================
// MAP DATA - Store SVG paths directly in the file
// ============================================

export interface RegionPath {
  name: string
  code: string
  path: string
}

// World Map Data - Real SVG path data integrated from Wikimedia and other sources
export const worldMapPaths: Record<string, RegionPath> = {
  unitedStates: {
    name: "United States",
    code: "US",
    path: "M143.589,375.989l-0.865,3.475l-3.017-1.954h-1.504l-0.865,3.691l-10.554,23.65l2.801,20.606l3.449,1.737l0.648,5.645h7.105l6.889,5.204l13.562,1.305l1.504,6.941l2.152,1.521l3.017-3.033l2.369,1.08l2.152,9.976l3.656,2.386l3.017-5.645l9.258-6.726l6.025,2.817l5.169,0.433l0.216-3.25l10.762,0.217l2.152,2.386l0.432,5.42l-1.288,3.034l1.504,5.203h3.233l3.232-4.987l-1.288-2.386l-1.288-5.204l1.936-5.86l8.826-7.59l6.673-1.953l-0.864-6.293l9.258-9.983l9.258-1.521l-1.504-5.193l9.042-5.205v-6.94l-0.865-0.433l-3.233,1.082l-0.432,4.252l-10.745,0.129l-8.419,5.594l-13.217,4.322l-2.109-2.586l5.999-9.076l-2.965-2.826l-2.014-3.838l-4.175-3.354l-4.538-0.38l-8.575-5.852L143.589,375.989L143.589,375.989z",
  },
}

// US States Map Data - Simplified for now (will add full data once main structure works)
export const usStatesMapPaths: Record<string, RegionPath> = {
  california: {
    name: "California",
    code: "CA",
    path: "M69.4,365.6l3.4,5.2l-1.4,0.1l-1.8,-1.9z M71.3,355.8l1.8,4.1l2.6,1l0.7,-0.6l-1.3,-2.5l-2.6,-2.4z M200,400l-5,-10l10,-5l8,12z",
  },
  texas: {
    name: "Texas",
    code: "TX",
    path: "M282.3,429l0.3,-3l34.4,3.6l31.8,2.6l7.9,-99.3l0.8,0l52.6,3.2l-1.4,42.7l2.7,1.3l50,-50l-30,80l-60,30z",
  },
  florida: {
    name: "Florida",
    code: "FL",
    path: "M751.7,445.1l-4,-0.7l-1.7,-0.9l-2.2,1.4v2.5l1.4,2.1l-0.5,4.3l-2.1,0.6l-1,-1.1l-0.6,-3.2l-50.1,3.3l-3.3,-6l-48.8,5.1l-0.5,2.9l80,40l20,-50z",
  },
  newYork: {
    name: "New York",
    code: "NY",
    path: "M872.9,181.6l-1.3,0.1l-0.5,1z M842.3,204.3l0.7,0.6l1.3,-0.3l1.1,0.3l0.9,-1.3h1.9l50,-20l-30,60l-40,-20z",
  },
  illinois: {
    name: "Illinois",
    code: "IL",
    path: "M623.5,265.9l-1,5.2v2l2.4,3.5v0.7l-0.3,0.9l0.9,1.9l-0.3,2.4l-1.6,1.8l-1.3,4.2l40,30l-20,-50z",
  },
}

// Canada Provinces Map Data - Simplified for now
export const canadaProvincesMapPaths: Record<string, RegionPath> = {
  britishColumbia: {
    name: "British Columbia",
    code: "BC",
    path: "M128.9,541c-1.2,1.8-2.6,0.6-4,0.2c-17.8,-4.8,-34.9,-11.8,-52.2,-18.2l50,80l30,-60z",
  },
  ontario: {
    name: "Ontario",
    code: "ON",
    path: "M431.8,624.9c2.9,0.4,4,3.5,6.5,4.4c1.8,0.6,3.5,2.5,5.3,0.3l60,-40l-50,80z",
  },
  quebec: {
    name: "Quebec",
    code: "QC",
    path: "M624.7,476.9c2.7,4.5,0.5,7.1-3.2,9.8c-3.5,2.5,-5.9,6,-7.1,10.5l40,60l-30,-90z",
  },
}
