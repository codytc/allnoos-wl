"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import AllnoosLogo from "@/components/allnoos-logo"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/feed")
  }, [router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <AllnoosLogo variant="primary" size="md" className="mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
