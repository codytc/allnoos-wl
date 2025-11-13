"use client"

import { ArrowLeft, ShirtIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState, useCallback } from "react"
import AllnoosLogo from "@/components/allnoos-logo"
import InteractiveWorldMap from "@/components/interactive-world-map"
import { allPosts, userProfiles } from "@/lib/mock-data"

export default function MapPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showShare, setShowShare] = useState(false)
  const [forwarded, setForwarded] = useState(false)

  const currentUserId = Number(searchParams.get("userId")) || 1

  useEffect(() => {
    document.documentElement.classList.add("map-page-active")

    return () => {
      document.documentElement.classList.remove("map-page-active")
    }
  }, [])

  const { activeCountries, userPosts, currentUser } = useMemo(() => {
    const countries = new Set<string>()
    const userPosts = allPosts.filter((post) => post.userId === currentUserId)
    const currentUser = userProfiles.find((user) => user.id === currentUserId)

    userPosts.forEach((post) => {
      if (post.location) {
        const parts = post.location.split(",")
        if (parts.length >= 2) {
          const country = parts[parts.length - 1].trim()
          countries.add(country)
        } else if (parts.length === 1) {
          countries.add(parts[0].trim())
        }
      }
    })

    return { activeCountries: Array.from(countries), userPosts, currentUser }
  }, [currentUserId])

  const displayText = userPosts.length > 0 && currentUser ? currentUser.name : "DAY 1"

  const handleCountryClick = useCallback(
    (countryName: string, countryCode: string) => {
      const countrySlugMap: Record<string, string> = {
        "United States of America": "united-states",
        "United States": "united-states",
        Canada: "canada",
        Mexico: "mexico",
        "United Kingdom": "uk",
        Australia: "australia",
        Brazil: "brazil",
        France: "france",
        Germany: "germany",
        Japan: "japan",
        India: "india",
        China: "china",
        Russia: "russia",
        "Russian Federation": "russia",
        Italy: "italy",
        Spain: "spain",
        Argentina: "argentina",
        "South Africa": "south-africa",
        Portugal: "portugal",
        Netherlands: "netherlands",
        Belgium: "belgium",
        Switzerland: "switzerland",
        Austria: "austria",
        Poland: "poland",
        Sweden: "sweden",
        Norway: "norway",
        Denmark: "denmark",
        Finland: "finland",
        Greece: "greece",
        "Czech Republic": "czech-republic",
        Czechia: "czech-republic",
        Hungary: "hungary",
        Romania: "romania",
        Ukraine: "ukraine",
        Ireland: "ireland",
        Iceland: "iceland",
        Croatia: "croatia",
        Serbia: "serbia",
        Bulgaria: "bulgaria",
        Slovakia: "slovakia",
        Slovenia: "slovenia",
        Estonia: "estonia",
        Latvia: "latvia",
        Lithuania: "lithuania",
        Albania: "albania",
        Belarus: "belarus",
        "Bosnia and Herzegovina": "bosnia-and-herzegovina",
        Luxembourg: "luxembourg",
        "North Macedonia": "macedonia",
        Macedonia: "macedonia",
        Malta: "malta",
        Moldova: "moldova",
        Montenegro: "montenegro",
        Andorra: "andorra",
        Kosovo: "kosovo",
        Turkey: "turkey",
        "South Korea": "south-korea",
        "Republic of Korea": "south-korea",
        Korea: "south-korea",
        Thailand: "thailand",
        Vietnam: "vietnam",
        "Viet Nam": "vietnam",
        Indonesia: "indonesia",
        Philippines: "philippines",
        Malaysia: "malaysia",
        Pakistan: "pakistan",
        Bangladesh: "bangladesh",
        "Saudi Arabia": "saudi-arabia",
        "United Arab Emirates": "uae",
        UAE: "uae",
        Iran: "iran",
        Iraq: "iraq",
        Israel: "israel",
        Jordan: "jordan",
        Lebanon: "lebanon",
        Syria: "syria",
        Oman: "oman",
        Chile: "chile",
        Colombia: "colombia",
        Peru: "peru",
        Venezuela: "venezuela",
        Ecuador: "ecuador",
        Bolivia: "bolivia",
        Paraguay: "paraguay",
        Uruguay: "uruguay",
        Guyana: "guyana",
        Suriname: "suriname",
        Egypt: "egypt",
        Nigeria: "nigeria",
        Kenya: "kenya",
        Ethiopia: "ethiopia",
        Morocco: "morocco",
        Algeria: "algeria",
        Tanzania: "tanzania",
        Ghana: "ghana",
        Uganda: "uganda",
        Tunisia: "tunisia",
        Angola: "angola",
        Mozambique: "mozambique",
        Zimbabwe: "zimbabwe",
        Cameroon: "cameroon",
        "Ivory Coast": "ivory-coast",
        "Côte d'Ivoire": "ivory-coast",
        Senegal: "senegal",
        Mali: "mali",
        Niger: "niger",
        Chad: "chad",
        Sudan: "sudan",
        "South Sudan": "south-sudan",
        Somalia: "somalia",
        Zambia: "zambia",
        Malawi: "malawi",
        Namibia: "namibia",
        Botswana: "botswana",
        Libya: "libya",
        "Democratic Republic of the Congo": "democratic-republic-of-congo",
        "Dem. Rep. Congo": "democratic-republic-of-congo",
        "Congo (Kinshasa)": "democratic-republic-of-congo",
        Rwanda: "rwanda",
        Burundi: "burundi",
        Benin: "benin",
        Togo: "togo",
        "Burkina Faso": "burkina-faso",
        Guinea: "guinea",
        "Sierra Leone": "sierra-leone",
        Liberia: "liberia",
        Mauritania: "mauritania",
        Gambia: "gambia",
        "Guinea-Bissau": "guinea-bissau",
        Gabon: "gabon",
        "Republic of the Congo": "republic-of-congo",
        "Congo (Brazzaville)": "republic-of-congo",
        Congo: "republic-of-congo",
        Eritrea: "eritrea",
        Djibouti: "djibouti",
        "New Zealand": "new-zealand",
        "Papua New Guinea": "papua-new-guinea",
        Fiji: "fiji",
        "Solomon Islands": "solomon-islands",
        Vanuatu: "vanuatu",
        Singapore: "singapore",
        Myanmar: "myanmar",
        Burma: "myanmar",
        Cambodia: "cambodia",
        Laos: "laos",
        "Lao PDR": "laos",
        Nepal: "nepal",
        "Sri Lanka": "sri-lanka",
        Afghanistan: "afghanistan",
        Kazakhstan: "kazakhstan",
        Uzbekistan: "uzbekistan",
        Mongolia: "mongolia",
        "Costa Rica": "costa-rica",
        Panama: "panama",
        Guatemala: "guatemala",
        Honduras: "honduras",
        Nicaragua: "nicaragua",
        "El Salvador": "el-salvador",
        Belize: "belize",
        Jamaica: "jamaica",
        Cuba: "cuba",
        "Dominican Republic": "dominican-republic",
        Haiti: "haiti",
        "Trinidad and Tobago": "trinidad-and-tobago",
        Yemen: "yemen",
        Kuwait: "kuwait",
        Qatar: "qatar",
        Bahrain: "bahrain",
        Armenia: "armenia",
        Georgia: "georgia",
        Azerbaijan: "azerbaijan",
        Kyrgyzstan: "kyrgyzstan",
        Tajikistan: "tajikistan",
        Turkmenistan: "turkmenistan",
        Bahamas: "bahamas",
        "The Bahamas": "bahamas",
        Barbados: "barbados",
        Grenada: "grenada",
        "Saint Lucia": "saint-lucia",
        "St. Lucia": "saint-lucia",
        "Saint Vincent and the Grenadines": "saint-vincent-and-the-grenadines",
        "St. Vincent and the Grenadines": "saint-vincent-and-the-grenadines",
        "Antigua and Barbuda": "antigua-and-barbuda",
        Dominica: "dominica",
        "Saint Kitts and Nevis": "saint-kitts-and-nevis",
        "St. Kitts and Nevis": "saint-kitts-and-nevis",
        Samoa: "samoa",
        Tonga: "tonga",
        Kiribati: "kiribati",
        Micronesia: "micronesia",
        "Federated States of Micronesia": "micronesia",
        Palau: "palau",
        "Marshall Islands": "marshall-islands",
        Nauru: "nauru",
        Tuvalu: "tuvalu",
        "Timor-Leste": "timor-leste",
        "East Timor": "timor-leste",
        Brunei: "brunei",
        "Brunei Darussalam": "brunei",
        Mauritius: "mauritius",
        Seychelles: "seychelles",
        Comoros: "comoros",
        "Cape Verde": "cape-verde",
        "Cabo Verde": "cape-verde",
        "São Tomé and Príncipe": "sao-tome-and-principe",
        "Sao Tome and Principe": "sao-tome-and-principe",
        "Equatorial Guinea": "equatorial-guinea",
        Lesotho: "lesotho",
        Eswatini: "eswatini",
        Swaziland: "eswatini",
        Madagascar: "madagascar",
        "Central African Republic": "central-african-republic",
        Bhutan: "bhutan",
        Maldives: "maldives",
        Cyprus: "cyprus",
        Monaco: "monaco",
        Liechtenstein: "liechtenstein",
        "San Marino": "san-marino",
        "Vatican City": "vatican-city",
        "Holy See": "vatican-city",
        "North Korea": "north-korea",
        "Democratic People's Republic of Korea": "north-korea",
        "Korea (North)": "north-korea",
        Taiwan: "taiwan",
        Palestine: "palestine",
        "State of Palestine": "palestine",
        "West Bank": "palestine",
      }

      let countrySlug = countrySlugMap[countryName]

      if (!countrySlug) {
        const codeMap: Record<string, string> = {
          USA: "united-states",
          US: "united-states",
          CA: "canada",
          CAN: "canada",
          MX: "mexico",
          MEX: "mexico",
          GB: "uk",
          GBR: "uk",
          AU: "australia",
          AUS: "australia",
          BR: "brazil",
          BRA: "brazil",
          FR: "france",
          FRA: "france",
          DE: "germany",
          DEU: "germany",
          JP: "japan",
          JPN: "japan",
          IN: "india",
          IND: "india",
          CN: "china",
          CHN: "china",
          RU: "russia",
          RUS: "russia",
          IT: "italy",
          ITA: "italy",
          ES: "spain",
          ESP: "spain",
          AR: "argentina",
          ARG: "argentina",
          ZA: "south-africa",
          ZAF: "south-africa",
          PT: "portugal",
          PRT: "portugal",
          NL: "netherlands",
          NLD: "netherlands",
          BE: "belgium",
          BEL: "belgium",
          CH: "switzerland",
          CHE: "switzerland",
          AT: "austria",
          AUT: "austria",
          PL: "poland",
          POL: "poland",
          SE: "sweden",
          SWE: "sweden",
          NO: "norway",
          NOR: "norway",
          DK: "denmark",
          DNK: "denmark",
          FI: "finland",
          FIN: "finland",
          GR: "greece",
          GRC: "greece",
          CZ: "czech-republic",
          CZE: "czech-republic",
          HU: "hungary",
          HUN: "hungary",
          RO: "romania",
          ROU: "romania",
          UA: "ukraine",
          UKR: "ukraine",
          IE: "ireland",
          IRL: "ireland",
          IS: "iceland",
          ISL: "iceland",
          HR: "croatia",
          HRV: "croatia",
          RS: "serbia",
          SRB: "serbia",
          BG: "bulgaria",
          BGR: "bulgaria",
          SK: "slovakia",
          SVK: "slovakia",
          SI: "slovenia",
          SVN: "slovenia",
          EE: "estonia",
          EST: "estonia",
          LV: "latvia",
          LVA: "latvia",
          LT: "lithuania",
          LTU: "lithuania",
          AL: "albania",
          ALB: "albania",
          BY: "belarus",
          BLR: "belarus",
          BA: "bosnia-and-herzegovina",
          BIH: "bosnia-and-herzegovina",
          LU: "luxembourg",
          LUX: "luxembourg",
          MK: "macedonia",
          MKD: "macedonia",
          MT: "malta",
          MLT: "malta",
          MD: "moldova",
          MDA: "moldova",
          ME: "montenegro",
          MNE: "montenegro",
          AD: "andorra",
          AND: "andorra",
          XK: "kosovo",
          XKX: "kosovo",
          TR: "turkey",
          TUR: "turkey",
          KR: "south-korea",
          KOR: "south-korea",
          TH: "thailand",
          THA: "thailand",
          VN: "vietnam",
          VNM: "vietnam",
          ID: "indonesia",
          IDN: "indonesia",
          PH: "philippines",
          PHL: "philippines",
          MY: "malaysia",
          MYS: "malaysia",
          PK: "pakistan",
          PAK: "pakistan",
          BD: "bangladesh",
          BGD: "bangladesh",
          SA: "saudi-arabia",
          SAU: "saudi-arabia",
          AE: "uae",
          ARE: "uae",
          IR: "iran",
          IRN: "iran",
          IQ: "iraq",
          IRQ: "iraq",
          IL: "israel",
          ISR: "israel",
          JO: "jordan",
          JOR: "jordan",
          LB: "lebanon",
          LBN: "lebanon",
          SY: "syria",
          SYR: "syria",
          OM: "oman",
          OMN: "oman",
          CL: "chile",
          CHL: "chile",
          CO: "colombia",
          COL: "colombia",
          PE: "peru",
          PER: "peru",
          VE: "venezuela",
          VEN: "venezuela",
          EC: "ecuador",
          ECU: "ecuador",
          BO: "bolivia",
          BOL: "bolivia",
          PY: "paraguay",
          PRY: "paraguay",
          UY: "uruguay",
          URY: "uruguay",
          GY: "guyana",
          GUY: "guyana",
          SR: "suriname",
          SUR: "suriname",
          EG: "egypt",
          EGY: "egypt",
          NG: "nigeria",
          NGA: "nigeria",
          KE: "kenya",
          KEN: "kenya",
          ET: "ethiopia",
          ETH: "ethiopia",
          MA: "morocco",
          MAR: "morocco",
          DZ: "algeria",
          DZA: "algeria",
          TZ: "tanzania",
          TZA: "tanzania",
          GH: "ghana",
          GHA: "ghana",
          UG: "uganda",
          UGA: "uganda",
          TN: "tunisia",
          TUN: "tunisia",
          AO: "angola",
          AGO: "angola",
          MZ: "mozambique",
          MOZ: "mozambique",
          ZW: "zimbabwe",
          ZWE: "zimbabwe",
          CM: "cameroon",
          CMR: "cameroon",
          CI: "ivory-coast",
          CIV: "ivory-coast",
          SN: "senegal",
          SEN: "senegal",
          ML: "mali",
          MLI: "mali",
          NE: "niger",
          NER: "niger",
          TD: "chad",
          TCD: "chad",
          SD: "sudan",
          SDN: "sudan",
          SS: "south-sudan",
          SSD: "south-sudan",
          SO: "somalia",
          SOM: "somalia",
          ZM: "zambia",
          ZMB: "zambia",
          MW: "malawi",
          MWI: "malawi",
          NA: "namibia",
          NAM: "namibia",
          BW: "botswana",
          BWA: "botswana",
          LY: "libya",
          LBY: "libya",
          CD: "democratic-republic-of-congo",
          COD: "democratic-republic-of-congo",
          RW: "rwanda",
          RWA: "rwanda",
          BI: "burundi",
          BDI: "burundi",
          BJ: "benin",
          BEN: "benin",
          TG: "togo",
          TGO: "togo",
          BF: "burkina-faso",
          BFA: "burkina-faso",
          GN: "guinea",
          GIN: "guinea",
          SL: "sierra-leone",
          SLE: "sierra-leone",
          LR: "liberia",
          LBR: "liberia",
          MR: "mauritania",
          MRT: "mauritania",
          GM: "gambia",
          GMB: "gambia",
          GW: "guinea-bissau",
          GNB: "guinea-bissau",
          GA: "gabon",
          GAB: "gabon",
          CG: "republic-of-congo",
          COG: "republic-of-congo",
          ER: "eritrea",
          ERI: "eritrea",
          DJ: "djibouti",
          DJI: "djibouti",
          NZ: "new-zealand",
          NZL: "new-zealand",
          PG: "papua-new-guinea",
          PNG: "papua-new-guinea",
          FJ: "fiji",
          FJI: "fiji",
          SB: "solomon-islands",
          SLB: "solomon-islands",
          VU: "vanuatu",
          VUT: "vanuatu",
          SG: "singapore",
          SGP: "singapore",
          MM: "myanmar",
          MMR: "myanmar",
          KH: "cambodia",
          KHM: "cambodia",
          LA: "laos",
          LAO: "laos",
          NP: "nepal",
          NPL: "nepal",
          LK: "sri-lanka",
          LKA: "sri-lanka",
          AF: "afghanistan",
          AFG: "afghanistan",
          KZ: "kazakhstan",
          KAZ: "kazakhstan",
          UZ: "uzbekistan",
          UZB: "uzbekistan",
          MN: "mongolia",
          MNG: "mongolia",
          CR: "costa-rica",
          CRI: "costa-rica",
          PA: "panama",
          PAN: "panama",
          GT: "guatemala",
          GTM: "guatemala",
          HN: "honduras",
          HND: "honduras",
          NI: "nicaragua",
          NIC: "nicaragua",
          SV: "el-salvador",
          SLV: "el-salvador",
          BZ: "belize",
          BLZ: "belize",
          JM: "jamaica",
          JAM: "jamaica",
          CU: "cuba",
          CUB: "cuba",
          DO: "dominican-republic",
          DOM: "dominican-republic",
          HT: "haiti",
          HTI: "haiti",
          TT: "trinidad-and-tobago",
          TTO: "trinidad-and-tobago",
          YE: "yemen",
          YEM: "yemen",
          KW: "kuwait",
          KWT: "kuwait",
          QA: "qatar",
          QAT: "qatar",
          BH: "bahrain",
          BHR: "bahrain",
          AM: "armenia",
          ARM: "armenia",
          GE: "georgia",
          GEO: "georgia",
          AZ: "azerbaijan",
          AZE: "azerbaijan",
          KG: "kyrgyzstan",
          KGZ: "kyrgyzstan",
          TJ: "tajikistan",
          TJK: "tajikistan",
          TM: "turkmenistan",
          TKM: "turkmenistan",
          BS: "bahamas",
          BHS: "bahamas",
          BB: "barbados",
          BRB: "barbados",
          GD: "grenada",
          GRD: "grenada",
          LC: "saint-lucia",
          LCA: "saint-lucia",
          VC: "saint-vincent-and-the-grenadines",
          VCT: "saint-vincent-and-the-grenadines",
          AG: "antigua-and-barbuda",
          ATG: "antigua-and-barbuda",
          DM: "dominica",
          DMA: "dominica",
          KN: "saint-kitts-and-nevis",
          KNA: "saint-kitts-and-nevis",
          WS: "samoa",
          WSM: "samoa",
          TO: "tonga",
          TON: "tonga",
          KI: "kiribati",
          KIR: "kiribati",
          FM: "micronesia",
          FSM: "micronesia",
          PW: "palau",
          PLW: "palau",
          MH: "marshall-islands",
          MHL: "marshall-islands",
          NR: "nauru",
          NRU: "nauru",
          TV: "tuvalu",
          TUV: "tuvalu",
          TL: "timor-leste",
          TLS: "timor-leste",
          BN: "brunei",
          BRN: "brunei",
          MU: "mauritius",
          MUS: "mauritius",
          SC: "seychelles",
          SYC: "seychelles",
          KM: "comoros",
          COM: "comoros",
          CV: "cape-verde",
          CPV: "cape-verde",
          ST: "sao-tome-and-principe",
          STP: "sao-tome-and-principe",
          GQ: "equatorial-guinea",
          GNQ: "equatorial-guinea",
          LS: "lesotho",
          LSO: "lesotho",
          SZ: "eswatini",
          SWZ: "eswatini",
          MG: "madagascar",
          MDG: "madagascar",
          CF: "central-african-republic",
          CAF: "central-african-republic",
          BT: "bhutan",
          BTN: "bhutan",
          MV: "maldives",
          MDV: "maldives",
          CY: "cyprus",
          CYP: "cyprus",
          MC: "monaco",
          MCO: "monaco",
          LI: "liechtenstein",
          LIE: "liechtenstein",
          SM: "san-marino",
          SMR: "san-marino",
          VA: "vatican-city",
          VAT: "vatican-city",
          KP: "north-korea",
          PRK: "north-korea",
          TW: "taiwan",
          TWN: "taiwan",
          PS: "palestine",
          PSE: "palestine",
        }
        countrySlug = codeMap[countryCode]
      }

      if (countrySlug) {
        router.push(`/map-${countrySlug}?userId=${currentUserId}`)
      }
    },
    [router, currentUserId],
  )

  const handleForward = () => {
    setShowShare(true)
    setForwarded(true)
  }

  const handleCloseShare = () => {
    setShowShare(false)
  }

  const handleSocialShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent("Check out this map on allnoos")

    let shareUrl = ""

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${text}%20${url}`
        break
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${url}&text=${text}`
        break
      case "reddit":
        shareUrl = `https://reddit.com/submit?url=${url}&title=${text}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
    setShowShare(false)
  }

  return (
    <>
      <style jsx global>{`
        html.map-page-active {
          transform: none !important;
          width: 100vw !important;
          height: 100vh !important;
          position: static !important;
          top: auto !important;
          left: auto !important;
          overflow: hidden !important;
        }
        
        html.map-page-active body {
          max-width: none !important;
          width: 100vw !important;
          height: 100vh !important;
          overflow: hidden !important;
        }
        
        html.map-page-active body > div {
          max-width: none !important;
        }
        
        @media screen and (orientation: portrait) {
          html.map-page-active .map-container {
            transform: rotate(90deg);
            transform-origin: center center;
            width: 100vh;
            height: 100vw;
            position: fixed;
            top: 50%;
            left: 50%;
            margin-left: -50vh;
            margin-top: -50vw;
          }
        }
      `}</style>

      <div className="map-container fixed inset-0 bg-stone-100 w-screen h-screen">
        {/* Close button */}
        <div className="absolute top-4 left-4 z-30">
          <button
            onClick={() => router.push("/user-profile")}
            className="text-stone-900 hover:text-stone-600 rounded-full hover:bg-white/50 transition-colors bg-white/80 backdrop-blur-sm shadow-lg p-2 m-2.5"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Forward button */}
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={handleForward}
            className="text-stone-900 hover:text-stone-600 p-2 rounded-full hover:bg-white/50 transition-colors bg-white/80 backdrop-blur-sm shadow-lg group m-2.5"
          >
            <svg
              className={`w-5 h-5 group-active:scale-110 transition-all duration-300 text-stone-600 ${
                forwarded
                  ? "text-yellow-400"
                  : "text-stone-900 group-hover:text-yellow-400 group-active:text-yellow-400"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ transform: "rotate(80deg)" }}
            >
              <path d="M7 17L17 7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11 7L17 7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 7L17 13" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 17L17 17" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-2 bg-white/80 backdrop-blur-sm">
          <div className="w-full h-full max-w-full max-h-full">
            <InteractiveWorldMap onCountryClick={handleCountryClick} activeCountries={activeCountries} />
          </div>
        </div>

        {/* Logo overlay */}
        <div className="absolute left-[15%] top-[64%] transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="relative flex items-center justify-center">
            <div className="absolute top-[-26px] left-[50%] transform translate-x-[10px] z-10 italic text-xs tracking-tighter my-[22px] mb-0 mt-[22px] mr-0 ml-[-8px]">
              <span className="text-stone-600 font-medium tracking-tighter text-xs mt-0 mr-0 mb-0 ml-[-20px]">
                {displayText}
              </span>
            </div>
            <div style={{ minWidth: "120px", minHeight: "32px" }}>
              <AllnoosLogo variant="default" size="md" />
            </div>
          </div>
        </div>

        {/* Share slide */}
        {showShare && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div className="absolute inset-0" onClick={handleCloseShare} />
            <div
              className="relative bg-background/95 backdrop-blur-sm border border-border shadow-2xl h-20 flex flex-row rounded-t-2xl"
              style={{
                borderBottomLeftRadius: "0",
                borderBottomRightRadius: "0",
                marginLeft: "auto",
                marginRight: "auto",
                width: "auto",
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`px-4 py-2 flex flex-row transition-all duration-800 ease-out ${
                  showShare ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-full"
                }`}
                style={{
                  transitionDelay: showShare ? "200ms" : "0ms",
                }}
              >
                <div className="flex flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => handleSocialShare("twitter")}
                    className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden flex items-center justify-center ${
                      showShare ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
                    }`}
                    style={{
                      transitionDelay: showShare ? "300ms" : "0ms",
                    }}
                  >
                    <svg
                      className="text-primary group-active:text-primary/80 relative z-10 size-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleSocialShare("facebook")}
                    className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden flex items-center justify-center ${
                      showShare ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
                    }`}
                    style={{
                      transitionDelay: showShare ? "400ms" : "0ms",
                    }}
                  >
                    <svg
                      className="text-blue-600 group-active:text-blue-600/80 relative z-10 size-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        className="size-7"
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleSocialShare("linkedin")}
                    className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden flex items-center justify-center ${
                      showShare ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
                    }`}
                    style={{
                      transitionDelay: showShare ? "500ms" : "0ms",
                    }}
                  >
                    <svg
                      className="text-blue-700 group-active:text-blue-700/80 relative z-10 size-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleSocialShare("whatsapp")}
                    className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden flex items-center justify-center ${
                      showShare ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
                    }`}
                    style={{
                      transitionDelay: showShare ? "600ms" : "0ms",
                    }}
                  >
                    <svg
                      className="text-green-600 group-active:text-green-600/80 relative z-10 size-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleSocialShare("telegram")}
                    className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/50 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden flex items-center justify-center ${
                      showShare ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
                    }`}
                    style={{
                      transitionDelay: showShare ? "700ms" : "0ms",
                    }}
                  >
                    <ShirtIcon className="group-active:text-blue-500/80 relative z-10 size-7 text-muted-foreground" />
                  </button>

                  <button
                    onClick={() => handleSocialShare("reddit")}
                    className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/50 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden flex items-center justify-center ${
                      showShare ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
                    }`}
                    style={{
                      transitionDelay: showShare ? "800ms" : "0ms",
                    }}
                  >
                    <svg
                      className="text-orange-600 group-active:text-orange-600/80 relative z-10 size-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534a1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .042-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
