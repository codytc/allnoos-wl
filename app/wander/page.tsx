"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  Search,
  ArrowLeft,
  MessageSquare,
  Award,
  TrendingUp,
  Sparkles,
  Plus,
  RotateCcw,
  Compass, // Changed from Wave to Compass
} from "@/components/icons"
import Link from "next/link"
import { AllnoosLogo } from "@/components/allnoos-logo"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { allPosts, userProfiles } from "@/lib/mock-data"

export default function WanderPage() {
  useEffect(() => {
    console.log("[v0] Discover page mounted successfully")
    console.log("[v0] All sections should now have consistent widths")
  }, [])

  const [searchQuery, setSearchQuery] = useState("")
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

  useEffect(() => {
    const containers = [
      { ref: channelsScrollRef, name: "channels" },
      { ref: mostWatchedScrollRef, name: "mostWatched" },
      { ref: featuredScrollRef, name: "featured" },
      { ref: recentStoriesScrollRef, name: "recentStories" },
    ]

    const handleScroll = (scrollingContainer: string) => {
      // Prevent handling if already scrolling programmatically or if another container is active
      if (isScrollingProgrammatically.current) return
      if (activeScrollContainer.current && activeScrollContainer.current !== scrollingContainer) return

      const scrollingRef = containers.find((c) => c.name === scrollingContainer)?.ref
      if (!scrollingRef?.current) return

      // Set this container as the active one
      activeScrollContainer.current = scrollingContainer

      // Clear any existing timeout
      if (scrollLockTimeout.current) {
        clearTimeout(scrollLockTimeout.current)
      }

      // Release the lock after scrolling stops (300ms of no scroll events)
      scrollLockTimeout.current = setTimeout(() => {
        if (!userInteracting.current) {
          activeScrollContainer.current = null
        }
      }, 300)
    }

    // Add touch/mouse event listeners to detect user interaction
    const handleInteractionStart = () => {
      userInteracting.current = true
    }

    const handleInteractionEnd = () => {
      userInteracting.current = false
      // Release lock after a short delay
      setTimeout(() => {
        if (!userInteracting.current) {
          activeScrollContainer.current = null
        }
      }, 300)
    }

    // Add scroll listeners to all containers
    const listeners: Array<{ element: HTMLDivElement; handler: () => void }> = []
    const interactionListeners: Array<{
      element: HTMLDivElement
      startHandler: () => void
      endHandler: () => void
    }> = []

    containers.forEach((container) => {
      if (container.ref.current) {
        const scrollHandler = () => handleScroll(container.name)
        container.ref.current.addEventListener("scroll", scrollHandler, { passive: true })
        listeners.push({ element: container.ref.current, handler: scrollHandler })

        // Add touch and mouse event listeners
        container.ref.current.addEventListener("touchstart", handleInteractionStart, { passive: true })
        container.ref.current.addEventListener("touchend", handleInteractionEnd, { passive: true })
        container.ref.current.addEventListener("mousedown", handleInteractionStart, { passive: true })
        container.ref.current.addEventListener("mouseup", handleInteractionEnd, { passive: true })

        interactionListeners.push({
          element: container.ref.current,
          startHandler: handleInteractionStart,
          endHandler: handleInteractionEnd,
        })
      }
    })

    // Cleanup
    return () => {
      listeners.forEach(({ element, handler }) => {
        element.removeEventListener("scroll", handler)
      })
      interactionListeners.forEach(({ element, startHandler, endHandler }) => {
        element.removeEventListener("touchstart", startHandler)
        element.removeEventListener("touchend", endHandler)
        element.removeEventListener("mousedown", startHandler)
        element.removeEventListener("mouseup", endHandler)
      })
      if (scrollLockTimeout.current) {
        clearTimeout(scrollLockTimeout.current)
      }
    }
  }, [])

  const allCategories = [
    // Row 1 - Diverse content themes
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
    // Row 2 - More diverse content themes
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
    userProfiles.find((u) => u.id === 1)!, // Sarah Chen
    userProfiles.find((u) => u.id === 5)!, // Marcus Thompson (Tech Journalist)
    userProfiles.find((u) => u.id === 6)!, // Dr. Emily Watson
  ].filter(Boolean)

  useEffect(() => {
    console.log(
      "[v0] Featured Journalists:",
      featuredJournalists.map((j) => ({ name: j.name, id: j.id })),
    )
  }, [])

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

  return (
    <div className="min-h-screen bg-background pb-16">
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="headerCurveClipWander" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 1,0 L 1,0.898 C 0.861,0.960 0.639,0.960 0.5,0.898 C 0.361,0.831 0.139,0.831 0,0.898 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Header */}
      <div className="sticky top-0 z-50 bg-background" style={{ clipPath: "url(#headerCurveClipWander)" }}>
        <div className="p-4 pb-2">
          <div className="flex justify-between items-center mb-2.5">
            <div className="flex-1">
              <Link href="/feed">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
                  <ArrowLeft className="w-5 h-5 text-slate-600 group-active:text-slate-600/80 relative z-10" />
                </button>
              </Link>
            </div>
            <div className="flex justify-center">
              <Link href="/feed">
                <div className="relative flex items-center justify-center h-12 px-8">
                  <div className="absolute top-[-18px] left-[50%] transform translate-x-[-10px] z-10 italic text-xs tracking-tighter my-[22px] mb-0 mt-[22px] mr-0 ml-[-8px]">
                    <span className="ml-[-1px] mb-0 mt-0 font-medium tracking-tighter text-xs text-slate-600">
                      WANDER
                    </span>
                  </div>
                  <div style={{ minWidth: "120px", minHeight: "32px" }}>
                    <AllnoosLogo variant="default" size="md" onClick={() => {}} />
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex-1 flex justify-end">
              <Link href="/heat-map">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
                  <Compass className="w-5 h-5 text-slate-600 group-active:text-slate-600/80 relative z-10" />
                </button>
              </Link>
            </div>
          </div>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Not allnoos who wander are lost..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus:border-input focus-visible:border-input focus:shadow-[inset_0_0_16px_rgba(253,180,132,0.35)] rounded-lg"
            />
          </div>
        </div>
        <div className="w-full h-8 relative -mb-6">
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="curvedLineGradientWander" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
            </defs>
            <path
              d="M 0,50 C 200,25 520,25 720,50 C 920,80 1240,80 1440,50"
              stroke="url(#curvedLineGradientWander)"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-4 space-y-6 -mt-6 pt-4">
        {/* Focus Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Focus</h2>
            {selectedFocus.length > 0 && (
              <button
                onClick={() => setSelectedFocus([])}
                className="text-muted-foreground hover:text-foreground active:text-foreground/60 transition-colors duration-200 cursor-pointer p-1"
                aria-label="Reset focus selections"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="space-y-2 pb-1">
            <div className="flex gap-2">
              {geographicFocusCategories.map((focusCategory) => {
                const isTouched = touchedFocus === focusCategory.name
                const isSelected = selectedFocus.includes(focusCategory.name)

                return (
                  <div
                    key={focusCategory.name}
                    className="flex-1"
                    onClick={(e) => handleFocusClick(focusCategory.name, e)}
                  >
                    <div
                      className={`group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 touch-manipulation h-full ${
                        isSelected
                          ? // Updated to gray glass effect instead of cyan
                            "scale-[0.98] border-2 border-gray-400/40 shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                          : isTouched
                            ? "scale-[0.98] border-white/50"
                            : "hover:scale-[0.98] border-primary/20 hover:border-white/50"
                      }`}
                      onTouchStart={() => handleFocusTouchStart(focusCategory.name)}
                      onTouchEnd={handleFocusTouchEnd}
                      onTouchCancel={handleFocusTouchCancel}
                    >
                      {/* Background Image - more visible when selected */}
                      <div
                        className={`absolute inset-0 bg-cover bg-center brightness-110 contrast-110 saturate-110 z-0 transition-opacity duration-300 ${
                          isSelected ? "opacity-20" : "opacity-10"
                        }`}
                        style={{ backgroundImage: `url(${focusCategory.bgImage})` }}
                      />

                      <div
                        className={`absolute inset-0 z-5 transition-all duration-300 ${
                          isSelected ? "backdrop-blur-2xl bg-gray-500/15" : "backdrop-blur-md bg-white/70"
                        }`}
                      />

                      <div
                        className={`absolute inset-0 border z-10 transition-all duration-300 ${
                          isSelected ? "bg-white/5 border-gray-300/30" : "bg-white/10 border-gray-300/40"
                        }`}
                      />

                      <div
                        className={`absolute inset-0 bg-gradient-to-br via-transparent to-transparent z-10 transition-all duration-300 ${
                          isSelected ? "from-gray-400/10 opacity-50" : "from-primary/10 opacity-70"
                        }`}
                      />

                      <div
                        className={`absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-200 z-20 ${
                          isSelected || isTouched
                            ? "opacity-0 invisible"
                            : "opacity-100 group-hover:opacity-0 group-hover:invisible"
                        }`}
                        style={{
                          boxShadow: "inset -2px -2px 6px rgba(0, 0, 0, 0.08), inset 1px 1px 4px rgba(0, 0, 0, 0.05)",
                        }}
                      />

                      <div
                        className={`absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-200 z-20 ${
                          isTouched && !isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}
                        style={{
                          boxShadow: "inset -4px -4px 12px rgba(0, 0, 0, 0.15), inset 2px 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      />

                      <div className="relative h-full px-4 py-2 flex items-center justify-center z-40">
                        <div
                          className={`leading-tight text-center font-normal text-base transition-all duration-300 ${
                            isSelected
                              ? "drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)] text-foreground font-semibold"
                              : "drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] text-muted-foreground"
                          }`}
                        >
                          {focusCategory.name}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="overflow-x-auto overflow-y-hidden -mx-4 px-4 scrollbar-hide">
              <div className="flex gap-2 min-w-max">
                {focusCategories.map((focusCategory) => {
                  const isTouched = touchedFocus === focusCategory.name
                  const isSelected = selectedFocus.includes(focusCategory.name)

                  return (
                    <div key={focusCategory.name} onClick={(e) => handleFocusClick(focusCategory.name, e)}>
                      <div
                        className={`group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 touch-manipulation ${
                          isSelected
                            ? // Updated to gray glass effect instead of cyan
                              "scale-[0.98] border-2 border-gray-400/40 shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                            : isTouched
                              ? "scale-[0.98] border-white/50"
                              : "hover:scale-[0.98] border-primary/20 hover:border-white/50"
                        }`}
                        onTouchStart={() => handleFocusTouchStart(focusCategory.name)}
                        onTouchEnd={handleFocusTouchEnd}
                        onTouchCancel={handleFocusTouchCancel}
                      >
                        {/* Background Image - more visible when selected */}
                        <div
                          className={`absolute inset-0 bg-cover bg-center brightness-110 contrast-110 saturate-110 z-0 transition-opacity duration-300 ${
                            isSelected ? "opacity-20" : "opacity-10"
                          }`}
                          style={{ backgroundImage: `url(${focusCategory.bgImage})` }}
                        />

                        <div
                          className={`absolute inset-0 z-5 transition-all duration-300 ${
                            isSelected ? "backdrop-blur-2xl bg-gray-500/15" : "backdrop-blur-md bg-white/70"
                          }`}
                        />

                        <div
                          className={`absolute inset-0 border z-10 transition-all duration-300 ${
                            isSelected ? "bg-white/5 border-gray-300/30" : "bg-white/10 border-gray-300/40"
                          }`}
                        />

                        <div
                          className={`absolute inset-0 bg-gradient-to-br via-transparent to-transparent z-10 transition-all duration-300 ${
                            isSelected ? "from-gray-400/10 opacity-50" : "from-primary/10 opacity-70"
                          }`}
                        />

                        <div
                          className={`absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-200 z-20 ${
                            isSelected || isTouched
                              ? "opacity-0 invisible"
                              : "opacity-100 group-hover:opacity-0 group-hover:invisible"
                          }`}
                          style={{
                            boxShadow: "inset -2px -2px 6px rgba(0, 0, 0, 0.08), inset 1px 1px 4px rgba(0, 0, 0, 0.05)",
                          }}
                        />

                        <div
                          className={`absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-200 z-20 ${
                            isTouched && !isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          }`}
                          style={{
                            boxShadow: "inset -4px -4px 12px rgba(0, 0, 0, 0.15), inset 2px 2px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        />

                        <div className="relative h-full px-4 py-2 flex items-center justify-center z-40">
                          <div
                            className={`leading-tight text-center font-normal text-base transition-all duration-300 ${
                              isSelected
                                ? "drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)] text-foreground font-semibold"
                                : "drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] text-muted-foreground"
                            }`}
                          >
                            {focusCategory.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Channels Section - Brick Wall Layout */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Channels</h2>
            <Link href="/create-channel">
              <Plus className="w-6 h-6 text-primary hover:text-primary/80 active:text-primary/60 cursor-pointer transition-colors duration-200" />
            </Link>
          </div>
          <div ref={channelsScrollRef} className="overflow-x-auto overflow-y-hidden -mx-4 px-4 scrollbar-hide">
            <div className="space-y-2 min-w-max pb-1">
              {categoryRows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2">
                  {row.map((category) => {
                    const isTouched = touchedCategory === category.name

                    return (
                      <Link key={category.name} href="/feed">
                        <div
                          className={`group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-200 touch-manipulation ${
                            isTouched
                              ? "scale-[0.98] border-white/50"
                              : "hover:scale-[0.98] border-primary/20 hover:border-white/50"
                          }`}
                          onTouchStart={() => handleTouchStart(category.name)}
                          onTouchEnd={handleTouchEnd}
                          onTouchCancel={handleTouchCancel}
                        >
                          {/* Background Image */}
                          <div
                            className="absolute inset-0 bg-cover bg-center brightness-110 contrast-110 saturate-110 z-0"
                            style={{ backgroundImage: `url(${category.bgImage})` }}
                          />

                          {/* Dark overlay - lightens on hover/touch */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br transition-all duration-200 z-10 ${
                              isTouched
                                ? "from-black/20 via-black/10 to-transparent"
                                : "from-black/30 via-black/20 to-transparent group-hover:from-black/20 group-hover:via-black/10 group-hover:to-transparent"
                            }`}
                          />

                          {/* Border and subtle background - enhances on hover/touch */}
                          <div
                            className={`absolute inset-0 bg-white/5 transition-all duration-200 z-10 ${
                              isTouched
                                ? "border border-white/50"
                                : "border border-white/30 group-hover:border-white/50"
                            }`}
                          />

                          {/* Primary color overlay - increases on hover/touch */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent transition-opacity duration-200 z-10 ${
                              isTouched ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                            }`}
                          />

                          <div
                            className={`absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-200 z-20 ${
                              isTouched
                                ? "opacity-0 invisible"
                                : "opacity-100 group-hover:opacity-0 group-hover:invisible"
                            }`}
                            style={{
                              boxShadow:
                                "inset -2px -2px 6px rgba(0, 0, 0, 0.12), inset 1px 1px 4px rgba(0, 0, 0, 0.08)",
                            }}
                          />

                          {/* Shadow overlay - appears on hover/touch */}
                          <div
                            className={`absolute inset-0 pointer-events-none transition-opacity duration-200 z-20 ${
                              isTouched ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`}
                            style={{
                              boxShadow:
                                "inset -4px -4px 12px rgba(0, 0, 0, 0.3), inset 2px 2px 8px rgba(0, 0, 0, 0.15)",
                            }}
                          />

                          <div
                            className={`absolute inset-0 pointer-events-none transition-opacity duration-200 z-30 ${
                              isTouched ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`}
                          >
                            {/* Top-left corner - curved with strong pressure */}
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
                              className="absolute top-4 left-4 w-10 h-10 rounded-full"
                              style={{
                                background: "transparent",
                                borderTop: "1px solid rgba(255,255,255,0.22)",
                                borderLeft: "1px solid rgba(255,255,255,0.22)",
                                borderRadius: "100%",
                                clipPath: "polygon(0 0, 100% 0, 100% 1px, 1px 1px, 1px 100%, 0 100%)",
                              }}
                            />

                            {/* Top-right corner - curved with minimal pressure */}
                            <div
                              className="absolute top-3 right-2 w-12 h-12 rounded-full"
                              style={{
                                background: "transparent",
                                borderTop: "1px solid rgba(255,255,255,0.24)",
                                borderRight: "1px solid rgba(255,255,255,0.24)",
                                borderRadius: "100%",
                                clipPath:
                                  "polygon(0 0, 100% 0, 100% 100%, calc(100% - 1px) 100%, calc(100% - 1px) 1px, 0 1px)",
                              }}
                            />

                            {/* Bottom-left corner - curved with medium pressure */}
                            <div
                              className="absolute bottom-2 left-2 w-14 h-14 rounded-full"
                              style={{
                                background: "transparent",
                                borderBottom: "1.5px solid rgba(255,255,255,0.28)",
                                borderLeft: "1.5px solid rgba(255,255,255,0.28)",
                                borderRadius: "100%",
                                clipPath:
                                  "polygon(0 0, 1.5px 0, 1.5px calc(100% - 1.5px), 100% calc(100% - 1.5px), 100% 100%, 0 100%)",
                              }}
                            />

                            {/* Bottom-right corner - curved with strong pressure */}
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
                            <div
                              className="absolute bottom-4 right-4 w-12 h-12 rounded-full"
                              style={{
                                background: "transparent",
                                borderBottom: "1.5px solid rgba(255,255,255,0.26)",
                                borderRight: "1.5px solid rgba(255,255,255,0.26)",
                                borderRadius: "100%",
                                clipPath:
                                  "polygon(0 calc(100% - 1.5px), 100% calc(100% - 1.5px), 100% 100%, 0 100%, 0 calc(100% - 1.5px), calc(100% - 1.5px) calc(100% - 1.5px), calc(100% - 1.5px) 0, 100% 0, 100% 100%)",
                              }}
                            />

                            {/* Random edge segments with varying tapers and curves */}
                            <div
                              className="absolute top-2 left-[28%] w-9 h-[0.5px] rounded-full transform rotate-1"
                              style={{
                                background:
                                  "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 20%, rgba(255,255,255,0.24) 35%, rgba(255,255,255,0.18) 55%, rgba(255,255,255,0.22) 70%, rgba(255,255,255,0) 85%, rgba(255,255,255,0) 100%)",
                              }}
                            />
                            <div
                              className="absolute top-[35%] right-2 w-[1px] h-18 rounded-full transform -rotate-1"
                              style={{
                                background:
                                  "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 15%, rgba(255,255,255,0.28) 30%, rgba(255,255,255,0.20) 50%, rgba(255,255,255,0.24) 70%, rgba(255,255,255,0) 85%, rgba(255,255,255,0) 100%)",
                              }}
                            />
                            <div
                              className="absolute bottom-3 right-[38%] w-13 h-[1px] rounded-full transform rotate-2"
                              style={{
                                background:
                                  "linear-gradient(to left, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 20%, rgba(255,255,255,0.32) 35%, rgba(255,255,255,0.24) 55%, rgba(255,255,255,0.28) 70%, rgba(255,255,255,0) 85%, rgba(255,255,255,0) 100%)",
                              }}
                            />
                            <div
                              className="absolute top-[52%] left-2 w-[1px] h-11 rounded-full"
                              style={{
                                background:
                                  "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 20%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.14) 65%, rgba(255,255,255,0) 100%)",
                              }}
                            />
                            <div
                              className="absolute top-4 left-[65%] w-7 h-[0.5px] rounded-full transform -rotate-3"
                              style={{
                                background:
                                  "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.21) 25%, rgba(255,255,255,0.16) 50%, rgba(255,255,255,0.12) 70%, rgba(255,255,255,0) 100%)",
                              }}
                            />
                          </div>

                          <div className="relative h-full px-4 py-3 flex flex-col justify-center z-40 min-h-[100px]">
                            <div className="text-white font-bold text-base mb-1.5 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                              {category.name}
                            </div>
                            <div className="text-white/90 text-xs leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                              {category.description}
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Journalists */}
        <section className="w-full max-w-full">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold">Featured</h2>
          </div>
          <div
            ref={featuredScrollRef}
            className="overflow-x-auto overflow-y-hidden -mx-4 px-4 scrollbar-hide w-full max-w-full"
          >
            <div className="flex gap-3 pb-2">
              {featuredJournalists.map((journalist) => {
                const isTouched = touchedJournalist === journalist.id

                console.log(
                  "[v0] Rendering journalist card:",
                  journalist.name,
                  "with ID:",
                  journalist.id,
                  "href:",
                  `/profile?userId=${journalist.id}`,
                )

                return (
                  <Link key={journalist.id} href={`/profile?userId=${journalist.id}`}>
                    <Card
                      className={`shadow-none cursor-pointer transition-all duration-200 touch-manipulation group relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 border p-0 w-[320px] flex-shrink-0 flex flex-col ${
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
                        <div className="absolute top-4 left-4 z-10 right-4">
                          <h3 className="font-bold text-2xl text-white mb-1 tracking-tight leading-tight drop-shadow-lg">
                            {journalist.name}
                          </h3>
                          <p className="text-sm text-white/90 font-medium drop-shadow-md">{journalist.username}</p>
                        </div>
                      </div>
                      <div className="p-5 pt-4 flex flex-col gap-3">
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {journalist.description}
                        </p>
                        <div className="flex items-center gap-2 px-3 py-1 border border-primary/20 rounded-lg bg-background/90 backdrop-blur-sm shadow-sm self-end">
                          <span className="text-xs font-medium text-muted-foreground">{journalist.specialty}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs font-medium text-muted-foreground">
                            {journalist.followers} followers
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Most Comments: What people are talking about */}
        <section className="w-full max-w-full">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold">Most Comments: What people are talking about</h2>
          </div>
          <div
            ref={mostWatchedScrollRef}
            className="overflow-x-auto overflow-y-hidden -mx-4 px-4 scrollbar-hide w-full max-w-full"
          >
            <div className="flex gap-3 pb-2">
              {mostCommentedPosts.map((article) => {
                const isTouched = touchedArticle === article.id

                return (
                  <Link key={article.id} href={`/feed?story=${article.id}`}>
                    <Card
                      className={`shadow-none cursor-pointer transition-all duration-200 touch-manipulation group relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 border p-0 w-[320px] flex-shrink-0 flex flex-col ${
                        isTouched
                          ? "scale-[0.98] border-white/50"
                          : "hover:scale-[0.98] border-primary/20 hover:border-white/50"
                      }`}
                      onTouchStart={() => handleArticleTouchStart(article.id)}
                      onTouchEnd={handleArticleTouchEnd}
                      onTouchCancel={handleArticleTouchCancel}
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
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${article.thumbnail})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% via-transparent via-60% to-background to-95%" />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <div className="absolute top-4 left-4 right-4 z-10">
                          <h3 className="font-bold text-xl text-white mb-1 tracking-tight leading-tight drop-shadow-lg line-clamp-2">
                            {article.title}
                          </h3>
                        </div>
                      </div>
                      <div className="p-5 pt-4 flex flex-col gap-3">
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {article.description}
                        </p>
                        <div className="flex items-center gap-2 px-3 py-1 border border-primary/20 rounded-lg bg-background/90 backdrop-blur-sm shadow-sm self-end">
                          <span className="text-xs font-medium text-muted-foreground">{article.author}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs font-medium text-muted-foreground">
                            {article.comments.toLocaleString()} Comments
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Most Liked: The good stuff */}
        <section className="w-full max-w-full">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold">Most Liked: The good stuff</h2>
          </div>
          <div
            ref={mostWatchedScrollRef}
            className="overflow-x-auto overflow-y-hidden -mx-4 px-4 scrollbar-hide w-full max-w-full"
          >
            <div className="flex gap-3 pb-2">
              {mostLikedPosts.map((article) => {
                const isTouched = touchedArticle === article.id

                return (
                  <Link key={article.id} href={`/feed?story=${article.id}`}>
                    <Card
                      className={`shadow-none cursor-pointer transition-all duration-200 touch-manipulation group relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 border p-0 w-[320px] flex-shrink-0 flex flex-col ${
                        isTouched
                          ? "scale-[0.98] border-white/50"
                          : "hover:scale-[0.98] border-primary/20 hover:border-white/50"
                      }`}
                      onTouchStart={() => handleArticleTouchStart(article.id)}
                      onTouchEnd={handleArticleTouchEnd}
                      onTouchCancel={handleArticleTouchCancel}
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
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${article.thumbnail})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% via-transparent via-60% to-background to-95%" />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <div className="absolute top-4 left-4 right-4 z-10">
                          <h3 className="font-bold text-xl text-white mb-1 tracking-tight leading-tight drop-shadow-lg line-clamp-2">
                            {article.title}
                          </h3>
                        </div>
                      </div>
                      <div className="p-5 pt-4 flex flex-col gap-3">
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {article.description}
                        </p>
                        <div className="flex items-center gap-2 px-3 py-1 border border-primary/20 rounded-lg bg-background/90 backdrop-blur-sm shadow-sm self-end">
                          <span className="text-xs font-medium text-muted-foreground">{article.author}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs font-medium text-muted-foreground">
                            {article.likes.toLocaleString()} Likes
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Most shared: Share the news! */}
        <section className="w-full max-w-full">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold">Most shared: Share the news!</h2>
          </div>
          <div
            ref={mostWatchedScrollRef}
            className="overflow-x-auto overflow-y-hidden -mx-4 px-4 scrollbar-hide w-full max-w-full"
          >
            <div className="flex gap-3 pb-2">
              {mostSharedPosts.map((article) => {
                const isTouched = touchedArticle === article.id

                return (
                  <Link key={article.id} href={`/feed?story=${article.id}`}>
                    <Card
                      className={`shadow-none cursor-pointer transition-all duration-200 touch-manipulation group relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 border p-0 w-[320px] flex-shrink-0 flex flex-col ${
                        isTouched
                          ? "scale-[0.98] border-white/50"
                          : "hover:scale-[0.98] border-primary/20 hover:border-white/50"
                      }`}
                      onTouchStart={() => handleArticleTouchStart(article.id)}
                      onTouchEnd={handleArticleTouchEnd}
                      onTouchCancel={handleArticleTouchCancel}
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
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${article.thumbnail})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% via-transparent via-60% to-background to-95%" />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <div className="absolute top-4 left-4 right-4 z-10">
                          <h3 className="font-bold text-xl text-white mb-1 tracking-tight leading-tight drop-shadow-lg line-clamp-2">
                            {article.title}
                          </h3>
                        </div>
                      </div>
                      <div className="p-5 pt-4 flex flex-col gap-3">
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {article.description}
                        </p>
                        <div className="flex items-center gap-2 px-3 py-1 border border-primary/20 rounded-lg bg-background/90 backdrop-blur-sm shadow-sm self-end">
                          <span className="text-xs font-medium text-muted-foreground">{article.author}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs font-medium text-muted-foreground">
                            {article.shares.toLocaleString()} Shares
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Recent Stories */}
        <section className="w-full max-w-full">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold">Recent</h2>
          </div>
          <div
            ref={recentStoriesScrollRef}
            className="overflow-x-auto overflow-y-hidden -mx-4 px-4 scrollbar-hide w-full max-w-full"
          >
            <div className="flex gap-3 pb-2">
              {recentStories.map((story) => {
                const isTouched = touchedStory === story.id

                return (
                  <Link key={story.id} href={`/feed?story=${story.id}`}>
                    <Card
                      className={`shadow-none cursor-pointer transition-all duration-200 touch-manipulation group relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 border p-0 w-[320px] flex-shrink-0 flex flex-col ${
                        isTouched
                          ? "scale-[0.98] border-white/50"
                          : "hover:scale-[0.98] border-primary/20 hover:border-white/50"
                      }`}
                      onTouchStart={() => handleStoryTouchStart(story.id)}
                      onTouchEnd={handleStoryTouchEnd}
                      onTouchCancel={handleStoryTouchCancel}
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
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${story.thumbnail})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% via-transparent via-60% to-background to-95%" />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <div className="absolute top-4 left-4 right-4 z-10">
                          <h3 className="font-bold text-xl text-white mb-1 tracking-tight leading-tight drop-shadow-lg line-clamp-2">
                            {story.title}
                          </h3>
                        </div>
                      </div>
                      <div className="p-5 pt-4 flex flex-col gap-3">
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {story.description}
                        </p>
                        <div className="flex items-center gap-2 px-3 py-1 border border-primary/20 rounded-lg bg-background/90 backdrop-blur-sm shadow-sm self-end">
                          <span className="text-xs font-medium text-muted-foreground">{story.author}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs font-medium text-muted-foreground">{story.timestamp}</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
