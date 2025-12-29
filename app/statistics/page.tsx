"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Users, Clock, Flame, MessageSquareIcon, X } from "lucide-react"
import Link from "next/link"
import AllnoosLogo from "@/components/allnoos-logo"

interface StatisticDetail {
  title: string
  calculation: string
  significance: string
  strategies: string[]
}

export default function StatisticsPage() {
  const [statisticsFilter, setStatisticsFilter] = useState("MONTH")
  const [followerFilter, setFollowerFilter] = useState("ALPHABETICAL")
  const [isLoadingArticles, setIsLoadingArticles] = useState(false)
  const [isLoadingFollowers, setIsLoadingFollowers] = useState(false)
  const [previousArticleRankings, setPreviousArticleRankings] = useState<number[]>([])
  const [previousFollowerRankings, setPreviousFollowerRankings] = useState<number[]>([])
  const [selectedStatistic, setSelectedStatistic] = useState<string | null>(null)
  const [isSlideVisible, setIsSlideVisible] = useState(false)

  const statisticDetails: Record<string, StatisticDetail> = {
    performanceScore: {
      title: "Performance Score",
      calculation:
        "Calculated using: Engagement Rate (×10) + Completion Rate (×0.3) + Growth Rate (×1.5) + Watch Time (×5). Maximum score is 100.",
      significance:
        "This composite score reflects your overall content performance across multiple key metrics. A higher score indicates better audience engagement and content quality.",
      strategies: [
        "Focus on creating engaging content that encourages comments and shares",
        "Optimize video length to improve completion rates",
        "Post consistently to maintain growth momentum",
        "Use compelling thumbnails and titles to increase click-through rates",
      ],
    },
    followers: {
      title: "Followers",
      calculation:
        "Total number of users who have subscribed to your content updates. Growth is measured as new followers gained in the selected time period.",
      significance:
        "Follower count indicates your reach and audience size. Consistent growth shows your content resonates with viewers and attracts new audiences.",
      strategies: [
        "Create shareable content that encourages followers to recommend you",
        "Engage with your audience through comments and direct messages",
        "Collaborate with other creators to expand your reach",
        "Post at optimal times when your audience is most active",
      ],
    },
    engagement: {
      title: "Engagement Rate",
      calculation:
        "Total interactions (likes, comments, shares) divided by total views, expressed as a percentage. Higher engagement indicates more active audience participation.",
      significance:
        "Engagement rate is a key indicator of content quality and audience connection. It's often more valuable than raw view counts for measuring success.",
      strategies: [
        "Ask questions in your content to encourage comments",
        "Respond promptly to comments to build community",
        "Create content that evokes emotional responses",
        "Use call-to-actions to guide viewer behavior",
      ],
    },
    likes: {
      title: "Likes",
      calculation:
        "Total number of positive reactions to your content. Measured across all posts in the selected time period.",
      significance:
        "Likes are the most basic form of engagement and indicate content appreciation. They contribute to algorithmic visibility and social proof.",
      strategies: [
        "Create visually appealing content that stands out",
        "Share relatable experiences and stories",
        "Post content that aligns with current trends and topics",
        "Use high-quality images and videos",
      ],
    },
    comments: {
      title: "Comments",
      calculation:
        "Total number of text responses from viewers on your content. Comments represent the highest level of engagement as they require more effort from users.",
      significance:
        "Comments indicate deep engagement and community building. They provide valuable feedback and help create conversations around your content.",
      strategies: [
        "End posts with thought-provoking questions",
        "Share controversial or debate-worthy topics (respectfully)",
        "Respond to comments to encourage further discussion",
        "Create content series that build anticipation",
      ],
    },
    messages: {
      title: "Messages",
      calculation:
        "Direct messages received from followers and other users. Includes both new conversations and replies to existing threads.",
      significance:
        "Direct messages indicate strong personal connection with your audience and can lead to valuable networking opportunities and collaborations.",
      strategies: [
        "Include clear contact information in your bio",
        "Encourage followers to reach out with questions or feedback",
        "Share behind-the-scenes content that makes you more approachable",
        "Respond to messages promptly to build relationships",
      ],
    },
    posts: {
      title: "Posts",
      calculation:
        "Total number of content pieces published in the selected time period. Includes all types of posts: articles, videos, images, and stories.",
      significance:
        "Consistent posting maintains audience engagement and improves algorithmic visibility. Quality should be balanced with quantity for optimal results.",
      strategies: [
        "Create a content calendar to maintain consistency",
        "Batch create content to ensure regular posting",
        "Mix different content types to keep audience interested",
        "Analyze which post types perform best and adjust strategy",
      ],
    },
    watchTime: {
      title: "Watch Time",
      calculation:
        "Average time viewers spend consuming your content. Calculated by dividing total watch time by number of views.",
      significance:
        "Watch time indicates content quality and viewer interest. Longer watch times improve algorithmic ranking and suggest engaging content.",
      strategies: [
        "Hook viewers in the first few seconds with compelling openings",
        "Structure content with clear progression and payoffs",
        "Use storytelling techniques to maintain interest",
        "Optimize content length based on topic complexity",
      ],
    },
    completionRate: {
      title: "Completion Rate",
      calculation:
        "Percentage of viewers who watch your content to the end. Calculated as (completed views ÷ total views) × 100.",
      significance:
        "High completion rates indicate engaging, well-paced content that holds viewer attention. This metric strongly influences algorithmic promotion.",
      strategies: [
        "Front-load your most important information",
        "Use pattern interrupts to maintain attention",
        "Create content with clear value propositions",
        "Test different content lengths to find optimal duration",
      ],
    },
  }

  const handleStatisticClick = (statisticKey: string) => {
    setSelectedStatistic(statisticKey)
    setIsSlideVisible(true)
  }

  const closeSlidePanel = () => {
    setIsSlideVisible(false)
    setTimeout(() => setSelectedStatistic(null), 300)
  }

  useEffect(() => {
    setIsLoadingArticles(true)
    setIsLoadingFollowers(true)

    const currentArticles = getTopArticles()
    const currentFollowers = getSortedFollowers()
    setPreviousArticleRankings(currentArticles.map((a) => a.rank))
    setPreviousFollowerRankings(currentFollowers.map((_, index) => index + 1))

    const timer = setTimeout(() => {
      setIsLoadingArticles(false)
      setIsLoadingFollowers(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [statisticsFilter, followerFilter])

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
    if (score >= 90) return "text-yellow-500"
    if (score >= 80) return "text-gray-400"
    if (score >= 70) return "text-amber-600"
    if (score >= 60) return "text-blue-600"
    return "text-red-600"
  }

  const getAveragingStatus = (current: number, average: number) => {
    const margin = average * 0.1
    const lowerBound = average - margin
    const upperBound = average + margin

    if (current < lowerBound) return "below"
    if (current > upperBound) return "above"
    return "average"
  }

  const parseNumericValue = (value: string): number => {
    const numericString = value.replace(/[^\d.]/g, "")
    return Number.parseFloat(numericString) || 0
  }

  const getTopArticles = () => {
    const baseArticles = [
      {
        id: 1,
        rank: 1,
        title: "Local Coffee Shop Feature",
        description: "Discovering hidden gems in our neighborhood coffee scene with unique brewing methods.",
        thumbnail: "/modern-building-news.png",
        views: "8.6K",
        timestamp: "2 days ago",
      },
      {
        id: 2,
        rank: 2,
        title: "Street Art Discovery",
        description: "Exploring the vibrant street art culture and the stories behind local murals.",
        thumbnail: "/blue-concert-stage.png",
        views: "12.9K",
        timestamp: "1 week ago",
      },
      {
        id: 3,
        rank: 3,
        title: "Food Truck Friday",
        description: "Weekly spotlight on the best food trucks bringing diverse flavors to our community.",
        thumbnail: "/professional-woman-headshot.png",
        views: "9.9K",
        timestamp: "3 days ago",
      },
      {
        id: 4,
        rank: 4,
        title: "Community Garden Project",
        description: "How local residents are transforming vacant lots into thriving community spaces.",
        thumbnail: "/northern-lights-nature.png",
        views: "5.1K",
        timestamp: "5 days ago",
      },
    ]

    let adjustedArticles = [...baseArticles]

    switch (statisticsFilter) {
      case "DAY":
        adjustedArticles = [
          { ...baseArticles[2], rank: 1, views: "2.1K", timestamp: "Today" },
          { ...baseArticles[0], rank: 2, views: "1.8K", timestamp: "Today" },
          { ...baseArticles[3], rank: 3, views: "1.2K", timestamp: "Today" },
          { ...baseArticles[1], rank: 4, views: "0.9K", timestamp: "Today" },
        ]
        break
      case "WEEK":
        adjustedArticles = [
          { ...baseArticles[1], rank: 1, views: "6.4K", timestamp: "This week" },
          { ...baseArticles[2], rank: 2, views: "4.9K", timestamp: "This week" },
          { ...baseArticles[0], rank: 3, views: "4.3K", timestamp: "This week" },
          { ...baseArticles[3], rank: 4, views: "2.5K", timestamp: "This week" },
        ]
        break
      case "YEAR":
        adjustedArticles = [
          { ...baseArticles[0], rank: 1, views: "43K", timestamp: "This year" },
          { ...baseArticles[1], rank: 2, views: "64K", timestamp: "This year" },
          { ...baseArticles[2], rank: 3, views: "49K", timestamp: "This year" },
          { ...baseArticles[3], rank: 4, views: "25K", timestamp: "This year" },
        ]
        break
      case "ALLNOOS":
        adjustedArticles = [
          { ...baseArticles[1], rank: 1, views: "129K", timestamp: "All time" },
          { ...baseArticles[0], rank: 2, views: "86K", timestamp: "All time" },
          { ...baseArticles[2], rank: 3, views: "99K", timestamp: "All time" },
          { ...baseArticles[3], rank: 4, views: "51K", timestamp: "All time" },
        ]
        break
      default:
        adjustedArticles = baseArticles
    }

    return adjustedArticles
  }

  const topArticles = getTopArticles()

  const topFollowers = [
    {
      id: 1,
      rank: 1,
      name: "Sarah Chen",
      username: "@sarahc_tech",
      avatar: "/professional-woman-headshot.png",
      engagementRate: "8.4%",
      interactions: "142",
      followedSince: "6 months ago",
      followedDate: "2024-03-15",
      performanceScore: 94,
      dailyScore: 87,
      weeklyScore: 91,
      monthlyScore: 94,
      yearlyScore: 96,
    },
    {
      id: 2,
      rank: 2,
      name: "Marcus Johnson",
      username: "@mjohnson_news",
      avatar: "/male-journalist.png",
      engagementRate: "7.2%",
      interactions: "98",
      followedSince: "4 months ago",
      followedDate: "2024-05-20",
      performanceScore: 87,
      dailyScore: 92,
      weeklyScore: 89,
      monthlyScore: 87,
      yearlyScore: 85,
    },
    {
      id: 3,
      rank: 3,
      name: "Elena Rodriguez",
      username: "@elena_reports",
      avatar: "/female-journalist.png",
      engagementRate: "6.8%",
      interactions: "87",
      followedSince: "8 months ago",
      followedDate: "2024-01-10",
      performanceScore: 82,
      dailyScore: 78,
      weeklyScore: 84,
      monthlyScore: 82,
      yearlyScore: 88,
    },
    {
      id: 4,
      rank: 4,
      name: "David Kim",
      username: "@dkim_stories",
      avatar: "/professional-woman-headshot.png",
      engagementRate: "6.1%",
      interactions: "73",
      followedSince: "3 months ago",
      followedDate: "2024-06-25",
      performanceScore: 76,
      dailyScore: 81,
      weeklyScore: 77,
      monthlyScore: 76,
      yearlyScore: 74,
    },
  ]

  const getFollowerData = () => {
    switch (statisticsFilter) {
      case "DAY":
        return { count: "+23", label: "New followers today", isNew: true }
      case "WEEK":
        return { count: "+89", label: "New followers this week", isNew: true }
      case "MONTH":
        return { count: "+85", label: "New followers this month", isNew: true }
      case "YEAR":
        return { count: "+1.2K", label: "New followers this year", isNew: true }
      case "ALLNOOS":
        return { count: "3.2K", label: "Total followers", isNew: false }
      default:
        return { count: "+85", label: "New followers this month", isNew: true }
    }
  }

  const getAverageFollowerData = () => {
    switch (statisticsFilter) {
      case "DAY":
        return "+8"
      case "WEEK":
        return "+35"
      case "MONTH":
        return "+95"
      case "YEAR":
        return "+800"
      case "ALLNOOS":
        return "2.1K"
      default:
        return "+95"
    }
  }

  const formatTimeFromMinutes = (minutes: number): string => {
    const wholeMinutes = Math.floor(minutes)
    const seconds = Math.round((minutes - wholeMinutes) * 60)
    return `${wholeMinutes}:${seconds.toString().padStart(2, "0")}`
  }

  const getAverageWatchTimeData = () => {
    switch (statisticsFilter) {
      case "DAY":
        return formatTimeFromMinutes(1.8)
      case "WEEK":
        return formatTimeFromMinutes(2.1)
      case "MONTH":
        return formatTimeFromMinutes(1.6)
      case "YEAR":
        return formatTimeFromMinutes(1.9)
      case "ALLNOOS":
        return formatTimeFromMinutes(1.7)
      default:
        return formatTimeFromMinutes(1.6)
    }
  }

  const getAverageCompletionRateData = () => {
    switch (statisticsFilter) {
      case "DAY":
        return "58%"
      case "WEEK":
        return "62%"
      case "MONTH":
        return "60%"
      case "YEAR":
        return "59%"
      case "ALLNOOS":
        return "57%"
      default:
        return "60%"
    }
  }

  const getAverageEngagementData = () => {
    switch (statisticsFilter) {
      case "DAY":
        return "3.1%"
      case "WEEK":
        return "3.4%"
      case "MONTH":
        return "3.2%"
      case "YEAR":
        return "3.0%"
      case "ALLNOOS":
        return "2.8%"
      default:
        return "3.2%"
    }
  }

  const getPostsData = () => {
    switch (statisticsFilter) {
      case "DAY":
        return { count: "3", label: "Posts today" }
      case "WEEK":
        return { count: "12", label: "Posts this week" }
      case "MONTH":
        return { count: "12", label: "Posts this month" }
      case "YEAR":
        return { count: "156", label: "Posts this year" }
      case "ALLNOOS":
        return { count: "342", label: "Total posts" }
      default:
        return { count: "12", label: "Posts this month" }
    }
  }

  const getAveragePostsData = () => {
    switch (statisticsFilter) {
      case "DAY":
        return "2"
      case "WEEK":
        return "8"
      case "MONTH":
        return "15"
      case "YEAR":
        return "120"
      case "ALLNOOS":
        return "280"
      default:
        return "15"
    }
  }

  const getPostsHeading = () => {
    switch (statisticsFilter) {
      case "DAY":
        return "Posts"
      case "WEEK":
        return "Posts"
      case "MONTH":
        return "Posts"
      case "YEAR":
        return "Posts"
      case "ALLNOOS":
        return "Total Posts"
      default:
        return "Posts"
    }
  }

  const getCommentsData = () => {
    switch (statisticsFilter) {
      case "DAY":
        return { count: "45", label: "Comments today" }
      case "WEEK":
        return { count: "189", label: "Comments this week" }
      case "MONTH":
        return { count: "342", label: "Comments this month" }
      case "YEAR":
        return { count: "2.1K", label: "Comments this year" }
      case "ALLNOOS":
        return { count: "5.8K", label: "Total comments" }
      default:
        return { count: "342", label: "Comments this month" }
    }
  }

  const getAverageCommentsData = () => {
    switch (statisticsFilter) {
      case "DAY":
        return "32"
      case "WEEK":
        return "145"
      case "MONTH":
        return "280"
      case "YEAR":
        return "1.8K"
      case "ALLNOOS":
        return "4.2K"
      default:
        return "280"
    }
  }

  const getForwardsData = () => {
    switch (statisticsFilter) {
      case "DAY":
        return { count: "23", label: "Forwards today" }
      case "WEEK":
        return { count: "98", label: "Forwards this week" }
      case "MONTH":
        return { count: "156", label: "Forwards this month" }
      case "YEAR":
        return { count: "1.3K", label: "Forwards this year" }
      case "ALLNOOS":
        return { count: "3.2K", label: "Total forwards" }
      default:
        return { count: "156", label: "Forwards this month" }
    }
  }

  const getAverageForwardsData = () => {
    switch (statisticsFilter) {
      case "DAY":
        return "18"
      case "WEEK":
        return "75"
      case "MONTH":
        return "120"
      case "YEAR":
        return "980"
      case "ALLNOOS":
        return "2.1K"
      default:
        return "120"
    }
  }

  const getMessagesData = () => {
    switch (statisticsFilter) {
      case "DAY":
        return { count: "67", label: "Messages today" }
      case "WEEK":
        return { count: "234", label: "Messages this week" }
      case "MONTH":
        return { count: "456", label: "Messages this month" }
      case "YEAR":
        return { count: "3.2K", label: "Messages this year" }
      case "ALLNOOS":
        return { count: "8.1K", label: "Total messages" }
      default:
        return { count: "456", label: "Messages this month" }
    }
  }

  const getAverageMessagesData = () => {
    switch (statisticsFilter) {
      case "DAY":
        return "45"
      case "WEEK":
        return "180"
      case "MONTH":
        return "320"
      case "YEAR":
        return "2.1K"
      case "ALLNOOS":
        return "5.8K"
      default:
        return "320"
    }
  }

  const renderAveragingBar = (currentValue: string, averageValue: string) => {
    const current = parseNumericValue(currentValue)
    const average = parseNumericValue(averageValue)
    const status = getAveragingStatus(current, average)

    return (
      <div className="flex rounded-full overflow-hidden items-center border-2 border-gray-500 size-auto h-5 mb-0">
        <div
          className={`bg-red-300 h-8 flex-1 flex items-center justify-center relative ${status === "below" ? "" : "opacity-30"}`}
        >
          <span className={`text-xs font-semibold ${status === "below" ? "text-gray-800 font-bold" : "text-gray-700"}`}>
            BELOW
          </span>
        </div>
        <div className={`bg-gray-600 h-8 flex-1 flex items-center justify-center relative`}>
          <span className={`text-xs font-semibold text-white`}>AVERAGE {averageValue}</span>
        </div>
        <div
          className={`bg-yellow-400 h-8 flex-1 flex items-center justify-center relative ${status === "above" ? "" : "opacity-30 border-2 border-gray-700"}`}
        >
          <span className={`text-xs font-semibold ${status === "above" ? "text-gray-800 font-bold" : "text-gray-700"}`}>
            ABOVE
          </span>
        </div>
      </div>
    )
  }

  const getTimeBasedScore = (follower: any) => {
    switch (statisticsFilter) {
      case "DAY":
        return follower.dailyScore
      case "WEEK":
        return follower.weeklyScore
      case "YEAR":
        return follower.yearlyScore
      default:
        return follower.performanceScore
    }
  }

  const getFollowerCriteria = (follower: any) => {
    switch (followerFilter) {
      case "MOST_RECENT":
      case "OLDEST_FIRST":
        return follower.followedSince
      case "PERFORMANCE_SCORE":
        return `Score: ${getTimeBasedScore(follower)}`
      default:
        return null
    }
  }

  const getSortedFollowers = () => {
    let sorted = [...topFollowers]

    if (followerFilter === "PERFORMANCE_SCORE") {
      switch (statisticsFilter) {
        case "DAY":
          sorted = sorted.sort((a, b) => b.dailyScore - a.dailyScore)
          break
        case "WEEK":
          sorted = sorted.sort((a, b) => b.weeklyScore - a.weeklyScore)
          break
        case "YEAR":
          sorted = sorted.sort((a, b) => b.yearlyScore - a.yearlyScore)
          break
        default:
          sorted = sorted.sort((a, b) => b.performanceScore - a.performanceScore)
      }
    } else {
      switch (followerFilter) {
        case "MOST_RECENT":
          sorted = sorted.sort((a, b) => new Date(b.followedDate).getTime() - new Date(a.followedDate).getTime())
          break
        case "OLDEST_FIRST":
          sorted = sorted.sort((a, b) => new Date(a.followedDate).getTime() - new Date(b.followedDate).getTime())
          break
        default:
          sorted = sorted.sort((a, b) => a.name.localeCompare(b.name))
      }
    }

    return sorted
  }

  return (
    <div className="min-h-screen bg-background">
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="headerCurveClipStatistics" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 1,0 L 1,0.759 C 0.861,0.828 0.639,0.801 0.5,0.757 C 0.361,0.697 0.139,0.697 0,0.759 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="sticky top-0 z-50 bg-background pb-8" style={{ clipPath: "url(#headerCurveClipStatistics)" }}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2.5">
            <Link href="/user-profile">
              <button className="rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] bg-white/20 border border-white/30 p-2.5">
                <ChevronLeft className="size-5 text-stone-600" />
              </button>
            </Link>

            <div className="relative flex items-center justify-center h-12 px-8">
              <div className="absolute top-[-18px] left-[50%] transform translate-x-[-10px] z-10 italic text-xs tracking-tighter my-[22px] mb-0 mt-[22px] mr-0 ml-[-8px]">
                <span className="ml-[-1px] mb-0 mt-0 font-medium tracking-tighter text-xs text-slate-600">
                  PERFORMANCE
                </span>
              </div>
              <div style={{ minWidth: "120px", minHeight: "32px" }}>
                <AllnoosLogo variant="default" size="md" onClick={() => {}} />
              </div>
            </div>

            <div className="w-10"></div>
          </div>

          <div className="flex justify-center mb-4">
            <div className="flex items-center bg-gray-100 rounded-full p-0.5 gap-0.5">
              {["DAY", "WEEK", "MONTH", "YEAR", "ALLNOOS"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStatisticsFilter(filter)}
                  className={`px-2 py-1.5 text-xs font-medium rounded-full transition-all duration-200 whitespace-nowrap ${
                    statisticsFilter === filter
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
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
              <linearGradient id="curvedLineGradientStatistics" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="15%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="85%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
            </defs>
            <path
              d="M 0,25 C 200,5 520,5 720,25 C 920,45 1240,45 1440,25"
              stroke="url(#curvedLineGradientStatistics)"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>
        </div>
      </div>

      <div className="p-4 space-y-6" style={{ transform: "translateY(-30px)" }}>
        <section>
          <div className="text-center p-2.5">
            <h2 className="font-semibold text-center m-0 mt-[-10px] mb-5 text-2xl">Performance Score</h2>
            <div className="text-center" style={{ marginTop: "-2px" }}>
              <div
                className={`text-5xl font-bold m-[-20px] mx-0 mb-0 cursor-pointer hover:scale-105 transition-transform duration-200 ${getScoreColor(performanceScore)}`}
                onClick={() => handleStatisticClick("performanceScore")}
              >
                {performanceScore}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="space-y-4">
            <Card
              className="p-4 py-3 cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => handleStatisticClick("followers")}
            >
              <div className="flex items-center justify-between mb-[-10px]">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-medium">New Followers</h3>
                </div>
                <div className="text-gray-700 font-semibold text-xl">{getFollowerData().count}</div>
              </div>
              {renderAveragingBar(getFollowerData().count, getAverageFollowerData())}
            </Card>

            <div className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">Top Followers</h2>
                  {isLoadingFollowers && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                  )}
                </div>
                <div className="relative"></div>
              </div>
              <div
                className={`grid grid-cols-2 gap-3 transition-all duration-500 ease-in-out ${
                  isLoadingFollowers ? "opacity-30 scale-95" : "opacity-100 scale-100"
                }`}
              >
                {getSortedFollowers().map((follower, index) => {
                  const criteria = getFollowerCriteria(follower)
                  return (
                    <Card
                      key={follower.id}
                      className={`p-3 cursor-pointer active:shadow-lg transition-all duration-300 active:scale-[1.02] group relative ${
                        isLoadingFollowers ? "" : "animate-in slide-in-from-right-2"
                      }`}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="absolute top-0 left-0 z-10">
                        <Badge
                          className={`
                            text-white text-sm font-bold shadow-lg border-0 rounded-tl-lg rounded-br-lg rounded-tr-none rounded-bl-none px-3 py-1.5 transition-all duration-300
                            ${
                              index + 1 === 1
                                ? "bg-yellow-500 animate-pulse"
                                : index + 1 === 2
                                  ? "bg-gray-400"
                                  : index + 1 === 3
                                    ? "bg-amber-600"
                                    : "bg-blue-500"
                            }
                          `}
                        >
                          {index + 1}
                        </Badge>
                      </div>
                      <div className="flex flex-col items-center mt-0 mb-0">
                        <div className="relative mb-1">
                          <div
                            className="rounded-full bg-cover bg-center border-2 border-gray-200 size-28 mr-[-40px]"
                            style={{ backgroundImage: `url(${follower.avatar})` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50 rounded-full ml-0 mt-7 mr-[-35px]"></div>
                          </div>
                        </div>
                        <div className="w-full mt-[-30px]">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-sm truncate text-gray-900 transition-colors relative z-20 drop-shadow-lg">
                              {follower.name}
                            </h3>
                            {criteria && (
                              <span className="text-xs text-gray-700 ml-2 transition-all duration-300 ease-in-out relative z-20 drop-shadow-md">
                                {criteria}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 truncate text-left mt-1 relative z-20 drop-shadow-md">
                            {follower.username}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-1 mt-[-10px]">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">Engagement Rate</span>
                          <span className="text-sm font-bold text-green-600">{follower.engagementRate}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{follower.interactions} interactions</span>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>

            <Card
              className="p-4 py-3 cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => handleStatisticClick("engagement")}
            >
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium">Engagement</h3>
                  </div>
                  <div className="text-gray-700 font-semibold text-xl">4.8%</div>
                </div>
                {renderAveragingBar("4.8%", getAverageEngagementData())}
              </div>

              <div
                className="mb-3 cursor-pointer hover:bg-gray-50 rounded p-2 -m-2 transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation()
                  handleStatisticClick("likes")
                }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-red-500" />
                    <h3 className="text-base font-medium">Likes</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-gray-700 font-semibold text-xl">24.8K</div>
                  </div>
                </div>
                {renderAveragingBar("24.8K", "18.2K")}
              </div>

              <div
                className="cursor-pointer hover:bg-gray-50 rounded p-2 -m-2 transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation()
                  handleStatisticClick("comments")
                }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <MessageSquareIcon className="w-5 h-5 text-blue-500" />
                    <h3 className="text-base font-medium">Comments</h3>
                  </div>
                  <div className="text-gray-700 font-semibold text-xl">{getCommentsData().count}</div>
                </div>
                {renderAveragingBar(getCommentsData().count, getAverageCommentsData())}
              </div>
            </Card>

            <Card
              className="p-4 py-3 cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => handleStatisticClick("messages")}
            >
              <div className="flex items-center justify-between mb-[-10px]">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-medium">Messages</h3>
                </div>
                <div className="text-gray-700 font-semibold text-xl">{getMessagesData().count}</div>
              </div>
              {renderAveragingBar(getMessagesData().count, getAverageMessagesData())}
            </Card>

            <Card
              className="p-4 py-3 cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => handleStatisticClick("posts")}
            >
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium">{getPostsHeading()}</h3>
                  </div>
                  <div className="text-gray-600 font-semibold text-xl">{getPostsData().count}</div>
                </div>
                {renderAveragingBar(getPostsData().count, getAveragePostsData())}
              </div>

              <div
                className="mb-3 cursor-pointer hover:bg-gray-50 rounded p-2 -m-2 transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation()
                  handleStatisticClick("watchTime")
                }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <h3 className="text-base font-medium">Watch Time</h3>
                  </div>
                  <div className="text-gray-700 font-semibold text-xl">{getAverageWatchTimeData()}</div>
                </div>
                {renderAveragingBar(getAverageWatchTimeData(), "2:00")}
              </div>

              <div
                className="cursor-pointer hover:bg-gray-50 rounded p-2 -m-2 transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation()
                  handleStatisticClick("completionRate")
                }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium">Completion Rate</h3>
                  </div>
                  <div className="text-gray-700 font-semibold text-xl">78%</div>
                </div>
                {renderAveragingBar("78%", getAverageCompletionRateData())}
              </div>
            </Card>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold">Top Performing Articles</h2>
            {isLoadingArticles && (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent"></div>
            )}
          </div>
          <div
            className={`grid grid-cols-2 gap-3 transition-all duration-500 ease-in-out ${
              isLoadingArticles ? "opacity-30 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {topArticles.map((article, index) => (
              <Link key={article.id} href="/feed">
                <Card
                  className={`overflow-hidden cursor-pointer active:shadow-lg transition-all duration-300 active:scale-[1.02] group relative p-0 h-32 ${
                    isLoadingArticles ? "" : "animate-in slide-in-from-bottom-2"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className="w-full h-full bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${article.thumbnail})` }}
                  >
                    <div className="absolute top-0 left-0 z-20">
                      <Badge
                        className={`
                          text-white text-sm font-bold shadow-lg border-0 rounded-tl-lg rounded-br-lg rounded-tr-none rounded-bl-none px-3 py-1.5 transition-all duration-300
                          ${
                            article.rank === 1
                              ? "bg-yellow-500 animate-pulse"
                              : article.rank === 2
                                ? "bg-gray-400"
                                : article.rank === 3
                                  ? "bg-amber-600"
                                  : "bg-blue-500"
                          }
                        `}
                      >
                        {article.rank}
                      </Badge>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                    <div className="absolute bottom-0 left-0 right-0 p-3 z-15">
                      <h3 className="font-semibold text-white text-sm line-clamp-2 mb-1 group-active:text-orange-200 transition-colors">
                        {article.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-white/80">
                        <span className="font-medium">{article.views} views</span>
                        <span>{article.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {selectedStatistic && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
              isSlideVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeSlidePanel}
          />

          {/* Slide Panel */}
          <div
            className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 max-h-[80vh] overflow-hidden transition-transform duration-300 ease-out ${
              isSlideVisible ? "translate-y-0" : "translate-y-full"
            }`}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{statisticDetails[selectedStatistic]?.title}</h2>
              <button
                onClick={closeSlidePanel}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-4 overflow-y-auto max-h-[60vh]">
              <div className="space-y-6">
                {/* Calculation */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">How it's calculated</h3>
                  <p className="text-gray-700 leading-relaxed">{statisticDetails[selectedStatistic]?.calculation}</p>
                </div>

                {/* Significance */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Why it matters</h3>
                  <p className="text-gray-700 leading-relaxed">{statisticDetails[selectedStatistic]?.significance}</p>
                </div>

                {/* Strategies */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Improvement strategies</h3>
                  <ul className="space-y-3">
                    {statisticDetails[selectedStatistic]?.strategies.map((strategy, index) => (
                      <li key={index} className="text-gray-700 leading-relaxed">
                        {strategy}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
