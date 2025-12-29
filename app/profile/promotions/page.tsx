"use client"

import { ChevronLeft, Info } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AllnoosLogo from "@/components/allnoos-logo"

export default function PromotionsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="headerCurveClipPromos" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 1,0 L 1,0.733 C 0.861,0.822 0.639,0.822 0.5,0.733 C 0.361,0.651 0.139,0.651 0,0.733 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="sticky top-0 z-50 bg-background" style={{ clipPath: "url(#headerCurveClipPromos)" }}>
        <div className="flex items-center p-4 gap-3">
          <Link href="/profile/account">
            <button className="rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] bg-white/20 border border-white/30 p-2.5">
              <ChevronLeft className="size-5 text-stone-600" />
            </button>
          </Link>
          <div className="flex-1 flex justify-center">
            <Link href="/feed">
              <div className="relative flex items-center justify-center h-12 px-8">
                <div className="absolute top-[-18px] left-[50%] transform translate-x-[-10px] z-10 text-xs tracking-tighter my-[22px] mb-0 mt-[22px] mr-0 ml-[-8px] italic">
                  <span className="ml-[-1px] mb-0 mt-0 font-medium tracking-tighter text-xs uppercase whitespace-nowrap text-slate-600">
                    PROMOS
                  </span>
                </div>
                <div style={{ minWidth: "120px", minHeight: "32px" }}>
                  <AllnoosLogo variant="default" size="md" onClick={() => {}} />
                </div>
              </div>
            </Link>
          </div>
          <div className="relative">
            <div className="w-10 h-10" />
          </div>
        </div>
        {/* Curved line at bottom of header */}
        <div className="w-full h-8 relative -mb-8 flex items-end z-30" style={{ transform: "translateY(-18px)" }}>
          <svg
            viewBox="0 0 1440 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-6"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="curvedLineGradientPromos" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="15%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="85%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
            </defs>
            <path
              d="M 0,25 C 200,5 520,5 720,25 C 920,45 1240,45 1440,25"
              stroke="url(#curvedLineGradientPromos)"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>
        </div>
      </div>

      <div className="p-6 pt-10 relative -mt-8" style={{ transform: "translateY(-18px)" }}>
        <div className="bg-muted/50 border border-border rounded-lg p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">No pending promotions</p>
            <p className="text-xs text-muted-foreground mt-1">
              You don't have any promotion requests at this time. Check back later for new opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
