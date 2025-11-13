"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, Flame, AmpersandIcon, Search, CornerLeftUpIcon } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import AllnoosLogo from "@/components/allnoos-logo"
import { allPosts, userProfiles } from "@/lib/mock-data"
import { useState, useRef, useEffect } from "react"

const generateComments = (post: any) => {
  const commentAuthors = [
    { name: "Alex Rivera", avatar: "/male-journalist.png" },
    { name: "Maria Santos", avatar: "/female-journalist.png" },
    { name: "Dr. James Wilson", avatar: "/professional-woman-headshot.png" },
    { name: "Lisa Chen", avatar: "/female-journalist.png" },
    { name: "Marcus Johnson", avatar: "/male-journalist.png" },
    { name: "Sarah Kim", avatar: "/female-journalist.png" },
    { name: "Prof. David Lee", avatar: "/professional-woman-headshot.png" },
    { name: "Emma Rodriguez", avatar: "/female-journalist.png" },
  ]

  const generateStorySpecificComments = () => {
    const title = post.title.toLowerCase()
    const description = post.description.toLowerCase()

    // Create unique comments based on specific story content
    const comments = []

    // Geothermal energy story
    if (title.includes("geothermal") || description.includes("geothermal")) {
      comments.push({
        content:
          "Iceland's geothermal infrastructure is decades ahead of most countries. The Hellisheiði Power Station alone generates 303 MW of electricity and 400 MW of thermal energy. What's fascinating is how they've integrated this into district heating systems - over 90% of Reykjavik's homes are heated this way. The initial investment was massive, but the ROI over 30 years makes it incredibly cost-effective.",
        elucidations: [
          {
            author: "Maria Santos",
            content:
              "The key challenge for other countries is the geological requirements. You need specific tectonic conditions that Iceland has naturally. However, enhanced geothermal systems (EGS) technology is making it possible to create artificial reservoirs in more locations.",
            timestamp: "2h ago",
          },
          {
            author: "Dr. James Wilson",
            content:
              "I've been researching geothermal potential in the western US. The Geysers in California is the world's largest geothermal field, but we're barely scratching the surface of what's possible with modern drilling technology.",
            timestamp: "1h ago",
          },
        ],
      })
      comments.push({
        content:
          "The environmental impact comparison is striking. A geothermal plant produces about 122 kg of CO2 per megawatt-hour, compared to 1,000 kg for coal. Plus, the land footprint is minimal - a geothermal plant uses 404 square meters per GWh versus 3,632 for coal. The steam you see rising isn't pollution, it's just water vapor being released back into the atmosphere.",
        elucidations: [
          {
            author: "Lisa Chen",
            content:
              "And unlike solar or wind, geothermal provides baseload power 24/7. Capacity factors are typically 90-95% compared to 25-30% for solar. That reliability is crucial for grid stability.",
            timestamp: "3h ago",
          },
        ],
      })
      comments.push({
        content:
          "What's not mentioned enough is the secondary benefits. The mineral-rich brine from geothermal wells contains lithium, silica, and other valuable elements. Companies are now extracting these as byproducts, creating additional revenue streams. Iceland's Blue Lagoon spa is literally powered by waste heat from the Svartsengi geothermal plant.",
        elucidations: [
          {
            author: "Marcus Johnson",
            content:
              "The lithium extraction angle is huge. With EV battery demand skyrocketing, geothermal brine could become a major domestic lithium source for countries with geothermal resources.",
            timestamp: "4h ago",
          },
          {
            author: "Sarah Kim",
            content:
              "Japan is pioneering this approach. They're extracting lithium from geothermal brine in Kyushu. Could be a game-changer for their battery industry.",
            timestamp: "3h ago",
          },
        ],
      })
    }

    // Community composting story
    else if (title.includes("compost") || description.includes("compost")) {
      comments.push({
        content:
          "The methane reduction aspect is critical. When organic waste decomposes in landfills without oxygen, it produces methane - a greenhouse gas 28 times more potent than CO2. Composting that same waste aerobically produces virtually no methane. If every US household composted food scraps, we'd reduce emissions equivalent to taking 7.8 million cars off the road.",
        elucidations: [
          {
            author: "Maria Santos",
            content:
              "San Francisco's mandatory composting program has diverted over 2.4 million tons of organic waste from landfills since 2009. Their landfill diversion rate is now 80%, highest of any major US city.",
            timestamp: "2h ago",
          },
          {
            author: "Dr. James Wilson",
            content:
              "The finished compost also sequesters carbon in soil. Studies show compost-amended soil can store 0.5-1.5 tons of CO2 per acre per year. It's a double benefit.",
            timestamp: "1h ago",
          },
        ],
      })
      comments.push({
        content:
          "What makes community composting work is the social aspect. When neighbors see each other participating, it normalizes the behavior. We've seen participation rates jump from 30% to 75% once a critical mass is reached. The key is making it convenient - curbside pickup or drop-off sites within a 5-minute walk.",
        elucidations: [
          {
            author: "Lisa Chen",
            content:
              "The education component matters too. Many people don't know what can be composted. Meat, dairy, and oils are often excluded from home composting but can go in municipal systems with proper processing.",
            timestamp: "3h ago",
          },
        ],
      })
      comments.push({
        content:
          "The economics are interesting. Municipal composting costs $30-50 per ton to process, while landfilling costs $35-75 per ton when you factor in transportation and tipping fees. Plus, the finished compost sells for $15-40 per cubic yard. Some cities are actually making money on their composting programs.",
        elucidations: [
          {
            author: "Marcus Johnson",
            content:
              "And that's before considering the avoided costs of methane capture systems at landfills, which can run into millions for large facilities.",
            timestamp: "4h ago",
          },
          {
            author: "Sarah Kim",
            content:
              "The compost also reduces the need for chemical fertilizers. Farmers pay $300-500 per ton for synthetic fertilizer. High-quality compost provides similar nutrients at a fraction of the cost.",
            timestamp: "3h ago",
          },
        ],
      })
    }

    // Glacier melting story
    else if (title.includes("glacier") || description.includes("glacier")) {
      comments.push({
        content:
          "Iceland has lost 750 cubic kilometers of ice since 1995 - about 11% of its total ice cap volume. Okjökull was the first glacier to lose its status in 2014, and scientists predict 400+ more will follow by 2200. The feedback loop is accelerating: less ice means less sunlight reflected, which means more warming, which means faster melting.",
        elucidations: [
          {
            author: "Maria Santos",
            content:
              "The sea level impact from Iceland alone is measurable. Vatnajökull, Europe's largest glacier, is losing 10 billion tons of ice annually. That's enough to raise global sea levels by 0.03mm per year just from one glacier.",
            timestamp: "2h ago",
          },
          {
            author: "Dr. James Wilson",
            content:
              "What's alarming is the non-linear acceleration. Melting rates have tripled since 2000. We're not seeing gradual change - we're seeing exponential acceleration.",
            timestamp: "1h ago",
          },
        ],
      })
      comments.push({
        content:
          "The human impact is profound. Glacial rivers provide hydroelectric power for 75% of Iceland's electricity. As glaciers shrink, river flows become more variable, threatening energy security. Plus, glacial meltwater is a crucial freshwater source for millions globally - the Himalayas feed rivers supporting 2 billion people.",
        elucidations: [
          {
            author: "Lisa Chen",
            content:
              "The tourism economy is affected too. Glacier tours generate $200+ million annually for Iceland. As glaciers become less accessible or disappear, that revenue vanishes.",
            timestamp: "3h ago",
          },
        ],
      })
      comments.push({
        content:
          "The geological consequences are underappreciated. As ice weight is removed, the land rebounds - Iceland is rising 1-2 cm per year. This isostatic rebound can trigger volcanic activity. Scientists are monitoring increased seismic activity under former glacier areas. We could see more eruptions as the ice continues to melt.",
        elucidations: [
          {
            author: "Marcus Johnson",
            content:
              "The 2010 Eyjafjallajökull eruption that disrupted European air travel was partly attributed to glacial melting reducing pressure on the magma chamber. This could become more common.",
            timestamp: "4h ago",
          },
          {
            author: "Sarah Kim",
            content:
              "There's also the issue of glacial lake outburst floods (GLOFs). As glaciers melt, they form unstable lakes that can suddenly release, causing catastrophic flooding downstream.",
            timestamp: "3h ago",
          },
        ],
      })
    }

    // Default: Generate generic but still relevant comments
    else {
      comments.push({
        content: `The depth of research here is evident. ${post.description} This kind of thorough investigation takes time and resources that many outlets no longer invest in. The sourcing is transparent, the methodology is sound, and the conclusions are well-supported by the evidence presented.`,
        elucidations: [
          {
            author: "Maria Santos",
            content:
              "The attention to detail really stands out. You can tell the reporter spent significant time understanding the nuances rather than just skimming the surface.",
            timestamp: "2h ago",
          },
          {
            author: "Dr. James Wilson",
            content:
              "This is the standard all journalism should aspire to. Facts over sensationalism, context over clickbait.",
            timestamp: "1h ago",
          },
        ],
      })
      comments.push({
        content: `What strikes me most is how this connects to broader trends we're seeing. The implications extend beyond just this immediate situation - there are systemic issues at play that deserve ongoing coverage and analysis.`,
        elucidations: [
          {
            author: "Lisa Chen",
            content:
              "Exactly. This isn't happening in isolation. When you look at the pattern across multiple communities, you start to see the bigger picture.",
            timestamp: "3h ago",
          },
        ],
      })
      comments.push({
        content: `I'd love to see a follow-up on this in 6 months. The situation is clearly evolving, and tracking how it develops over time would provide valuable longitudinal data. Too often we get snapshot reporting without the follow-through.`,
        elucidations: [
          {
            author: "Marcus Johnson",
            content:
              "Agreed. The real story often emerges in the aftermath, not just the initial event. Sustained coverage is what separates good journalism from great journalism.",
            timestamp: "4h ago",
          },
          {
            author: "Sarah Kim",
            content:
              "This is why local journalism matters. National outlets move on to the next story, but local reporters stay with it and see it through.",
            timestamp: "3h ago",
          },
        ],
      })
    }

    return comments
  }

  const storyComments = generateStorySpecificComments()

  return storyComments.map((template, i) => ({
    id: i + 1,
    author: commentAuthors[i % commentAuthors.length].name,
    avatar: commentAuthors[i % commentAuthors.length].avatar,
    content: template.content,
    timestamp: `${Math.floor(Math.random() * 8) + 1}h ago`,
    likes: Math.floor(Math.random() * 150) + 20,
    elucidations: template.elucidations.map((eluc, j) => ({
      id: `${i + 1}-${j + 1}`,
      author: eluc.author,
      avatar: commentAuthors.find((a) => a.name === eluc.author)?.avatar || "/placeholder.svg",
      content: eluc.content,
      timestamp: eluc.timestamp,
    })),
  }))
}

