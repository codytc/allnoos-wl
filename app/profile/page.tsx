"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type React from "react"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  MapIcon,
  MapPin,
  Calendar,
  Send,
  X,
  Flame,
  EllipsisIcon,
  Info,
  UserMinus,
  UserPlus,
  Ban,
  Flag,
  ShirtIcon,
  CoinsIcon,
  Search,
  ArrowUpDown,
} from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { AllnoosLogo } from "@/components/allnoos-logo"
import { userProfiles } from "@/lib/mock-data"
import { Input } from "@/components/ui/input"

const allUsers = [
  {
    id: 1,
    name: "Sarah Chen",
    username: "@sarahchen_news",
    avatar: "/professional-asian-female-climate-journalist-with-.jpg",
    bio: "Independent journalist covering climate change and environmental issues. Based in Iceland. 🌍",
    location: "Reykjavik, Iceland",
    website: "sarahchen.news",
    joinDate: "March 2023",
    verified: true,
    followers: 16240,
    following: 892,
    stories: 47,
    totalViews: "2.1M",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    username: "@sarahmitchell",
    avatar: "/female-journalist.png",
    bio: "Technology reporter covering AI and digital transformation. Always on the cutting edge.",
    location: "San Francisco, CA",
    website: "sarahmitchell.tech",
    joinDate: "January 2022",
    verified: true,
    followers: 24500,
    following: 1240,
    stories: 63,
    totalViews: "3.2M",
  },
  {
    id: 8,
    name: "David Park",
    username: "@davidpark",
    avatar: "/male-journalist.png",
    bio: "Political correspondent. Breaking news and in-depth analysis. Washington DC based.",
    location: "Washington, DC",
    website: "davidpark.news",
    joinDate: "June 2021",
    verified: true,
    followers: 32100,
    following: 980,
    stories: 89,
    totalViews: "4.5M",
  },
  {
    id: 12,
    name: "Robert Chen",
    username: "@robertchen",
    avatar: "/male-journalist.png",
    bio: "Business and economics journalist. Markets, finance, and the economy.",
    location: "New York, NY",
    website: "robertchen.biz",
    joinDate: "August 2020",
    verified: true,
    followers: 28300,
    following: 756,
    stories: 102,
    totalViews: "5.1M",
  },
  {
    id: 6,
    name: "Dr. Emily Watson",
    username: "@drwatson",
    avatar: "/female-journalist.png",
    bio: "Science and health reporter. PhD in Molecular Biology. Making science accessible.",
    location: "Boston, MA",
    website: "emilywatson.science",
    joinDate: "May 2022",
    verified: true,
    followers: 19800,
    following: 543,
    stories: 54,
    totalViews: "2.8M",
  },
]

