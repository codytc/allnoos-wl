"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Moon, Sun, Monitor, Lock, ArrowLeft, Search, UserX, X } from "lucide-react"
import AllnoosLogo from "@/components/allnoos-logo"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfileSettingsPage() {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header - matching discover screen design */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1">
              <Link href="/user-profile">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
                  <ArrowLeft className="w-5 h-5 text-primary group-active:text-primary/80 relative z-10" />
                </button>
              </Link>
            </div>
            <div className="flex justify-center">
              <Link href="/feed">
                <div className="relative flex items-center justify-center h-12 px-8">
                  <div className="absolute top-[-18px] left-[50%] transform translate-x-[-10px] z-10 italic text-xs tracking-tighter my-[22px] mb-0 mt-[22px] mr-0 ml-[-8px]">
                    <span className="text-stone-600 ml-[-1px] mb-0 mt-0 font-medium tracking-tighter text-xs">
                      SETTINGS
                    </span>
                  </div>
                  <div style={{ minWidth: "120px", minHeight: "32px" }}>
                    <AllnoosLogo variant="default" size="md" onClick={() => {}} />
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex-1 flex justify-end">
              <Link href="/notifications"></Link>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Help and Information"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus:border-input focus-visible:border-input focus:shadow-[inset_0_0_16px_rgba(253,180,132,0.35)] rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Main Content - matching discover screen spacing and card design */}
      <div className="p-4 space-y-6">
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
                  <Select value={theme.mode} onValueChange={(value) => setTheme((prev) => ({ ...prev, mode: value }))}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center gap-2">
                          <Sun className="w-4 h-4" />
                          Light
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center gap-2">
                          <Moon className="w-4 h-4" />
                          Dark
                        </div>
                      </SelectItem>
                      <SelectItem value="system">
                        <div className="flex items-center gap-2">
                          <Monitor className="w-4 h-4" />
                          System
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Select
                    value={subtitles.language}
                    onValueChange={(value) => setSubtitles((prev) => ({ ...prev, language: value }))}
                    disabled={!subtitles.enabled}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية (Arabic)</SelectItem>
                      <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                      <SelectItem value="zh">中文 (Chinese)</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français (French)</SelectItem>
                      <SelectItem value="de">Deutsch (German)</SelectItem>
                      <SelectItem value="gu">ગુજરાતી (Gujarati)</SelectItem>
                      <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                      <SelectItem value="id">Bahasa Indonesia</SelectItem>
                      <SelectItem value="it">Italiano (Italian)</SelectItem>
                      <SelectItem value="ja">日本語 (Japanese)</SelectItem>
                      <SelectItem value="jv">Basa Jawa (Javanese)</SelectItem>
                      <SelectItem value="ko">한국어 (Korean)</SelectItem>
                      <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                      <SelectItem value="pa">ਪੰਜਾਬੀ (Punjabi)</SelectItem>
                      <SelectItem value="pt">Português (Portuguese)</SelectItem>
                      <SelectItem value="ru">Русский (Russian)</SelectItem>
                      <SelectItem value="es">Español (Spanish)</SelectItem>
                      <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                      <SelectItem value="tr">Türkçe (Turkish)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Audio Language</Label>
                  </div>
                  <Select
                    value={audio.language}
                    onValueChange={(value) => setAudio((prev) => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية (Arabic)</SelectItem>
                      <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                      <SelectItem value="zh">中文 (Chinese)</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français (French)</SelectItem>
                      <SelectItem value="de">Deutsch (German)</SelectItem>
                      <SelectItem value="gu">ગુજરાતી (Gujarati)</SelectItem>
                      <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                      <SelectItem value="id">Bahasa Indonesia</SelectItem>
                      <SelectItem value="it">Italiano (Italian)</SelectItem>
                      <SelectItem value="ja">日本語 (Japanese)</SelectItem>
                      <SelectItem value="jv">Basa Jawa (Javanese)</SelectItem>
                      <SelectItem value="ko">한국어 (Korean)</SelectItem>
                      <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                      <SelectItem value="pa">ਪੰਜਾਬੀ (Punjabi)</SelectItem>
                      <SelectItem value="pt">Português (Portuguese)</SelectItem>
                      <SelectItem value="ru">Русский (Russian)</SelectItem>
                      <SelectItem value="es">Español (Spanish)</SelectItem>
                      <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                      <SelectItem value="tr">Türkçe (Turkish)</SelectItem>
                    </SelectContent>
                  </Select>
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
