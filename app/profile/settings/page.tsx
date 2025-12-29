"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import * as Select from "@radix-ui/react-select"
import { Input } from "@/components/ui/input"
import { Moon, Sun, Monitor, Search, UserX, X } from "lucide-react"
import { ChevronLeft, Lock } from "lucide-react"
import AllnoosLogo from "@/components/allnoos-logo"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

export default function ProfileSettingsPage() {
  const router = useRouter()
  const [profile, setProfile] = useState({
    name: "Sarah Chen",
    username: "sarahchen_news",
    email: "sarah@sarahchen.news",
    bio: "Independent journalist covering climate change and environmental issues. Based in Iceland. 🌍",
    location: "Reykjavik, Iceland",
    website: "sarahchen.news",
    avatar: "/professional-asian-female-climate-journalist-with-.jpg",
  })

  const [notifications, setNotifications] = useState({
    email: false,
    push: true,
    newsAlerts: true,
  })

  const [privacy, setPrivacy] = useState({
    allowMessages: true,
  })

  const [theme, setTheme] = useState({
    mode: "system",
  })

  const [subtitles, setSubtitles] = useState({
    enabled: false,
    language: "en",
  })

  const [audio, setAudio] = useState({
    language: "en",
  })

  const [security, setSecurity] = useState({
    twoFactor: false,
  })

  const [showBlockedUsers, setShowBlockedUsers] = useState(false)
  const [blockedSearchQuery, setBlockedSearchQuery] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const blockedUsersData = [
    {
      id: 1,
      name: "Spam Account",
      username: "@spambot123",
      avatar: "/male-journalist.png",
      blockedDate: "2024-03-15",
    },
    {
      id: 2,
      name: "Troll User",
      username: "@trollface",
      avatar: "/professional-woman-headshot.png",
      blockedDate: "2024-03-10",
    },
    {
      id: 3,
      name: "Fake News",
      username: "@fakenews",
      avatar: "/female-journalist.png",
      blockedDate: "2024-03-05",
    },
    {
      id: 4,
      name: "Harassment Account",
      username: "@harasser",
      avatar: "/male-journalist.png",
      blockedDate: "2024-02-28",
    },
    {
      id: 5,
      name: "Bot Account",
      username: "@botaccount",
      avatar: "/professional-woman-headshot.png",
      blockedDate: "2024-02-20",
    },
  ]

  const filteredBlockedUsers = blockedUsersData.filter(
    (user) =>
      user.name.toLowerCase().includes(blockedSearchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(blockedSearchQuery.toLowerCase()),
  )

  const handleProfileChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("[v0] Saving profile:", profile)
    alert("Profile saved successfully!")
  }

  const handleShowBlockedUsers = () => {
    setShowBlockedUsers(true)
  }

  const handleCloseBlockedUsers = () => {
    setShowBlockedUsers(false)
    setBlockedSearchQuery("")
  }

  const handleUnblockUser = (userId: number) => {
    // TODO: Implement unblock functionality
    console.log("[v0] Unblocking user:", userId)
  }

  const handleLogoClick = () => {
    router.push("/feed")
  }

  return (
    <div className="min-h-screen bg-background">
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="headerCurveClipSettings" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 1,0 L 1,0.760 C 0.861,0.823 0.639,0.808 0.5,0.761 C 0.361,0.707 0.139,0.707 0,0.760 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="sticky top-0 z-50 bg-background pb-8" style={{ clipPath: "url(#headerCurveClipSettings)" }}>
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
                  SETTINGS
                </span>
              </div>
              <div style={{ minWidth: "120px", minHeight: "32px" }}>
                <AllnoosLogo variant="default" size="md" onClick={handleLogoClick} />
              </div>
            </div>

            <div className="w-10"></div>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Help and Information"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-slate-400 placeholder:text-slate-400 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus:border-input focus-visible:border-input focus:shadow-[inset_0_0_16px_rgba(253,180,132,0.35)] rounded-lg"
            />
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
              <linearGradient id="curvedLineGradientSettings" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="15%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="85%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
            </defs>
            <path
              d="M 0,25 C 200,5 520,5 720,25 C 920,45 1240,45 1440,25"
              stroke="url(#curvedLineGradientSettings)"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>
        </div>
      </div>

      <div className="p-4 space-y-6" style={{ transform: "translateY(-30px)" }}>
        <section>
          <Card className="overflow-hidden cursor-default active:shadow-lg transition-all duration-200 group">
            <CardContent className="p-4 space-y-6 px-4 py-0">
              <div className="space-y-4">
                <h3 className="font-medium text-foreground border-b border-border pb-2">Notifications</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Email Notifications</Label>
                  </div>
                  <Switch
                    className="data-[state=unchecked]:bg-muted-foreground/30 data-[state=unchecked]:border-2 data-[state=unchecked]:border-muted-foreground/50 data-[state=checked]:bg-primary"
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Push Notifications</Label>
                  </div>
                  <Switch
                    className="data-[state=unchecked]:bg-muted-foreground/30 data-[state=unchecked]:border-2 data-[state=unchecked]:border-muted-foreground/50 data-[state=checked]:bg-primary"
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">News Alerts</Label>
                  </div>
                  <Switch
                    className="data-[state=unchecked]:bg-muted-foreground/30 data-[state=unchecked]:border-2 data-[state=unchecked]:border-muted-foreground/50 data-[state=checked]:bg-primary"
                    checked={notifications.newsAlerts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, newsAlerts: checked }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-foreground border-b border-border pb-2">Privacy</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Allow Messages</Label>
                  </div>
                  <Switch
                    className="data-[state=unchecked]:bg-muted-foreground/30 data-[state=unchecked]:border-2 data-[state=unchecked]:border-muted-foreground/50 data-[state=checked]:bg-primary"
                    checked={privacy.allowMessages}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, allowMessages: checked }))}
                  />
                </div>

                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 bg-transparent active:bg-primary/20 active:scale-105 transition-all duration-200"
                  onClick={handleShowBlockedUsers}
                >
                  <UserX className="w-4 h-4" />
                  Blocked Users
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-foreground border-b border-border pb-2">Appearance</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Theme Mode</Label>
                  </div>
                  <Select.Root
                    value={theme.mode}
                    onValueChange={(value) => setTheme((prev) => ({ ...prev, mode: value }))}
                  >
                    <Select.Trigger className="w-32">
                      <Select.Value />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="light">
                        <div className="flex items-center gap-2">
                          <Sun className="w-4 h-4" />
                          Light
                        </div>
                      </Select.Item>
                      <Select.Item value="dark">
                        <div className="flex items-center gap-2">
                          <Moon className="w-4 h-4" />
                          Dark
                        </div>
                      </Select.Item>
                      <Select.Item value="system">
                        <div className="flex items-center gap-2">
                          <Monitor className="w-4 h-4" />
                          System
                        </div>
                      </Select.Item>
                    </Select.Content>
                  </Select.Root>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Enable Subtitles</Label>
                  </div>
                  <Switch
                    className="data-[state=unchecked]:bg-muted-foreground/30 data-[state=unchecked]:border-2 data-[state=unchecked]:border-muted-foreground/50 data-[state=checked]:bg-primary"
                    checked={subtitles.enabled}
                    onCheckedChange={(checked) => setSubtitles((prev) => ({ ...prev, enabled: checked }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-foreground border-b border-border pb-2">Language</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Subtitle Language</Label>
                  </div>
                  <Select.Root
                    value={subtitles.language}
                    onValueChange={(value) => setSubtitles((prev) => ({ ...prev, language: value }))}
                    disabled={!subtitles.enabled}
                  >
                    <Select.Trigger className="w-32">
                      <Select.Value />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="ar">العربية (Arabic)</Select.Item>
                      <Select.Item value="bn">বাংলা (Bengali)</Select.Item>
                      <Select.Item value="zh">中文 (Chinese)</Select.Item>
                      <Select.Item value="en">English</Select.Item>
                      <Select.Item value="fr">Français (French)</Select.Item>
                      <Select.Item value="de">Deutsch (German)</Select.Item>
                      <Select.Item value="gu">ગુજરાતી (Gujarati)</Select.Item>
                      <Select.Item value="hi">हिन्दी (Hindi)</Select.Item>
                      <Select.Item value="id">Bahasa Indonesia</Select.Item>
                      <Select.Item value="it">Italiano (Italian)</Select.Item>
                      <Select.Item value="ja">日本語 (Japanese)</Select.Item>
                      <Select.Item value="jv">Basa Jawa (Javanese)</Select.Item>
                      <Select.Item value="ko">한국어 (Korean)</Select.Item>
                      <Select.Item value="mr">मराठी (Marathi)</Select.Item>
                      <Select.Item value="pa">ਪੰਜਾਬੀ (Punjabi)</Select.Item>
                      <Select.Item value="pt">Português (Portuguese)</Select.Item>
                      <Select.Item value="ru">Русский (Russian)</Select.Item>
                      <Select.Item value="es">Español (Spanish)</Select.Item>
                      <Select.Item value="te">తెలుగు (Telugu)</Select.Item>
                      <Select.Item value="tr">Türkçe (Turkish)</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Audio Language</Label>
                  </div>
                  <Select.Root
                    value={audio.language}
                    onValueChange={(value) => setAudio((prev) => ({ ...prev, language: value }))}
                  >
                    <Select.Trigger className="w-32">
                      <Select.Value />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="ar">العربية (Arabic)</Select.Item>
                      <Select.Item value="bn">বাংলা (Bengali)</Select.Item>
                      <Select.Item value="zh">中文 (Chinese)</Select.Item>
                      <Select.Item value="en">English</Select.Item>
                      <Select.Item value="fr">Français (French)</Select.Item>
                      <Select.Item value="de">Deutsch (German)</Select.Item>
                      <Select.Item value="gu">ગુજરાતી (Gujarati)</Select.Item>
                      <Select.Item value="hi">हिन्दी (Hindi)</Select.Item>
                      <Select.Item value="id">Bahasa Indonesia</Select.Item>
                      <Select.Item value="it">Italiano (Italian)</Select.Item>
                      <Select.Item value="ja">日本語 (Japanese)</Select.Item>
                      <Select.Item value="jv">Basa Jawa (Javanese)</Select.Item>
                      <Select.Item value="ko">한국어 (Korean)</Select.Item>
                      <Select.Item value="mr">मराठी (Marathi)</Select.Item>
                      <Select.Item value="pa">ਪੰਜਾਬੀ (Punjabi)</Select.Item>
                      <Select.Item value="pt">Português (Portuguese)</Select.Item>
                      <Select.Item value="ru">Русский (Russian)</Select.Item>
                      <Select.Item value="es">Español (Spanish)</Select.Item>
                      <Select.Item value="te">తెలుగు (Telugu)</Select.Item>
                      <Select.Item value="tr">Türkçe (Turkish)</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-foreground border-b border-border pb-2">Security</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                  </div>
                  <Switch
                    className="data-[state=unchecked]:bg-muted-foreground/30 data-[state=unchecked]:border-2 data-[state=unchecked]:border-muted-foreground/50 data-[state=checked]:bg-primary"
                    checked={security.twoFactor}
                    onCheckedChange={(checked) => setSecurity((prev) => ({ ...prev, twoFactor: checked }))}
                  />
                </div>

                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 bg-transparent active:bg-primary/20 active:scale-105 transition-all duration-200"
                >
                  <Lock className="w-4 h-4" />
                  Change Password
                </Button>
              </div>

              <div className="pt-4 border-t border-border">
                <Button
                  onClick={handleSave}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground active:scale-105 transition-all duration-200"
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {showBlockedUsers && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={handleCloseBlockedUsers}>
          <div
            className={`absolute left-0 top-8 bottom-8 w-80 bg-white/95 backdrop-blur-3xl rounded-r-3xl shadow-2xl transition-all duration-700 ease-out ${
              showBlockedUsers ? "transform translate-x-0 opacity-100" : "transform -translate-x-full opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-stone-900 text-xl font-bold">Blocked Users</h2>
                <button
                  onClick={handleCloseBlockedUsers}
                  className="text-stone-700 hover:text-stone-900 p-2 rounded-lg hover:bg-stone-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Box */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-500" />
                <input
                  type="text"
                  placeholder="Search blocked users..."
                  value={blockedSearchQuery}
                  onChange={(e) => setBlockedSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-white/95 rounded-lg focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus:border-input focus-visible:border-input focus:shadow-[inset_0_0_16px_rgba(253,180,132,0.35)] bg-white/95 backdrop-blur-sm text-stone-900 placeholder-stone-500"
                />
              </div>

              {/* Blocked Users List */}
              <div className="flex-1 overflow-y-auto space-y-3">
                {filteredBlockedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors"
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="text-sm">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-stone-900">{user.name}</h3>
                      <p className="text-sm text-stone-600">{user.username}</p>
                      <p className="text-xs text-stone-500 mt-1">
                        Blocked on{" "}
                        {new Date(user.blockedDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUnblockUser(user.id)}
                      className="text-xs bg-white/95 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      Unblock
                    </Button>
                  </div>
                ))}
                {filteredBlockedUsers.length === 0 && (
                  <div className="text-center py-8 text-stone-500">
                    {blockedSearchQuery
                      ? `No blocked users found matching "${blockedSearchQuery}"`
                      : "No blocked users"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
