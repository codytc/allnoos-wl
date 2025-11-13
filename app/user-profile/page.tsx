"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type React from "react"

import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Edit,
  BarChart3,
  Save,
  Pin,
  Upload,
  EllipsisIcon,
  Clapperboard,
  PiggyBankIcon,
  Users,
  Search,
  ArrowUpDown,
  Settings,
  Coins,
  Trash2,
  Flame,
  Eye,
  MessageSquare,
  Map,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import AllnoosLogo from "@/components/allnoos-logo"
import { userProfiles, allPosts } from "@/lib/mock-data"
import { getUserStories, validateStoryOwnership, getValidationSummary } from "@/lib/story-validation"

export default function UserProfilePage() {
  const searchParams = useSearchParams()
  const userId = searchParams.get("id")

  const user = userProfiles.find((u) => u.id === Number(userId)) || userProfiles[0]

  const userPosts = allPosts.filter((p) => p.userId === user.id)
  const uniqueCountries = new Set(
    userPosts
      .filter((post) => post.location)
      .map((post) => {
        const parts = post.location.split(",")
        return parts[parts.length - 1].trim()
      }),
  )
  const countryCount = uniqueCountries.size

  const userStories = getUserStories(user.id)
    .slice(0, 10)
    .map((post) => ({
      id: post.id,
      title: post.title,
      thumbnail: post.thumbnail,
      views: post.views,
      likes: post.likes,
      duration: "2:34", // Default duration
      timestamp: new Date(post.timestamp),
    }))

  const [visibleStories, setVisibleStories] = useState(4)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showStatistics, setShowStatistics] = useState(false)
  const [statisticsFilter, setStatisticsFilter] = useState("MONTH") // Added state for statistics time filter
  const [pinnedStories, setPinnedStories] = useState<Set<number>>(new Set([1, 3])) // Default pinned stories
  const [viewedStats, setViewedStats] = useState<Set<number>>(new Set()) // Add state to track which stories have had their stats viewed
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showImageCrop, setShowImageCrop] = useState(false)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [showWandAction, setShowWandAction] = useState(false)
  const [isTransforming, setIsTransforming] = useState(false)
  const [actionInput, setActionInput] = useState("")
  const [transformedAvatar, setTransformedAvatar] = useState<string | null>(null)
  const [currentAction, setCurrentAction] = useState<string>("")
  const [isPerformingAction, setIsPerformingAction] = useState(false)
  const [actionAnimation, setActionAnimation] = useState("")
  const [isProcessingComplete, setIsProcessingComplete] = useState(false) // Added state to track processing completion
  const [showMainActionDropdown, setShowMainActionDropdown] = useState(false) // Main profile dropdown
  const [showEditActionDropdown, setShowEditActionDropdown] = useState(false) // Edit profile dropdown
  const [profileDisplayTime, setProfileDisplayTime] = useState<Date | null>(null) // Added state for profile display time
  const [isLivePhoto, setIsLivePhoto] = useState(false) // Changed from false to true to enable live photo testing
  const [showFollowers, setShowFollowers] = useState(false)
  const [followersSearchQuery, setFollowersSearchQuery] = useState("")
  const [showSortOptions, setShowSortOptions] = useState(false) // Added state for sort options dropdown
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false) // Added state for settings dropdown menu
  const [storySortBy, setStorySortBy] = useState<"recent" | "oldest" | "popular" | "views">("recent")
  const [followersSortBy, setFollowersSortBy] = useState<
    "alphabetical" | "recent" | "oldest" | "performance" | "engagement"
  >("alphabetical")
  const [showStatsOnCard, setShowStatsOnCard] = useState<Set<number>>(new Set()) // Track which cards show stats instead of photo
  const [showMap, setShowMap] = useState(false)

  const storyLocations = [
    { storyId: 1, lat: 40.7128, lng: -74.006, location: "New York, USA" },
    { storyId: 2, lat: 51.5074, lng: -0.1278, location: "London, UK" },
    { storyId: 3, lat: 35.6762, lng: 139.6503, location: "Tokyo, Japan" },
    { storyId: 4, lat: 48.8566, lng: 2.3522, location: "Paris, France" },
    { storyId: 5, lat: -33.8688, lng: 151.2093, location: "Sydney, Australia" },
    { storyId: 6, lat: 19.4326, lng: -99.1332, location: "Mexico City, Mexico" },
    { storyId: 7, lat: -23.5505, lng: -46.6333, location: "São Paulo, Brazil" },
    { storyId: 8, lat: 55.7558, lng: 37.6173, location: "Moscow, Russia" },
  ]

  const followersData = [
    {
      id: 1,
      name: "Sarah Johnson",
      username: "@sarahjohnson",
      avatar: "/professional-woman-headshot.png",
      verified: true,
      performanceScore: 92,
      followDate: "2024-01-15",
      engagement: 87,
    },
    {
      id: 2,
      name: "Mike Chen",
      username: "@mikechen",
      avatar: "/male-journalist.png",
      verified: false,
      performanceScore: 88,
      followDate: "2024-02-03",
      engagement: 94,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      username: "@emilyrodriguez",
      avatar: "/female-journalist.png",
      verified: false,
      performanceScore: 95,
      followDate: "2024-01-28",
      engagement: 78,
    },
    {
      id: 4,
      name: "David Park",
      username: "@davidpark",
      avatar: "/professional-woman-headshot.png",
      verified: true,
      performanceScore: 85,
      followDate: "2024-03-10",
      engagement: 91,
    },
    {
      id: 5,
      name: "Edward Norton",
      username: "@ednorton",
      avatar: "/male-journalist.png",
      verified: false,
      performanceScore: 73,
      followDate: "2024-01-20",
      engagement: 82,
    },
    {
      id: 6,
      name: "Fiona Apple",
      username: "@fionaapple",
      avatar: "/professional-woman-headshot.png",
      verified: true,
      performanceScore: 89,
      followDate: "2024-02-05",
      engagement: 90,
    },
    {
      id: 7,
      name: "George Lucas",
      username: "@georgelucas",
      avatar: "/male-journalist.png",
      verified: false,
      performanceScore: 67,
      followDate: "2024-01-18",
      engagement: 75,
    },
    {
      id: 8,
      name: "Helen Mirren",
      username: "@helenmirren",
      avatar: "/female-journalist.png",
      verified: true,
      performanceScore: 94,
      followDate: "2024-02-07",
      engagement: 89,
    },
    {
      id: 9,
      name: "Ian McKellen",
      username: "@ianmckellen",
      avatar: "/male-journalist.png",
      verified: false,
      performanceScore: 81,
      followDate: "2024-01-25",
      engagement: 80,
    },
    {
      id: 10,
      name: "Julia Roberts",
      username: "@juliaroberts",
      avatar: "/professional-woman-headshot.png",
      verified: true,
      performanceScore: 88,
      followDate: "2024-02-02",
      engagement: 85,
    },
    {
      id: 11,
      name: "Kevin Spacey",
      username: "@kevinspacey",
      avatar: "/male-journalist.png",
      verified: false,
      performanceScore: 72,
      followDate: "2024-01-12",
      engagement: 70,
    },
    {
      id: 12,
      name: "Laura Dern",
      username: "@lauradern",
      avatar: "/female-journalist.png",
      verified: true,
      performanceScore: 91,
      followDate: "2024-02-04",
      engagement: 88,
    },
    {
      id: 13,
      name: "Michael Jordan",
      username: "@michaeljordan",
      avatar: "/male-journalist.png",
      verified: true,
      performanceScore: 98,
      followDate: "2024-01-10",
      engagement: 95,
    },
    {
      id: 14,
      name: "Nicole Kidman",
      username: "@nicolekidman",
      avatar: "/professional-woman-headshot.png",
      verified: true,
      performanceScore: 93,
      followDate: "2024-02-01",
      engagement: 93,
    },
    {
      id: 15,
      name: "Oscar Isaac",
      username: "@oscarisaac",
      avatar: "/male-journalist.png",
      verified: false,
      performanceScore: 76,
      followDate: "2024-01-19",
      engagement: 77,
    },
  ]

  const filteredFollowers = followersData
    .filter(
      (follower) =>
        follower.name.toLowerCase().includes(followersSearchQuery.toLowerCase()) ||
        follower.username.toLowerCase().includes(followersSearchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      switch (followersSortBy) {
        case "alphabetical":
          return a.name.localeCompare(b.name)
        case "recent":
          return new Date(b.followDate).getTime() - new Date(a.followDate).getTime() // Most recent first
        case "oldest":
          return new Date(a.followDate).getTime() - new Date(b.followDate).getTime() // Oldest first
        case "performance":
          return b.performanceScore - a.performanceScore // Highest score first
        case "engagement":
          return b.engagement - a.engagement // Highest engagement first
        default:
          return a.name.localeCompare(b.name)
      }
    })

  // Removed hardcoded userStories object

  const togglePinStory = (storyId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setPinnedStories((prev) => {
      const newPinned = new Set(prev)
      if (newPinned.has(storyId)) {
        newPinned.delete(storyId)
      } else {
        newPinned.add(storyId)
      }
      return newPinned
    })
  }

  const organizedStories = () => {
    const pinned = userStories.filter((story) => pinnedStories.has(story.id))
    const unpinned = userStories.filter((story) => !pinnedStories.has(story.id))
    return [...pinned, ...unpinned]
  }

  const handleStoryClick = (storyId: number) => {
    if (!validateStoryOwnership(storyId, user.id)) {
      console.error(`[v0] Attempted to access story ${storyId} from wrong user profile`)
      return
    }
    router.push(`/feed?story=${storyId}`)
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const isLive = file.name.toLowerCase().includes("live") || file.type.includes("heic") || Math.random() > 0.7 // Simulate live photo detection

      setIsLivePhoto(isLive)

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setSelectedImage(result)
        setShowImageCrop(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCropConfirm = () => {
    setCroppedImage(selectedImage)
    setShowImageCrop(false)
    setSelectedImage(null)
  }

  const handleCropCancel = () => {
    setShowImageCrop(false)
    setSelectedImage(null)
    setIsLivePhoto(false) // Reset live photo status when cancelled
  }

  const handleEditProfile = () => {
    setShowMainActionDropdown(false)
    setShowEditProfile(true)
  }

  const handleCloseEdit = () => {
    setShowEditActionDropdown(false)
    setShowEditProfile(false)
    setSelectedImage(null)
    setShowImageCrop(false)
    setTransformedAvatar(null)
    setIsTransforming(false)
    setIsProcessingComplete(false) // Reset processing state
    if (actionIntervalRef.current) {
      clearInterval(actionIntervalRef.current)
      actionIntervalRef.current = null
    }
    if (initialActionTimeoutRef.current) {
      clearTimeout(initialActionTimeoutRef.current)
      initialActionTimeoutRef.current = null
    }
  }

  const handleViewStatistics = () => {
    router.push("/statistics")
  }

  const handleCloseStatistics = () => {
    setShowStatistics(false)
  }

  const handleShowFollowers = () => {
    setShowFollowers(true)
  }

  const handleCloseFollowers = () => {
    setShowFollowers(false)
    setFollowersSearchQuery("")
    setShowSortOptions(false) // Reset sort options when closing
  }

  const handleShowMap = () => {
    console.log("[v0] Navigating to map page")
    router.push("/map")
  }

  const handleCloseMap = () => {
    setShowMap(false)
  }

  const handleCollapseOverlays = () => {
    if (showEditProfile) {
      setShowEditProfile(false)
    }
    if (showStatistics) {
      setShowStatistics(false)
    }
    if (showWandAction) {
      setShowWandAction(false)
    }
    if (showMainActionDropdown) {
      setShowMainActionDropdown(false)
    }
    if (showEditActionDropdown) {
      setShowEditActionDropdown(false)
    }
    if (showFollowers) {
      setShowFollowers(false)
    }
    if (showSettingsDropdown) {
      setShowSettingsDropdown(false)
    }
    if (showMap) {
      setShowMap(false)
    }
  }

  const handleMainActionDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowMainActionDropdown(!showMainActionDropdown)
    setShowEditActionDropdown(false)
  }

  const handleEditActionDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowEditActionDropdown(!showEditActionDropdown)
    setShowMainActionDropdown(false)
  }

  const handleActionSelect = (action: (typeof actionOptions)[0]) => {
    setCurrentAction(action.label)
    setShowMainActionDropdown(false)
    setShowEditActionDropdown(false)

    startPeriodicActionWithDelay(action.label)
  }

  const startPeriodicActionWithDelay = (action: string) => {
    if (actionIntervalRef.current) {
      clearInterval(actionIntervalRef.current)
    }
    if (initialActionTimeoutRef.current) {
      clearTimeout(initialActionTimeoutRef.current)
    }

    initialActionTimeoutRef.current = setTimeout(() => {
      performAction(action)

      actionIntervalRef.current = setInterval(() => {
        performAction(action)
      }, 300000) // 5 minutes
    }, 10000) // 10 seconds
  }

  const handleActionSubmit = () => {
    console.log("Action submitted:", actionInput)
    setCurrentAction(actionInput)
    setShowWandAction(false)

    if (actionInput.trim()) {
      startPeriodicAction(actionInput)
    }

    setActionInput("")
  }

  const startPeriodicAction = (action: string) => {
    if (actionIntervalRef.current) {
      clearInterval(actionIntervalRef.current)
    }

    actionIntervalRef.current = setInterval(() => {
      performAction(action)
    }, 5000)
  }

  const performAction = (action: string) => {
    setIsPerformingAction(true)

    if (action.toLowerCase().includes("wave") || action.toLowerCase().includes("hello")) {
      setActionAnimation("animate-bounce")
    } else if (action.toLowerCase().includes("dance") || action.toLowerCase().includes("move")) {
      setActionAnimation("animate-pulse")
    } else if (action.toLowerCase().includes("nod") || action.toLowerCase().includes("yes")) {
      setActionAnimation("animate-ping")
    } else if (action.toLowerCase().includes("wink") || action.toLowerCase().includes("smile")) {
      setActionAnimation("animate-pulse")
    } else {
      setActionAnimation("animate-pulse")
    }

    setTimeout(() => {
      setIsPerformingAction(false)
      setActionAnimation("")
    }, 2000)
  }

  const handleActionCancel = () => {
    setShowWandAction(false)
    setActionInput("")
    setTransformedAvatar(null)
    setIsTransforming(false)
    setIsProcessingComplete(false) // Reset processing state
    setCurrentAction("")
    if (actionIntervalRef.current) {
      clearInterval(actionIntervalRef.current)
      actionIntervalRef.current = null
    }
    if (initialActionTimeoutRef.current) {
      clearTimeout(initialActionTimeoutRef.current)
      initialActionTimeoutRef.current = null
    }
  }

  const handleWandClick = () => {
    // Placeholder for wand click functionality
    setIsTransforming(true)
    setTimeout(() => {
      setIsTransforming(false)
      setIsProcessingComplete(true)
    }, 5000) // Simulate processing time
  }

  const handleSaveProfile = () => {
    // Placeholder for save profile functionality
    console.log("Profile saved:", editForm)
    setShowEditProfile(false)
  }

  const handleStorySortOptionSelect = (sortOption: "recent" | "oldest" | "popular" | "views") => {
    setStorySortBy(sortOption)
    setShowSortOptions(false)
  }

  const handleSortOptionSelect = (sortOption: "alphabetical" | "recent" | "oldest" | "performance" | "engagement") => {
    setFollowersSortBy(sortOption)
    setShowSortOptions(false)
  }

  const handleSettingsDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowSettingsDropdown(!showSettingsDropdown)
  }

  const handleSettingsOptionSelect = (option: string) => {
    setShowSettingsDropdown(false)
    if (option === "settings") {
      router.push("/profile/settings")
    } else if (option === "bank") {
      router.push("/profile/account")
    } else if (option === "promotions") {
      // Added promotions handler
      router.push("/profile/promotions")
    } else if (option === "wander-map") {
      // Added Wander Map handler
      handleShowMap()
    } else {
      switch (option) {
        case "edit":
          handleEditProfile()
          break
        case "performance":
          handleViewStatistics()
          break
        case "followers":
          handleShowFollowers()
          break
        default:
          break
      }
    }
  }

  const getFollowerCriteria = (follower: any) => {
    switch (followersSortBy) {
      case "recent":
      case "oldest":
        return new Date(follower.followDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      case "performance":
        return `${follower.performanceScore}%`
      case "engagement":
        return `${follower.engagement}%`
      case "alphabetical":
      default:
        return null
    }
  }

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const secondsAgo = Math.floor((now.getTime() - timestamp.getTime()) / 1000)

    if (secondsAgo < 60) {
      return `${secondsAgo}s ago`
    } else if (secondsAgo < 3600) {
      const minutes = Math.floor(secondsAgo / 60)
      return `${minutes}m ago`
    } else if (secondsAgo < 86400) {
      const hours = Math.floor(secondsAgo / 3600)
      return `${hours}h ago`
    } else if (secondsAgo < 2592000) {
      // 30 days
      const days = Math.floor(secondsAgo / 86400)
      return `${days}d ago`
    } else if (secondsAgo < 31536000) {
      // 365 days
      const months = Math.floor(secondsAgo / 2592000)
      return `${months}mo ago`
    } else {
      const years = Math.floor(secondsAgo / 31536000)
      return `${years}y ago`
    }
  }

  // Declare ref variables here
  const actionIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const initialActionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[v0] Validating stories for user ${user.id} (${user.name})`)
      getValidationSummary()
    }
    return () => {
      if (actionIntervalRef.current) {
        clearInterval(actionIntervalRef.current)
      }
      if (initialActionTimeoutRef.current) {
        clearTimeout(initialActionTimeoutRef.current)
      }
    }
  }, [user.id, user.name])

  const router = useRouter()

  const [editForm, setEditForm] = useState({
    name: user.name,
    bio: user.bio,
    location: user.location || "",
    website: user.website || "",
  })

  const calculatePerformanceScore = () => {
    const engagementScore = 4.8 * 10
    const completionScore = 78 * 0.3
    const growthScore = 12 * 1.5
    const watchTimeScore = 2.3 * 5

    const totalScore = Math.round(engagementScore + completionScore + growthScore + watchTimeScore)
    return Math.min(totalScore, 100)
  }

  const performanceScore = calculatePerformanceScore()

  const getScoreColor = (score: number) => {
    if (score >= 90) return { text: "text-yellow-500", bg: "bg-yellow-50" }
    if (score >= 80) return { text: "text-gray-400", bg: "bg-gray-50" }
    if (score >= 70) return { text: "text-amber-600", bg: "bg-amber-50" }
    if (score >= 60) return { text: "text-blue-600", bg: "bg-blue-50" }
    return { text: "text-red-600", bg: "bg-red-50" }
  }

  const scoreColors = getScoreColor(performanceScore)

  const actionOptions = [
    { id: "wink", label: "Wink", emoji: "😉" },
    { id: "wave", label: "Wave", emoji: "👋" },
    { id: "dance", label: "Dance", emoji: "💃" },
    { id: "smile", label: "Smile", emoji: "😊" },
    { id: "nod", label: "Nod", emoji: "👍" },
    { id: "thumbsup", label: "Thumbs Up", emoji: "👍" },
    { id: "peace", label: "Peace Sign", emoji: "✌️" },
    { id: "heart", label: "Heart Hands", emoji: "💖" },
  ]

  return (
    <div
      className={`min-h-screen bg-background ${showStatistics ? "overflow-hidden" : ""}`}
      onClick={handleCollapseOverlays}
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center p-4 gap-3">
          <Link href="/feed">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
              <ArrowLeft className="w-5 h-5 text-primary group-active:text-primary/80 relative z-10" />
            </button>
          </Link>
          <div className="flex-1 flex justify-center">
            <Link href="/feed">
              <div className="relative flex items-center justify-center h-12 px-8">
                <div className="absolute top-[2px] left-[50%] transform translate-x-[-10px] z-10 text-xs tracking-tighter my-[22px] mb-0 mt-0 mr-0 ml-[-8px] italic">
                  <span className="text-stone-600 ml-[-1px] mb-0 mt-0 font-medium tracking-tighter text-xs">
                    {user.name.toUpperCase()}
                  </span>
                </div>
                <div style={{ minWidth: "120px", minHeight: "32px" }}>
                  <AllnoosLogo variant="default" size="md" onClick={() => {}} />
                </div>
              </div>
            </Link>
          </div>
          <div className="relative">
            <button
              onClick={handleSettingsDropdownToggle}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
              <EllipsisIcon className="w-5 h-5 text-primary group-active:text-primary/80 relative z-10" />
            </button>

            {showSettingsDropdown && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/30 py-2 z-[60] animate-in slide-in-from-top-2 duration-200">
                <button
                  onClick={() => handleSettingsOptionSelect("settings")}
                  className="w-full text-left px-4 py-3 hover:bg-white/50 transition-colors text-stone-700 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </div>
                </button>
                <button
                  onClick={() => handleSettingsOptionSelect("edit")}
                  className="w-full text-left px-4 py-3 hover:bg-white/50 transition-colors text-stone-700 flex items-center gap-3"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={() => handleSettingsOptionSelect("performance")}
                  className="w-full text-left px-4 py-3 hover:bg-white/50 transition-colors text-stone-700 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-4 h-4" />
                    <span>Performance</span>
                  </div>
                  <span className={`text-xs ${scoreColors.text} ${scoreColors.bg} px-2 py-1 rounded-full font-medium`}>
                    {performanceScore}%
                  </span>
                </button>
                <button
                  onClick={() => handleSettingsOptionSelect("promotions")}
                  className="w-full text-left px-4 py-3 hover:bg-white/50 transition-colors text-stone-700 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Coins className="w-4 h-4" />
                    <span>Promotions</span>
                  </div>
                </button>
                <button
                  onClick={() => handleSettingsOptionSelect("followers")}
                  className="w-full text-left px-4 py-3 hover:bg-white/50 transition-colors text-stone-700 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Users className="size-4" />
                    <span>Followers</span>
                  </div>
                  <span className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-full font-medium">+12 new</span>
                </button>
                <button
                  onClick={() => handleSettingsOptionSelect("wander-map")}
                  className="w-full text-left px-4 py-3 hover:bg-white/50 transition-colors text-stone-700 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Map className="size-4" />
                    <span>Wander Map</span>
                  </div>
                  <span className="text-xs text-[#FDB484] bg-orange-50 px-2 py-1 rounded-full font-medium">
                    {countryCount}
                  </span>
                </button>
                <div className="border-t border-stone-200 my-1"></div>
                <button
                  onClick={() => handleSettingsOptionSelect("bank")}
                  className="w-full text-left px-4 py-3 hover:bg-white/50 transition-colors text-stone-700 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <PiggyBankIcon className="w-4 h-4" />
                    <span>Bank</span>
                  </div>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
                    $1,234.56
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4 mb-6">
          <div className="relative">
            <div className={`relative ${isPerformingAction ? actionAnimation : ""}`}>
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={transformedAvatar || croppedImage || user.avatar || "/placeholder.svg"}
                  alt={user.name}
                />
                <AvatarFallback className="text-2xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              {currentAction && (
                <div
                  className="absolute -bottom-2 -left-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white z-10 cursor-pointer hover:bg-green-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleMainActionDropdownToggle(e)
                  }}
                >
                  <span className="text-lg">
                    {actionOptions.find((action) => action.label === currentAction)?.emoji || "✨"}
                  </span>
                </div>
              )}

              {showMainActionDropdown && currentAction && (
                <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[70]">
                  <div className="bg-white/10 backdrop-blur-md border border-green-500 rounded-r-2xl shadow-2xl p-2 animate-in slide-in-from-left-5 duration-500 ease-out">
                    <div className="flex flex-col items-center gap-2">
                      {actionOptions.map((action) => (
                        <button
                          key={action.id}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleActionSelect(action)
                          }}
                          className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/10 hover:border-white/30 backdrop-blur-sm group"
                          title={action.label}
                        >
                          <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                            {action.emoji}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="text-xs text-white/60 text-center mt-2 pt-2 border-b border-white/20 writing-mode-vertical transform rotate-180">
                      10s → 5min
                    </div>
                  </div>
                </div>
              )}

              {isLivePhoto && (
                <button className="absolute -bottom-2 -right-2 text-white p-2 rounded-full transition-all duration-300 bg-yellow-500 shadow-lg">
                  <Clapperboard className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-2">
              <h2 className="text-xl font-bold">Sarah Chen</h2>
              <p className="text-muted-foreground text-sm">{user.username}</p>
            </div>

            <div className="flex items-center gap-6 mb-4">
              <div className="text-center">
                <div className="font-bold text-lg">{allPosts.filter((p) => p.userId === user.id).length}</div>
                <div className="text-muted-foreground text-xs">Stories</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">{user.followers?.toLocaleString() || "0"}</div>
                <div className="text-muted-foreground text-xs">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">{user.totalViews || "0"}</div>
                <div className="text-muted-foreground text-xs">Views</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio and Details */}
        <div className="space-y-3 mb-6">
          <p className="text-sm leading-relaxed">{user.bio}</p>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div
              className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                console.log("[v0] Location clicked")
                handleShowMap()
              }}
            >
              <MapPin className="w-4 h-4" />
              <span>{user.location || "Unknown"}</span>
            </div>
            {user.joinDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {user.joinDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons - User's Own Profile */}
      <div className="px-6 pb-6 pr-[15px] pl-[15px]">
        <div className="flex justify-end items-center w-full max-w-md mx-auto">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowSortOptions(!showSortOptions)
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 transition-all duration-300"
            >
              <ArrowUpDown className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-stone-700">
                Sort:{" "}
                {storySortBy === "recent"
                  ? "Recent"
                  : storySortBy === "oldest"
                    ? "Oldest"
                    : storySortBy === "popular"
                      ? "Popular"
                      : "Views"}
              </span>
            </button>

            {showSortOptions && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/30 py-2 z-[60] animate-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 text-xs text-stone-500 border-b border-stone-100 mb-2">Sort stories by:</div>
                <button
                  onClick={() => handleStorySortOptionSelect("recent")}
                  className={`w-full text-left px-4 py-2 hover:bg-white/50 transition-colors ${
                    storySortBy === "recent" ? "bg-blue-50 text-blue-600 font-medium" : "text-stone-700"
                  }`}
                >
                  Most Recent
                </button>
                <button
                  onClick={() => handleStorySortOptionSelect("oldest")}
                  className={`w-full text-left px-4 py-2 hover:bg-white/50 transition-colors ${
                    storySortBy === "oldest" ? "bg-blue-50 text-blue-600 font-medium" : "text-stone-700"
                  }`}
                >
                  Oldest First
                </button>
                <button
                  onClick={() => handleStorySortOptionSelect("popular")}
                  className={`w-full text-left px-4 py-2 hover:bg-white/50 transition-colors ${
                    storySortBy === "popular" ? "bg-blue-50 text-blue-600 font-medium" : "text-stone-700"
                  }`}
                >
                  Most Popular
                </button>
                <button
                  onClick={() => handleStorySortOptionSelect("views")}
                  className={`w-full text-left px-4 py-2 hover:bg-white/50 transition-colors ${
                    storySortBy === "views" ? "bg-blue-50 text-blue-600 font-medium" : "text-stone-700"
                  }`}
                >
                  Most Views
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stories Grid - Enhanced Post Format */}
      <div className="w-full">
        <div className="grid grid-cols-2 gap-0.5">
          {organizedStories()
            .slice(0, visibleStories)
            .map((story) => (
              <div
                key={story.id}
                className="overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-95 active:scale-95 hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)]"
                onClick={() => handleStoryClick(story.id)}
              >
                <div className="relative aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden">
                  {showStatsOnCard.has(story.id) ? (
                    // Show statistics instead of photo
                    <div className="absolute inset-0 flex items-center justify-start max-w-[200px] gap-4 w-full px-4 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
                      <div className="flex flex-col gap-4 w-full max-w-[200px] mb-[26px]">
                        {/* Likes */}
                        <div className="flex items-center justify-start gap-3">
                          <Flame className="w-8 h-8 text-red-500" />
                          <div className="text-2xl font-bold text-white">{story.likes}</div>
                        </div>

                        {/* Shares (Forwards) */}
                        <div className="flex items-center justify-start gap-3 mr-0 ml-[-2px]">
                          <svg
                            className="text-yellow-500 size-9"
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
                          <div className="text-2xl font-bold text-white">{Math.floor(story.likes * 0.3)}</div>
                        </div>

                        {/* Comments */}
                        <div className="flex items-center justify-start gap-3">
                          <MessageSquare className="w-8 h-8 text-blue-500" />
                          <div className="text-2xl font-bold text-white">{Math.floor(story.likes * 0.5)}</div>
                        </div>

                        {/* Views */}
                        <div className="flex items-center justify-start gap-3">
                          <Eye className="w-8 h-8 text-secondary" />
                          <div className="text-2xl font-bold text-white">
                            {story.views >= 1000 ? `${(story.views / 1000).toFixed(1)}K` : story.views}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Show thumbnail photo
                    <>
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 rounded-lg group-hover:scale-105"
                        style={{ backgroundImage: `url(${story.thumbnail})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
                    </>
                  )}

                  {/* Buttons remain on top */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center z-10 backdrop-blur-sm rounded-full bg-transparent gap-5 mt-[-7px] p-0.5">
                    <button
                      onClick={(e) => togglePinStory(story.id, e)}
                      className={`rounded-full transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg p-2 ${
                        pinnedStories.has(story.id)
                          ? "bg-[#FDB484] hover:shadow-[inset_0_2px_12px_rgba(255,255,255,0.4)]"
                          : "bg-transparent backdrop-blur-sm hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)]"
                      }`}
                    >
                      <Pin
                        className={`size-5 text-white ${pinnedStories.has(story.id) ? "text-white" : "text-[#FDB484]"}`}
                      />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowStatsOnCard((prev) => {
                          const newSet = new Set(prev)
                          if (newSet.has(story.id)) {
                            newSet.delete(story.id)
                          } else {
                            newSet.add(story.id)
                          }
                          return newSet
                        })
                        setViewedStats((prev) => {
                          const newSet = new Set(prev)
                          if (!newSet.has(story.id)) {
                            newSet.add(story.id)
                          }
                          return newSet
                        })
                      }}
                      className="rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] bg-transparent p-2.5"
                    >
                      <BarChart3
                        className={`size-5 transition-colors duration-300 ${viewedStats.has(story.id) ? "text-blue-500" : "text-white"}`}
                      />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        // TODO: Add delete confirmation dialog
                        console.log("[v0] Delete story:", story.id)
                      }}
                      className="rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] bg-transparent p-2.5"
                    >
                      <Trash2 className="size-5 text-white" />
                    </button>
                  </div>

                  {/* Title and date remain at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
                    <div className="space-y-2">
                      <h3 className="text-white font-bold text-sm leading-tight line-clamp-2 drop-shadow-lg">
                        {story.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400 font-medium">
                          {story.timestamp.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}{" "}
                          {story.timestamp.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                        <div className="flex items-center gap-3 text-gray-400"></div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>
            ))}
        </div>

        {visibleStories < userStories.length && (
          <div className="flex justify-center py-8">
            <div className="text-muted-foreground text-sm animate-pulse">Scroll to load more stories...</div>
          </div>
        )}
      </div>

      {showFollowers && (
        <div className="fixed inset-0 z-50 bg-transparent" onClick={handleCloseFollowers}>
          <div
            className={`absolute left-0 top-8 bottom-8 w-80 bg-white/95 backdrop-blur-3xl rounded-r-3xl shadow-2xl transition-all duration-700 ease-out ${
              showFollowers ? "transform translate-x-0 opacity-100" : "transform -translate-x-full opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-stone-900 text-xl font-bold">Followers</h2>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowSortOptions(!showSortOptions)
                    }}
                    className="text-stone-700 hover:text-stone-900 p-2 rounded-lg hover:bg-stone-100 transition-colors"
                  >
                    <ArrowUpDown className="w-5 h-5" />
                  </button>

                  {showSortOptions && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-stone-200 py-2 z-10">
                      <div className="px-4 py-2 text-xs text-stone-500 border-b border-stone-100 mb-2">
                        Sort followers by:
                      </div>
                      <button
                        onClick={() => handleSortOptionSelect("alphabetical")}
                        className={`w-full text-left px-4 py-2 hover:bg-stone-50 transition-colors ${
                          followersSortBy === "alphabetical" ? "bg-blue-50 text-blue-600" : "text-stone-700"
                        }`}
                      >
                        Alphabetical (A-Z)
                      </button>
                      <button
                        onClick={() => handleSortOptionSelect("recent")}
                        className={`w-full text-left px-4 py-2 hover:bg-stone-50 transition-colors ${
                          followersSortBy === "recent" ? "bg-blue-50 text-blue-600" : "text-stone-700"
                        }`}
                      >
                        Most Recent
                      </button>
                      <button
                        onClick={() => handleSortOptionSelect("oldest")}
                        className={`w-full text-left px-4 py-2 hover:bg-stone-50 transition-colors ${
                          followersSortBy === "oldest" ? "bg-blue-50 text-blue-600" : "text-stone-700"
                        }`}
                      >
                        Oldest First
                      </button>
                      <button
                        onClick={() => handleSortOptionSelect("performance")}
                        className={`w-full text-left px-4 py-2 hover:bg-stone-50 transition-colors ${
                          followersSortBy === "performance" ? "bg-blue-50 text-blue-600" : "text-stone-700"
                        }`}
                      >
                        Performance Score
                      </button>
                      <button
                        onClick={() => handleSortOptionSelect("engagement")}
                        className={`w-full text-left px-4 py-2 hover:bg-stone-50 transition-colors ${
                          followersSortBy === "engagement" ? "bg-blue-50 text-blue-600" : "text-stone-700"
                        }`}
                      >
                        Engagement
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Search Box */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-500" />
                <input
                  type="text"
                  placeholder="Search followers..."
                  value={followersSearchQuery}
                  onChange={(e) => setFollowersSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-white/95 rounded-lg focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus:border-input focus-visible:border-input focus:shadow-[inset_0_0_16px_rgba(253,180,132,0.35)] bg-white/95 backdrop-blur-sm text-stone-900 placeholder-stone-500"
                />
              </div>

              {/* Followers List */}
              <div className="flex-1 overflow-y-auto space-y-3">
                {filteredFollowers.map((follower) => (
                  <div
                    key={follower.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors cursor-pointer"
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={follower.avatar || "/placeholder.svg"} alt={follower.name} />
                      <AvatarFallback className="text-sm">
                        {follower.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-stone-900">{follower.name}</h3>
                      {/* Dynamic criteria display with smooth transitions */}
                      {getFollowerCriteria(follower) && (
                        <div className="text-sm text-stone-500 font-medium transition-all duration-300 ease-in-out mt-1">
                          {getFollowerCriteria(follower)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {filteredFollowers.length === 0 && (
                  <div className="text-center py-8 text-stone-500">
                    No followers found matching "{followersSearchQuery}"
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Overlay */}
      {showEditProfile && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <div
            className={`absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-3xl border-2 border-white/95 rounded-t-3xl shadow-2xl transition-all duration-700 ease-out ${
              showEditProfile ? "transform translate-y-0 opacity-100" : "transform translate-y-full opacity-0"
            }`}
            style={{ height: "80vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-stone-900 text-xl font-bold">Edit Profile</h2>
                <button
                  onClick={handleSaveProfile}
                  className="text-stone-700 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100 p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Save className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto">
                <div className="text-center">
                  <label className="block text-sm font-medium text-stone-900 mb-3">Profile Photo</label>
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <Avatar className="w-24 h-24">
                        <AvatarImage
                          src={transformedAvatar || croppedImage || user.avatar || "/placeholder.svg"}
                          alt={user.name}
                        />
                        <AvatarFallback className="text-2xl">AJ</AvatarFallback>
                      </Avatar>

                      <button
                        className={`absolute -bottom-2 -right-2 text-white p-2 rounded-full transition-all duration-300 ${
                          isLivePhoto ? "bg-yellow-500 shadow-lg" : "bg-blue-500"
                        }`}
                      >
                        <Clapperboard className="w-4 h-4" />
                      </button>

                      {showEditActionDropdown && isProcessingComplete && (
                        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[70]">
                          <div className="bg-white/10 backdrop-blur-md border border-green-500 rounded-r-2xl shadow-2xl p-2 animate-in slide-in-from-left-5 duration-500 ease-out">
                            <div className="flex flex-col items-center gap-2">
                              {actionOptions.map((action) => (
                                <button
                                  key={action.id}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleActionSelect(action)
                                  }}
                                  className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/10 hover:border-white/30 backdrop-blur-sm group"
                                  title={action.label}
                                >
                                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                                    {action.emoji}
                                  </span>
                                </button>
                              ))}
                            </div>

                            <div className="text-xs text-white/60 text-center mt-2 pt-2 border-b border-white/20 writing-mode-vertical transform rotate-180">
                              10s → 5min
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-white/95 backdrop-blur-sm border-white/95 text-stone-900"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                      </Button>
                      {croppedImage && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setCroppedImage(null)
                            setIsLivePhoto(false) // Reset live photo status when removing photo
                          }}
                          className="bg-white/95 backdrop-blur-sm text-red-600 border-red-200 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-2">Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full p-3 border border-white/95 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/95 backdrop-blur-sm text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-2">Bio</label>
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    className="w-full p-3 border border-white/95 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/95 backdrop-blur-sm text-stone-900"
                    rows={3}
                    maxLength={150}
                  />
                  <div className="text-right text-xs text-stone-600 mt-1">{editForm.bio.length}/150</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-2">Location</label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="w-full p-3 border border-white/95 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/95 backdrop-blur-sm text-stone-900"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
    </div>
  )
}
