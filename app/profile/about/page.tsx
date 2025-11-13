"use client"
import { useRouter } from "next/navigation"
import { useRef, useEffect } from "react"
import AllnoosLogo from "@/components/allnoos-logo"

export default function AboutPage() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVideoClick = () => {
    router.push("/profile")
  }

  const handleVideoEnd = () => {
    router.push("/profile")
  }

  const handleContainerClick = () => {
    router.push("/profile")
  }

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
        <img src="/professional-woman-headshot.png" alt="About Sarah Chen" className="w-full h-full object-cover" />
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center px-8">
            <h2 className="text-3xl font-bold mb-6">About Sarah Chen</h2>
            <p className="text-xl mb-4">Independent journalist covering climate change</p>
            <p className="text-lg mb-8">Bringing you the stories that matter most</p>
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
