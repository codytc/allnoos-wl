/**
 * Download GeoJSON files for all countries from geoBoundaries API
 * Run this script once in v0 to populate /public/data/countries/
 *
 * Usage: Click "Run" in v0's /scripts folder
 */

import { writeFile, mkdir } from "fs/promises"
import { join } from "path"

// List of all 195 countries with their ISO3 codes
const countries = [
  { name: "Afghanistan", iso3: "AFG" },
  { name: "Albania", iso3: "ALB" },
  { name: "Algeria", iso3: "DZA" },
  { name: "Andorra", iso3: "AND" },
  { name: "Angola", iso3: "AGO" },
  { name: "Antigua and Barbuda", iso3: "ATG" },
  { name: "Argentina", iso3: "ARG" },
  { name: "Armenia", iso3: "ARM" },
  { name: "Australia", iso3: "AUS" },
  { name: "Austria", iso3: "AUT" },
  { name: "Azerbaijan", iso3: "AZE" },
  { name: "Bahamas", iso3: "BHS" },
  { name: "Bahrain", iso3: "BHR" },
  { name: "Bangladesh", iso3: "BGD" },
  { name: "Barbados", iso3: "BRB" },
  { name: "Belarus", iso3: "BLR" },
  { name: "Belgium", iso3: "BEL" },
  { name: "Belize", iso3: "BLZ" },
  { name: "Benin", iso3: "BEN" },
  { name: "Bhutan", iso3: "BTN" },
  { name: "Bolivia", iso3: "BOL" },
  { name: "Bosnia and Herzegovina", iso3: "BIH" },
  { name: "Botswana", iso3: "BWA" },
  { name: "Brazil", iso3: "BRA" },
  { name: "Brunei", iso3: "BRN" },
  { name: "Bulgaria", iso3: "BGR" },
  { name: "Burkina Faso", iso3: "BFA" },
  { name: "Burundi", iso3: "BDI" },
  { name: "Cambodia", iso3: "KHM" },
  { name: "Cameroon", iso3: "CMR" },
  { name: "Canada", iso3: "CAN" },
  { name: "Cape Verde", iso3: "CPV" },
  { name: "Central African Republic", iso3: "CAF" },
  { name: "Chad", iso3: "TCD" },
  { name: "Chile", iso3: "CHL" },
  { name: "China", iso3: "CHN" },
  { name: "Colombia", iso3: "COL" },
  { name: "Comoros", iso3: "COM" },
  { name: "Congo", iso3: "COG" },
  { name: "Costa Rica", iso3: "CRI" },
  { name: "Croatia", iso3: "HRV" },
  { name: "Cuba", iso3: "CUB" },
  { name: "Cyprus", iso3: "CYP" },
  { name: "Czech Republic", iso3: "CZE" },
  { name: "Democratic Republic of the Congo", iso3: "COD" },
  { name: "Denmark", iso3: "DNK" },
  { name: "Djibouti", iso3: "DJI" },
  { name: "Dominica", iso3: "DMA" },
  { name: "Dominican Republic", iso3: "DOM" },
  { name: "Ecuador", iso3: "ECU" },
  { name: "Egypt", iso3: "EGY" },
  { name: "El Salvador", iso3: "SLV" },
  { name: "Equatorial Guinea", iso3: "GNQ" },
  { name: "Eritrea", iso3: "ERI" },
  { name: "Estonia", iso3: "EST" },
  { name: "Eswatini", iso3: "SWZ" },
  { name: "Ethiopia", iso3: "ETH" },
  { name: "Fiji", iso3: "FJI" },
  { name: "Finland", iso3: "FIN" },
  { name: "France", iso3: "FRA" },
  { name: "Gabon", iso3: "GAB" },
  { name: "Gambia", iso3: "GMB" },
  { name: "Georgia", iso3: "GEO" },
  { name: "Germany", iso3: "DEU" },
  { name: "Ghana", iso3: "GHA" },
  { name: "Greece", iso3: "GRC" },
  { name: "Grenada", iso3: "GRD" },
  { name: "Guatemala", iso3: "GTM" },
  { name: "Guinea", iso3: "GIN" },
  { name: "Guinea-Bissau", iso3: "GNB" },
  { name: "Guyana", iso3: "GUY" },
  { name: "Haiti", iso3: "HTI" },
  { name: "Honduras", iso3: "HND" },
  { name: "Hungary", iso3: "HUN" },
  { name: "Iceland", iso3: "ISL" },
  { name: "India", iso3: "IND" },
  { name: "Indonesia", iso3: "IDN" },
  { name: "Iran", iso3: "IRN" },
  { name: "Iraq", iso3: "IRQ" },
  { name: "Ireland", iso3: "IRL" },
  { name: "Israel", iso3: "ISR" },
  { name: "Italy", iso3: "ITA" },
  { name: "Ivory Coast", iso3: "CIV" },
  { name: "Jamaica", iso3: "JAM" },
  { name: "Japan", iso3: "JPN" },
  { name: "Jordan", iso3: "JOR" },
  { name: "Kazakhstan", iso3: "KAZ" },
  { name: "Kenya", iso3: "KEN" },
  { name: "Kiribati", iso3: "KIR" },
  { name: "Kuwait", iso3: "KWT" },
  { name: "Kyrgyzstan", iso3: "KGZ" },
  { name: "Laos", iso3: "LAO" },
  { name: "Latvia", iso3: "LVA" },
  { name: "Lebanon", iso3: "LBN" },
  { name: "Lesotho", iso3: "LSO" },
  { name: "Liberia", iso3: "LBR" },
  { name: "Libya", iso3: "LBY" },
  { name: "Liechtenstein", iso3: "LIE" },
  { name: "Lithuania", iso3: "LTU" },
  { name: "Luxembourg", iso3: "LUX" },
  { name: "Madagascar", iso3: "MDG" },
  { name: "Malawi", iso3: "MWI" },
  { name: "Malaysia", iso3: "MYS" },
  { name: "Maldives", iso3: "MDV" },
  { name: "Mali", iso3: "MLI" },
  { name: "Malta", iso3: "MLT" },
  { name: "Marshall Islands", iso3: "MHL" },
  { name: "Mauritania", iso3: "MRT" },
  { name: "Mauritius", iso3: "MUS" },
  { name: "Mexico", iso3: "MEX" },
  { name: "Micronesia", iso3: "FSM" },
  { name: "Moldova", iso3: "MDA" },
  { name: "Monaco", iso3: "MCO" },
  { name: "Mongolia", iso3: "MNG" },
  { name: "Montenegro", iso3: "MNE" },
  { name: "Morocco", iso3: "MAR" },
  { name: "Mozambique", iso3: "MOZ" },
  { name: "Myanmar", iso3: "MMR" },
  { name: "Namibia", iso3: "NAM" },
  { name: "Nauru", iso3: "NRU" },
  { name: "Nepal", iso3: "NPL" },
  { name: "Netherlands", iso3: "NLD" },
  { name: "New Zealand", iso3: "NZL" },
  { name: "Nicaragua", iso3: "NIC" },
  { name: "Niger", iso3: "NER" },
  { name: "Nigeria", iso3: "NGA" },
  { name: "North Korea", iso3: "PRK" },
  { name: "North Macedonia", iso3: "MKD" },
  { name: "Norway", iso3: "NOR" },
  { name: "Oman", iso3: "OMN" },
  { name: "Pakistan", iso3: "PAK" },
  { name: "Palau", iso3: "PLW" },
  { name: "Palestine", iso3: "PSE" },
  { name: "Panama", iso3: "PAN" },
  { name: "Papua New Guinea", iso3: "PNG" },
  { name: "Paraguay", iso3: "PRY" },
  { name: "Peru", iso3: "PER" },
  { name: "Philippines", iso3: "PHL" },
  { name: "Poland", iso3: "POL" },
  { name: "Portugal", iso3: "PRT" },
  { name: "Qatar", iso3: "QAT" },
  { name: "Romania", iso3: "ROU" },
  { name: "Russia", iso3: "RUS" },
  { name: "Rwanda", iso3: "RWA" },
  { name: "Saint Kitts and Nevis", iso3: "KNA" },
  { name: "Saint Lucia", iso3: "LCA" },
  { name: "Saint Vincent and the Grenadines", iso3: "VCT" },
  { name: "Samoa", iso3: "WSM" },
  { name: "San Marino", iso3: "SMR" },
  { name: "Sao Tome and Principe", iso3: "STP" },
  { name: "Saudi Arabia", iso3: "SAU" },
  { name: "Senegal", iso3: "SEN" },
  { name: "Serbia", iso3: "SRB" },
  { name: "Seychelles", iso3: "SYC" },
  { name: "Sierra Leone", iso3: "SLE" },
  { name: "Singapore", iso3: "SGP" },
  { name: "Slovakia", iso3: "SVK" },
  { name: "Slovenia", iso3: "SVN" },
  { name: "Solomon Islands", iso3: "SLB" },
  { name: "Somalia", iso3: "SOM" },
  { name: "South Africa", iso3: "ZAF" },
  { name: "South Korea", iso3: "KOR" },
  { name: "South Sudan", iso3: "SSD" },
  { name: "Spain", iso3: "ESP" },
  { name: "Sri Lanka", iso3: "LKA" },
  { name: "Sudan", iso3: "SDN" },
  { name: "Suriname", iso3: "SUR" },
  { name: "Sweden", iso3: "SWE" },
  { name: "Switzerland", iso3: "CHE" },
  { name: "Syria", iso3: "SYR" },
  { name: "Taiwan", iso3: "TWN" },
  { name: "Tajikistan", iso3: "TJK" },
  { name: "Tanzania", iso3: "TZA" },
  { name: "Thailand", iso3: "THA" },
  { name: "Timor-Leste", iso3: "TLS" },
  { name: "Togo", iso3: "TGO" },
  { name: "Tonga", iso3: "TON" },
  { name: "Trinidad and Tobago", iso3: "TTO" },
  { name: "Tunisia", iso3: "TUN" },
  { name: "Turkey", iso3: "TUR" },
  { name: "Turkmenistan", iso3: "TKM" },
  { name: "Tuvalu", iso3: "TUV" },
  { name: "Uganda", iso3: "UGA" },
  { name: "Ukraine", iso3: "UKR" },
  { name: "United Arab Emirates", iso3: "ARE" },
  { name: "United Kingdom", iso3: "GBR" },
  { name: "United States", iso3: "USA" },
  { name: "Uruguay", iso3: "URY" },
  { name: "Uzbekistan", iso3: "UZB" },
  { name: "Vanuatu", iso3: "VUT" },
  { name: "Vatican City", iso3: "VAT" },
  { name: "Venezuela", iso3: "VEN" },
  { name: "Vietnam", iso3: "VNM" },
  { name: "Yemen", iso3: "YEM" },
  { name: "Zambia", iso3: "ZMB" },
  { name: "Zimbabwe", iso3: "ZWE" },
]

