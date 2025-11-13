"use client"

/**
 * Country Map Layout Component
 *
 * IMPORTANT RULES FOR ALL COUNTRY MAPS:
 *
 * 1. Maps must NOT overlap the logo (positioned at 15% left, 64% top)
 * 2. The entire country map must fit within the viewport (no parts cut off)
 * 3. Maps must expand to their maximum scale while obeying rules 1 and 2
 * 4. Maps must maintain 20px margins on all sides (enforced by p-5)
 * 5. Maps must stay proportional (no distortion)
 * 6. Maps must fill the available space - enlarge until reaching the 20px margin line
 *
 * The map container automatically scales children to fill available space while
 * maintaining aspect ratio. Individual map pages should set appropriate projection
 * scales to ensure maps are large enough to reach viewport edges.
 */

import type { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import AllnoosLogo from "@/components/allnoos-logo"
import { useState, useEffect, useMemo } from "react"
import { userProfiles, allPosts } from "@/lib/mock-data"

interface CountryMapLayoutProps {
  countryName: string
  userId: string | null
  children: ReactNode
}

export function CountryMapLayout({ countryName, userId, children }: CountryMapLayoutProps) {
  const router = useRouter()
  const [showShare, setShowShare] = useState(false)
  const [forwarded, setForwarded] = useState(false)

  const currentUserId = Number(userId) || 1

  const { displayText } = useMemo(() => {
    const userPosts = allPosts.filter((post) => post.userId === currentUserId)
    const currentUser = userProfiles.find((user) => user.id === currentUserId)

    const displayText = userPosts.length > 0 && currentUser ? currentUser.name.toUpperCase() : "DAY 1"

    return { displayText }
  }, [currentUserId])

  useEffect(() => {
    document.documentElement.classList.add("map-page-active")

    return () => {
      document.documentElement.classList.remove("map-page-active")
    }
  }, [])

  const handleBack = () => {
    router.push(`/map?userId=${userId}`)
  }

  const handleForward = () => {
    setShowShare(true)
    setForwarded(true)
  }

  const handleCloseShare = () => {
    setShowShare(false)
  }

  const handleSocialShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`Check out ${countryName} on allnoos`)

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
        {/* Back button */}
        <div className="absolute top-4 left-4 z-30">
          <button
            onClick={handleBack}
            className="text-stone-900 hover:text-stone-600 rounded-full hover:bg-white/50 transition-colors bg-white/80 backdrop-blur-sm shadow-lg p-2 m-2.5"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Forward/Share button */}
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

        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-white/80 backdrop-blur-sm z-10 p-5">
          <div className="w-full h-full flex items-center justify-center">{children}</div>
        </div>

        {/* Logo overlay with country name above - z-50 ensures it stays above maps */}
        <div className="absolute left-[15%] top-[64%] transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="relative flex items-center justify-center">
            <div className="absolute top-[-26px] left-[50%] transform translate-x-[10px] z-10 italic text-xs tracking-tighter my-[22px] mb-0 mt-[22px] mr-0 ml-[-8px]">
              <span className="text-stone-600 font-medium tracking-tighter text-xs mt-0 mr-0 mb-0 ml-[-20px]">
                {countryName.toUpperCase()}
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
                    <svg
                      className="text-blue-700 group-active:text-blue-700/80 relative z-10 size-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 .688-.562 1.249-1.25-1.249zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.173-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
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
                    <svg
                      className="text-blue-500 group-active:text-blue-500/80 relative z-10 size-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
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
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .688-.562 1.249-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .688-.562 1.249-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .688-.562 1.249-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249z" />
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

export default CountryMapLayout
