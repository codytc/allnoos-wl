"use client"

import type React from "react"
import { ChevronLeft, Bell } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import AllnoosLogo from "@/components/allnoos-logo"
import { useRouter } from "next/navigation"

export default function CreateChannelPage() {
  const router = useRouter()
  const [channelName, setChannelName] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    router.push("/wander")
  }

  return (
    <div className="min-h-screen bg-background">
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="headerCurveClipCreateChannel" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 1,0 L 1,0.895 C 0.956,0.897 0.544,0.897 0.5,0.897 C 0.456,0.897 0.044,0.897 0,0.895 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="sticky top-0 z-50 bg-background" style={{ clipPath: "url(#headerCurveClipCreateChannel)" }}>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <Link href="/wander">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
                  <ChevronLeft className="w-5 h-5 text-slate-600 group-active:text-slate-600/80 relative z-10" />
                </button>
              </Link>
            </div>
            <div className="flex justify-center">
              <Link href="/feed">
                <div className="relative flex items-center justify-center h-12 px-8">
                  <div className="absolute top-[-18px] left-[50%] transform translate-x-[-10px] z-10 italic text-xs tracking-tighter my-[22px] mb-0 mt-[22px] mr-0 ml-[-8px]">
                    <span className="text-stone-600 ml-[-1px] mb-0 mt-0 font-medium tracking-tighter text-xs">
                      STATION
                    </span>
                  </div>
                  <div style={{ minWidth: "120px", minHeight: "32px" }}>
                    <AllnoosLogo variant="default" size="md" onClick={() => {}} />
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex-1 flex justify-end">
              <Link href="/notifications">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
                  <Bell className="w-5 h-5 text-primary group-active:text-primary/80 relative z-10" />
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full h-8 relative -mb-8 flex items-end z-30" style={{ transform: "translateY(-18px)" }}>
          <svg
            viewBox="0 0 1440 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-6"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="curvedLineGradientCreateChannel" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="15%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="85%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
            </defs>
            <path
              d="M 0,25 C 200,5 520,5 720,25 C 920,45 1240,45 1440,25"
              stroke="url(#curvedLineGradientCreateChannel)"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto pt-10 relative -mt-8" style={{ transform: "translateY(-18px)" }}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Create a Channel</h1>
          <p className="text-muted-foreground">
            Start your own channel and share your unique perspective with the world.
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="channelName" className="text-sm font-medium">
                Channel Name
              </label>
              <Input
                id="channelName"
                placeholder="Enter your channel name"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                required
                className="focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus:border-input focus-visible:border-input focus:shadow-[inset_0_0_16px_rgba(253,180,132,0.35)]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Describe what your channel is about"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
                className="resize-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus:border-input focus-visible:border-input focus:shadow-[inset_0_0_16px_rgba(253,180,132,0.35)]"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !channelName.trim() || !description.trim()}
              className="w-full bg-primary hover:bg-primary/90 active:bg-primary/80 text-white font-semibold py-6 rounded-lg transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating Channel..." : "Create Channel"}
            </Button>
          </form>
        </Card>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-semibold mb-2 text-sm">Channel Guidelines</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Choose a clear, descriptive name for your channel</li>
            <li>• Write a compelling description that explains your channel's focus</li>
            <li>• Be authentic and share your unique perspective</li>
            <li>• Follow community guidelines and maintain respectful discourse</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