export default function ProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false)
  const [visibleStories, setVisibleStories] = useState(4)
  const [showShare, setShowShare] = useState(false)
  const [showMessagePanel, setShowMessagePanel] = useState(false)
  const [messageText, setMessageText] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [likedStories, setLikedStories] = useState<Set<number>>(new Set())
  const [forwardedStories, setForwardedStories] = useState<Set<number>>(new Set())
  const [showMenuDropdown, setShowMenuDropdown] = useState(false)
  const [storySearchQuery, setStorySearchQuery] = useState("")
  const [showStorySearch, setShowStorySearch] = useState(false)
  const [storySortBy, setStorySortBy] = useState<"recent" | "oldest" | "popular" | "views">("recent")
  const [showSortOptions, setShowSortOptions] = useState(false)

  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const storySearchInputRef = useRef<HTMLInputElement>(null)
  const sortDropdownRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get("from")

  const userId = searchParams.get("userId")
  const defaultUserId = 5 // Marcus Thompson
  const user =
    userProfiles.find((u) => u.id === Number(userId)) ||
    userProfiles.find((u) => u.id === defaultUserId) ||
    userProfiles[0]

  console.log("[v0] Profile page loaded for user:", {
    userId: userId || defaultUserId,
    userName: user.name,
    actualUserId: user.id,
  })

  const userStories = [
    {
      id: 1,
      title: "Iceland Volcano Emits Smoke",
      thumbnail: "/volcanic-sunset.png",
      views: 45600,
      likes: 4445,
      duration: "2:34",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: 2,
      title: "Arctic Ice Melting Report",
      thumbnail: "/northern-lights-nature.png",
      views: 32100,
      likes: 2890,
      duration: "3:12",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    },
    {
      id: 3,
      title: "Renewable Energy Progress",
      thumbnail: "/climate-summit-meeting.png",
      views: 28900,
      likes: 2156,
      duration: "2:45",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    },
    {
      id: 4,
      title: "Climate Summit Coverage",
      thumbnail: "/climate-summit-meeting.png",
      views: 67800,
      likes: 5234,
      duration: "4:21",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      id: 5,
      title: "Ocean Conservation Efforts",
      thumbnail: "/blue-concert-stage.png",
      views: 41200,
      likes: 3567,
      duration: "3:45",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
    {
      id: 6,
      title: "Wildlife Protection Update",
      thumbnail: "/professional-woman-headshot.png",
      views: 38900,
      likes: 3124,
      duration: "2:58",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    },
    {
      id: 7,
      title: "Green Technology Breakthrough",
      thumbnail: "/male-journalist.png",
      views: 52300,
      likes: 4789,
      duration: "4:12",
      timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
    },
    {
      id: 8,
      title: "Environmental Policy Changes",
      thumbnail: "/volcanic-sunset.png",
      views: 29800,
      likes: 2456,
      duration: "3:33",
      timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 1 month ago
    },
    {
      id: 9,
      title: "Sustainable Living Tips",
      thumbnail: "/northern-lights-nature.png",
      views: 35600,
      likes: 2987,
      duration: "2:21",
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    },
    {
      id: 10,
      title: "Climate Change Impact Study",
      thumbnail: "/modern-building-news.png",
      views: 48700,
      likes: 4123,
      duration: "5:07",
      timestamp: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 3 months ago
    },
  ]

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return "just now"
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) {
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`
    }

    const diffInWeeks = Math.floor(diffInDays / 7)
    if (diffInWeeks < 4) {
      return `${diffInWeeks} ${diffInWeeks === 1 ? "week" : "weeks"} ago`
    }

    const diffInMonths = Math.floor(diffInDays / 30)
    if (diffInMonths < 12) {
      return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`
    }

    const diffInYears = Math.floor(diffInDays / 365)
    return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`
  }

  const formatTimestamp = (timestamp: Date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const month = months[timestamp.getMonth()]
    const day = timestamp.getDate()
    const year = timestamp.getFullYear()

    const hours = timestamp.getHours()
    const minutes = timestamp.getMinutes()
    const ampm = hours >= 12 ? "PM" : "AM"
    const displayHours = hours % 12 || 12
    const displayMinutes = minutes.toString().padStart(2, "0")

    return `${month} ${day}, ${year} ${displayHours}:${displayMinutes} ${ampm}`
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  const handleStoryClick = (storyId: number) => {
    router.push(`/feed?story=${storyId}`)
  }

  const handleShare = () => {
    setShowShare(true)
  }

  const handleCloseShare = () => {
    setShowShare(false)
  }

  const handleSocialShare = (platform: string) => {
    const url = window.location.href
    const text = `Check out ${user.name}'s profile on allnoos`

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
    }

    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], "_blank")
    }
  }

  const handleMessageClick = () => {
    setShowMessagePanel(true)
  }

  const handleCloseMessage = () => {
    setShowMessagePanel(false)
    setMessageText("")
    setShowEmojiPicker(false)
  }

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log("Sending message:", messageText)
      setMessageText("")
      setShowMessagePanel(false)
      setShowEmojiPicker(false)
    }
  }

  const handleCollapseShare = () => {
    if (showShare) {
      setShowShare(false)
    }
    if (showMessagePanel) {
      setShowMessagePanel(false)
    }
    if (showMenuDropdown) {
      setShowMenuDropdown(false)
    }
    if (showStorySearch) {
      setShowStorySearch(false)
      setStorySearchQuery("")
    }
    if (showSortOptions) {
      setShowSortOptions(false)
    }
  }

  const toggleLikeStory = (storyId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setLikedStories((prev) => {
      const newLiked = new Set(prev)
      if (newLiked.has(storyId)) {
        newLiked.delete(storyId)
      } else {
        newLiked.add(storyId)
      }
      return newLiked
    })
  }

  const handleForwardStory = (storyId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setForwardedStories((prev) => {
      const newForwarded = new Set(prev)
      if (newForwarded.has(storyId)) {
        newForwarded.delete(storyId)
      } else {
        newForwarded.add(storyId)
      }
      return newForwarded
    })
    setShowShare(true)
  }

  const handleEmojiClick = (emoji: string) => {
    setMessageText((prev) => prev + emoji)
    setShowEmojiPicker(false)
  }

  const handleStorySortOptionSelect = (sortOption: "recent" | "oldest" | "popular" | "views") => {
    setStorySortBy(sortOption)
    setShowSortOptions(false)
  }

  const getFilteredAndSortedStories = () => {
    let filtered = userStories

    // Filter by search query
    if (storySearchQuery.trim()) {
      filtered = filtered.filter((story) => story.title.toLowerCase().includes(storySearchQuery.toLowerCase()))
    }

    // Sort stories
    const sorted = [...filtered].sort((a, b) => {
      switch (storySortBy) {
        case "recent":
          return b.timestamp.getTime() - a.timestamp.getTime()
        case "oldest":
          return a.timestamp.getTime() - b.timestamp.getTime()
        case "popular":
          return b.likes - a.likes
        case "views":
          return b.views - a.views
        default:
          return 0
      }
    })

    return sorted
  }

  const commonEmojis = ["😊", "😂", "❤️", "👍", "🙏", "😍", "🔥", "💯", "😢", "😮", "🤔", "👏", "🎉", "💪", "🌟", "✨"]

  const handleBack = () => {
    if (from) {
      router.push(from)
    } else if (typeof window !== "undefined" && document.referrer && document.referrer.includes("/profile/about")) {
      router.push("/feed")
    } else if (window.history.length > 1) {
      router.back()
    } else {
      router.push("/feed")
    }
  }

  const navigateToAbout = () => {
    let targetFrom = from
    if (!targetFrom && typeof window !== "undefined") {
      const referrer = document.referrer
      if (referrer && referrer.includes(window.location.origin)) {
        const path = referrer.replace(window.location.origin, "")
        // Don't use about page or current profile page as 'from'
        if (!path.includes("/profile/about") && path !== window.location.pathname) {
          targetFrom = path
        }
      }
    }
    // Default to feed if we still don't have a source
    targetFrom = targetFrom || "/feed"

    router.push(`/profile/about?userId=${user.id}&from=${encodeURIComponent(targetFrom)}`)
    setShowMenuDropdown(false)
  }

  useEffect(() => {
    if (showStorySearch && storySearchInputRef.current) {
      storySearchInputRef.current.focus()
    }
  }, [showStorySearch])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setShowSortOptions(false)
      }
    }

    if (showSortOptions) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showSortOptions])

  useEffect(() => {
    if (!from && typeof window !== "undefined") {
      const referrer = document.referrer
      if (referrer && referrer.includes(window.location.origin)) {
        const path = referrer.replace(window.location.origin, "")
        // Don't set if it's the about page to avoid loops when returning from it
        if (!path.includes("/profile/about")) {
          const newParams = new URLSearchParams(searchParams.toString())
          newParams.set("from", path)
          router.replace(`${window.location.pathname}?${newParams.toString()}`, { scroll: false })
        }
      }
    }
  }, [from, searchParams, router])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
        if (visibleStories < userStories.length) {
          setVisibleStories((prev) => Math.min(prev + 4, userStories.length))
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [visibleStories, userStories.length])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [userId])

  return (
    <div className="min-h-screen bg-background" onClick={handleCollapseShare}>
      {/* SVG clipPath definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="headerCurveClipProfile" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 1,0 L 1,0.733 C 0.861,0.822 0.639,0.822 0.5,0.733 C 0.361,0.651 0.139,0.651 0,0.733 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Header */}
      <div className="sticky top-0 z-50 bg-background" style={{ clipPath: "url(#headerCurveClipProfile)" }}>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <button
                onClick={handleBack}
                className="rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] bg-white/20 border border-white/30 p-2.5"
              >
                <ChevronLeft className="text-stone-600 size-5" />
              </button>
            </div>
            <div className="flex justify-center">
              <Link href="/feed">
                <div className="relative flex items-center justify-center h-12 px-8">
                  <div className="absolute top-[-18px] left-[50%] transform translate-x-[-10px] z-10 italic text-xs tracking-tighter my-[22px] mb-0 mt-[22px] mr-0 ml-[-8px] max-w-[300px] overflow-visible">
                    <span className="ml-[-1px] mb-0 mt-0 font-medium tracking-tighter text-xs whitespace-nowrap uppercase overflow-visible block text-slate-600">
                      {user.name}
                    </span>
                  </div>
                  <div style={{ minWidth: "120px", minHeight: "32px" }}>
                    <AllnoosLogo variant="default" size="md" />
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex-1 flex justify-end">
              <div className="relative">
                <button
                  ref={menuButtonRef}
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowMenuDropdown(!showMenuDropdown)
                  }}
                  className="rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] bg-white/20 border border-white/30 p-2.5"
                >
                  <EllipsisIcon className="size-5 text-stone-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-8 relative -mb-8 flex items-end z-30" style={{ transform: "translateY(-18px)" }}>
          <svg
            viewBox="0 0 1440 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-6"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="curvedLineGradientProfile" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="15%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="85%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
            </defs>
            <path
              d="M 0,25 C 200,5 520,5 720,25 C 920,45 1240,45 1440,25"
              stroke="url(#curvedLineGradientProfile)"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Dropdown */}
      {showMenuDropdown && (
        <div
          className="fixed w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/30 py-2 z-[100] animate-in slide-in-from-top-2 duration-200"
          style={{
            top: menuButtonRef.current ? menuButtonRef.current.getBoundingClientRect().bottom + 8 : 60,
            right: 16,
          }}
        >
          <Link href={`/map?userId=${user.id}`}>
            <button
              onClick={() => setShowMenuDropdown(false)}
              className="w-full text-left px-4 py-3 hover:bg-white/50 transition-colors text-stone-700 flex items-center gap-3"
            >
              <MapIcon className="w-4 h-4" />
              <span>Wander Map</span>
            </button>
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleFollow()
            }}
            className="w-full text-left px-4 py-3 hover:bg-white/50 transition-colors text-stone-700 flex items-center gap-3"
          >
            {isFollowing ? (
              <>
                <UserMinus className="w-4 h-4" />
                <span>Unfollow</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Follow</span>
              </>
            )}
          </button>
          {isFollowing && (
            <button
              onClick={() => {
                setShowMenuDropdown(false)
                handleMessageClick()
              }}
              className="w-full text-left px-4 py-3 hover:bg-white/50 transition-colors text-stone-700 flex items-center gap-3"
            >
              <Send className="w-4 h-4" />
              <span>Message</span>
            </button>
          )}
          <button
            onClick={navigateToAbout}
            className="w-full text-left px-4 py-3 hover:bg-white/50 transition-colors text-stone-700 flex items-center gap-3"
          >
            <Info className="w-4 h-4" />
            <span>About</span>
          </button>
        </div>
      )}

      {/* Profile Info */}
      <div className="p-6 pt-10 relative -mt-8" style={{ transform: "translateY(-18px)" }}>
        <div className="flex items-start gap-4 mb-6">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="text-2xl">{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1">
            <div className="mb-2">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground text-sm">{user.username}</p>
            </div>

            <div className="flex items-center gap-6 mb-4">
              <div className="text-center">
                <div className="font-bold text-lg">{user.stories}</div>
                <div className="text-muted-foreground text-xs">Stories</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">{user.followers.toLocaleString()}</div>
                <div className="text-muted-foreground text-xs">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">{user.totalViews}</div>
                <div className="text-muted-foreground text-xs">Views</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio and Details */}
        <div className="space-y-3 mb-6">
          <p className="text-sm leading-relaxed">{user.bio}</p>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Joined {user.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons - Full Width */}
        <div className="px-4 pb-6">
          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              className="flex-1 w-full bg-transparent py-4 px-6 text-base font-medium"
              onClick={navigateToAbout}
            >
              About
            </Button>
            {isFollowing ? (
              <Button
                className="flex-1 py-4 px-6 text-base font-medium bg-blue-500 text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  handleMessageClick()
                }}
              >
                Message
              </Button>
            ) : (
              <Button className="flex-1 py-4 px-6 text-base font-medium bg-blue-500 text-white" onClick={handleFollow}>
                Follow
              </Button>
            )}
            <Button
              variant="outline"
              className="flex-1 bg-transparent py-4 px-6 text-base font-medium text-stone-900 hover:text-yellow-500 hover:bg-transparent hover:border-white/30 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation()
                handleShare()
              }}
            >
              <svg
                className="size-9"
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
            </Button>
          </div>
        </div>
      </div>

      {/* Stories Grid - Full Width, 2x2 Layout */}
      <div className="w-full">
        <div className="px-6 pb-6 pr-[15px] pl-[15px]">
          {!showStorySearch ? (
            <div className="flex justify-end items-center w-full max-w-md mx-auto">
              <div className="relative flex items-center gap-2" ref={sortDropdownRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowStorySearch(true)
                  }}
                  className="rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] bg-white/20 border border-white/30 p-2.5"
                >
                  <Search className="size-5 text-stone-600" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowSortOptions(!showSortOptions)
                  }}
                  className="rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] bg-white/20 border border-white/30 p-2.5"
                >
                  <ArrowUpDown className="size-5 text-stone-600" />
                </button>

                {showSortOptions && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/30 py-2 z-60 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 text-xs text-stone-500 border-b border-stone-100 mb-2">
                      Sort stories by:
                    </div>
                    <button
                      onClick={() => handleStorySortOptionSelect("recent")}
                      className={`w-full text-left px-4 py-2 hover:bg-white/50 transition-colors text-stone-700 hover:text-[#FDB484] ${
                        storySortBy === "recent" ? "font-bold" : ""
                      }`}
                    >
                      Most Recent
                    </button>
                    <button
                      onClick={() => handleStorySortOptionSelect("oldest")}
                      className={`w-full text-left px-4 py-2 hover:bg-white/50 transition-colors text-stone-700 hover:text-[#FDB484] ${
                        storySortBy === "oldest" ? "font-bold" : ""
                      }`}
                    >
                      Oldest First
                    </button>
                    <button
                      onClick={() => handleStorySortOptionSelect("popular")}
                      className={`w-full text-left px-4 py-2 hover:bg-white/50 transition-colors text-stone-700 hover:text-[#FDB484] ${
                        storySortBy === "popular" ? "font-bold" : ""
                      }`}
                    >
                      Most Popular
                    </button>
                    <button
                      onClick={() => handleStorySortOptionSelect("views")}
                      className={`w-full text-left px-4 py-2 hover:bg-white/50 transition-colors text-stone-700 hover:text-[#FDB484] ${
                        storySortBy === "views" ? "font-bold" : ""
                      }`}
                    >
                      Most Viewed
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  ref={storySearchInputRef}
                  type="text"
                  placeholder="Explore my work"
                  value={storySearchQuery}
                  onChange={(e) => setStorySearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setShowStorySearch(false)
                      setStorySearchQuery("")
                    }
                  }}
                  className="pl-10 pr-10 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus:border-input focus-visible:border-input focus:shadow-[inset_0_0_16px_rgba(253,180,132,0.35)] rounded-lg"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowStorySearch(false)
                    setStorySearchQuery("")
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-stone-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-0.5">
          {getFilteredAndSortedStories()
            .slice(0, visibleStories)
            .map((story) => (
              <div
                key={story.id}
                className="overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-95 active:scale-95 hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] active:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)]"
                onClick={() => handleStoryClick(story.id)}
              >
                <div className="relative aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center rounded-lg transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url(${story.thumbnail})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />

                  <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center z-10 backdrop-blur-sm rounded-full bg-transparent gap-2.5 p-0.5 mt-[-7px]">
                    <button
                      onClick={(e) => toggleLikeStory(story.id, e)}
                      className={`group/like rounded-full transition-all duration-300 p-2.5 hover:scale-110 active:scale-110 shadow-lg ${
                        likedStories.has(story.id)
                          ? "bg-transparent hover:shadow-[inset_0_2px_12px_rgba(255,255,255,0.4)]"
                          : "bg-transparent backdrop-blur-sm hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)]"
                      }`}
                    >
                      <Flame
                        className={`size-5 transition-colors duration-300 ${
                          likedStories.has(story.id)
                            ? "text-red-500"
                            : "text-white group-hover/like:text-red-500 group-active/like:text-red-500"
                        }`}
                      />
                    </button>

                    <div className="px-3 rounded-full backdrop-blur-sm bg-transparent py-2.5">
                      <span className="text-white font-medium text-lg">{story.duration}</span>
                    </div>

                    {/* CHANGE: Added group/forward and hover/active yellow states to forward button icon */}
                    <button
                      onClick={(e) => handleForwardStory(story.id, e)}
                      className="group/forward rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] bg-transparent p-[7px]"
                    >
                      <svg
                        className={`size-6 transition-colors duration-300 group-hover/forward:text-yellow-400 group-active/forward:text-yellow-400 ${
                          forwardedStories.has(story.id) ? "text-yellow-400" : "text-white"
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
                    {/* END CHANGE */}
                  </div>

                  {/* Story info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{story.title}</h3>
                    <div className="flex items-center text-white/80 text-xs">
                      <span>{formatTimestamp(story.timestamp)}</span>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>
            ))}
        </div>

        {visibleStories < userStories.length && (
          <div className="flex justify-center py-8">
            <div className="text-muted-foreground text-sm">Scroll to load more stories...</div>
          </div>
        )}
      </div>

      {/* Share Overlay */}
      {showShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-start">
          <div className="absolute inset-0" onClick={handleCloseShare} />
          <div
            className="relative bg-background/95 backdrop-blur-md border border-border shadow-2xl w-20 flex flex-col rounded-r-2xl"
            style={{
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
              marginTop: "auto",
              marginBottom: "auto",
              height: "auto",
              paddingTop: "1.5rem",
              paddingBottom: "1.5rem",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`px-4 py-2 flex flex-col transition-all duration-800 ease-out ${
                showShare ? "opacity-100 transform translate-x-0" : "opacity-0 transform -translate-x-full"
              }`}
              style={{
                transitionDelay: showShare ? "200ms" : "0ms",
              }}
            >
              <div className="flex flex-col items-center justify-center gap-3">
                {/* Twitter/X */}
                <button
                  onClick={() => handleSocialShare("twitter")}
                  className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden flex items-center justify-center ${
                    showShare ? "opacity-100 transform translate-x-0" : "opacity-0 transform -translate-x-8"
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

                {/* Facebook */}
                <button
                  onClick={() => handleSocialShare("facebook")}
                  className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden flex items-center justify-center ${
                    showShare ? "opacity-100 transform translate-x-0" : "opacity-0 transform -translate-x-8"
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
                    <path
                      className="size-7"
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    />
                  </svg>
                </button>

                {/* LinkedIn */}
                <button
                  onClick={() => handleSocialShare("linkedin")}
                  className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden flex items-center justify-center ${
                    showShare ? "opacity-100 transform translate-x-0" : "opacity-0 transform -translate-x-8"
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
                    showShare ? "opacity-100 transform translate-x-0" : "opacity-0 transform -translate-x-8"
                  }`}
                  style={{
                    transitionDelay: showShare ? "600ms" : "0ms",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
                  <svg
                    className="text-green-600 group-active:text-green-600/80 relative z-10 size-7"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                  </svg>
                </button>

                <div className="w-8 h-px bg-border my-1 rounded-full"></div>

                {/* Not Interested Button */}
                <button
                  className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden flex items-center justify-center ${
                    showShare ? "opacity-100 transform translate-x-0" : "opacity-0 transform -translate-x-8"
                  }`}
                  style={{
                    transitionDelay: showShare ? "700ms" : "0ms",
                  }}
                  onClick={handleCloseShare}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
                  <Ban className="text-red-500 group-active:text-red-500/80 relative z-10 size-[30px]" />
                </button>

                {/* Report Button */}
                <button
                  className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden flex items-center justify-center ${
                    showShare ? "opacity-100 transform translate-x-0" : "opacity-0 transform -translate-x-8"
                  }`}
                  style={{
                    transitionDelay: showShare ? "800ms" : "0ms",
                  }}
                  onClick={handleCloseShare}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
                  <Flag className="text-red-500 group-active:text-red-500/80 relative z-10 size-[30px]" />
                </button>

                <div className="w-8 h-px bg-border my-1 rounded-full"></div>

                <button
                  className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden flex items-center justify-center ${
                    showShare ? "opacity-100 transform translate-x-0" : "opacity-0 transform -translate-x-8"
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
                  className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden flex items-center justify-center ${
                    showShare ? "opacity-100 transform translate-x-0" : "opacity-0 transform -translate-x-8"
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

      {/* Message Panel */}
      {showMessagePanel && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <div
            className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl transition-all duration-700 ease-out ${
              showMessagePanel ? "transform translate-y-0 opacity-100" : "transform translate-y-full opacity-0"
            }`}
            style={{ height: "60vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`p-6 h-full flex flex-col transition-all duration-500 ease-out ${
                showMessagePanel ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
              }`}
              style={{
                transitionDelay: showMessagePanel ? "200ms" : "0ms",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-stone-900 text-lg font-semibold">Message {user.name}</h2>
                  </div>
                </div>
                <button onClick={handleCloseMessage} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Message Area */}
              <div className="flex-1 flex flex-col justify-end">
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm text-center">
                    Start a conversation with {user.name}. Be respectful and follow community guidelines.
                  </p>
                </div>

                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-8 gap-2">
                      {commonEmojis.map((emoji, index) => (
                        <button
                          key={index}
                          onClick={() => handleEmojiClick(emoji)}
                          className="text-2xl p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="flex gap-3 items-end">
                  <div className="flex-1">
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type your message..."
                      className="w-full p-4 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      maxLength={500}
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">{messageText.length}/500</div>
                  </div>
                  {/* Emoji Button */}
                  <Button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    variant="outline"
                    className="p-4 rounded-full border-gray-300 hover:bg-gray-50"
                  >
                    <span className="text-xl">😊</span>
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
