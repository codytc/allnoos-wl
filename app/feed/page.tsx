"use client"

import type React from "react"
import { useState, useEffect, Suspense, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Video,
  Send,
  Flame,
  User,
  Trash2,
  PinOff,
  MessageSquareIcon,
  Ban,
  Flag,
  CoinsIcon,
  ShirtIcon,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import AllnoosLogo from "@/components/allnoos-logo"
import { allPosts, userProfiles, type Post } from "@/lib/mock-data"

// Assuming currentUserId is imported or defined elsewhere, e.g.:
// import { currentUserId } from "@/lib/auth"; // Or however it's managed
const currentUserId = "user-123" // Placeholder for demonstration

interface FeedStory {
  id: number
  title: string
  description: string
  summary: string
  longForm: string
  backgroundImage: string
  slides: Array<{
    type: string
    content: string
    media: string
  }>
  comments_data: Array<{
    id: number
    author: string
    avatar: string
    content: string
    timestamp: string
    likes: number
  }>
  author: {
    name: string
    avatar: string
    followers: string
    verified: boolean
  }
  likes: number
  comments: number
  shares: number
  timestamp: string
  location: string
}

const formatTimestamp = (date: Date): string => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const month = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()

  // Add ordinal suffix (st, nd, rd, th)
  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return "th"
    switch (day % 10) {
      case 1:
        return "st"
      case 2:
        return "nd"
      case 3:
        return "rd"
      default:
        return "th"
    }
  }

  // Format time in 12-hour format
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? "pm" : "am"
  hours = hours % 12
  hours = hours ? hours : 12 // Convert 0 to 12
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes

  return `${month} ${day}${getOrdinalSuffix(day)}, ${year} • ${hours}:${minutesStr}${ampm}`
}

const formatName = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

