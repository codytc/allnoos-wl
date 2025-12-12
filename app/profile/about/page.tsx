"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { useRef, useEffect } from "react"
import { AllnoosLogo } from "@/components/allnoos-logo"
import { userProfiles } from "@/lib/mock-data"

export default function AboutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const videoRef = useRef<HTMLVideoElement>(null)

  const userId = searchParams.get("userId")
  const defaultUserId = 5 // Marcus Thompson
  const user = userProfiles.find((u) => u.id === Number(userId)) || userProfiles.find((u) => u.id === defaultUserId) || userProfiles[0]

  const handleReturn = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      const from = searchParams.get("from")
      router.push(`/profile?userId=${user.id}${from ? `&from=${encodeURIComponent(from)}` : ""}`)
    }
  }

  const handleVideoClick = handleReturn
  const handleVideoEnd = handleReturn
  const handleContainerClick = handleReturn

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.addEventListener("ended", handleVideoEnd)
      return () => {
        video.removeEventListener("ended", handleVideoEnd)
      }
    }
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black cursor-pointer" onClick={handleContainerClick}>
      <div className="absolute inset-0 w-full h-full">
        <img src={user.avatar || "/placeholder.svg"} alt={`About ${user.name}`} className="w-full h-full object-cover" />
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center px-8">
            <h2 className="text-3xl font-bold mb-6">About {user.name}</h2>
            <p className="text-xl mb-4">{user.bio}</p>
            <div className="text-lg mb-8 space-y-2">
              <p>{user.location}</p>
              <p>{user.followers.toLocaleString()} followers · {user.stories} stories</p>
            </div>
            <p className="text-sm opacity-70">Tap anywhere to return to profile</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex justify-center items-start px-4 py-4">
        <AllnoosLogo variant="white" size="md" />
      </div>
    </div>
  )
}