const OUTPUT_DIR = "./public/data/countries"
const API_BASE = "https://www.geoboundaries.org/api/current/gbOpen"

async function downloadCountryGeoJSON(country) {
  try {
    console.log(`[v0] Fetching metadata for ${country.name} (${country.iso3})...`)

    // Fetch metadata from geoBoundaries API
    const metadataUrl = `${API_BASE}/${country.iso3}/ADM0/`
    const metadataResponse = await fetch(metadataUrl)

    if (!metadataResponse.ok) {
      throw new Error(`Failed to fetch metadata: ${metadataResponse.status}`)
    }

    const metadata = await metadataResponse.json()
    const geoJsonUrl = metadata.gjDownloadURL

    console.log(`[v0] Downloading GeoJSON for ${country.name}...`)

    // Download the actual GeoJSON file
    const geoJsonResponse = await fetch(geoJsonUrl)

    if (!geoJsonResponse.ok) {
      throw new Error(`Failed to download GeoJSON: ${geoJsonResponse.status}`)
    }

    const geoJsonData = await geoJsonResponse.json()

    // Save to file
    const filename = `${country.iso3.toLowerCase()}.json`
    const filepath = join(OUTPUT_DIR, filename)

    await writeFile(filepath, JSON.stringify(geoJsonData, null, 2))

    console.log(`[v0] ✓ Saved ${country.name} to ${filename}`)

    return { success: true, country: country.name }
  } catch (error) {
    console.error(`[v0] ✗ Failed to download ${country.name}:`, error.message)
    return { success: false, country: country.name, error: error.message }
  }
}

