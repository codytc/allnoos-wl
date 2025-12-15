"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  ChevronLeftIcon,
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
  UserSquare2Icon,
  UserXIcon,
  User,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import AllnoosLogo from "@/components/allnoos-logo"

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
  const [showPhotoGallery, setShowPhotoGallery] = useState(false)
  const [emphasizedPhotos, setEmphasizedPhotos] = useState<Set<number>>(new Set())
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [lastTap, setLastTap] = useState<number>(0)
  const [showCreateButton, setShowCreateButton] = useState(false)
  const [timerCountdown, setTimerCountdown] = useState<null | 5 | 10>(null)
  const [activeCountdown, setActiveCountdown] = useState<number | null>(null)
  const [icon1, setIcon1] = useState<"camera-flip" | "grid" | "timer">("camera-flip")
  const [icon2, setIcon2] = useState<"user-x" | "user" | "user-square">("user-x")
  const [icon3, setIcon3] = useState<"flash" | "night-mode" | "hdr">("flash")
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

  useEffect(() => {
    if (activeCountdown !== null && activeCountdown > 0) {
      const timer = setTimeout(() => {
        setActiveCountdown(activeCountdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (activeCountdown === 0) {
      // Trigger capture based on recording mode
      if (recordingMode === "photo") {
        handlePhotoCapture()
      } else {
        handleVideoCapture()
      }
      setActiveCountdown(null)
    }
  }, [activeCountdown, recordingMode])

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
    setTimerCountdown(null)
    setActiveCountdown(null)

    localStorage.removeItem("cameraPhotos")
    localStorage.removeItem("cameraVideos")
    localStorage.removeItem("cameraVideoData")
    localStorage.removeItem("emphasizedPhotos")
    localStorage.removeItem("favoriteVideos")

    router.push("/feed")
  }

  const cycleTimerState = () => {
    if (timerCountdown === null) {
      setTimerCountdown(5)
    } else if (timerCountdown === 5) {
      setTimerCountdown(10)
    } else {
      setTimerCountdown(null)
    }
  }

  const handleCaptureWithTimer = () => {
    if (timerCountdown !== null) {
      setActiveCountdown(timerCountdown)
    } else {
      if (recordingMode === "photo") {
        handlePhotoCapture()
      } else {
        handleVideoCapture()
      }
    }
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

      <div className="absolute top-0 left-0 right-0 z-50 flex items-end px-6 py-4 text-white justify-center">
        <div className="flex-1 flex justify-start">
          <button
            onClick={resetCameraState}
            className="w-14 h-12 flex items-center justify-center text-white active:bg-white/10 rounded-full transition-all duration-200"
          >
            <ChevronLeftIcon className="w-8 h-8 opacity-90" />
          </button>
        </div>

        <div className="relative flex items-center justify-center h-12 px-8">
          <div className="absolute top-[-18px] left-[50%] transform translate-x-[-10px] z-10 italic text-xs tracking-tighter my-[22px] mb-0 mt-[22px] mr-0 ml-[-8px]">
            <span className="text-white ml-[-1px] mb-0 mt-0 font-medium tracking-tighter text-xs">CAMERA</span>
          </div>
          <div style={{ minWidth: "120px", minHeight: "32px" }}>
            <AllnoosLogo variant="white" size="md" animated={false} />
          </div>
        </div>

        <div className="flex-1 flex justify-end gap-2 h-12 items-end">
          {capturedPhotos.length > 0 && (
            <div
              onClick={openPhotoGallery}
              className="relative w-10 h-10 flex items-center justify-center cursor-pointer"
            >
              <svg
                className="w-8 h-8 text-white relative z-10 opacity-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
              </svg>
              {capturedPhotos.length > 1 && (
                <span className="absolute inset-0 flex items-center justify-center text-blue-400 font-bold text-sm z-20 opacity-70">
                  {capturedPhotos.length}
                </span>
              )}
            </div>
          )}

          {capturedVideos > 0 && (
            <div
              onClick={openVideoGallery}
              className="relative w-10 h-10 flex items-center justify-center cursor-pointer"
            >
              <Video className="w-10 h-10 text-white relative z-10 opacity-90" strokeWidth={1.5} />
              <span
                className={`absolute ${capturedVideos < 10 ? "left-[10px]" : "left-[6px]"} text-red-400 font-bold text-sm z-20 opacity-70`}
              >
                {capturedVideos}
              </span>
            </div>
          )}
        </div>
      </div>

      {isRecording && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-red-500/30 backdrop-blur-sm rounded-full px-6 py-2 animate-pulse">
            <span className="text-white font-semibold text-lg">Recording</span>
          </div>
        </div>
      )}

      {activeCountdown !== null && activeCountdown > 0 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-white/20 backdrop-blur-md rounded-full w-32 h-32 flex items-center justify-center border-4 border-white/40 shadow-2xl">
            <span className="text-white font-bold text-6xl drop-shadow-lg">{activeCountdown}</span>
          </div>
        </div>
      )}

      <div className="absolute bottom-8 left-0 right-0 z-50 flex items-center justify-center gap-8 px-8">
        <div className="relative bg-white/5 backdrop-blur-sm rounded-full flex items-center border border-white/10 p-2 shadow-lg mb-[-20px] gap-0 px-0.5 py-1">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none opacity-60"></div>

          {showCreateButton && (
            <div className="absolute top-[-60px] left-1/2 transform -translate-x-1/2 z-10">
              <Link href="/create" className="flex items-center justify-center">
                <button className="bg-gradient-to-br from-yellow-400 to-yellow-600 active:from-yellow-500 active:to-yellow-700 transition-all duration-200 active:scale-95 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-300/50 relative z-10 mt-16 w-28 font-medium h-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none opacity-60"></div>
                  <span className="text-white drop-shadow-lg relative z-10 text-base mt-0 mb-1 font-normal">DRAFT</span>
                  <div className="absolute inset-0 rounded-full bg-yellow-400/30 blur-lg scale-150 pointer-events-none"></div>
                </button>
              </Link>
            </div>
          )}

          <button
            onClick={() => {
              handlePhotoMode()
              handleCaptureWithTimer()
            }}
            className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 shadow-lg border-2 ${
              recordingMode === "photo"
                ? "bg-gradient-to-br from-blue-400 to-blue-600 border-blue-300/50 shadow-blue-500/30"
                : "bg-gradient-to-br from-blue-500/70 to-blue-700/70 border-blue-400/30 hover:from-blue-400/80 hover:to-blue-600/80"
            }`}
            disabled={activeCountdown !== null}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none opacity-60"></div>
            <Camera className="text-white drop-shadow-lg relative z-10 size-9" strokeWidth={1.5} />
            <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-xl scale-150 pointer-events-none"></div>
          </button>

          <div className="flex items-center gap-4 px-2 mt-2 mb-[-25px]">
            <div
              onClick={() => {
                if (icon1 === "timer") {
                  cycleTimerState()
                } else if (icon1 === "camera-flip") {
                  setIcon1("timer")
                  setTimerCountdown(null)
                } else {
                  setIcon1("camera-flip")
                  setTimerCountdown(null)
                }
              }}
              className="cursor-pointer w-7 flex items-center justify-center"
            >
              {icon1 === "camera-flip" && (
                <svg
                  className="w-7 h-7 drop-shadow-lg text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 6v6l4 2" strokeLinecap="round" />
                </svg>
              )}
              {icon1 === "timer" && timerCountdown === null && (
                <svg
                  className="w-7 h-7 drop-shadow-lg text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 6v6l4 2" strokeLinecap="round" />
                </svg>
              )}
              {icon1 === "timer" && timerCountdown === 5 && (
                <div className="relative w-7 h-7">
                  <svg
                    className="w-7 h-7 drop-shadow-lg text-white absolute"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm drop-shadow-lg">
                    5
                  </span>
                </div>
              )}
              {icon1 === "timer" && timerCountdown === 10 && (
                <div className="relative w-7 h-7">
                  <svg
                    className="w-7 h-7 drop-shadow-lg text-white absolute"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs drop-shadow-lg">
                    10
                  </span>
                </div>
              )}
            </div>

            <div
              onClick={() => {
                setIcon2(icon2 === "user-x" ? "user" : icon2 === "user" ? "user-square" : "user-x")
              }}
              className="cursor-pointer w-7 flex items-center justify-center"
            >
              {icon2 === "user-x" && <UserXIcon className="w-6 h-6 drop-shadow-lg text-white" />}
              {icon2 === "user" && <User className="w-6 h-6 drop-shadow-lg text-white" />}
              {icon2 === "user-square" && (
                <UserSquare2Icon className="drop-shadow-lg text-white size-7" strokeWidth={1.5} />
              )}
            </div>

            <div onClick={toggleFlash} className="cursor-pointer w-7 flex items-center justify-center">
              {icon3 === "flash" && (
                <Zap className={`w-6 h-6 drop-shadow-lg ${flashEnabled ? "text-yellow-300" : "text-white"}`} />
              )}
              {icon3 === "night-mode" && (
                <svg
                  className="w-6 h-6 drop-shadow-lg"
                  fill="none"
                  stroke="white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
              {icon3 === "hdr" && (
                <svg
                  className="w-6 h-6 drop-shadow-lg"
                  fill="none"
                  stroke="white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              handleVideoMode()
              if (isRecording) {
                handleVideoCapture()
              } else {
                handleCaptureWithTimer()
              }
            }}
            className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 shadow-lg border-2 ${
              recordingMode === "video"
                ? "bg-gradient-to-br from-red-500 to-red-700 border-red-400/50 shadow-red-600/30"
                : "bg-gradient-to-br from-red-600/70 to-red-800/70 border-red-500/30 hover:from-red-500/80 hover:to-red-700/80"
            }`}
            disabled={activeCountdown !== null}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none opacity-60"></div>
            {isRecording ? (
              <OctagonIcon className="w-8 h-8 text-white drop-shadow-lg relative z-10" strokeWidth={1.5} />
            ) : (
              <Video className="text-white drop-shadow-lg relative z-10 size-10 pt-0 mt-1" strokeWidth={2} />
            )}
            <div className="absolute inset-0 rounded-full bg-red-400/20 blur-xl scale-150 pointer-events-none"></div>
          </button>
        </div>
      </div>

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
