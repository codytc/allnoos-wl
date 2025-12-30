"use client"

import type React from "react"
import { useMemo, useState, useRef } from "react"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AllnoosLogo } from "@/components/allnoos-logo"
import { Card } from "@/components/ui/card"
import { allPosts, userProfiles } from "@/lib/mock-data"
import { Search, MessageSquare, Award, TrendingUp, Sparkles } from "@/components/icons"

export default function VoyagerPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [geographicFilter, setGeographicFilter] = useState<"local" | "national" | "world">("local")
  const [touchedCategory, setTouchedCategory] = useState<string | null>(null)
  const [touchedFocus, setTouchedFocus] = useState<string | null>(null)
  const [selectedFocus, setSelectedFocus] = useState<string[]>([])
  const [touchedArticle, setTouchedArticle] = useState<number | null>(null)
  const [touchedJournalist, setTouchedJournalist] = useState<number | null>(null)
  const [touchedStory, setTouchedStory] = useState<number | null>(null)

  const channelsScrollRef = useRef<HTMLDivElement>(null)
  const mostWatchedScrollRef = useRef<HTMLDivElement>(null)
  const featuredScrollRef = useRef<HTMLDivElement>(null)
  const recentStoriesScrollRef = useRef<HTMLDivElement>(null)
  const isScrollingProgrammatically = useRef(false)
  const activeScrollContainer = useRef<string | null>(null)
  const scrollLockTimeout = useRef<NodeJS.Timeout | null>(null)
  const userInteracting = useRef(false)

  const mostCommentedPosts = [...allPosts].sort((a, b) => b.comments - a.comments).slice(0, 4)
  const mostLikedPosts = [...allPosts].sort((a, b) => b.likes - a.likes).slice(0, 4)
  const mostSharedPosts = [...allPosts].sort((a, b) => b.shares - a.shares).slice(0, 4)

  const allCategories = [
    [
      {
        name: "Local News",
        description: "Breaking stories from your neighborhood and community updates",
        bgImage: "/local-news-broadcast-studio-with-city-skyline.jpg",
      },
      {
        name: "Celebrity Gossip",
        description: "Latest buzz, red carpet moments, and exclusive celebrity interviews",
        bgImage: "/celebrity-red-carpet-paparazzi-glamorous-event.jpg",
      },
      {
        name: "Basketball",
        description: "Live games, player stats, and championship coverage",
        bgImage: "/basketball-game-slam-dunk-action-shot-arena.jpg",
      },
      {
        name: "Documentaries",
        description: "Award-winning films that explore untold stories and perspectives",
        bgImage: "/documentary-film-production-camera-crew-nature.jpg",
      },
      {
        name: "Tech Reviews",
        description: "In-depth gadget reviews, comparisons, and buying guides",
        bgImage: "/technology-gadgets-smartphones-laptops-review-setu.jpg",
      },
      {
        name: "Food & Cooking",
        description: "Recipes, cooking tips, and culinary adventures from around the world",
        bgImage: "/professional-chef-cooking-gourmet-food-kitchen.jpg",
      },
      {
        name: "Travel Adventures",
        description: "Hidden gems, travel tips, and destination guides for wanderers",
        bgImage: "/exotic-travel-destination-tropical-beach-paradise-.jpg",
      },
      {
        name: "True Crime",
        description: "Investigative journalism uncovering mysteries and cold cases",
        bgImage: "/detective-investigation-crime-scene-mystery-dark-m.jpg",
      },
      {
        name: "Comedy Central",
        description: "Stand-up specials, sketches, and laugh-out-loud moments",
        bgImage: "/comedy-club-stage-spotlight-microphone-audience-la.jpg",
      },
      {
        name: "Gaming",
        description: "Esports tournaments, game reviews, and streaming highlights",
        bgImage: "/esports-gaming-tournament-arena-colorful-lights-pl.jpg",
      },
    ],
    [
      {
        name: "Fashion & Style",
        description: "Runway shows, style trends, and fashion week coverage",
        bgImage: "/fashion-runway-models-designer-clothing-haute-cout.jpg",
      },
      {
        name: "Science & Nature",
        description: "Wildlife documentaries, scientific discoveries, and environmental stories",
        bgImage: "/wildlife-nature-animals-rainforest-ecosystem-beaut.jpg",
      },
      {
        name: "Business News",
        description: "Market analysis, startup stories, and economic insights",
        bgImage: "/business-meeting-corporate-office-stock-market-cha.jpg",
      },
      {
        name: "Music & Concerts",
        description: "Live performances, album reviews, and artist interviews",
        bgImage: "/music-concert-stage-lights-crowd-festival-performa.jpg",
      },
      {
        name: "Health & Fitness",
        description: "Workout routines, nutrition advice, and wellness tips",
        bgImage: "/fitness-gym-workout-training-healthy-lifestyle-ath.jpg",
      },
      {
        name: "Movie Reviews",
        description: "Film critiques, box office analysis, and cinema recommendations",
        bgImage: "/movie-theater-cinema-film-premiere.jpg",
      },
      {
        name: "DIY & Crafts",
        description: "Creative projects, home improvement, and handmade inspiration",
        bgImage: "/diy-crafts-workshop-tools-creative-projects.jpg",
      },
      {
        name: "Automotive",
        description: "Car reviews, racing coverage, and automotive industry news",
        bgImage: "/sports-car-racing-automotive-showroom.jpg",
      },
      {
        name: "Real Estate",
        description: "Property tours, market trends, and home buying advice",
        bgImage: "/luxury-home-real-estate-modern-house.jpg",
      },
      {
        name: "Parenting",
        description: "Family tips, child development, and parenting advice",
        bgImage: "/happy-family-parents-children-home.jpg",
      },
    ],
  ]

  const categoryRows = allCategories.slice(0, 2)

  const focusCategories = [
    {
      name: "Politics",
      bgImage: "/large-crowd-watching-political-debate-audience.jpg",
    },
    {
      name: "Technology",
      bgImage: "/technology-circuit-board-innovation.jpg",
    },
    {
      name: "Business",
      bgImage: "/business-meeting-boardroom.jpg",
    },
    {
      name: "Entertainment",
      bgImage: "/entertainment-red-carpet-event.jpg",
    },
    {
      name: "Sports",
      bgImage: "/sports-stadium-crowd-cheering.jpg",
    },
    {
      name: "Health",
      bgImage: "/health-medical-doctor-hospital.jpg",
    },
    {
      name: "Science",
      bgImage: "/science-laboratory-research-microscope.jpg",
    },
    {
      name: "Environment",
      bgImage: "/environment-nature-forest-conservation.jpg",
    },
    {
      name: "Education",
      bgImage: "/education-classroom-students-learning.jpg",
    },
    {
      name: "Travel",
      bgImage: "/travel-airplane-destination-adventure.jpg",
    },
    {
      name: "Food",
      bgImage: "/food-culinary-chef-cooking-kitchen.jpg",
    },
    {
      name: "Lifestyle",
      bgImage: "/lifestyle-wellness-yoga-meditation.jpg",
    },
  ]

  const geographicFocusCategories = [
    {
      name: "Local",
      bgImage: "/local-city-neighborhood-community-street.jpg",
    },
    {
      name: "National",
      bgImage: "/national-capitol-building-government-flag.jpg",
    },
    {
      name: "World",
      bgImage: "/world-globe-international-earth-continents.jpg",
    },
  ]

  const renderCategoryContent = (category: any) => {
    switch (category.type) {
      case "stat":
        return (
          <div className="flex items-center gap-2 rounded-lg px-2 py-1.5">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border border-primary/50 shadow-lg">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border border-primary/50 shadow-lg">
                {category.icon === "fire" ? (
                  <span className="text-lg drop-shadow-lg">🔥</span>
                ) : (
                  <TrendingUp className="w-4 h-4 text-white drop-shadow-lg" />
                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-white block leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                {category.content}
              </span>
            </div>
          </div>
        )
      case "quote":
        return (
          <div className="flex items-start gap-2 rounded-lg px-2 py-1.5">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 border-orange-400/60 overflow-hidden shadow-lg">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white text-xs font-bold drop-shadow-lg">
                  {category.author ? category.author.charAt(0) : "J"}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs italic text-white leading-tight mb-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                {category.content}
              </p>
              {category.author && (
                <p className="text-[10px] text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">— {category.author}</p>
              )}
            </div>
          </div>
        )
      case "chat":
        return (
          <div className="flex items-start gap-2 rounded-lg px-2 py-1.5">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 border-blue-400/50 shadow-lg">
              <MessageSquare className="w-4 h-4 text-white drop-shadow-lg" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                {category.content}
              </p>
            </div>
          </div>
        )
      case "award":
        return (
          <div className="flex items-center gap-2 rounded-lg px-2 py-1.5">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 border-yellow-400/60 shadow-lg">
              <Award className="w-4 h-4 text-white drop-shadow-lg" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold text-white block leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                {category.content}
              </span>
            </div>
          </div>
        )
      case "show":
        return (
          <div className="flex items-center gap-2 rounded-lg px-2 py-1.5">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 border-purple-400/50 relative shadow-lg">
              <Sparkles className="w-4 h-4 text-white drop-shadow-lg" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-lg" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-white block leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                {category.content}
              </span>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const featuredJournalists = [
    userProfiles.find((u) => u.id === 1)!,
    userProfiles.find((u) => u.id === 5)!,
    userProfiles.find((u) => u.id === 6)!,
  ].filter(Boolean)

  const getRelativeTime = (date: Date): string => {
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const getFullDateTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }
    return date.toLocaleString("en-US", options)
  }

  const recentStories = [...allPosts]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 3)
    .map((post) => ({
      id: post.id,
      title: post.title,
      author: post.author,
      thumbnail: post.thumbnail,
      views: `${Math.floor(post.views / 1000)}K`,
      timestamp: getFullDateTime(new Date(post.timestamp)),
      location: post.location || "Unknown",
      description: post.description,
    }))

  const handleTouchStart = (categoryName: string) => {
    setTouchedCategory(categoryName)
  }

  const handleTouchEnd = () => {
    setTouchedCategory(null)
  }

  const handleTouchCancel = () => {
    setTouchedCategory(null)
  }

  const handleFocusTouchStart = (focusName: string) => {
    setTouchedFocus(focusName)
  }

  const handleFocusTouchEnd = () => {
    setTouchedFocus(null)
  }

  const handleFocusTouchCancel = () => {
    setTouchedFocus(null)
  }

  const handleFocusClick = (focusName: string, e: React.MouseEvent) => {
    e.preventDefault()
    setSelectedFocus((prev) =>
      prev.includes(focusName) ? prev.filter((name) => name !== focusName) : [...prev, focusName],
    )
  }

  const handleArticleTouchStart = (articleId: number) => {
    setTouchedArticle(articleId)
  }

  const handleArticleTouchEnd = () => {
    setTouchedArticle(null)
  }

  const handleArticleTouchCancel = () => {
    setTouchedArticle(null)
  }

  const handleJournalistTouchStart = (journalistId: number) => {
    setTouchedJournalist(journalistId)
  }

  const handleJournalistTouchEnd = () => {
    setTouchedJournalist(null)
  }

  const handleJournalistTouchCancel = () => {
    setTouchedJournalist(null)
  }

  const handleStoryTouchStart = (storyId: number) => {
    setTouchedStory(storyId)
  }

  const handleStoryTouchEnd = () => {
    setTouchedStory(null)
  }

  const handleStoryTouchCancel = () => {
    setTouchedStory(null)
  }

  const journalistLeaderboard = useMemo(() => {
    // Count unique locations for each journalist
    const locationCounts = new Map<number, Set<string>>()

    allPosts.forEach((post) => {
      if (post.location) {
        if (!locationCounts.has(post.userId)) {
          locationCounts.set(post.userId, new Set())
        }
        locationCounts.get(post.userId)!.add(post.location)
      }
    })

    // Create leaderboard entries with journalist info and location count
    const leaderboard = userProfiles
      .map((profile) => ({
        ...profile,
        locationCount: locationCounts.get(profile.id)?.size || 0,
        locations: Array.from(locationCounts.get(profile.id) || []),
      }))
      .filter((entry) => entry.locationCount > 0) // Only include journalists with posts
      .sort((a, b) => b.locationCount - a.locationCount) // Sort by location count descending

    console.log(
      "[v0] Journalist leaderboard:",
      leaderboard.map((j) => ({ name: j.name, id: j.id })),
    )

    return leaderboard
  }, [])

  const handleBackClick = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      router.back()
    } else {
      // Fallback to /wander if no history
      router.push("/wander")
    }
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* SVG clipPath definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="headerCurveClipVoyager" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 1,0 L 1,0.75 C 0.861,0.81 0.639,0.81 0.5,0.75 C 0.361,0.69 0.139,0.69 0,0.75 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Header */}
      <div className="sticky top-0 z-50 bg-background" style={{ clipPath: "url(#headerCurveClipVoyager)" }}>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <button
                onClick={handleBackClick}
                className="rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] bg-white/20 border border-white/30 p-2.5"
              >
                <ChevronLeft className="size-5 text-stone-600" />
              </button>
            </div>
            <div className="flex justify-center">
              <Link href="/feed">
                <div className="relative flex items-center justify-center h-12 px-8">
                  <div className="absolute top-[-18px] left-[50%] transform translate-x-[-10px] z-10 italic text-xs tracking-tighter my-[22px] mb-0 mt-[22px] mr-0 ml-[-8px]">
                    <span className="ml-[-1px] mb-0 mt-0 font-medium tracking-tighter text-xs text-slate-600">
                      VOYAGER
                    </span>
                  </div>
                  <div style={{ minWidth: "120px", minHeight: "32px" }}>
                    <AllnoosLogo variant="default" size="md" onClick={() => {}} />
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex-1 flex justify-end">
              <Link href="/heat-map"></Link>
            </div>
          </div>
          <div className="flex justify-center mt-2 mb-2">
            <div className="flex items-center gap-3 font-medium text-base whitespace-nowrap px-4 text-slate-600">
              <button
                onClick={() => setGeographicFilter("local")}
                className={`transition-opacity ${geographicFilter === "local" ? "opacity-100" : "opacity-60"}`}
              >
                <span>Local</span>
              </button>
              <div className="w-px h-5 text-white bg-slate-600"></div>
              <button
                onClick={() => setGeographicFilter("national")}
                className={`transition-opacity ${geographicFilter === "national" ? "opacity-100" : "opacity-60"}`}
              >
                <span>National</span>
              </button>
              <div className="w-px h-5 bg-slate-600"></div>
              <button
                onClick={() => setGeographicFilter("world")}
                className={`transition-opacity ${geographicFilter === "world" ? "opacity-100" : "opacity-60"}`}
              >
                <span>World</span>
              </button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        <div className="w-full h-8 relative -mb-8 flex items-end z-30">
          <svg
            viewBox="0 0 1440 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-6"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="curvedLineGradientVoyager" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="15%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="85%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
            </defs>
            <path
              d="M 0,25 C 200,5 520,5 720,25 C 920,45 1240,45 1440,25"
              stroke="url(#curvedLineGradientVoyager)"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        <section className="w-full max-w-full">
          <div className="flex items-center gap-2 mb-4"></div>
          <div className="flex flex-col gap-4">
            {journalistLeaderboard.slice(0, 10).map((journalist, index) => {
              const isTouched = touchedJournalist === journalist.id
              const rankColors = ["text-yellow-600", "text-gray-400", "text-amber-700"]
              const rankColor = index < 3 ? rankColors[index] : "text-stone-500"

              console.log("[v0] Rendering journalist card:", {
                name: journalist.name,
                id: journalist.id,
                href: `/profile?userId=${journalist.id}`,
              })

              return (
                <Link key={journalist.id} href={`/profile?userId=${journalist.id}`}>
                  <Card
                    className={`shadow-none cursor-pointer transition-all duration-200 touch-manipulation group relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 border p-0 w-full flex flex-col ${
                      isTouched
                        ? "scale-[0.98] border-white/50"
                        : "hover:scale-[0.98] border-primary/20 hover:border-white/50"
                    }`}
                    onTouchStart={() => handleJournalistTouchStart(journalist.id)}
                    onTouchEnd={handleJournalistTouchEnd}
                    onTouchCancel={handleJournalistTouchCancel}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent transition-opacity duration-200 z-10 ${
                        isTouched ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                      }`}
                    />

                    <div
                      className={`absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-200 z-20 ${
                        isTouched ? "opacity-0 invisible" : "opacity-100 group-hover:opacity-0 group-hover:invisible"
                      }`}
                      style={{
                        boxShadow: "inset -2px -2px 6px rgba(0, 0, 0, 0.08), inset 1px 1px 4px rgba(0, 0, 0, 0.05)",
                      }}
                    />

                    <div
                      className={`absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-200 z-20 ${
                        isTouched ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                      style={{
                        boxShadow: "inset -4px -4px 12px rgba(0, 0, 0, 0.15), inset 2px 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    />

                    <div
                      className={`absolute inset-0 pointer-events-none transition-opacity duration-200 z-30 ${
                        isTouched ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <div
                        className="absolute top-2 left-2 w-16 h-16 rounded-full"
                        style={{
                          background: "transparent",
                          borderTop: "2px solid rgba(255,255,255,0.35)",
                          borderLeft: "2px solid rgba(255,255,255,0.35)",
                          borderRadius: "100%",
                          clipPath: "polygon(0 0, 100% 0, 100% 2px, 2px 2px, 2px 100%, 0 100%)",
                        }}
                      />
                      <div
                        className="absolute bottom-2 right-2 w-18 h-18 rounded-full"
                        style={{
                          background: "transparent",
                          borderBottom: "2.5px solid rgba(255,255,255,0.38)",
                          borderRight: "2.5px solid rgba(255,255,255,0.38)",
                          borderRadius: "100%",
                          clipPath:
                            "polygon(0 calc(100% - 2.5px), 100% calc(100% - 2.5px), 100% 100%, 0 100%, 0 calc(100% - 2.5px), calc(100% - 2.5px) calc(100% - 2.5px), calc(100% - 2.5px) 0, 100% 0, 100% 100%)",
                        }}
                      />
                    </div>

                    <div className="relative h-56 flex-shrink-0">
                      {/* Rank badge overlay on image */}
                      <div className="absolute top-4 left-4 z-20 w-16 h-16 flex items-center justify-center bg-background/90 backdrop-blur-sm rounded-full border border-primary/20 shadow-lg">
                        <div className={`text-3xl font-bold ${rankColor}`}>{index + 1}</div>
                      </div>

                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${journalist.avatar})`,
                          backgroundPosition: "center 20%",
                          backgroundSize: "140%",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% via-transparent via-60% to-background to-95%" />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>

                    <div className="px-5 pt-4 pb-2">
                      <h3 className="font-bold text-2xl text-foreground mb-1 tracking-tight leading-tight">
                        {journalist.name}
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium">{journalist.username}</p>
                    </div>

                    <div className="px-5 pb-5 flex flex-col gap-3">
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {journalist.description}
                      </p>
                      <div className="flex items-center gap-2 px-3 py-1 border border-primary/20 rounded-lg bg-background/90 backdrop-blur-sm shadow-sm self-end">
                        <span className="text-xs font-medium text-muted-foreground">{journalist.specialty}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-sm font-bold text-foreground">{journalist.locationCount}</span>
                        <span className="text-xs text-muted-foreground">
                          {journalist.locationCount === 1 ? "location" : "locations"}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