const generateComments = (post: Post) => {
  const commentAuthors = [
    { name: "Alex Rivera", avatar: "/male-journalist.png" },
    { name: "Maria Santos", avatar: "/female-journalist.png" },
    { name: "Dr. James Wilson", avatar: "/professional-woman-headshot.png" },
    { name: "Lisa Chen", avatar: "/female-journalist.png" },
  ]

  // Generate contextually relevant comments based on the story
  const generateRelevantComment = (index: number): string => {
    const title = post.title.toLowerCase()
    const description = post.description.toLowerCase()

    // Climate/Environment stories
    if (
      title.includes("climate") ||
      title.includes("energy") ||
      title.includes("solar") ||
      title.includes("geothermal") ||
      title.includes("compost") ||
      title.includes("glacier") ||
      description.includes("renewable") ||
      description.includes("environment")
    ) {
      const comments = [
        "This is exactly the kind of local climate action we need to see more of.",
        "Great to see communities taking initiative on environmental issues.",
        "The data here is really eye-opening. Thanks for documenting this.",
        "We need more reporting like this on local environmental efforts.",
      ]
      return comments[index % comments.length]
    }

    // NYC/Urban stories
    if (
      title.includes("subway") ||
      title.includes("street") ||
      title.includes("bodega") ||
      title.includes("taxi") ||
      title.includes("delivery") ||
      description.includes("manhattan") ||
      description.includes("brooklyn") ||
      description.includes("queens")
    ) {
      const comments = [
        "This is so NYC. Love seeing these everyday moments captured.",
        "I walk past this spot every day! Never thought about it this way.",
        "The city is full of these stories. Thanks for sharing this one.",
        "This captures the real New York better than any tourist photo could.",
      ]
      return comments[index % comments.length]
    }

    // Tech stories
    if (
      title.includes("tech") ||
      title.includes("startup") ||
      title.includes("coding") ||
      title.includes("ai") ||
      title.includes("software") ||
      description.includes("silicon valley") ||
      description.includes("san francisco")
    ) {
      const comments = [
        "The tech industry needs more honest reporting like this.",
        "As someone in tech, this resonates. The reality is different from the hype.",
        "This is the side of tech culture people don't talk about enough.",
        "Important perspective on what's really happening in the industry.",
      ]
      return comments[index % comments.length]
    }

    // Science/Research stories
    if (
      title.includes("research") ||
      title.includes("study") ||
      title.includes("science") ||
      title.includes("lab") ||
      title.includes("scientist") ||
      description.includes("research") ||
      description.includes("study")
    ) {
      const comments = [
        "Finally, someone explaining the actual science without the hype.",
        "This is the kind of science communication we need more of.",
        "As a researcher, I appreciate the accuracy in this reporting.",
        "Great breakdown of complex science into understandable terms.",
      ]
      return comments[index % comments.length]
    }

    // Sports stories
    if (
      title.includes("game") ||
      title.includes("player") ||
      title.includes("team") ||
      title.includes("sport") ||
      description.includes("basketball") ||
      description.includes("football")
    ) {
      const comments = [
        "Been following this team for years. This captures the moment perfectly.",
        "The atmosphere at these games is electric. Glad you documented it.",
        "This is why local sports matter. It's about community.",
        "Great coverage of the game. The details really bring it to life.",
      ]
      return comments[index % comments.length]
    }

    // Food/Restaurant stories
    if (
      title.includes("food") ||
      title.includes("restaurant") ||
      title.includes("chef") ||
      title.includes("cafe") ||
      title.includes("bistro") ||
      description.includes("cooking")
    ) {
      const comments = [
        "I've been to this place! The food is as good as it looks here.",
        "Local food culture is so important. Thanks for highlighting this.",
        "This makes me want to visit immediately. Great storytelling.",
        "The passion for food really comes through in this piece.",
      ]
      return comments[index % comments.length]
    }

    // Politics/Government stories
    if (
      title.includes("council") ||
      title.includes("government") ||
      title.includes("policy") ||
      title.includes("budget") ||
      title.includes("funding") ||
      description.includes("city hall")
    ) {
      const comments = [
        "This is the kind of accountability journalism we need.",
        "More people need to pay attention to local government. Thanks for covering this.",
        "The details here are important. Glad someone is tracking this.",
        "Local politics affects us all. Appreciate the thorough reporting.",
      ]
      return comments[index % comments.length]
    }

    // Default comments for other stories
    const defaultComments = [
      "Important story that deserves more attention.",
      "Thanks for bringing this to light. Well reported.",
      "This is the kind of local journalism we need.",
      "Great work documenting this. The community needs to see this.",
    ]
    return defaultComments[index % defaultComments.length]
  }

  return Array.from({ length: Math.min(4, post.comments) }, (_, i) => ({
    id: i + 1,
    author: commentAuthors[i % commentAuthors.length].name,
    avatar: commentAuthors[i % commentAuthors.length].avatar,
    content: generateRelevantComment(i),
    timestamp: `${Math.floor(Math.random() * 8) + 1}h ago`,
    likes: Math.floor(Math.random() * 100) + 10,
  }))
}

