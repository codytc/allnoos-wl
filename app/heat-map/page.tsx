"use client"

import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import AllnoosLogo from "@/components/allnoos-logo"
import InteractiveWorldMap from "@/components/interactive-world-map"
import { allPosts } from "@/lib/mock-data"

function calculateCountryEngagement() {
  const countryData: Record<string, { posts: number; engagement: number }> = {}

  allPosts.forEach((post) => {
    if (!post.location) return

    // Extract country from location (e.g., "New York, NY" -> "United States", "Oslo, Norway" -> "Norway")
    const country = post.location.includes(",") ? post.location.split(",").pop()?.trim() || "" : post.location.trim()

    // Map abbreviated country names to full names
    const countryMap: Record<string, string> = {
      NY: "United States",
      CA: "United States",
      MA: "United States",
      DC: "United States",
      IL: "United States",
      FL: "United States",
      WA: "United States",
      MI: "United States",
      TX: "United States",
    }

    const fullCountry = countryMap[country] || country

    if (!countryData[fullCountry]) {
      countryData[fullCountry] = { posts: 0, engagement: 0 }
    }

    countryData[fullCountry].posts += 1
    // Calculate engagement as weighted sum: likes + comments*2 + shares*3
    countryData[fullCountry].engagement += post.likes + post.comments * 2 + post.shares * 3
  })

  return countryData
}

function getColorForRank(rank: number): string {
  switch (rank) {
    case 1:
      return "#991B1B" // Red-800 (darker red) - highest posts
    case 2:
      return "#EF4444" // Red-500 (red) - second highest
    case 3:
      return "#FDB484" // Logo orange - third
    case 4:
      return "#F5E17C" // Lighter mustard yellow (was #E8C547) - fourth
    default:
      return "#D6D3D1" // Stone-300 (matches /map page) - countries with no posts
  }
}

export default function HeatMapPage() {
  const router = useRouter()
  const [showShare, setShowShare] = useState(false)

  const countryHeatData = useMemo(() => {
    const data = calculateCountryEngagement()

    const rankedCountries = Object.entries(data)
      .filter(([, stats]) => stats.posts > 0) // Only countries with at least one post
      .sort(([, a], [, b]) => b.engagement - a.engagement)
      .map(([country], index) => ({ country, rank: index + 1 }))

    const heatMap: Record<string, string> = {}

    // Assign colors based on rank (only for countries with posts)
    rankedCountries.forEach(({ country, rank }) => {
      heatMap[country] = getColorForRank(rank)
    })

    // Set default gray color for countries without data
    heatMap["__default__"] = "#D6D3D1" // Stone-300 gray for zero-post countries (matches /map page)

    return heatMap
  }, [])

  useEffect(() => {
    document.documentElement.classList.add("map-page-active")
    document.body.style.overflow = "hidden"

    return () => {
      document.documentElement.classList.remove("map-page-active")
      document.body.style.overflow = ""
    }
  }, [])

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

  const handleCountryClick = (countryName: string, countryCode: string) => {
    console.log("[v0] Country clicked:", countryName)
    router.push(`/feed?country=${encodeURIComponent(countryName)}`)
  }

  return (
    <>
      <div
        className="bg-stone-100"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          width: "100vh",
          height: "100vw",
          transformOrigin: "center center",
          transform: "translate(-50%, -50%) rotate(90deg)",
          overflow: "hidden",
          imageRendering: "crisp-edges",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          backfaceVisibility: "hidden",
          willChange: "transform",
        }}
      >
        {/* Close button */}
        <div className="absolute top-4 left-4 z-30">
          <button
            onClick={() => router.push("/wander")}
            className="rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] bg-white/20 border border-white/30 p-2"
          >
            <ChevronLeft className="size-6 text-stone-600" />
          </button>
        </div>

        {/* Forward button */}
        <div className="absolute top-4 right-4 z-30"></div>

        {/* Floating button at bottom right */}
        <div className="absolute bottom-4 right-4 z-30"></div>

        {/* Heat map key legend in bottom right corner */}
        {/* Heat map key legend removed - now integrated above logo */}

        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-2 bg-white/80 backdrop-blur-sm">
          <div className="w-full h-full max-w-full max-h-full -ml-16">
            <InteractiveWorldMap onCountryClick={handleCountryClick} countryHeatData={countryHeatData} />
          </div>
        </div>

        {/* Logo overlay */}
        <div
          className="absolute left-8 z-20 pointer-events-none"
          style={{
            top: "65%",
            imageRendering: "crisp-edges",
            WebkitFontSmoothing: "antialiased",
            transform: "translateY(-50%) translateZ(0)",
            backfaceVisibility: "hidden",
            willChange: "transform",
          }}
        >
          <div className="relative flex items-center justify-center ml-[-8px] h-12 px-8">
            <div className="absolute top-[2px] left-[50%] transform translate-x-[-8px] z-10 text-xs tracking-tighter my-[22px] mb-0 mt-0 mr-0 ml-[-8px]">
              <div className="flex flex-row items-center gap-0.5" style={{ willChange: "transform" }}>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#D6D3D1" }}></div>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#F5E17C" }}></div>{" "}
                {/* Lighter mustard yellow */}
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FDB484" }}></div>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#EF4444" }}></div>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#991B1B" }}></div>
              </div>
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
                    className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/50 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden flex items-center justify-center ${
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
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.792.372-.792.372-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                    </svg>
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
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498 .056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.520c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.563A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .042-.563.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
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
