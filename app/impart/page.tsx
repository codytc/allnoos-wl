"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { ChevronLeftIcon, Flame, AmpersandIcon, Search, CoinsIcon, Ban, Flag, ShirtIcon } from "lucide-react"
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

      setExpandedElucidations((prev) => ({
        ...prev,
        [commentId]: true,
      }))
    }

    setReplyText("")
    setReplyingToComment(null)
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
    } else {
      setMainCommentText("")
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
    <div className="min-h-screen bg-background">
      <svg className="absolute" width="0" height="0">
        <defs>
          <clipPath id="headerCurveClipImpart" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 1,0 L 1,0.758 C 0.861,0.821 0.639,0.806 0.5,0.759 C 0.361,0.704 0.139,0.704 0,0.757 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="sticky top-0 z-50 bg-background pb-8" style={{ clipPath: "url(#headerCurveClipImpart)" }}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-1.5">
            {/* <button
              onClick={() => router.back()}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
              <ChevronLeftIcon className="w-5 h-5 group-active:text-primary/80 relative z-10 text-slate-600" />
            </button> */}
            <button
              onClick={() => router.back()}
              className="rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] bg-white/20 border border-white/30 p-2.5"
            >
              <ChevronLeftIcon className="size-5 text-stone-600" />
            </button>

            <div className="relative flex items-center justify-center h-12 px-8">
              <div className="absolute top-[-18px] left-[50%] transform translate-x-[-10px] z-10 italic text-xs tracking-tighter my-[22px] mb-0 mt-[22px] mr-0 ml-[-8px]">
                <span className="ml-[-1px] mb-0 mt-0 font-medium tracking-tighter text-xs text-slate-600">IMPART</span>
              </div>
              <div style={{ minWidth: "120px", minHeight: "32px" }}>
                <AllnoosLogo variant="default" size="md" onClick={() => router.push("/feed")} />
              </div>
            </div>

            <div className="w-10"></div>
          </div>

          <div className="flex items-start gap-5 mb-3">
            <div
              className={`relative transition-all duration-300 ease-in-out ${isSearchFocused ? "flex-1 w-full" : "w-full max-w-[200px]"}`}
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
                  className={`group-hover:text-yellow-500 transition-all duration-300 size-[30px] mt-[-4px] ${
                    forwarded ? "text-yellow-400" : "text-slate-600"
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
              </div>
              <span className="font-semibold text-xs text-slate-600">{post.shares}</span>
            </button>
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
              <linearGradient id="curvedLineGradientImpart" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="15%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="85%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
            </defs>
            <path
              d="M 0,25 C 200,5 520,5 720,25 C 920,45 1240,45 1440,25"
              stroke="url(#curvedLineGradientImpart)"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>
        </div>
      </div>
      {/* End of header changes */}

      {/* Content */}
      <div className="p-4" style={{ transform: "translateY(-30px)" }}>
        <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>

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
                                <stop offset="0%" stopColor={isNeutralState ? "#888888" : "#5EEAD4"} />
                                <stop offset="15%" stopColor={isNeutralState ? "#777777" : "#2DD4BF"} />
                                <stop offset="85%" stopColor={isNeutralState ? "#555555" : "#14B8A6"} />
                                <stop offset="100%" stopColor={isNeutralState ? "#444444" : "#0F766E"} />
                              </linearGradient>
                              <linearGradient id={`rightGradient-${comment.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor={isNeutralState ? "#888888" : "#FFD4B3"} />
                                <stop offset="15%" stopColor={isNeutralState ? "#777777" : "#FFB380"} />
                                <stop offset="85%" stopColor={isNeutralState ? "#555555" : "#E6804D"} />
                                <stop offset="100%" stopColor={isNeutralState ? "#444444" : "#CC6633"} />
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
                                stroke={isNeutralState ? "#333333" : "#0F766E"}
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
                                stroke={isNeutralState ? "#333333" : "#CC6633"}
                                strokeWidth="0.5"
                                className="active:brightness-110 transition-all pointer-events-none"
                              />
                              {!isNeutralState && (
                                <path
                                  d={`M${leftPercentage} 0 Q${leftPercentage - 2} 8 ${leftPercentage} 16`}
                                  stroke={leftPercentage > 50 ? "#0F766E" : "#E6804D"}
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
                    <div className="flex-1 flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-stone-300 rounded-full px-4 py-2 shadow-sm">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Impart your unique insight..."
                        className="flex-1 bg-transparent text-sm text-stone-900 placeholder-stone-500 focus:outline-none"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSubmitReply(comment.id)
                          }
                        }}
                        onBlur={() => handleSubmitReply(comment.id)}
                      />
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
                onBlur={handlePostComment}
              />
            </div>
            <button className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
              <CoinsIcon className="w-5 h-5 group-active:text-primary/80 relative z-10 text-slate-600" />
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