async function main() {
  console.log("[v0] Starting country GeoJSON download...")
  console.log(`[v0] Total countries to download: ${countries.length}`)

  // Create output directory
  try {
    await mkdir(OUTPUT_DIR, { recursive: true })
    console.log(`[v0] Created output directory: ${OUTPUT_DIR}`)
  } catch (error) {
    console.error("[v0] Failed to create output directory:", error)
    return
  }

  // Download all countries (with rate limiting to avoid API throttling)
  const results = []
  const BATCH_SIZE = 5 // Download 5 at a time
  const DELAY_MS = 1000 // 1 second delay between batches

  for (let i = 0; i < countries.length; i += BATCH_SIZE) {
    const batch = countries.slice(i, i + BATCH_SIZE)
    console.log(
      `\n[v0] Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(countries.length / BATCH_SIZE)}...`,
    )

    const batchResults = await Promise.all(batch.map((country) => downloadCountryGeoJSON(country)))

    results.push(...batchResults)

    // Delay before next batch (except for the last batch)
    if (i + BATCH_SIZE < countries.length) {
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS))
    }
  }

  // Summary
  const successful = results.filter((r) => r.success).length
  const failed = results.filter((r) => !r.success).length

  console.log("\n[v0] ==========================================")
  console.log(`[v0] Download Complete!`)
  console.log(`[v0] Total: ${countries.length}`)
  console.log(`[v0] Successful: ${successful}`)
  console.log(`[v0] Failed: ${failed}`)
  console.log("[v0] ==========================================")

  if (failed > 0) {
    console.log("\n[v0] Failed countries:")
    results
      .filter((r) => !r.success)
      .forEach((r) => {
        console.log(`[v0]   - ${r.country}: ${r.error}`)
      })
  }
}

main()