const transformPostToStory = (post: Post): FeedStory => {
  const user = userProfiles.find((u) => u.id === post.userId)

  const longForm = `${post.description}

${post.title} - In-Depth Analysis

${post.description}

Our comprehensive investigation reveals the full scope of this developing story. Sources close to the situation have provided exclusive insights that shed new light on the circumstances surrounding these events.

Background and Context

The situation has been evolving over recent weeks, with multiple stakeholders weighing in on the implications. Experts in the field have noted that this development represents a significant shift in the current landscape, with potential ramifications extending far beyond the immediate area of impact.

Key Developments

Recent developments have brought new attention to this matter, with officials and community leaders expressing both concern and cautious optimism about the path forward. The response from various sectors has been mixed, reflecting the complexity of the issues at hand.

Expert Analysis

Leading analysts suggest that the long-term effects of these developments will likely be felt across multiple sectors. "This is a pivotal moment," noted one expert familiar with the situation. "The decisions made in the coming days and weeks will have lasting consequences."

Community Impact

Local communities have been closely monitoring the situation, with many residents expressing their views on how these developments will affect their daily lives. Town halls and community forums have seen increased attendance as people seek to understand the implications and voice their concerns.

Looking Ahead

As the situation continues to unfold, stakeholders remain committed to finding solutions that address the core issues while minimizing disruption. The coming weeks will be critical in determining the ultimate outcome and long-term impact of these developments.

Our team will continue to monitor this story closely and provide updates as new information becomes available. For the latest developments, stay tuned to our coverage.`

  return {
    id: post.id,
    title: post.title,
    description: post.description,
    summary: post.description,
    longForm,
    backgroundImage: post.thumbnail,
    slides: [
      {
        type: "main",
        content: post.description,
        media: post.thumbnail,
      },
      {
        type: "longform",
        content: longForm,
        media: post.thumbnail,
      },
      {
        type: "media",
        content: `Additional coverage and analysis of ${post.title.toLowerCase()}`,
        media: post.thumbnail,
      },
    ],
    comments_data: generateComments(post),
    author: {
      name: user?.name || post.author,
      avatar: user?.avatar || "/placeholder.svg",
      followers: user?.followers || "1k",
      verified: user?.verified || false,
    },
    likes: post.likes,
    comments: post.comments,
    shares: post.shares,
    timestamp: formatTimestamp(post.timestamp),
    location: post.location || "Unknown",
  }
}

function FeedPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const countryParam = searchParams.get("country")

  const [currentStory, setCurrentStory] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [commentVotes, setCommentVotes] = useState<{ [key: string]: { left: number; right: number } }>({})
  const [liked, setLiked] = useState<{ [key: number]: boolean }>({})
  const [forwarded, setForwarded] = useState<{ [key: number]: boolean }>({})
  const [commented, setCommented] = useState<{ [key: number]: boolean }>({})
  const [logoAnimated, setLogoAnimated] = useState(false)
  const [storyVotes, setStoryVotes] = useState<{ [key: number]: { left: number; right: number } }>({})

  const [impartViewedStory, setImpartViewedStory] = useState<number | null>(null)

  const isInitialMount = useRef(true)

  useEffect(() => {
    const viewedStory = sessionStorage.getItem("impartViewedForStory")
    console.log("[v0] Checking sessionStorage on mount:", viewedStory)
    if (viewedStory !== null) {
      const storyIndex = Number.parseInt(viewedStory)
      console.log("[v0] Setting impartViewedStory to:", storyIndex)
      setImpartViewedStory(storyIndex)
      sessionStorage.removeItem("impartViewedForStory")
    }
    isInitialMount.current = false
  }, [])

  useEffect(() => {
    if (impartViewedStory !== null && impartViewedStory !== currentStory) {
      console.log("[v0] Resetting impartViewedStory because story changed from", impartViewedStory, "to", currentStory)
      setImpartViewedStory(null)
    }
  }, [currentStory, impartViewedStory])

  useEffect(() => {
    if (!isInitialMount.current) {
      setCommented({})
    }
  }, [currentStory])

  const filteredPosts = countryParam
    ? allPosts.filter((post) => {
        if (!post.location) return false

        // Map US states to "United States"
        const stateMap: Record<string, string> = {
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

        const locationParts = post.location.split(",").map((p) => p.trim())
        const lastPart = locationParts[locationParts.length - 1]
        const country = stateMap[lastPart] || lastPart

        return country.toLowerCase() === countryParam.toLowerCase()
      })
    : allPosts

  const stories: FeedStory[] = filteredPosts.map(transformPostToStory)

  useEffect(() => {
    const storyParam = searchParams.get("story")
    if (storyParam) {
      const storyId = Number.parseInt(storyParam)
      const storyIndex = stories.findIndex((story) => story.id === storyId)
      if (storyIndex !== -1) {
        setCurrentStory(storyIndex)
      }
    }
  }, [searchParams])

  useEffect(() => {
    setCurrentSlide(0)
  }, [currentStory])

  useEffect(() => {
    setImageLoaded(false)
  }, [currentStory, currentSlide])

  const story = stories[currentStory]
  const currentSlideData = story.slides[currentSlide]

  const storyAuthorId = allPosts[currentStory]?.userId
  const isOwner = storyAuthorId === currentUserId // Fixed: Use imported/defined currentUserId

  console.log("[v0] Current story index:", currentStory)
  console.log("[v0] Current story author:", story.author.name)
  console.log("[v0] Current story userId:", allPosts[currentStory]?.userId)
  console.log("[v0] Current user (logged in):", currentUserId) // Fixed: Use imported/defined currentUserId
  console.log("[v0] Is owner?:", isOwner)
  console.log(
    "[v0] Link will go to:",
    isOwner ? `/user-profile?userId=${currentUserId}` : `/profile?userId=${allPosts[currentStory]?.userId}`, // Fixed: Use imported/defined currentUserId
  )

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    if (showComments) return

    const deltaX = touchStart.x - touchEnd.x
    const deltaY = touchStart.y - touchEnd.y

    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY)

    if (isHorizontalSwipe) {
      const isLeftSwipe = deltaX > minSwipeDistance
      const isRightSwipe = deltaX < -minSwipeDistance

      if (isLeftSwipe) {
        if (currentSlide < story.slides.length - 1) {
          setCurrentSlide(currentSlide + 1)
        } else {
          setCurrentSlide(0) // Loop back to first slide
        }
      }
      if (isRightSwipe && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1)
      }
    } else {
      if (currentSlide === 1) return

      const isUpSwipe = deltaY > minSwipeDistance
      const isDownSwipe = deltaY < -minSwipeDistance

      if (isUpSwipe) {
        if (!logoAnimated) {
          setLogoAnimated(true)
        } else if (currentStory < stories.length - 1) {
          setCurrentStory(currentStory + 1)
          setCurrentSlide(0)
        }
      }
      if (isDownSwipe) {
        if (logoAnimated) {
          setLogoAnimated(false)
        } else if (currentStory > 0) {
          setCurrentStory(currentStory - 1)
          setCurrentSlide(0)
        }
      }
    }
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && currentStory > 0) {
        setCurrentStory(currentStory - 1)
        setCurrentSlide(0)
      }
      if (e.key === "ArrowDown" && currentStory < stories.length - 1) {
        setCurrentStory(currentStory + 1)
        setCurrentSlide(0)
      }
      if (e.key === "ArrowLeft" && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1)
      }
      if (e.key === "ArrowRight") {
        if (currentSlide < story.slides.length - 1) {
          setCurrentSlide(currentSlide + 1)
        } else {
          setCurrentSlide(0)
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentStory, currentSlide, stories.length, story.slides.length])

  // Removed useEffect that reset expandedStory on currentStory change

  useEffect(() => {
    setImageLoaded(false)
  }, [currentStory, currentSlide])

  const handleStoryMeterVote = (side: "left" | "right") => {
    setStoryVotes((prev) => ({
      ...prev,
      [story.id]: {
        left: side === "left" ? (prev[story.id]?.left || 0) + 1 : prev[story.id]?.left || 0,
        right: side === "right" ? (prev[story.id]?.right || 0) + 1 : prev[story.id]?.right || 0,
      },
    }))
  }

  const handleShare = () => {
    setShowShare(true)
    setForwarded((prev) => ({ ...prev, [story.id]: true }))
  }

  const handleTitleClick = () => {
    router.push(`/story?id=${story.id}`)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleCommentsClick = () => {
    console.log("[v0] handleCommentsClick called for story:", currentStory)
    sessionStorage.setItem("impartViewedForStory", currentStory.toString())
    setShowComments(true)
    setCommented((prev) => ({ ...prev, [currentStory]: true }))
  }

  const handleCloseComments = () => {
    setShowComments(false)
  }

  const handleCloseShare = () => {
    setShowShare(false)
  }

  const handleSocialShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`${story.title} - ${story.description}`)

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

  const handleRemoveComment = (commentId: number) => {
    if (confirm("Are you sure you want to remove this comment?")) {
      console.log("[v0] Removing comment:", commentId)
      // In production, this would call an API to remove the comment
    }
  }

  // Handler for unpinning a comment
  const handleUnpinComment = (commentId: number) => {
    console.log("[v0] Unpinning comment:", commentId)
    // In production, this would call an API to unpin the comment
  }

  const handleMeterVote = (commentId: number, side: "left" | "right") => {
    const key = `${currentStory}-${commentId}`
    setCommentVotes((prev) => ({
      ...prev,
      [key]: {
        left: side === "left" ? (prev[key]?.left || 0) + 1 : prev[key]?.left || 0,
        right: side === "right" ? (prev[key]?.right || 0) + 1 : prev[key]?.right || 0,
      },
    }))
  }

  const handleLike = () => {
    setLiked((prev) => ({
      ...prev,
      [story.id]: !prev[story.id],
    }))
  }

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-black pb-16"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-0">
        <Image
          src={currentSlideData.media || "/placeholder.svg"}
          alt={story.title}
          fill
          className="object-cover transition-opacity duration-500"
          style={{ opacity: imageLoaded ? 1 : 0 }}
          onLoad={handleImageLoad}
          priority
        />
        {!imageLoaded && <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />}
      </div>

      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 flex justify-between items-center px-4 py-4">
        <div className="flex-1 flex justify-start">
          <Link
            href={`/user-profile?userId=${allPosts[currentStory]?.userId}`}
            className="flex items-center justify-center"
          >
            <div className="w-14 h-14 flex items-center justify-center">
              <User className="w-8 h-8 active:scale-110 transition-transform opacity-90 text-white" />
            </div>
          </Link>
        </div>

        <div className="relative flex items-center justify-center h-12 px-8">
          <div
            className={`transition-transform duration-700 ease-in-out ${
              logoAnimated ? "-translate-y-16 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            <div style={{ minWidth: "120px", minHeight: "32px" }}>
              <AllnoosLogo variant="white" size="md" animated={true} />
            </div>
          </div>

          <div
            className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
              logoAnimated ? "translate-y-0 opacity-100 scale-100" : "translate-y-16 opacity-0 scale-95"
            }`}
          >
            <div className="flex items-center gap-3 text-white font-medium text-base whitespace-nowrap px-4">
              <span>Local</span>
              <div className="w-px h-5 bg-white/70"></div>
              <span>National</span>
              <div className="w-px h-5 bg-white/70"></div>
              <span>World</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-end">
          <Link href="/wander" className="flex items-center justify-center">
            <div className="w-14 h-14 flex items-center justify-center">
              <Search className="w-8 h-8 active:scale-110 transition-transform opacity-90 text-white" />
            </div>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-16 left-0 right-0 z-10 flex justify-center gap-2 opacity-90">
        {story.slides.map((slide, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      <div className="absolute right-[23px] bottom-28 z-30 flex flex-col items-center justify-end gap-6 opacity-90">
        {/* Like button */}
        <button onClick={handleLike} className="flex flex-col items-center gap-0.5 group">
          <div className="w-14 h-10 flex items-center justify-center">
            <Flame
              strokeWidth={1.75}
              className={`w-8 h-8 transition-all duration-300 opacity-100 ${
                liked[story.id] ? "text-red-500 scale-110" : "text-white group-active:scale-110"
              }`}
            />
          </div>
          <span className="text-sm font-semibold text-white">{story.likes + (liked[story.id] ? 1 : 0)}</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            handleShare()
          }}
          className="flex flex-col items-center gap-0.5 group"
        >
          <div className="w-14 h-10 flex items-center justify-center">
            <svg
              className={`group-active:scale-110 transition-all duration-300 size-[38px] ${
                forwarded[story.id] ? "text-yellow-400" : "text-white"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              style={{ transform: "rotate(80deg)" }}
            >
              <path d="M7 17L17 7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11 7L17 7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 7L17 13" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 17L17 17" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">{story.shares}</span>
        </button>

        <Link
          href={`/impart?id=${story.id}`}
          onClick={handleCommentsClick}
          className="flex flex-col items-center gap-0.5 group"
        >
          <div className="w-14 h-10 flex items-center justify-center">
            <MessageSquareIcon
              className={`group-active:scale-110 transition-all duration-300 size-[30px] drop-shadow-none filter-none ${
                impartViewedStory === currentStory ? "text-blue-600" : "text-white group-active:text-blue-600"
              }`}
              strokeWidth={2}
            />
          </div>
          <span className="text-white text-xs font-semibold">{story.comments}</span>
        </Link>

        {/* Update starts here */}
        <Link href="/camera" className="flex flex-col items-center gap-0.5 group" onClick={(e) => e.stopPropagation()}>
          <div className="w-14 h-10 flex items-center justify-center">
            <Video
              strokeWidth={1.5}
              className="group-active:scale-110 transition-transform duration-200 size-11 text-white"
            />
          </div>
        </Link>
        {/* Update ends here */}
      </div>

      <div className="absolute bottom-24 left-0 right-0 z-20 px-4">
        <div className="mb-4 mr-20">
          <h2
            className="text-white text-xl font-bold cursor-pointer active:text-white/80 transition-colors opacity-90 text-left mb-7"
            onClick={handleTitleClick}
          >
            {story.title}
          </h2>

          <Link
            href={
              isOwner ? `/user-profile?userId=${currentUserId}` : `/profile?userId=${allPosts[currentStory]?.userId}`
            } // Fixed: Use imported/defined currentUserId
            className="flex items-center gap-3"
          >
            <Avatar className="border-2 border-white/80 opacity-100 size-20">
              <AvatarImage className="" src={story.author.avatar || "/placeholder.svg"} alt={story.author.name} />
              <AvatarFallback className="bg-gray-500 text-white text-sm">
                {story.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 flex flex-col justify-center">
              <span className="text-white font-semibold opacity-80 mb-1">{formatName(story.author.name)}</span>
              <span className="text-white/70 text-sm opacity-80 mb-1">{story.timestamp}</span>
              <span className="text-white/70 text-sm opacity-80">{story.location}</span>
            </div>
          </Link>
        </div>
      </div>

      {showComments && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={handleCloseComments}>
          <div
            className={`absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border border-white/60 shadow-xl rounded-t-3xl transition-all duration-1000 ease-out ${
              showComments ? "transform translate-y-0 opacity-100" : "transform translate-y-full opacity-0"
            }`}
            style={{ height: "80vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`p-6 h-full flex flex-col transition-all duration-800 ease-out ${
                showComments ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
              }`}
              style={{
                transitionDelay: showComments ? "400ms" : "0ms",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-stone-900 text-xl font-bold">Comments</h2>
                  <span className="text-stone-700 text-sm">{story.comments}</span>
                </div>
                <button
                  onClick={handleCloseComments}
                  className="text-stone-700 active:text-stone-900 text-2xl font-light"
                >
                  ×
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {story.comments_data.map((comment, commentIndex) => (
                  <div
                    key={comment.id}
                    className={`flex gap-3 transition-all duration-800 ease-out ${
                      showComments ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
                    }`}
                    style={{
                      transitionDelay: showComments ? `${600 + commentIndex * 100}ms` : "0ms",
                    }}
                  >
                    <Avatar className="w-10 h-10 flex-shrink-0">
                      <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                      <AvatarFallback className="bg-gray-500 text-white text-xs">
                        {comment.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-stone-900 font-semibold text-sm">{comment.author}</span>
                        <span className="text-stone-700 text-xs">{comment.timestamp}</span>
                      </div>
                      <p className="text-stone-800 text-sm leading-relaxed mb-2">{comment.content}</p>

                      <div className="flex items-center gap-4">
                        {(() => {
                          const key = `${currentStory}-${comment.id}`
                          const votes = commentVotes[key]
                          const isNeutralState = !votes
                          const displayVotes = votes || { left: 0, right: 0 }
                          const total = displayVotes.left + displayVotes.right

                          let leftPercentage, rightPercentage

                          if (isNeutralState) {
                            leftPercentage = 50
                            rightPercentage = 50
                          } else if (total > 0) {
                            if (displayVotes.left > 0 && displayVotes.right === 0) {
                              leftPercentage = 100
                              rightPercentage = 0
                            } else if (displayVotes.right > 0 && displayVotes.left === 0) {
                              leftPercentage = 0
                              rightPercentage = 100
                            } else {
                              // Both sides have votes, distribute normally
                              leftPercentage = (displayVotes.left / total) * 100
                              rightPercentage = (displayVotes.right / total) * 100
                            }
                          } else {
                            leftPercentage = 50
                            rightPercentage = 50
                          }

                          return (
                            <div className="flex items-center">
                              <svg width="100" height="16" viewBox="0 0 100 16" className="cursor-pointer">
                                <defs>
                                  <clipPath id={`clip-${comment.id}`}>
                                    <rect x="0" y="0" width="100" height="16" rx="8" />
                                  </clipPath>
                                  <linearGradient id={`leftGradient-${comment.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor={isNeutralState ? "#888888" : "#FFD4B3"} />
                                    <stop offset="15%" stopColor={isNeutralState ? "#777777" : "#FFB380"} />
                                    <stop offset="85%" stopColor={isNeutralState ? "#555555" : "#E6804D"} />
                                    <stop offset="100%" stopColor={isNeutralState ? "#444444" : "#CC6633"} />
                                  </linearGradient>
                                  <linearGradient id={`rightGradient-${comment.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor={isNeutralState ? "#888888" : "#A3D45C"} />
                                    <stop offset="15%" stopColor={isNeutralState ? "#777777" : "#7BA428"} />
                                    <stop offset="85%" stopColor={isNeutralState ? "#555555" : "#5A7A1F"} />
                                    <stop offset="100%" stopColor={isNeutralState ? "#444444" : "#4A6619"} />
                                  </linearGradient>
                                  <filter id={`shadow-${comment.id}`} x="-10%" y="-10%" width="120%" height="120%">
                                    <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="rgba(0,0,0,0.4)" />
                                  </filter>
                                  <filter id={`innerShadow-${comment.id}`} x="-10%" y="-10%" width="120%" height="120%">
                                    <feFlood floodColor="rgba(0,0,0,0.2)" />
                                    <feComposite in="SourceGraphic" />
                                    <feGaussianBlur stdDeviation="1" />
                                    <feOffset dx="0" dy="1" />
                                    <feComposite in2="SourceGraphic" operator="multiply" />
                                  </filter>
                                </defs>
                                <g clipPath={`url(#clip-${comment.id})`}>
                                  <rect
                                    x="0"
                                    y="0"
                                    width="50"
                                    height="16"
                                    fill="rgba(255, 255, 255, 0.2)"
                                    stroke="rgba(255, 255, 255, 0.3)"
                                    strokeWidth="0.5"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleMeterVote(comment.id, "left")
                                    }}
                                    className="cursor-pointer"
                                    style={{ filter: "blur(0.5px)" }}
                                  />
                                  <rect
                                    x="50"
                                    y="0"
                                    width="50"
                                    height="16"
                                    fill="rgba(255, 255, 255, 0.2)"
                                    stroke="rgba(255, 255, 255, 0.3)"
                                    strokeWidth="0.5"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleMeterVote(comment.id, "right")
                                    }}
                                    className="cursor-pointer"
                                    style={{ filter: "blur(0.5px)" }}
                                  />
                                  <rect
                                    x="0"
                                    y="0"
                                    width={`${leftPercentage}%`}
                                    height="16"
                                    fill={`url(#leftGradient-${comment.id})`}
                                    filter={`url(#shadow-${comment.id})`}
                                    stroke={isNeutralState ? "#333333" : "#CC6633"}
                                    strokeWidth="0.5"
                                    className="active:brightness-110 transition-all pointer-events-none"
                                  />
                                  <rect
                                    x={`${leftPercentage}%`}
                                    y="0"
                                    width={`${rightPercentage}%`}
                                    height="16"
                                    fill={`url(#rightGradient-${comment.id})`}
                                    filter={`url(#shadow-${comment.id})`}
                                    stroke={isNeutralState ? "#333333" : "#4A6619"}
                                    strokeWidth="0.5"
                                    className="active:brightness-110 transition-all pointer-events-none"
                                  />
                                  {!isNeutralState && (
                                    <path
                                      d={`M${leftPercentage} 0 Q${leftPercentage - 2} 8 ${leftPercentage} 16`}
                                      stroke={leftPercentage > 50 ? "#E6804D" : "#5A7A1F"}
                                      strokeWidth="1.5"
                                      fill="none"
                                      className="transition-all duration-300"
                                    />
                                  )}
                                </g>
                                {isNeutralState ? (
                                  <>
                                    <path
                                      d="M15 10 Q25 6 35 10"
                                      stroke="white"
                                      strokeWidth="1.5"
                                      fill="none"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d="M65 6 Q75 10 85 6"
                                      stroke="white"
                                      strokeWidth="1.5"
                                      fill="none"
                                      strokeLinecap="round"
                                    />
                                  </>
                                ) : (
                                  <>
                                    <text x="12" y="12" fill="white" fontSize="12" fontWeight="500">
                                      {displayVotes.left}
                                    </text>
                                    <text x="88" y="12" fill="white" fontSize="12" fontWeight="500" textAnchor="end">
                                      {displayVotes.right}
                                    </text>
                                  </>
                                )}
                              </svg>
                            </div>
                          )
                        })()}
                        <button className="text-stone-700 active:text-stone-900 transition-colors">Reply</button>
                        {isOwner && (
                          <>
                            <button
                              onClick={() => handleUnpinComment(comment.id)}
                              className="text-blue-600 active:text-blue-700 transition-colors flex items-center gap-1 text-sm"
                            >
                              <PinOff className="w-3.5 h-3.5" />
                              Unpin
                            </button>
                            <button
                              onClick={() => handleRemoveComment(comment.id)}
                              className="text-red-600 active:text-red-700 transition-colors flex items-center gap-1 text-sm"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Remove
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-stone-300">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg" alt="You" />
                  <AvatarFallback className="bg-gray-500 text-white text-xs">You</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 bg-white/70 backdrop-blur-sm border border-white/60 rounded-full px-4 py-2 text-stone-900 placeholder-stone-600 text-sm focus:outline-none focus:border-stone-400"
                  />
                  <button className="text-stone-700 active:text-stone-900 transition-colors">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-start">
          <div className="absolute inset-0" onClick={handleCloseShare} />
          <div
            className="relative bg-background/95 backdrop-blur-sm border border-border shadow-2xl w-20 flex flex-col rounded-r-2xl"
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
    </div>
  )
}

export default function FeedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <AllnoosLogo variant="white" size="md" />
        </div>
      }
    >
      <FeedPageContent />
    </Suspense>
  )
}
