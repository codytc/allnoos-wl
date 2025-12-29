"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { ChevronLeft, Flame, Search, CoinsIcon, Trash2, MessageSquare, Ban, Flag, ShirtIcon } from "lucide-react" // Updated ArrowLeft to ChevronLeft with slate-600 color
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import AllnoosLogo from "@/components/allnoos-logo"
import { allPosts, userProfiles } from "@/lib/mock-data"
import { validateStoryOwnership, getStoryWithOwnership } from "@/lib/story-validation"
import { useState, useEffect, useRef } from "react"
import { useToast } from "@/hooks/use-toast"

interface Update {
  id: number
  text: string
  timestamp: Date
}

export default function ArticlePage() {
  const [liked, setLiked] = useState(false)
  const [forwarded, setForwarded] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [touchedArticle, setTouchedArticle] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [removingArticleId, setRemovingArticleId] = useState<number | null>(null)
  const [showUpdateInput, setShowUpdateInput] = useState(false)
  const [keepInLoop, setKeepInLoop] = useState(false)
  const [updateText, setUpdateText] = useState("")
  const [updates, setUpdates] = useState<Update[]>([])

  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)
  const akinToRef = useRef<HTMLDivElement>(null)
  const updateInputRef = useRef<HTMLInputElement>(null)

  const searchParams = useSearchParams()
  const router = useRouter()
  const storyId = searchParams.get("id")
  const { toast } = useToast()

  const currentUserId = 1 // This represents the logged in user (Sarah Chen)

  const storyData = storyId ? getStoryWithOwnership(Number(storyId)) : null
  const post = storyData?.story
  const user = storyData?.owner

  const isOwner = post && post.userId === currentUserId

  useEffect(() => {
    if (storyId && post) {
      console.log(`[v0] Viewing story ${storyId} by user ${post.userId} (${user?.name})`)
      console.log(`[v0] Current user: ${currentUserId} (Sarah Chen)`)
      console.log(`[v0] Is owner: ${isOwner}`)
    }
  }, [storyId, post, user, isOwner, currentUserId])

  useEffect(() => {
    if (showUpdateInput && updateInputRef.current) {
      updateInputRef.current.focus()
    }
  }, [showUpdateInput])

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      // Check if touch is within the Akin To section
      const target = e.target as HTMLElement
      const isInAkinTo = akinToRef.current?.contains(target)

      if (isInAkinTo) {
        // Allow horizontal scrolling in Akin To section
        return
      }

      const touchX = e.touches[0].clientX
      const touchY = e.touches[0].clientY

      const deltaX = Math.abs(touchX - touchStartX.current)
      const deltaY = Math.abs(touchY - touchStartY.current)

      // If horizontal movement is greater than vertical, prevent it
      if (deltaX > deltaY && deltaX > 10) {
        e.preventDefault()
      }
    }

    document.addEventListener("touchstart", handleTouchStart, { passive: true })
    document.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  if (!post || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Article not found</p>
      </div>
    )
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

  const formatUpdateTimestamp = (date: Date): string => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const month = months[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()

    let hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? "pm" : "am"
    hours = hours % 12
    hours = hours ? hours : 12
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes

    return `${month} ${day}, ${year} • ${hours}:${minutesStr}${ampm}`
  }

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

  const handleLike = () => {
    setLiked((prev) => !prev)
  }

  const handleShare = () => {
    setShowShare(true)
    setForwarded(true)
  }

  const handleCloseShare = () => {
    setShowShare(false)
  }

  const handleSocialShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`${post.title} - ${post.description}`)

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

  const handleArticleTouchStart = (articleId: number) => {
    setTouchedArticle(articleId)
  }

  const handleArticleTouchEnd = () => {
    setTouchedArticle(null)
  }

  const handleArticleTouchCancel = () => {
    setTouchedArticle(null)
  }

  const handleEditStory = () => {
    if (!validateStoryOwnership(post.id, currentUserId)) {
      console.error("[v0] Cannot edit story - not the owner")
      return
    }
    router.push(`/create?edit=${post.id}`)
  }

  const handleToggleUpdateInput = () => {
    setShowUpdateInput(!showUpdateInput)
    if (showUpdateInput) {
      // If closing, clear the input
      setUpdateText("")
    }
  }

  const handleSaveUpdate = () => {
    if (updateText.trim()) {
      const newUpdate: Update = {
        id: Date.now(),
        text: updateText.trim(),
        timestamp: new Date(),
      }
      setUpdates([...updates, newUpdate])
      setUpdateText("")
      setShowUpdateInput(false)

      toast({
        title: "Update Added",
        description: "Your story update has been saved.",
        duration: 2000,
      })
    } else {
      // If empty, just close
      setShowUpdateInput(false)
    }
  }

  const handleRemoveArticle = async (articleId: number) => {
    if (!validateStoryOwnership(articleId, currentUserId)) {
      console.error("[v0] Cannot remove article - not the owner")
      return
    }

    // Set removing state for visual feedback
    setRemovingArticleId(articleId)

    try {
      console.log("[v0] Step 1: Canceling promotion for article:", articleId)

      // Step 1: Cancel the promotion (API call simulation)
      await new Promise((resolve) => setTimeout(resolve, 300))
      console.log("[v0] Promotion canceled successfully")

      // Step 2: Cancel payment transaction
      console.log("[v0] Step 2: Canceling payment transaction for article:", articleId)
      await new Promise((resolve) => setTimeout(resolve, 200))
      console.log("[v0] Payment transaction canceled successfully")

      // Step 3: Remove article from the list
      console.log("[v0] Step 3: Removing article from 'Go Beyond' section")

      // Step 4: Find another story to navigate to
      const remainingArticles = relatedArticles.filter((a) => a.id !== articleId)

      // Show success toast
      toast({
        title: "Promotion Removed",
        description: "The paid promotion has been canceled and payment reversed.",
        duration: 3000,
      })

      // Step 5: Navigate to another story seamlessly
      if (remainingArticles.length > 0) {
        // Navigate to the first remaining article
        const nextStory = remainingArticles[0]
        console.log("[v0] Step 4: Navigating to next story:", nextStory.id)

        // Smooth transition with a brief delay for user feedback
        setTimeout(() => {
          router.push(`/story?id=${nextStory.id}`)
        }, 500)
      } else {
        // If no more articles, navigate back to feed
        console.log("[v0] Step 4: No more articles, navigating to feed")
        setTimeout(() => {
          router.push("/feed")
        }, 500)
      }

      console.log("[v0] Promotion removal workflow completed successfully")
    } catch (error) {
      console.error("[v0] Error during promotion removal:", error)
      toast({
        title: "Error",
        description: "Failed to remove promotion. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
      setRemovingArticleId(null)
    }
  }

  const relatedArticles = allPosts
    .filter((p) => {
      // Only show stories from the same author
      if (p.userId !== post.userId) return false
      // Don't show the current story
      if (p.id === post.id) return false
      // Validate the story belongs to the correct user
      return validateStoryOwnership(p.id, p.userId)
    })
    .slice(0, 4)
    .map((p) => {
      const author = userProfiles.find((u) => u.id === p.userId)
      return {
        id: p.id,
        title: p.title,
        description: p.description,
        thumbnail: p.thumbnail,
        author: author?.name || "Unknown",
        views: `${Math.floor(p.views / 1000)}K`,
        timestamp: formatTimestamp(new Date(p.timestamp)),
      }
    })

  return (
    <div className="min-h-screen bg-background">
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="headerCurveClipStory" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 1,0 L 1,0.757 C 0.861,0.820 0.639,0.805 0.5,0.758 C 0.361,0.704 0.139,0.704 0,0.757 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="sticky top-0 z-50 bg-background pb-8" style={{ clipPath: "url(#headerCurveClipStory)" }}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-1.5">
            {/* CHANGE: Updated button style to match wander page */}
            <button
              onClick={() => router.back()}
              className="rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] bg-white/20 border border-white/30 p-2.5"
            >
              <ChevronLeft className="size-5 text-stone-600" />
            </button>

            <div className="relative flex items-center justify-center h-12 px-8">
              {/* CHANGE: Updated mt-0 to mt-[22px] to position STORY text above "noos" like on impart page */}
              <div className="absolute top-[-18px] left-[50%] transform translate-x-[-10px] z-10 italic text-xs tracking-tighter my-[22px] mb-0 mt-[22px] mr-0 ml-[-8px]">
                <span className="ml-[-1px] mb-0 mt-0 font-medium tracking-tighter text-xs text-slate-600">STORY</span>
              </div>
              <div style={{ minWidth: "120px", minHeight: "32px" }}>
                <AllnoosLogo variant="default" size="md" onClick={() => router.push("/feed")} />
              </div>
            </div>

            <div className="w-10"></div>
          </div>

          <div className="flex items-start gap-5 mb-3">
            <div
              className={`relative transition-all duration-300 ease-in-out ${isSearchFocused ? "w-full" : "w-full max-w-[200px]"}`}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder={isSearchFocused ? "Seek... and you shall find" : "Seek..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="pl-10 pr-3 text-slate-400 placeholder:text-slate-400 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus:border-input focus-visible:border-input focus:shadow-[inset_0_0_16px_rgba(253,180,132,0.35)] rounded-lg transition-all duration-300 text-sm"
              />
            </div>

            <button
              onClick={handleLike}
              className={`flex flex-col items-center gap-0.5 group transition-all duration-300 ${isSearchFocused ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}
            >
              <div className="h-6 flex items-center justify-center">
                <Flame
                  className={`transition-all duration-300 size-6 ${
                    liked ? "text-red-500 scale-110" : "text-slate-600 group-hover:text-red-500"
                  }`}
                />
              </div>
              <span className="font-semibold text-xs text-slate-600">{post.likes}</span>
            </button>

            <button
              onClick={handleShare}
              className={`flex flex-col items-center gap-0.5 group transition-all duration-300 ${isSearchFocused ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}
            >
              <div className="h-6 flex items-start justify-center">
                <svg
                  className={`group-hover:text-yellow-500 transition-all duration-300 size-[30px] pt-0 pb-0 mb-0 mt-[-4px] ${
                    forwarded ? "text-yellow-400" : "text-slate-600"
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ transform: "rotate(80deg)" }}
                >
                  <path className="" d="M7 17L17 7" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M11 7L17 7" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17 7L17 13" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 17L17 17" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-semibold text-xs text-slate-600">{post.shares}</span>
            </button>

            <Link
              href={`/impart?id=${post.id}`}
              className={`flex flex-col items-center gap-0.5 group transition-all duration-300 ${isSearchFocused ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}
            >
              <div className="h-6 flex items-center justify-center">
                <MessageSquare className="transition-all duration-300 text-slate-600 group-hover:text-blue-500 size-[23px] pt-0 mt-0.5" />
              </div>
              <span className="font-semibold text-xs text-slate-600">{post.comments}</span>
            </Link>
          </div>
        </div>
        <div className="w-full h-8 relative -mb-8 flex items-end z-30" style={{ transform: "translateY(-30px)" }}>
          <svg
            viewBox="0 0 1440 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-6"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="curvedLineGradientStory" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="15%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="85%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
            </defs>
            <path
              d="M 0,25 C 200,5 520,5 720,25 C 920,45 1240,45 1440,25"
              stroke="url(#curvedLineGradientStory)"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Article Content */}
      <div className="p-4" style={{ transform: "translateY(-30px)" }}>
        <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>

        <Link href={`/user-profile?id=${user.id}`} className="block">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50/50 transition-colors rounded-lg p-2 -m-2">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-gray-500 text-white text-sm">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
              <span className="text-gray-900 font-semibold mb-1 text-sm">{user.name}</span>
              <span className="text-gray-600 text-xs mb-1">{formatTimestamp(new Date(post.timestamp))}</span>
              <span className="text-gray-600 text-xs">{post.location || "Unknown"}</span>
            </div>
          </div>
        </Link>

        <div className="prose prose-base max-w-none">
          {longForm.split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-gray-800 leading-relaxed mb-3 text-base">
              {paragraph}
            </p>
          ))}
        </div>

        {updates.length > 0 && (
          <div className="mt-6 space-y-3">
            {updates.map((update) => (
              <div key={update.id} className="border-l-4 border-primary/40 pl-4 py-2 bg-muted/30 rounded-r">
                <div className="text-xs font-semibold text-primary mb-1">
                  UPDATE: {formatUpdateTimestamp(update.timestamp)}
                </div>
                <p className="text-sm text-gray-800 leading-relaxed">{update.text}</p>
              </div>
            ))}
          </div>
        )}

        {isOwner && showUpdateInput && (
          <div className="mt-4 p-4 border border-primary/30 rounded-lg bg-background/50 backdrop-blur-sm shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="text-sm font-semibold text-primary mb-2">UPDATE: {formatUpdateTimestamp(new Date())}</div>
            <input
              ref={updateInputRef}
              type="text"
              value={updateText}
              onChange={(e) => setUpdateText(e.target.value)}
              onBlur={handleSaveUpdate}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveUpdate()
                } else if (e.key === "Escape") {
                  setUpdateText("")
                  setShowUpdateInput(false)
                }
              }}
              placeholder="Type your update here..."
              className="w-full px-3 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
            />
            <div className="mt-2 text-xs text-muted-foreground">
              Press Enter or click outside to save • Press Esc to cancel
            </div>
          </div>
        )}

        {/* Story credits section below article text */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h3 className="text-stone-900 font-bold mb-3 text-lg">Story Credits</h3>
          <div className="flex flex-wrap gap-2">
            <Link href={`/user-profile?id=${userProfiles.find((u) => u.name === "Sarah Mitchell")?.id || 2}`}>
              <div className="flex items-center border border-primary/20 rounded-lg bg-background/90 backdrop-blur-sm shadow-sm py-1.5 px-3 cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-colors">
                <span className="text-xs font-medium text-muted-foreground">Sarah Mitchell</span>
              </div>
            </Link>
            <Link href={`/user-profile?id=${userProfiles.find((u) => u.name === "David Chen")?.id || 3}`}>
              <div className="flex items-center border border-primary/20 rounded-lg bg-background/90 backdrop-blur-sm shadow-sm py-1.5 px-3 cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-colors">
                <span className="text-xs font-medium text-muted-foreground">David Chen</span>
              </div>
            </Link>
            <Link href={`/user-profile?id=${userProfiles.find((u) => u.name === "Emily Rodriguez")?.id || 4}`}>
              <div className="flex items-center border border-primary/20 rounded-lg bg-background/90 backdrop-blur-sm shadow-sm py-1.5 px-3 cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-colors">
                <span className="text-xs font-medium text-muted-foreground">Emily Rodriguez</span>
              </div>
            </Link>
          </div>
        </div>

        {relatedArticles.length > 0 && (
          <section className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-stone-900 text-lg font-bold">Furthermore</h2>
              <div className="flex-1"></div>
              {/* REMOVED !isOwner check so the button is visible for both creators and users */}
              <button className="rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] bg-white/20 border border-white/30 p-2.5">
                <CoinsIcon className="size-5 text-stone-600" />
              </button>
            </div>
            <div
              ref={akinToRef}
              className="overflow-x-auto overflow-y-hidden -mx-4 scrollbar-hide px-4"
              style={{ touchAction: "pan-x" }}
            >
              <div className="flex gap-3 pb-2">
                {relatedArticles.map((article) => {
                  const isTouched = touchedArticle === article.id

                  return (
                    <div key={article.id} className="relative">
                      <Link href={`/story?id=${article.id}`}>
                        <div
                          className={`shadow-none cursor-pointer transition-all duration-200 touch-manipulation group relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 border rounded-lg p-0 w-[calc(100vw-3rem)] max-w-[400px] flex-shrink-0 flex flex-col h-80 px-0 ${
                            isTouched
                              ? "scale-[0.98] border-white/50"
                              : "hover:scale-[0.98] border-primary/20 hover:border-white/50"
                          }`}
                          onTouchStart={() => handleArticleTouchStart(article.id)}
                          onTouchEnd={handleArticleTouchEnd}
                          onTouchCancel={handleArticleTouchCancel}
                        >
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
                            className={`absolute inset-0 pointer-events-none transition-opacity duration-200 z-30 rounded-lg ${
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
                                borderTop: "1px solid rgba(255, 255, 255, 0.24)",
                                borderRight: "1px solid rgba(255, 255, 255, 0.24)",
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
                                borderBottom: "1.5px solid rgba(255, 255, 255, 0.28)",
                                borderLeft: "1.5px solid rgba(255, 255, 255, 0.28)",
                                borderRadius: "100%",
                                clipPath:
                                  "polygon(0 0, 1.5px 0, 1.5px calc(100% - 1.5px), 100% calc(100% - 1.5px), 100% 100%, 0 100%, 0 calc(100% - 1.5px), calc(100% - 1.5px) calc(100% - 1.5px), calc(100% - 1.5px) 0, 100% 0, 100% 100%)",
                              }}
                            />
                            <div
                              className="absolute bottom-4 right-4 w-12 h-12 rounded-full"
                              style={{
                                background: "transparent",
                                borderBottom: "1.5px solid rgba(255, 255, 255, 0.26)",
                                borderRight: "1.5px solid rgba(255, 255, 255, 0.26)",
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

                          <div className="relative h-56 flex-shrink-0">
                            <div
                              className="w-full h-full bg-cover bg-center"
                              style={{ backgroundImage: `url(${article.thumbnail})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% via-transparent via-60% to-background to-95% mb-0" />
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <div className="absolute top-4 left-4 z-10">
                              <h3 className="font-bold text-xl text-white mb-1 tracking-tight leading-tight drop-shadow-lg line-clamp-2">
                                {article.title}
                              </h3>
                            </div>
                          </div>
                          <div className="p-5 relative mt-[-120px] pt-[85px] flex-1 flex flex-col pb-4 pl-1.5 pr-1.5">
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-3">
                              {article.description}
                            </p>
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex flex-nowrap items-center gap-2 border border-primary/20 rounded-l-lg bg-background/90 backdrop-blur-sm shadow-sm rounded-lg mr-0 py-1 whitespace-nowrap ml-1 px-3">
                                <span className="text-xs font-medium text-muted-foreground">{article.author}</span>
                                <span className="text-xs text-muted-foreground">•</span>
                                <span className="text-xs font-medium text-muted-foreground">{article.timestamp}</span>
                              </div>
                            </div>
                          </div>

                          {isOwner && (
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                handleRemoveArticle(article.id)
                              }}
                              disabled={removingArticleId === article.id}
                              className={`absolute bottom-2 right-2 z-30 w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-md border shadow-lg hover:bg-green-500/30 active:scale-110 transition-all duration-300 mr-1 mb-1 bg-background border-border ${
                                removingArticleId === article.id ? "opacity-50 cursor-not-allowed animate-pulse" : ""
                              }`}
                            >
                              <Trash2
                                className={`w-4 h-4 text-green-600 ${
                                  removingArticleId === article.id ? "animate-spin" : ""
                                }`}
                              />
                            </button>
                          )}
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Share panel UI */}
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
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .157 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                  </svg>
                </button>

                <div className="w-8 h-px bg-border my-1 rounded-full"></div>

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
