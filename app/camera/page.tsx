"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  X,
  Zap,
  Camera,
  Video,
  OctagonIcon,
  Trash2,
  Star,
  Play,
  Pause,
  Scissors,
  Grid,
  Timer,
  Mic,
  Focus,
  Aperture,
  Sun,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import AllnoosLogo from "@/components/allnoos-logo"

type IconOption = {
  name: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
}

export default function CameraPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingMode, setRecordingMode] = useState<"photo" | "video">("photo")
  const [flashEnabled, setFlashEnabled] = useState(false)
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([])
  const [capturedVideos, setCapturedVideos] = useState(0)
  const [videoData, setVideoData] = useState<Array<{ id: number; thumbnail: string; duration: string }>>([])
  const [showVideoGallery, setShowVideoGallery] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [favoriteVideos, setFavoriteVideos] = useState<Set<number>>(new Set())
  const [cameraMode, setCameraMode] = useState<"rear" | "front">("rear")
  const [showIconSelector, setShowIconSelector] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [controlIcons, setControlIcons] = useState<string[]>(["camera-flip", "grid", "flash", "timer"])
  const [showPhotoGallery, setShowPhotoGallery] = useState(false)
  const [emphasizedPhotos, setEmphasizedPhotos] = useState<Set<number>>(new Set())
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [lastTap, setLastTap] = useState<number>(0)
  const [showCreateButton, setShowCreateButton] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const savedPhotos = localStorage.getItem("cameraPhotos")
    const savedVideos = localStorage.getItem("cameraVideos")
    const savedVideoData = localStorage.getItem("cameraVideoData")
    const savedEmphasizedPhotos = localStorage.getItem("emphasizedPhotos")
    const savedFavoriteVideos = localStorage.getItem("favoriteVideos")

    if (savedPhotos) {
      const photos = JSON.parse(savedPhotos)
      setCapturedPhotos(photos)
      if (photos.length > 0) setShowCreateButton(true)
    }

    if (savedVideos) {
      const videoCount = JSON.parse(savedVideos)
      setCapturedVideos(videoCount)
      if (videoCount > 0) setShowCreateButton(true)
    }

    if (savedVideoData) {
      setVideoData(JSON.parse(savedVideoData))
    }

    if (savedEmphasizedPhotos) {
      setEmphasizedPhotos(new Set(JSON.parse(savedEmphasizedPhotos)))
    }

    if (savedFavoriteVideos) {
      setFavoriteVideos(new Set(JSON.parse(savedFavoriteVideos)))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cameraPhotos", JSON.stringify(capturedPhotos))
  }, [capturedPhotos])

  useEffect(() => {
    localStorage.setItem("cameraVideos", JSON.stringify(capturedVideos))
  }, [capturedVideos])

  useEffect(() => {
    localStorage.setItem("cameraVideoData", JSON.stringify(videoData))
  }, [videoData])

  useEffect(() => {
    localStorage.setItem("emphasizedPhotos", JSON.stringify(Array.from(emphasizedPhotos)))
  }, [emphasizedPhotos])

  useEffect(() => {
    localStorage.setItem("favoriteVideos", JSON.stringify(Array.from(favoriteVideos)))
  }, [favoriteVideos])

  const handlePhotoCapture = () => {
    console.log("[v0] Taking photo...")
    const photoUrl = "/professional-woman-headshot.png"
    setCapturedPhotos((prev) => [photoUrl, ...prev])
    setShowCreateButton(true)
  }

  const handleVideoCapture = () => {
    const newRecordingState = !isRecording
    setIsRecording(newRecordingState)
    console.log("[v0] Recording video:", newRecordingState)

    if (!newRecordingState && isRecording) {
      setCapturedVideos((prev) => prev + 1)
      setVideoData((prev) => [
        ...prev,
        {
          id: Date.now(),
          thumbnail: "/street-parade-celebration.png",
          duration: "0:15",
        },
      ])
      setShowCreateButton(true)
    }
  }

  const handlePhotoMode = () => {
    setRecordingMode("photo")
  }

  const handleVideoMode = () => {
    setRecordingMode("video")
  }

  const toggleFlash = () => {
    setFlashEnabled(!flashEnabled)
  }

  const toggleCamera = () => {
    const newCameraMode = cameraMode === "rear" ? "front" : "rear"
    setCameraMode(newCameraMode)
    console.log("[v0] Switching to", newCameraMode, "camera")
  }

  const openPhotoGallery = () => {
    setShowPhotoGallery(true)
  }

  const closePhotoGallery = () => {
    setShowPhotoGallery(false)
    setSelectedPhoto(null)
  }

  const deletePhoto = (index: number) => {
    setCapturedPhotos((prev) => prev.filter((_, i) => i !== index))
    setEmphasizedPhotos((prev) => {
      const newSet = new Set(prev)
      newSet.delete(index)
      const adjustedSet = new Set<number>()
      newSet.forEach((i) => {
        if (i > index) adjustedSet.add(i - 1)
        else if (i < index) adjustedSet.add(i)
      })
      return adjustedSet
    })
  }

  const toggleEmphasize = (index: number) => {
    setEmphasizedPhotos((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const selectPhoto = (index: number) => {
    setSelectedPhoto(index)
  }

  const openVideoGallery = () => {
    setShowVideoGallery(true)
  }

  const closeVideoGallery = () => {
    setShowVideoGallery(false)
    setSelectedVideo(null)
    setIsPlaying(false)
  }

  const selectVideo = (videoId: number) => {
    setSelectedVideo(videoId)
  }

  const toggleVideoPlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleVideoDoubleTap = () => {
    const now = Date.now()
    const DOUBLE_TAP_DELAY = 300

    if (now - lastTap < DOUBLE_TAP_DELAY) {
      setSelectedVideo(null)
    }
    setLastTap(now)
  }

  const handleVideoCenterClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleVideoPlay()
  }

  const deleteVideo = (videoId: number) => {
    setVideoData((prev) => prev.filter((video) => video.id !== videoId))
    setCapturedVideos((prev) => prev - 1)
    setFavoriteVideos((prev) => {
      const newSet = new Set(prev)
      newSet.delete(videoId)
      return newSet
    })
    if (selectedVideo === videoId) {
      setSelectedVideo(null)
    }
  }

  const toggleVideoFavorite = (videoId: number) => {
    setFavoriteVideos((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(videoId)) {
        newSet.delete(videoId)
      } else {
        newSet.add(videoId)
      }
      return newSet
    })
  }

  const resetCameraState = () => {
    setCapturedPhotos([])
    setCapturedVideos(0)
    setVideoData([])
    setEmphasizedPhotos(new Set())
    setFavoriteVideos(new Set())
    setSelectedPhoto(null)
    setSelectedVideo(null)
    setShowPhotoGallery(false)
    setShowVideoGallery(false)
    setShowCreateButton(false)
    setIsRecording(false)
    setIsPlaying(false)

    localStorage.removeItem("cameraPhotos")
    localStorage.removeItem("cameraVideos")
    localStorage.removeItem("cameraVideoData")
    localStorage.removeItem("emphasizedPhotos")
    localStorage.removeItem("favoriteVideos")

    router.push("/feed")
  }

  const availableIcons: Record<string, IconOption> = {
    "camera-flip": {
      name: "Flip Camera",
      icon: ({ className }) => (
        <svg
          width="24"
          height="21"
          viewBox="0 0 28 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <path
            d="M5.50003 13.5035C5.50003 14.44 4.51117 14.9516 3.85984 14.3521L0.859841 11.5906C0.435564 11.2 0.378239 10.5035 0.731804 10.0349C1.08537 9.56621 1.71593 9.50289 2.14021 9.89343L3.50003 11.1451V6.87591C3.50003 3.21558 6.18632 0.248291 9.50002 0.248291H19.5C20.3655 0.248291 21.2076 0.558366 21.9 1.13197L23.1 2.12612C23.5419 2.49215 23.6314 3.18451 23.3 3.67256C22.9687 4.1606 22.3419 4.25951 21.9 3.89348L20.7 2.89934C20.3538 2.61253 19.9328 2.4575 19.5 2.4575H9.50002C7.29089 2.4575 5.50003 4.43569 5.50003 6.87591V13.5035Z"
            fill="white"
          />
          <path
            d="M22.5001 11.2942C22.5001 10.3577 23.489 9.8461 24.1403 10.4456L27.1403 13.2071C27.5646 13.5977 27.6219 14.2942 27.2684 14.7629C26.9148 15.2315 26.2842 15.2949 25.86 14.9043L24.5001 13.6526V17.9218C24.5001 21.5822 21.8139 24.5494 18.5001 24.5494H8.50014C7.63466 24.5494 6.79253 24.2394 6.10014 23.6658L4.90014 22.6716C4.45832 22.3056 4.36877 21.6132 4.70014 21.1252C5.03151 20.6371 5.65832 20.5382 6.10014 20.9043L7.30014 21.8984C7.64634 22.1852 8.0674 22.3402 8.50014 22.3402H18.5001C20.7093 22.3402 22.5001 20.3621 22.5001 17.9218V11.2942Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.5001 12.3989C18.5001 15.1441 16.4854 17.3696 14.0001 17.3696C11.5148 17.3696 9.50008 15.1441 9.50008 12.3989C9.50008 9.65362 11.5148 7.42816 14.0001 7.42816C16.4854 7.42816 18.5001 9.6537 18.5001 12.3989ZM16.5001 12.3989C16.5001 13.924 15.3808 15.1604 14.0001 15.1604C12.6194 15.1604 11.5001 13.924 11.5001 12.3989C11.5001 10.8737 12.6194 9.63736 14.0001 9.63736C15.3808 9.63736 16.5001 10.8737 16.5001 12.3989Z"
            fill="white"
          />
        </svg>
      ),
      action: toggleCamera,
    },
    grid: {
      name: "Grid",
      icon: Grid,
      action: () => console.log("[v0] Grid toggled"),
    },
    flash: {
      name: "Flash",
      icon: Zap,
      action: toggleFlash,
    },
    timer: {
      name: "Timer",
      icon: Timer,
      action: () => console.log("[v0] Timer toggled"),
    },
    mic: {
      name: "Microphone",
      icon: Mic,
      action: () => console.log("[v0] Mic toggled"),
    },
    focus: {
      name: "Focus",
      icon: Focus,
      action: () => console.log("[v0] Focus toggled"),
    },
    aperture: {
      name: "Aperture",
      icon: Aperture,
      action: () => console.log("[v0] Aperture toggled"),
    },
    sun: {
      name: "Brightness",
      icon: Sun,
      action: () => console.log("[v0] Brightness toggled"),
    },
  }

  const handleIconSelect = (iconKey: string) => {
    if (selectedSlot !== null) {
      const newIcons = [...controlIcons]
      newIcons[selectedSlot] = iconKey
      setControlIcons(newIcons)
      setShowIconSelector(false)
      setSelectedSlot(null)
    }
  }

  const openIconSelector = (slotIndex: number) => {
    setSelectedSlot(slotIndex)
    setShowIconSelector(true)
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/street-parade-celebration.png')`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      <div className="absolute top-0 left-0 right-0 z-50 flex items-center px-6 py-4 text-white justify-center">
        <div className="flex items-center gap-1"></div>

        <div className="relative flex items-center justify-center h-12 px-8">
          <div className="absolute top-[-18px] left-[50%] transform translate-x-[-10px] z-10 italic text-xs tracking-tighter my-[22px] mb-0 mt-[22px] mr-0 ml-[-8px]">
            <span className="text-white ml-[-1px] mb-0 mt-0 font-medium tracking-tighter text-xs">CAMERA</span>
          </div>
          <div style={{ minWidth: "120px", minHeight: "32px" }}>
            <AllnoosLogo variant="white" size="md" animated={false} />
          </div>
        </div>
      </div>

      {(capturedPhotos.length > 0 || capturedVideos > 0) && (
        <div className="absolute top-28 left-6 z-50 flex flex-col gap-3">
          {capturedPhotos.length > 0 && (
            <div className="relative">
              <button
                onClick={openPhotoGallery}
                className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/50 bg-white/20 backdrop-blur-sm flex items-center justify-center active:bg-white/30 transition-all duration-200 mr-0 ml-[-20px]"
              >
                <Camera className="w-8 h-8 text-white" />
              </button>
              {capturedPhotos.length > 1 && (
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-lg">
                  {capturedPhotos.length}
                </div>
              )}
            </div>
          )}

          {capturedVideos > 0 && (
            <div className="relative">
              <button
                onClick={openVideoGallery}
                className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/50 bg-white/20 backdrop-blur-sm flex items-center justify-center active:bg-white/30 transition-all duration-200 ml-[-20px]"
              >
                <Video className="w-8 h-8 text-white" />
              </button>
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-lg">
                {capturedVideos}
              </div>
            </div>
          )}
        </div>
      )}

      <button
        onClick={resetCameraState}
        className="absolute top-14 left-6 z-50 w-12 h-12 flex items-center justify-center text-white active:bg-white/10 rounded-full transition-all duration-200"
      >
        <X className="w-7 h-7 mt-0 mb-[70px] ml-[-30px]" />
      </button>

      {isRecording && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-red-500/30 backdrop-blur-sm rounded-full px-6 py-2 animate-pulse">
            <span className="text-white font-semibold text-lg">Recording</span>
          </div>
        </div>
      )}

      <div className="absolute bottom-8 left-0 right-0 z-50 flex items-center justify-center gap-8 px-8">
        <div className="relative bg-gradient-to-r from-white/15 via-white/25 to-white/15 backdrop-blur-xl rounded-full flex items-center border border-white/30 p-2 shadow-2xl mb-[-20px] gap-0 px-0.5 py-1">
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>

          {showCreateButton && (
            <div className="absolute top-[-60px] left-1/2 transform -translate-x-1/2 z-10">
              <Link href="/create" className="flex items-center justify-center">
                <button className="bg-gradient-to-br from-yellow-400 to-yellow-600 active:from-yellow-500 active:to-yellow-700 transition-all duration-200 active:scale-95 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-300/50 relative z-10 mt-16 w-28 font-medium h-6">
                  <div className="absolute inset-1 rounded-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>
                  <span className="text-white font-semibold drop-shadow-lg relative z-10 text-base mt-0 mb-1">
                    DRAFT
                  </span>
                  <div className="absolute inset-0 rounded-full bg-yellow-400/30 blur-lg scale-150 pointer-events-none"></div>
                </button>
              </Link>
            </div>
          )}

          <button
            onClick={() => {
              handlePhotoMode()
              handlePhotoCapture()
            }}
            className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 shadow-lg border-2 ${
              recordingMode === "photo"
                ? "bg-gradient-to-br from-blue-400 to-blue-600 border-blue-300/50 shadow-blue-500/30"
                : "bg-gradient-to-br from-blue-500/70 to-blue-700/70 border-blue-400/30 hover:from-blue-400/80 hover:to-blue-600/80"
            }`}
          >
            <div className="absolute inset-1 rounded-full bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>
            <Camera className="w-8 h-8 text-white drop-shadow-lg relative z-10" />
            <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-xl scale-150 pointer-events-none"></div>
          </button>

          <div className="flex items-center gap-4 px-2 mt-2 mb-[-25px]">
            {controlIcons.map((iconKey, index) => {
              const iconData = availableIcons[iconKey]
              const IconComponent = iconData.icon
              const isFlashActive = iconKey === "flash" && flashEnabled

              return (
                <button
                  key={index}
                  onClick={iconData.action}
                  onContextMenu={(e) => {
                    e.preventDefault()
                    openIconSelector(index)
                  }}
                  className={`w-12 h-12 flex items-center justify-center transition-all duration-200 active:scale-95 rounded-full border relative ${
                    isFlashActive
                      ? "bg-gradient-to-br from-yellow-400/40 to-yellow-600/40 border-yellow-300/50 shadow-yellow-500/30"
                      : "border-white/20 hover:bg-white/20 active:bg-white/30"
                  }`}
                >
                  <div className="absolute inset-1 rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
                  <IconComponent
                    className={`w-6 h-6 drop-shadow-lg relative z-10 ${isFlashActive ? "text-yellow-300" : "text-white"}`}
                  />
                  {isFlashActive && (
                    <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-lg scale-150 pointer-events-none"></div>
                  )}
                </button>
              )
            })}
          </div>

          <button
            onClick={() => {
              handleVideoMode()
              handleVideoCapture()
            }}
            className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 shadow-lg border-2 ${
              recordingMode === "video"
                ? "bg-gradient-to-br from-red-400 to-red-600 border-red-300/50 shadow-red-500/30"
                : "bg-gradient-to-br from-red-500/70 to-red-700/70 border-red-400/30 hover:from-red-400/80 hover:to-red-600/80"
            } ${isRecording ? "animate-pulse" : ""}`}
          >
            <div className="absolute inset-1 rounded-full bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>
            {isRecording ? (
              <OctagonIcon className="w-8 h-8 text-white drop-shadow-lg relative z-10" />
            ) : (
              <Video className="w-8 h-8 text-white drop-shadow-lg relative z-10" />
            )}
            <div className="absolute inset-0 rounded-full bg-red-400/20 blur-xl scale-150 pointer-events-none"></div>
          </button>
        </div>
      </div>

      {showIconSelector && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center"
          onClick={() => setShowIconSelector(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div
            className="relative bg-white/20 backdrop-blur-xl rounded-3xl p-6 max-w-sm w-full mx-4 border border-white/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-semibold">Select Icon</h3>
              <button
                onClick={() => setShowIconSelector(false)}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center active:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(availableIcons).map(([key, data]) => {
                const IconComponent = data.icon
                const isSelected = selectedSlot !== null && controlIcons[selectedSlot] === key
                return (
                  <button
                    key={key}
                    onClick={() => handleIconSelect(key)}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                      isSelected
                        ? "bg-blue-500 border-2 border-blue-300"
                        : "bg-white/10 border border-white/20 hover:bg-white/20 active:bg-white/30"
                    }`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                    <span className="text-white text-[10px] text-center leading-tight">{data.name}</span>
                  </button>
                )
              })}
            </div>
            <p className="text-white/70 text-xs mt-4 text-center">Long press any control button to customize</p>
          </div>
        </div>
      )}

      {showVideoGallery && (
        <div className="fixed inset-0 z-[100] flex items-end" onClick={closeVideoGallery}>
          <div
            className={`w-full bg-white/20 backdrop-blur-md rounded-t-3xl transition-all duration-500 ease-out ${
              showVideoGallery
                ? "h-2/3 opacity-100 transform translate-y-0"
                : "h-0 opacity-0 transform translate-y-full"
            }`}
            style={{ height: "67vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 h-full flex flex-col">
              {selectedVideo ? (
                <div className="h-full flex flex-col" onClick={() => setSelectedVideo(null)}>
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedVideo(null)
                      }}
                      className="text-white active:text-gray-300 transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        closeVideoGallery()
                      }}
                      className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center active:bg-white/30 transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  <div className="flex-1 bg-black/50 rounded-lg overflow-hidden mb-4 relative">
                    <img
                      src={videoData.find((v) => v.id === selectedVideo)?.thumbnail || "/placeholder.svg"}
                      alt="Video"
                      className="w-full h-full object-cover"
                    />

                    <div
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      onClick={handleVideoCenterClick}
                      onDoubleClick={handleVideoDoubleTap}
                    >
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center active:bg-white/30 transition-colors">
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-white" />
                        ) : (
                          <Play className="w-8 h-8 text-white ml-1" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-6" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => toggleVideoFavorite(selectedVideo)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        favoriteVideos.has(selectedVideo)
                          ? "bg-yellow-500 text-white"
                          : "bg-white/20 text-white active:bg-white/30"
                      }`}
                    >
                      <Star className="w-6 h-6" fill={favoriteVideos.has(selectedVideo) ? "currentColor" : "none"} />
                    </button>

                    <button className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center active:bg-white/30 transition-colors">
                      <Scissors className="w-6 h-6" />
                    </button>

                    <button
                      onClick={() => deleteVideo(selectedVideo)}
                      className="w-12 h-12 rounded-full bg-green-700/80 text-white flex items-center justify-center active:bg-green-700 transition-colors"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-white text-xl font-semibold">Videos ({capturedVideos})</h2>
                    <button
                      onClick={closeVideoGallery}
                      className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center active:bg-white/30 transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                      {videoData.map((video) => (
                        <div key={video.id} className="relative group">
                          <div
                            className={`relative rounded-lg overflow-hidden cursor-pointer ${
                              favoriteVideos.has(video.id) ? "ring-4 ring-yellow-400" : ""
                            }`}
                            onClick={() => selectVideo(video.id)}
                          >
                            <img
                              src={video.thumbnail || "/placeholder.svg"}
                              alt={`Video ${video.id}`}
                              className="w-full aspect-video object-cover"
                            />

                            <div className="absolute top-2 left-2 flex gap-2"></div>

                            <div className="absolute top-2 right-2 text-2xl">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteVideo(video.id)
                                }}
                                className="rounded-full bg-green-700/80 text-white flex items-center justify-center active:bg-green-700 transition-colors size-12"
                              >
                                <Trash2 className="size-7" />
                              </button>
                            </div>

                            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded text-2xl mt-0.5">
                              {video.duration}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <div className="w-12 h-1 bg-white/40 rounded-full"></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {showPhotoGallery && (
        <div className="fixed inset-0 z-[100] flex items-end" onClick={closePhotoGallery}>
          <div
            className={`w-full bg-white/20 backdrop-blur-md rounded-t-3xl transition-all duration-500 ease-out ${
              showPhotoGallery
                ? "h-2/3 opacity-100 transform translate-y-0"
                : "h-0 opacity-0 transform translate-y-full"
            }`}
            style={{ height: "67vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 h-full flex flex-col">
              {selectedPhoto !== null ? (
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => setSelectedPhoto(null)}
                      className="text-white active:text-gray-300 transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={closePhotoGallery}
                      className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center active:bg-white/30 transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  <div
                    className="flex-1 bg-black/50 rounded-lg overflow-hidden mb-4 relative cursor-pointer"
                    onClick={() => setSelectedPhoto(null)}
                    onDoubleClick={() => setSelectedPhoto(null)}
                  >
                    <img
                      src={capturedPhotos[selectedPhoto] || "/placeholder.svg"}
                      alt={`Photo ${selectedPhoto + 1}`}
                      className="w-full h-full object-contain"
                    />

                    <div className="absolute top-4 left-4 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleEmphasize(selectedPhoto)
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          emphasizedPhotos.has(selectedPhoto)
                            ? "bg-yellow-500 text-white"
                            : "bg-white/20 text-white active:bg-white/30"
                        }`}
                      >
                        <Star
                          className="w-5 h-5"
                          fill={emphasizedPhotos.has(selectedPhoto) ? "currentColor" : "none"}
                        />
                      </button>
                    </div>

                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() => {
                          deletePhoto(selectedPhoto)
                          setSelectedPhoto(null)
                        }}
                        className="w-10 h-10 rounded-full bg-green-700/80 text-white flex items-center justify-center active:bg-green-700 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-white text-xl font-semibold">Photos ({capturedPhotos.length})</h2>
                    <button
                      onClick={closePhotoGallery}
                      className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center active:bg-white/30 transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-3">
                      {capturedPhotos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <div
                            className={`relative rounded-lg overflow-hidden cursor-pointer ${
                              emphasizedPhotos.has(index) ? "ring-4 ring-yellow-400" : ""
                            }`}
                            onClick={() => selectPhoto(index)}
                          >
                            <img
                              src={photo || "/placeholder.svg"}
                              alt={`Photo ${index + 1}`}
                              className="w-full aspect-square object-cover"
                            />

                            <div className="absolute top-2 left-2 flex gap-2"></div>

                            <div className="absolute top-2 right-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deletePhoto(index)
                                }}
                                className="rounded-full bg-green-700/80 text-white flex items-center justify-center active:bg-green-700 transition-colors size-12"
                              >
                                <Trash2 className="size-8" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <div className="w-12 h-1 bg-white/40 rounded-full"></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
