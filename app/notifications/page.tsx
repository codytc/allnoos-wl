"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AllnoosLogo from "@/components/allnoos-logo"
import {
  Flame,
  MessageSquareIcon,
  UserPlus,
  Bell,
  AlertTriangle,
  Newspaper,
  Settings,
  ChevronLeftIcon,
  Search,
} from "lucide-react"

export default function NotificationsPage() {
  const router = useRouter()
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [touchedNotification, setTouchedNotification] = useState<number | null>(null)
  const [showSearch, setShowSearch] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "like",
      category: "engagement",
      user: {
        name: "Alex Johnson",
        avatar: "/male-journalist.png",
        verified: false,
      },
      content: "liked your story",
      storyTitle: "Iceland Volcano Emits Smoke",
      timestamp: "2m ago",
      read: false,
      priority: "normal",
    },
    {
      id: 2,
      type: "comment",
      category: "engagement",
      user: {
        name: "Maria Garcia",
        avatar: "/female-journalist.png",
        verified: true,
      },
      content: "commented on your story",
      comment: "Great reporting! This really opened my eyes to the situation.",
      storyTitle: "Climate Summit Reaches Agreement",
      timestamp: "15m ago",
      read: false,
      priority: "high",
    },
    {
      id: 3,
      type: "follow",
      category: "social",
      user: {
        name: "David Kim",
        avatar: "/asian-economist-dr-kim-portrait.jpg",
        verified: false,
      },
      content: "started following you",
      timestamp: "1h ago",
      read: true,
      priority: "normal",
    },
    {
      id: 4,
      type: "like",
      category: "engagement",
      user: {
        name: "Emma Wilson",
        avatar: "/professional-woman-headshot.png",
        verified: true,
      },
      content: "and 23 others liked your story",
      storyTitle: "Tech Innovation Breakthrough",
      timestamp: "3h ago",
      read: true,
      priority: "normal",
    },
    {
      id: 5,
      type: "system",
      category: "updates",
      content: "Your story 'Climate Change Impact' has reached 1,000 views",
      storyTitle: "Climate Change Impact",
      storyPhoto: "/arctic-ice-melting.jpg",
      timestamp: "5h ago",
      read: false,
      priority: "normal",
    },
    {
      id: 6,
      type: "alert",
      category: "alerts",
      content: "Breaking news alert: Major earthquake hits Japan",
      storyTitle: "Major earthquake hits Japan",
      storyPhoto: "/breaking-news-live-broadcast.jpg",
      timestamp: "6h ago",
      read: true,
      priority: "urgent",
    },
  ])

  const filteredNotifications = notifications
    .filter((notification) => {
      const matchesFilter =
        selectedFilter === "all" ||
        notification.category === selectedFilter ||
        (selectedFilter === "updates" && (notification.category === "social" || notification.category === "updates"))

      const matchesSearch =
        searchQuery === "" ||
        notification.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.storyTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.comment?.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesFilter && matchesSearch
    })
    .sort((a, b) => {
      if (a.read !== b.read) {
        return a.read ? 1 : -1
      }
      const priorityOrder = { urgent: 3, high: 2, normal: 1 }
      const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 1
      const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 1
      return bPriority - aPriority
    })

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: string, priority?: string) => {
    const iconClass = priority === "urgent" ? "text-red-500" : priority === "high" ? "text-orange-500" : "text-current"

    switch (type) {
      case "like":
        return <Flame className={`w-4 h-4 text-red-500`} />
      case "comment":
        return <MessageSquareIcon className={`w-4 h-4 text-blue-500`} /> // Updated from MessageCircle to MessageSquareIcon
      case "follow":
        return <UserPlus className={`w-4 h-4 text-yellow-500`} />
      case "system":
        return <Settings className={`w-4 h-4 ${iconClass}`} />
      case "alert":
        return <AlertTriangle className={`w-4 h-4 text-yellow-500`} />
      default:
        return <Bell className={`w-4 h-4 ${iconClass}`} />
    }
  }

  const getCategoryIcon = (category: string, notificationType?: string) => {
    switch (category) {
      case "engagement":
        if (notificationType === "comment") {
          return (
            <svg
              className="w-6 h-6 text-blue-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M11 7L17 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )
        } else {
          return <Flame className="w-6 h-6 text-red-500" />
        }
      case "social":
        return <UserPlus className="w-6 h-6 text-slate-600" />
      case "updates":
        return <Newspaper className="w-6 h-6 text-slate-600" />
      case "alerts":
        return <AlertTriangle className="w-6 h-6 text-yellow-600" />
      default:
        return <Bell className="w-6 h-6 text-gray-500" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return timestamp
  }

  const handleLogoClick = () => {
    router.push("/feed")
  }

  const handleBackClick = () => {
    router.back()
  }

  const handleNotificationTouchStart = (notificationId: number) => {
    setTouchedNotification(notificationId)
  }

  const handleNotificationTouchEnd = () => {
    setTouchedNotification(null)
  }

  const handleNotificationTouchCancel = () => {
    setTouchedNotification(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="headerCurveClipNotifications" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 1,0 L 1,0.760 C 0.861,0.823 0.639,0.808 0.5,0.761 C 0.361,0.707 0.139,0.707 0,0.760 Z" />
          </clipPath>
        </defs>
      </svg>

      <div
        className={`sticky top-0 z-50 bg-background pb-8 transition-all duration-300 ${showSearch ? "pb-16" : "pb-8"}`}
        style={{ clipPath: "url(#headerCurveClipNotifications)" }}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-2.5">
            <Link href="/user-profile">
              <button className="rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] bg-white/20 border border-white/30 p-2">
                <ChevronLeftIcon className="text-stone-600 size-6" />
              </button>
            </Link>

            <div className="relative flex items-center justify-center h-12 px-8">
              <div className="absolute top-[-18px] left-[50%] transform translate-x-[-10px] z-10 italic text-xs tracking-tighter my-[22px] mb-0 mt-[22px] mr-0 ml-[-8px]">
                <span className="ml-[-1px] mb-0 mt-0 font-medium tracking-tighter text-xs text-slate-600">
                  ACTIVITY
                </span>
              </div>
              <div style={{ minWidth: "120px", minHeight: "32px" }}>
                <AllnoosLogo variant="default" size="md" onClick={handleLogoClick} />
              </div>
            </div>

            <button
              onClick={() => setShowSearch(!showSearch)}
              className="rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] bg-white/20 border border-white/30 p-2"
            >
              <Search className="text-stone-600 size-6" />
            </button>
          </div>

          <div
            className={`relative mb-4 transition-all duration-300 overflow-hidden ${showSearch ? "max-h-20 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}`}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Stay active..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus:border-input focus-visible:border-input focus:shadow-[inset_0_0_16px_rgba(253,180,132,0.35)] rounded-lg ring-0"
            />
          </div>
        </div>
        <div
          className={`w-full h-8 relative -mb-8 flex items-end z-30 transition-transform duration-300`}
          style={{ transform: showSearch ? "translateY(-10px)" : "translateY(-30px)" }}
        >
          <svg
            viewBox="0 0 1440 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-6"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="curvedLineGradientNotifications" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="15%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="85%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
            </defs>
            <path
              d="M 0,25 C 200,5 520,5 720,25 C 920,45 1240,45 1440,25"
              stroke="url(#curvedLineGradientNotifications)"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>
        </div>
      </div>

      <div
        className={`p-4 transition-transform duration-300 ${showSearch ? "translate-y-[-10px]" : "translate-y-[-30px]"}`}
      >
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notifications yet</h3>
            <p className="text-muted-foreground">When someone interacts with your stories, you'll see it here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => {
              const isTouched = touchedNotification === notification.id

              const baseCardStyling = notification.read
                ? "border border-primary/20"
                : "border border-primary/30 shadow-sm"

              const colorGradient = (() => {
                if (notification.type === "comment") {
                  return "from-blue-500/15"
                } else if (notification.type === "like") {
                  return "from-red-500/15"
                } else if (notification.type === "follow") {
                  return "from-primary/15"
                } else if (notification.type === "alert") {
                  return "from-yellow-600/15"
                } else {
                  return "from-primary/15"
                }
              })()

              return (
                <Card
                  key={notification.id}
                  className={`cursor-pointer transition-all duration-200 touch-manipulation group relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 border p-0 ${
                    isTouched ? "scale-[0.98] border-white/50" : "hover:scale-[0.98] hover:border-white/50"
                  } ${baseCardStyling}`}
                  onTouchStart={() => handleNotificationTouchStart(notification.id)}
                  onTouchEnd={handleNotificationTouchEnd}
                  onTouchCancel={handleNotificationTouchCancel}
                >
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${colorGradient} via-transparent to-transparent transition-opacity duration-200 z-10 rounded-b-lg ${
                      isTouched ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                    }`}
                    style={{ height: "auto", minHeight: "140px" }}
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

                  <div className="relative h-48 flex-shrink-0">
                    {notification.user ? (
                      <>
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${notification.user.avatar})`,
                            backgroundPosition: "center 20%",
                            backgroundSize: "140%",
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% via-transparent via-60% to-background to-95%" />
                        <div className="absolute top-4 left-4 z-10 right-4">
                          <h3 className="font-bold text-xl text-white tracking-tight leading-tight drop-shadow-lg">
                            {notification.user.name}
                          </h3>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${notification.storyPhoto || "/placeholder.svg?height=400&width=600"})`,
                            backgroundPosition: "center 20%",
                            backgroundSize: "140%",
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% via-transparent via-60% to-background to-95%" />
                        <div className="absolute top-4 left-4 z-10 right-4">
                          <h3 className="font-bold text-xl text-white tracking-tight leading-tight drop-shadow-lg">
                            {notification.storyTitle || "System Notification"}
                          </h3>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="relative z-40 p-5 pt-4 flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getCategoryIcon(notification.category, notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {notification.content}
                          {notification.storyTitle && (
                            <span className="font-medium text-foreground"> "{notification.storyTitle}"</span>
                          )}
                        </p>
                      </div>
                    </div>

                    {notification.comment && (
                      <div className="bg-muted/50 rounded-md p-2 text-sm italic line-clamp-2">
                        "{notification.comment}"
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</p>
                      <div className="flex gap-2">
                        {notification.type === "comment" && (
                          <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                            Reply
                          </Button>
                        )}
                        {notification.type === "follow" && (
                          <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                            Follow Back
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