export default function ExpositionsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const storyId = searchParams.get("id")

  const post = allPosts.find((p) => p.id === Number(storyId))
  const user = post ? userProfiles.find((u) => u.id === post.userId) : null

  const [liked, setLiked] = useState(false)
  const [forwarded, setForwarded] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [commentVotes, setCommentVotes] = useState<{ [key: string]: { left: number; right: number } }>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [expandedElucidations, setExpandedElucidations] = useState<{ [key: number]: boolean }>({})
  const [replyingToComment, setReplyingToComment] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")
  const [comments, setComments] = useState(() => generateComments(post))
  const [mainCommentText, setMainCommentText] = useState("")
  const lastCommentRef = useRef<HTMLDivElement>(null)
  const [shouldScrollToLast, setShouldScrollToLast] = useState(false)
  const visibleComments = comments

  useEffect(() => {
    if (shouldScrollToLast && lastCommentRef.current) {
      lastCommentRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
      setShouldScrollToLast(false)
    }
  }, [shouldScrollToLast, comments])

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

  const handleMeterVote = (commentId: number, side: "left" | "right") => {
    const key = `${post.id}-${commentId}`
    setCommentVotes((prev) => ({
      ...prev,
      [key]: {
        left: side === "left" ? (prev[key]?.left || 0) + 1 : prev[key]?.left || 0,
        right: side === "right" ? (prev[key]?.right || 0) + 1 : prev[key]?.right || 0,
      },
    }))
  }

  const toggleReplyInput = (commentId: number) => {
    setReplyingToComment((prev) => (prev === commentId ? null : commentId))
  }

  const toggleExpandElucidations = (commentId: number) => {
    setExpandedElucidations((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }

  const handleSubmitReply = (commentId: number) => {
    if (replyText.trim()) {
      const newElucidation = {
        id: `${commentId}-${Date.now()}`,
        author: "You",
        avatar: "/male-journalist.png",
        content: replyText.trim(),
        timestamp: "Just now",
      }

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                elucidations: [...comment.elucidations, newElucidation],
              }
            : comment,
        ),
      )

      setReplyText("")
      setReplyingToComment(null)
      setExpandedElucidations((prev) => ({
        ...prev,
        [commentId]: true,
      }))
    }
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
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
    setShowShare(false)
  }

  const handlePostComment = () => {
    if (mainCommentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: "You",
        avatar: "/male-journalist.png",
        content: mainCommentText.trim(),
        timestamp: "Just now",
        likes: 0,
        elucidations: [],
      }

      setComments((prevComments) => [...prevComments, newComment])
      setMainCommentText("")
      setShouldScrollToLast(true)
    }
  }

  // If post or user is not found, render a loading or error state (simplified for this example)
  if (!post || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p>Loading post...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden max-w-md mx-auto">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border max-w-md mx-auto">
        <div className="p-3">
          <div className="flex justify-between items-center mb-3">
            <div className="flex-1">
              <button
                onClick={() => router.back()}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
                <ArrowLeft className="w-5 h-5 text-primary group-active:text-primary/80 relative z-10" />
              </button>
            </div>
            <div className="flex justify-center">
              <Link href="/feed">
                <div className="relative flex items-center justify-center h-12 px-8">
                  <div className="absolute top-[3px] left-[50%] transform translate-x-[-10px] z-10 italic text-xs tracking-tighter my-[22px] mb-0 mt-0 mr-0 ml-[-8px]">
                    <span className="text-stone-600 ml-[-1px] mb-0 mt-0 font-medium tracking-tighter text-xs">
                      IMPART
                    </span>
                  </div>
                  <div style={{ minWidth: "120px", minHeight: "32px" }}>
                    <AllnoosLogo variant="default" size="md" onClick={() => {}} />
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex-1"></div>
          </div>
          <div className="flex items-center gap-10 justify-between">
            <div className={`relative transition-all duration-300 ease-in-out ${isSearchFocused ? "w-full" : "w-3/5"}`}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={isSearchFocused ? "Seek... and you shall find" : "Seek..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="pl-10 pr-3 text-sm focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus:border-input focus-visible:border-input focus:shadow-[inset_0_0_16px_rgba(253,180,132,0.35)] rounded-lg transition-all duration-300"
              />
            </div>
            <div
              className={`flex items-center transition-all duration-300 gap-10 ${isSearchFocused ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}
            >
              {/* Like button */}
              <button onClick={handleLike} className="flex flex-col items-center gap-0.5 group">
                <Flame
                  className={`transition-all duration-300 size-7 ${
                    liked ? "text-red-500 scale-110" : "text-gray-600 group-hover:text-red-500"
                  }`}
                />
                <span className="font-semibold text-xs text-muted-foreground">{post.likes + (liked ? 1 : 0)}</span>
              </button>

              {/* Share button */}
              <button onClick={handleShare} className="flex flex-col items-center gap-0.5 group">
                <svg
                  className={`group-hover:text-yellow-500 transition-all duration-300 size-8 ${
                    forwarded ? "text-yellow-400" : "text-gray-600"
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
                <span className="font-semibold text-xs text-muted-foreground">{post.shares}</span>
              </button>

              {/* Comments button - active state */}
            </div>
          </div>
        </div>
      </div>

      {/* Expositions Content */}
      <div className="px-4 py-6 relative z-0 pt-32 pb-32" style={{ touchAction: "pan-y" }}>
        <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight mt-8">{post.title}</h1>

        <Link href={`/profile?id=${user.id}`} className="block">
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

        <div className="space-y-6 mb-8">
          <div className="flex items-center gap-3 mb-6"></div>

          {visibleComments.map((comment, index) => (
            <div
              key={comment.id}
              className="space-y-3"
              ref={index === visibleComments.length - 1 ? lastCommentRef : null}
            >
              <div className="flex gap-3">
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
                    <Link
                      href={`/user-profile?id=${userProfiles.find((u) => u.name === comment.author)?.id || 1}`}
                      className="hover:underline"
                    >
                      <span className="text-stone-900 font-semibold text-sm cursor-pointer">{comment.author}</span>
                    </Link>
                    <span className="text-stone-700 text-xs">{comment.timestamp}</span>
                  </div>
                  <p className="text-stone-800 text-sm leading-relaxed mb-3">{comment.content}</p>

                  <div className="flex items-center gap-4">
                    {(() => {
                      const key = `${post.id}-${comment.id}`
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
                                  e.preventDefault()
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
                                  e.preventDefault()
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
                                  className="transition-all duration-300 pointer-events-none"
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
                                  className="pointer-events-none"
                                />
                                <path
                                  d="M65 6 Q75 10 85 6"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  fill="none"
                                  strokeLinecap="round"
                                  className="pointer-events-none"
                                />
                              </>
                            ) : (
                              <>
                                <text
                                  x="12"
                                  y="12"
                                  fill="white"
                                  fontSize="12"
                                  fontWeight="500"
                                  className="pointer-events-none"
                                  style={{ userSelect: "none" }}
                                >
                                  {displayVotes.left}
                                </text>
                                <text
                                  x="88"
                                  y="12"
                                  fill="white"
                                  fontSize="12"
                                  fontWeight="500"
                                  textAnchor="end"
                                  className="pointer-events-none"
                                  style={{ userSelect: "none" }}
                                >
                                  {displayVotes.right}
                                </text>
                              </>
                            )}
                          </svg>
                        </div>
                      )
                    })()}
                    <button
                      onClick={() => toggleReplyInput(comment.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
                      <AmpersandIcon className="w-4 h-4 text-stone-700 group-active:text-stone-900 relative z-10" />
                    </button>
                  </div>
                </div>
              </div>

              {comment.elucidations.length > 0 && (
                <div className="ml-12 space-y-3 border-l-2 border-stone-200 pl-4">
                  {(expandedElucidations[comment.id] ? comment.elucidations : comment.elucidations.slice(0, 2)).map(
                    (elucidation) => (
                      <div key={elucidation.id} className="flex gap-2">
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarImage src={elucidation.avatar || "/placeholder.svg"} alt={elucidation.author} />
                          <AvatarFallback className="bg-gray-400 text-white text-xs">
                            {elucidation.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Link
                              href={`/user-profile?id=${userProfiles.find((u) => u.name === elucidation.author)?.id || 1}`}
                              className="hover:underline"
                            >
                              <span className="text-stone-900 font-semibold text-xs cursor-pointer">
                                {elucidation.author}
                              </span>
                            </Link>
                            <span className="text-stone-600 text-xs">{elucidation.timestamp}</span>
                          </div>
                          <p className="text-stone-700 text-xs leading-relaxed">{elucidation.content}</p>
                        </div>
                      </div>
                    ),
                  )}
                  {!expandedElucidations[comment.id] && comment.elucidations.length > 2 && (
                    <button
                      onClick={() => toggleExpandElucidations(comment.id)}
                      className="text-stone-600 text-xs hover:text-stone-900 transition-colors"
                    >
                      ({comment.elucidations.length - 2}) more insight
                      {comment.elucidations.length - 2 > 1 ? "s" : ""}
                    </button>
                  )}
                </div>
              )}

              {replyingToComment === comment.id && (
                <div className="ml-12 space-y-3 border-l-2 border-stone-200 pl-4">
                  <div className="flex gap-2 pt-2">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage src="/male-journalist.png" alt="You" />
                      <AvatarFallback className="bg-gray-500 text-white text-xs">You</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Impart your unique insight..."
                        className="flex-1 bg-white/50 backdrop-blur-sm border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSubmitReply(comment.id)
                          }
                        }}
                      />
                      <button
                        onClick={() => handleSubmitReply(comment.id)}
                        className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
                        <AmpersandIcon className="w-4 h-4 text-primary group-active:text-primary/80 relative z-10" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
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
              {/* Share options here */}
            </div>
          </div>
        </div>
      )}

      {/* Footer comment input section with plus button and send button */}
      <div
        className="fixed left-0 right-0 z-40 max-w-md mx-auto"
        style={{ bottom: "calc(40px + env(safe-area-inset-bottom))" }}
      >
        <div className="p-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarImage src="/male-journalist.png" alt="You" />
              <AvatarFallback className="bg-gray-500 text-white text-xs">You</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-stone-300 rounded-full px-4 py-2 shadow-sm">
              <input
                type="text"
                value={mainCommentText}
                onChange={(e) => setMainCommentText(e.target.value)}
                placeholder="Join the conversation..."
                className="flex-1 bg-transparent text-sm text-stone-900 placeholder-stone-500 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handlePostComment()
                  }
                }}
              />
            </div>
            <button
              onClick={handlePostComment}
              className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
              <AmpersandIcon className="w-5 h-5 text-primary group-active:text-primary/80 relative z-10" />
            </button>
            <button className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
              <CornerLeftUpIcon className="w-5 h-5 text-primary group-active:text-primary/80 relative z-10" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const formatTimestamp = (date: Date): string => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const month = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()

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

  let hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? "pm" : "am"
  hours = hours % 12
  hours = hours ? hours : 12
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes

  return `${month} ${day}${getOrdinalSuffix(day)}, ${year} • ${hours}:${minutesStr}${ampm}`
}
