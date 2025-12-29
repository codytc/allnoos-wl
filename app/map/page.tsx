"use client"

import { ChevronLeft, ShirtIcon, Waves as Wave, Ban, Flag, CoinsIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
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
    document.body.style.overflow = "hidden"

    return () => {
      document.documentElement.classList.remove("map-page-active")
      document.body.style.overflow = ""
    }
  }, [])

  const { activeCountries, userPosts, currentUser } = useMemo(() => {
    const countries = new Set<string>()
    const userPosts = allPosts.filter((post) => post.userId === currentUserId)
    const currentUser = userProfiles.find((user) => user.id === currentUserId)

    console.log(`[v0] Map page loaded for user ${currentUserId}: ${currentUser?.name}`)
    console.log(`[v0] Found ${userPosts.length} posts for this user`)

    userPosts.forEach((post) => {
      console.log(`[v0] Post location: "${post.location}"`)
      if (post.location) {
        const parts = post.location.split(",")
        if (parts.length >= 2) {
          const country = parts[parts.length - 1].trim()
          console.log(`[v0] Extracted country: "${country}"`)
          countries.add(country)
        } else if (parts.length === 1) {
          console.log(`[v0] Single part location: "${parts[0].trim()}"`)
          countries.add(parts[0].trim())
        }
      }
    })

    console.log(`[v0] Active countries on map:`, Array.from(countries))

    return { activeCountries: Array.from(countries), userPosts, currentUser }
  }, [currentUserId])

  const displayText = userPosts.length > 0 && currentUser ? currentUser.name : "DAY 1"

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
        }}
      >
        {/* Close button */}
        <div className="absolute top-4 left-4 z-30">
          <button
            onClick={() => router.back()}
            className="rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] bg-white/20 border border-white/30 p-2"
          >
            <ChevronLeft className="text-stone-600 size-5" />
          </button>
        </div>

        {/* Forward button */}
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={handleForward}
            className="text-stone-900 hover:text-stone-600 p-2 rounded-full hover:bg-white/50 transition-colors bg-white/80 backdrop-blur-sm shadow-lg group m-2.5"
          >
            <svg
              className={`group-active:scale-110 transition-all duration-300 text-slate-600 size-5 ${
                forwarded
                  ? "text-yellow-400"
                  : "text-slate-600 group-hover:text-yellow-400 group-active:text-yellow-400"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ transform: "rotate(80deg)" }}
            >
              <path d="M7 17L17 7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11 7L17 7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 7L17 13" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 17L17 17" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Floating button at bottom right */}
        <div className="absolute bottom-4 right-4 z-30">
          <button
            onClick={() => {
              console.log("[v0] Floating button clicked - navigating to Voyager")
              router.push("/voyager")
            }}
            className="text-stone-900 hover:text-stone-600 p-2 rounded-full hover:bg-white/50 transition-colors bg-white/80 backdrop-blur-sm shadow-lg group m-2.5 active:scale-95"
          >
            <Wave className="w-5 h-5 group-hover:scale-110 group-active:scale-90 transition-all duration-300 text-slate-600" />
          </button>
        </div>

        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-2 bg-white/80 backdrop-blur-sm">
          <div className="w-full h-full max-w-full max-h-full -ml-16">
            <InteractiveWorldMap onCountryClick={undefined} activeCountries={activeCountries} />
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
            <div className="absolute top-[2px] left-[50%] transform translate-x-[-10px] z-10 text-xs tracking-tighter my-[22px] mb-0 mt-0 mr-0 ml-[-8px] italic max-w-[300px]">
              <span className="text-stone-600 ml-[-1px] mb-0 mt-0 font-medium tracking-tighter text-xs whitespace-nowrap overflow-visible text-ellipsis block">
                {displayText.toUpperCase()}
              </span>
            </div>
            <div style={{ minWidth: "120px", minHeight: "32px" }}>
              <AllnoosLogo variant="default" size="md" />
            </div>
          </div>
        </div>

        {/* Share slide */}
        {showShare && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center">
            <div className="absolute inset-0" onClick={handleCloseShare} />
            <div
              className="relative bg-background/95 backdrop-blur-sm border border-border shadow-2xl w-auto flex flex-row rounded-t-2xl"
              style={{
                borderBottomLeftRadius: "0",
                borderBottomRightRadius: "0",
                marginLeft: "auto",
                marginRight: "auto",
                height: "auto",
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
                paddingTop: "1rem",
                paddingBottom: "1rem",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`px-2 py-2 flex flex-row transition-all duration-800 ease-out ${
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
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
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
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
                    <svg
                      className="text-blue-600 group-active:text-blue-600/80 relative z-10 size-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
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
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
                    <svg
                      className="text-blue-700 group-active:text-blue-700/80 relative z-10 size-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.065 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>

                  {/* WhatsApp */}
                  <button
                    onClick={() => handleSocialShare("whatsapp")}
                    className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden flex items-center justify-center ${
                      showShare ? "scale-100" : "scale-0"
                    }`}
                    style={{
                      transitionDelay: showShare ? "150ms" : "0ms",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
                    <svg
                      className="text-green-600 group-active:text-green-600/80 relative z-10 size-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.16 12.04a7.94 7.94 0 01-5.68 2.66c-.65.37-1.32.64-2.01.82-.69.18-1.4.28-2.12.28-.82 0-1.53-.1-2.15-.29-.69-.18-1.36-.45-1.96-.83a7.94 7.94 0 01-5.68-2.66 7.937 7.937 0 010-5.68 7.94 7.94 0 015.68-2.66c.65-.37 1.32-.64 2.01-.82.69-.18 1.4-.28 2.12-.28.72 0 1.43.1 2.05.29.69.18 1.36.45 1.96.83a7.94 7.94 0 015.68 2.66 7.937 7.937 0 010 5.68zm-8.07.51l.99 3.64 3.74-1.01-.36-.21a9.86 9.86 0 00-4.54 1.378v-8.385zm-11.89 4.59A11.82 11.82 0 0012.05 0c6.55 0 11.89 5.335 11.89 11.892 0 2.096-.547 4.142-1.588 5.945L23.943 24H7.774l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                    </svg>
                  </button>

                  <div className="w-px h-8 bg-border mx-1 rounded-full"></div>

                  <button
                    className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/50 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden flex items-center justify-center ${
                      showShare ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
                    }`}
                    style={{
                      transitionDelay: showShare ? "700ms" : "0ms",
                    }}
                    onClick={handleCloseShare}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
                    <Ban className="text-red-500 group-active:text-red-500/80 relative z-10 size-[30px]" />
                  </button>

                  <button
                    className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/50 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden flex items-center justify-center ${
                      showShare ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
                    }`}
                    style={{
                      transitionDelay: showShare ? "800ms" : "0ms",
                    }}
                    onClick={handleCloseShare}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
                    <Flag className="text-red-500 group-active:text-red-500/80 relative z-10 size-[30px]" />
                  </button>

                  <div className="w-px h-8 bg-border mx-1 rounded-full"></div>

                  <button
                    className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/50 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden flex items-center justify-center ${
                      showShare ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
                    }`}
                    style={{
                      transitionDelay: showShare ? "900ms" : "0ms",
                    }}
                    onClick={handleCloseShare}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
                    <ShirtIcon className="group-active:text-white/80 relative z-10 size-[24px] text-sidebar-primary" />
                  </button>

                  <button
                    className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/50 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden flex items-center justify-center ${
                      showShare ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
                    }`}
                    style={{
                      transitionDelay: showShare ? "1000ms" : "0ms",
                    }}
                    onClick={handleCloseShare}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
                    <CoinsIcon className="group-active:text-white/80 relative z-10 size-[24px] text-chart-4" />
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
