"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs } from "@/components/ui/tabs"
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
  ArrowLeft,
  Search,
} from "lucide-react"

export default function NotificationsPage() {
  const router = useRouter()
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
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
        avatar: "/professional-woman-headshot.png",
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
      timestamp: "5h ago",
      read: false,
      priority: "normal",
    },
    {
      id: 6,
      type: "alert",
      category: "alerts",
      content: "Breaking news alert: Major earthquake hits Japan",
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
        return <UserPlus className="w-6 h-6" />
      case "updates":
        return <Newspaper className="w-6 h-6" />
      case "alerts":
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />
      default:
        return <Bell className="w-6 h-6" />
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

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/wander">
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
                <ArrowLeft className="w-5 h-5 text-primary group-active:text-primary/80 relative z-10" />
              </button>
            </Link>

            <div className="relative flex items-center justify-center h-12 px-8">
              <div className="absolute top-[-18px] left-[50%] transform translate-x-[-10px] z-10 italic text-xs tracking-tighter my-[22px] mb-0 mt-[22px] mr-0 ml-[-8px]">
                <span className="text-stone-600 ml-[-1px] mb-0 mt-0 font-medium tracking-tighter text-xs">
                  ACTIVITY
                </span>
              </div>
              <div style={{ minWidth: "120px", minHeight: "32px" }}>
                <AllnoosLogo variant="default" size="md" onClick={handleLogoClick} />
              </div>
            </div>

            <div className="w-10"></div>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Stay active..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus:border-input focus-visible:border-input focus:shadow-[inset_0_0_16px_rgba(253,180,132,0.35)] rounded-lg"
            />
          </div>

          <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="w-full">
            {/* Tabs content here */}
          </Tabs>
        </div>
      </div>

      <div className="p-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notifications yet</h3>
            <p className="text-muted-foreground">When someone interacts with your stories, you'll see it here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => {
              const cardStyling = (() => {
                if (notification.read) {
                  if (notification.type === "comment") {
                    return "border border-blue-200/40 bg-gradient-to-r from-blue-100/60 to-blue-50/40"
                  } else if (notification.type === "like") {
                    return "border border-red-200/40 bg-gradient-to-r from-red-100/60 to-red-50/40"
                  } else if (notification.type === "follow") {
                    return "border border-border/40 bg-gradient-to-r from-primary/12 to-primary/8"
                  } else if (notification.type === "alert") {
                    return "border border-yellow-200/40 bg-gradient-to-r from-yellow-100/60 to-yellow-50/40"
                  } else {
                    return "border border-border/40 bg-gradient-to-r from-primary/12 to-primary/8"
                  }
                } else {
                  if (notification.type === "comment") {
                    return "border-t border-r border-b border-blue-200/40 border-l-4 border-l-blue-300 bg-gradient-to-r from-blue-100/70 to-blue-50/50 shadow-sm"
                  } else if (notification.type === "like") {
                    return "border-t border-r border-b border-red-200/40 border-l-4 border-l-red-300 bg-gradient-to-r from-red-100/70 to-red-50/50 shadow-sm"
                  } else if (notification.type === "follow") {
                    return "border-t border-r border-b border-border/40 border-l-4 border-l-yellow-300 bg-gradient-to-r from-yellow-100/70 to-yellow-50/50 shadow-sm"
                  } else if (notification.type === "alert") {
                    return "border-t border-r border-b border-yellow-200/40 border-l-4 border-l-yellow-300 bg-gradient-to-r from-yellow-100/70 to-yellow-50/50 shadow-sm"
                  } else {
                    return "border-t border-r border-b border-border/40 border-l-4 border-l-primary bg-gradient-to-r from-primary/15 to-primary/8 shadow-sm"
                  }
                }
              })()

              return (
                <Card
                  key={notification.id}
                  className={`p-4 cursor-pointer hover:shadow-md transition-all duration-200 ${cardStyling}`}
                >
                  <div className="flex items-center justify-between">
                    {getCategoryIcon(notification.category, notification.type)}
                  </div>

                  <div className="flex items-start gap-3 -mt-3">
                    <div className="relative flex-shrink-0">
                      {notification.user ? (
                        <>
                          <Avatar className="w-12 h-12 border-2 border-background shadow-sm">
                            <AvatarImage
                              src={notification.user.avatar || "/placeholder.svg"}
                              alt={notification.user.name}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
                              {notification.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </>
                      ) : null}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          {notification.user && (
                            <>
                              <span className="font-semibold text-sm">{notification.user.name}</span>
                              {notification.user.verified && (
                                <svg
                                  className="w-4 h-4 text-blue-500 flex-shrink-0"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-1">
                        {notification.content}
                        {notification.storyTitle && (
                          <span className="font-medium text-foreground"> "{notification.storyTitle}"</span>
                        )}
                      </p>

                      {notification.comment && (
                        <div className="bg-muted/50 rounded-md p-2 mt-2 text-sm italic">"{notification.comment}"</div>
                      )}

                      <div className="flex items-center justify-between mt-2">
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
