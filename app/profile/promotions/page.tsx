"use client"

import { ArrowLeft, Info } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AllnoosLogo from "@/components/allnoos-logo"

export default function PromotionsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center p-4 gap-3">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
            <ArrowLeft className="w-5 h-5 text-primary group-active:text-primary/80 relative z-10" />
          </button>
          <div className="flex-1 flex justify-center">
            <Link href="/feed">
              <div className="relative flex items-center justify-center h-12 px-8">
                <div className="absolute top-[-18px] left-[50%] transform translate-x-[-10px] z-10 italic text-xs tracking-tighter my-[22px] mb-0 mt-[22px] mr-0 ml-[-8px]">
                  <span className="text-stone-600 ml-[-1px] mb-0 mt-0 font-medium tracking-tighter text-xs uppercase">
                    PROMOS
                  </span>
                </div>
                <div style={{ minWidth: "120px", minHeight: "32px" }}>
                  <AllnoosLogo variant="default" size="md" onClick={() => {}} />
                </div>
              </div>
            </Link>
          </div>
          <div className="w-10 h-10" />
        </div>
      </div>

      <div className="p-6">
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

      {/* Removed the old empty state message */}
    </div>
  )
}
