"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeftIcon, X, MapPin, Play, Trash2, Video } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AllnoosLogo } from "@/components/allnoos-logo"

export default function CreatePage() {
  const router = useRouter()
  const [storyData, setStoryData] = useState({
    title: "",
    description: "",
    location: "",
    tags: "",
  })

  const [mediaType, setMediaType] = useState<"photo" | "video">("video")
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishingStep, setPublishingStep] = useState("")

  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([])
  const [capturedVideos, setCapturedVideos] = useState<Array<{ id: number; duration: string; thumbnail: string }>>([])

  const [selectedContentOrder, setSelectedContentOrder] = useState<
    Array<{ type: "photo" | "video"; index: number; id?: number }>
  >([])

  const [showPhotoGallery, setShowPhotoGallery] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [showVideoGallery, setShowVideoGallery] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)

  useEffect(() => {
    const savedPhotos = localStorage.getItem("cameraPhotos")
    const savedVideoData = localStorage.getItem("cameraVideoData")
    // const savedSelectedOrder = localStorage.getItem("selectedContentOrder")

    // console.log("[v0] Loading saved data from localStorage")
    // console.log("[v0] savedSelectedOrder:", savedSelectedOrder)

    if (savedPhotos) {
      setCapturedPhotos(JSON.parse(savedPhotos))
    }

    if (savedVideoData) {
      setCapturedVideos(JSON.parse(savedVideoData))
    }

    // if (savedSelectedOrder) {
    //   const parsedOrder = JSON.parse(savedSelectedOrder)
    //   console.log("[v0] Setting selectedContentOrder:", parsedOrder)
    //   setSelectedContentOrder(parsedOrder)
    // }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
            )
            const data = await response.json()
            const location =
              `${data.city || data.locality || ""}, ${data.principalSubdivision || ""}, ${data.countryName || ""}`
                .replace(/^,\s*|,\s*$/g, "")
                .replace(/,\s*,/g, ",")
            setStoryData((prev) => ({
              ...prev,
              location: location || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            }))
          } catch (error) {
            setStoryData((prev) => ({ ...prev, location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` }))
          }
        },
        (error) => {
          console.log("[v0] Geolocation error:", error)
          setStoryData((prev) => ({ ...prev, location: "Location unavailable" }))
        },
      )
    }
  }, [])

  useEffect(() => {
    const cleanedOrder = selectedContentOrder.filter((item) => {
      if (item.type === "photo") {
        return item.index < capturedPhotos.length
      } else if (item.type === "video") {
        return capturedVideos.some((video) => video.id === item.id)
      }
      return false
    })

    if (cleanedOrder.length !== selectedContentOrder.length) {
      setSelectedContentOrder(cleanedOrder)
      localStorage.setItem("selectedContentOrder", JSON.stringify(cleanedOrder))
    }
  }, [capturedPhotos, capturedVideos])

  const handleInputChange = (field: string, value: string) => {
    setStoryData((prev) => ({ ...prev, [field]: value }))
  }

  const getContentOrderNumber = (type: "photo" | "video", index: number, id?: number) => {
    const orderIndex = selectedContentOrder.findIndex(
      (item) => item.type === type && (type === "photo" ? item.index === index : item.id === id),
    )
    return orderIndex >= 0 ? orderIndex + 1 : null
  }

  const isContentSelected = (type: "photo" | "video", index: number, id?: number) => {
    return selectedContentOrder.some(
      (item) => item.type === type && (type === "photo" ? item.index === index : item.id === id),
    )
  }

  const toggleContentSelection = (type: "photo" | "video", index: number, id?: number) => {
    const isSelected = isContentSelected(type, index, id)

    console.log("[v0] toggleContentSelection called:", { type, index, id, isSelected })

    if (isSelected) {
      // Remove from selection and reorder
      const newOrder = selectedContentOrder.filter(
        (item) => !(item.type === type && (type === "photo" ? item.index === index : item.id === id)),
      )
      console.log("[v0] Removing from selection, new order:", newOrder)
      setSelectedContentOrder(newOrder)
      localStorage.setItem("selectedContentOrder", JSON.stringify(newOrder))
    } else {
      // Add to selection
      const newItem = { type, index, ...(id && { id }) }
      const newOrder = [...selectedContentOrder, newItem]
      console.log("[v0] Adding to selection, new order:", newOrder)
      setSelectedContentOrder(newOrder)
      localStorage.setItem("selectedContentOrder", JSON.stringify(newOrder))
    }
  }

  const handlePublish = async () => {
    if (!storyData.title) return

    setIsPublishing(true)
    setPublishingStep("Analyzing content...")

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setPublishingStep("Generating narrative...")
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setPublishingStep("Creating post structure...")
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const aiGeneratedPost = {
        id: Date.now(),
        title: storyData.title,
        description: storyData.description,
        summary: `AI-generated summary: ${storyData.description.slice(0, 150)}...`,
        longForm: generateLongFormContent(storyData),
        backgroundImage: capturedPhotos[0] || capturedVideos[0]?.thumbnail || "/placeholder.svg",
        slides: generateSlides(),
        author: {
          name: "Current User",
          avatar: "/professional-woman-headshot.png",
          followers: "1.2k",
          verified: false,
        },
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: "now",
        location: storyData.location,
        comments_data: [],
      }

      const existingPosts = JSON.parse(localStorage.getItem("userGeneratedPosts") || "[]")
      existingPosts.unshift(aiGeneratedPost)
      localStorage.setItem("userGeneratedPosts", JSON.stringify(existingPosts))

      setPublishingStep("Publishing complete!")
      await new Promise((resolve) => setTimeout(resolve, 500))

      router.push(`/feed?story=${aiGeneratedPost.id}`)
    } catch (error) {
      console.error("[v0] Publishing error:", error)
      alert("Failed to publish story. Please try again.")
    } finally {
      setIsPublishing(false)
      setPublishingStep("")
    }
  }

  const generateLongFormContent = (data: typeof storyData) => {
    const baseContent = data.description || data.title

    return `${baseContent}\n\nThis developing story showcases the power of citizen journalism and real-time reporting. Our analysis of the captured media reveals important details that provide context to this unfolding situation.\n\nThe location data indicates this event occurred in ${data.location}, providing geographical context that helps readers understand the broader implications of this story.\n\nContinued coverage will follow as more information becomes available. This story represents the kind of immediate, on-ground reporting that makes independent journalism essential in today's media landscape.`
  }

  const generateSlides = () => {
    const slides = [
      {
        type: "main",
        content: storyData.description || storyData.title,
        media: capturedPhotos[0] || capturedVideos[0]?.thumbnail || "/placeholder.svg",
      },
      {
        type: "longform",
        content: generateLongFormContent(storyData),
        media: capturedPhotos[0] || capturedVideos[0]?.thumbnail || "/placeholder.svg",
      },
    ]

    selectedContentOrder.forEach((item, orderIndex) => {
      if (item.type === "photo" && capturedPhotos[item.index]) {
        slides.push({
          type: "media",
          content: `Visual evidence captured at the scene - Image ${orderIndex + 1}`,
          media: capturedPhotos[item.index],
        })
      } else if (item.type === "video" && item.id) {
        const video = capturedVideos.find((v) => v.id === item.id)
        if (video) {
          slides.push({
            type: "media",
            content: `Video documentation providing further context - Video ${orderIndex + 1}`,
            media: video.thumbnail,
          })
        }
      }
    })

    return slides
  }

  const deletePhoto = (index: number) => {
    const newPhotos = capturedPhotos.filter((_, i) => i !== index)
    setCapturedPhotos(newPhotos)
    localStorage.setItem("cameraPhotos", JSON.stringify(newPhotos))

    const newOrder = selectedContentOrder
      .filter((item) => !(item.type === "photo" && item.index === index))
      .map((item) => {
        if (item.type === "photo" && item.index > index) {
          return { ...item, index: item.index - 1 }
        }
        return item
      })
    setSelectedContentOrder(newOrder)
    localStorage.setItem("selectedContentOrder", JSON.stringify(newOrder))
  }

  const deleteVideo = (videoId: number) => {
    const newVideos = capturedVideos.filter((video) => video.id !== videoId)
    setCapturedVideos(newVideos)
    localStorage.setItem("cameraVideoData", JSON.stringify(newVideos))

    const newOrder = selectedContentOrder.filter((item) => !(item.type === "video" && item.id === videoId))
    setSelectedContentOrder(newOrder)
    localStorage.setItem("selectedContentOrder", JSON.stringify(newOrder))
  }

  const openPhotoGallery = () => {
    setShowPhotoGallery(true)
  }

  const closePhotoGallery = () => {
    setShowPhotoGallery(false)
    setSelectedPhoto(null)
  }

  const openVideoGallery = () => {
    setShowVideoGallery(true)
  }

  const closeVideoGallery = () => {
    setShowVideoGallery(false)
    setSelectedVideo(null)
  }

  const selectPhoto = (index: number) => {
    setSelectedPhoto(index)
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="headerCurveClipCreate" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 1,0 L 1,0.733 C 0.861,0.822 0.639,0.822 0.5,0.733 C 0.361,0.651 0.139,0.651 0,0.733 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="sticky top-0 z-50 bg-background" style={{ clipPath: "url(#headerCurveClipCreate)" }}>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <Link href="/camera">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-110 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full opacity-60"></div>
                  <ChevronLeftIcon className="w-5 h-5 text-slate-600 group-active:text-slate-600/80 relative z-10" />
                </button>
              </Link>
            </div>
            <div className="flex justify-center">
              <Link href="/feed">
                <div className="relative flex items-center justify-center h-12 px-8">
                  <div className="absolute top-[-18px] left-[50%] transform translate-x-[-10px] z-10 italic text-xs tracking-tighter my-[22px] mb-0 mt-[22px] mr-0 ml-[-8px]">
                    <span className="text-stone-600 ml-[-1px] mb-0 mt-0 font-medium tracking-tighter text-xs">
                      NEWS ROOM
                    </span>
                  </div>
                  <div style={{ minWidth: "120px", minHeight: "32px" }}>
                    <AllnoosLogo variant="default" size="md" />
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex-1 flex justify-end">
              <button
                onClick={handlePublish}
                disabled={!storyData.title || isPublishing}
                className="px-6 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-105 transition-all duration-300 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/20 disabled:active:scale-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-60"></div>
                <span className="relative z-10 font-semibold text-sm text-primary flex items-center gap-2">
                  {isPublishing ? (
                    <>
                      <Play className="w-4 h-4 animate-spin" />
                      Publishing
                    </>
                  ) : (
                    "Publish"
                  )}
                </span>
              </button>
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
              <linearGradient id="curvedLineGradientCreate" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="15%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="85%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
            </defs>
            <path
              d="M 0,25 C 200,5 520,5 720,25 C 920,45 1240,45 1440,25"
              stroke="url(#curvedLineGradientCreate)"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {isPublishing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-sm mx-4 text-center">
            <Play className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
            <h3 className="text-lg font-semibold mb-2">Creating Your Story</h3>
            <p className="text-muted-foreground">{publishingStep}</p>
          </div>
        </div>
      )}

      <div className="p-4 space-y-6 pt-10 relative -mt-8" style={{ transform: "translateY(-18px)" }}>
        <Card>
          <CardHeader>
            <CardTitle>Story Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="What's happening?"
                value={storyData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Tell the full story..."
                value={storyData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="location"
                  value={storyData.location}
                  readOnly
                  className="pl-10 bg-muted/50 cursor-not-allowed"
                  placeholder="Detecting location..."
                />
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent px-8">
                <Play className="w-4 h-4" />
                Record Audio
              </Button>
            </div>
          </CardContent>
        </Card>

        {capturedVideos.length > 0 && (
          <>
            <div className="flex items-center gap-2 mb-3">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Video className="w-10 h-10 relative z-10 opacity-90 text-red-400" strokeWidth={1.5} />
                <span
                  className="absolute text-red-400 font-bold text-sm z-20 opacity-70"
                  style={{
                    left: capturedVideos.length < 10 ? "38%" : "6px",
                    top: "50%",
                    transform: capturedVideos.length < 10 ? "translate(-50%, -50%)" : "translateY(-50%)",
                  }}
                >
                  {capturedVideos.length}
                </span>
              </div>
              <h2 className="text-lg font-semibold">Captured Videos</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {capturedVideos.map((video) => {
                const orderNumber = getContentOrderNumber("video", 0, video.id)
                const isSelected = isContentSelected("video", 0, video.id)

                return (
                  <div
                    key={video.id}
                    className={`shadow-none cursor-pointer transition-all duration-200 touch-manipulation group relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 border rounded-lg p-0 flex flex-col hover:scale-95 active:scale-95 hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)]`}
                  >
                    <div className="relative">
                      <div className="aspect-[9/16] rounded-t-lg overflow-hidden bg-muted">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={`Video ${video.id}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center z-10 backdrop-blur-sm rounded-full bg-transparent gap-1.5 p-0.5 mt-[-7px]">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleContentSelection("video", 0, video.id)
                            }}
                            className={`rounded-full bg-transparent backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_12px_rgba(255,255,255,0.4)] p-2 ${
                              isSelected
                                ? "hover:shadow-[inset_0_2px_12px_rgba(253,180,132,0.5)]"
                                : "hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)]"
                            }`}
                          >
                            <div
                              className={`rounded-full border-2 flex items-center justify-center size-6 ${
                                isSelected ? "bg-[#FDB484] border-[#FDB484]" : "border-white bg-transparent"
                              }`}
                            >
                              {isSelected && orderNumber && (
                                <span className="text-white text-xs font-bold">{orderNumber}</span>
                              )}
                            </div>
                          </button>

                          <div className="px-2 rounded-full backdrop-blur-sm bg-transparent py-2.5">
                            <span className="text-white font-medium text-sm">{video.duration}</span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              if (window.confirm("Delete this video?")) {
                                deleteVideo(video.id)
                              }
                            }}
                            className="rounded-full bg-transparent backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] bg-transparent p-2.5"
                          >
                            <Trash2 className="w-5 h-5 text-white" />
                          </button>
                        </div>
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-t-lg"></div>
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-t-lg" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {capturedPhotos.length > 0 && (
          <>
            <div className="flex items-center gap-2 mb-3">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-blue-400 relative z-10 opacity-90"
                >
                  <path d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                </svg>
                <span
                  className="absolute inset-0 flex items-center justify-center text-blue-400 font-bold text-sm z-20 opacity-70"
                  style={{ marginTop: "1px" }}
                >
                  {capturedPhotos.length}
                </span>
              </div>
              <h2 className="text-lg font-semibold">Captured Photos</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {capturedPhotos.map((photo, index) => {
                const orderNumber = getContentOrderNumber("photo", index)
                const isSelected = isContentSelected("photo", index)

                return (
                  <div
                    key={index}
                    className={`shadow-none cursor-pointer transition-all duration-200 touch-manipulation group relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 border rounded-lg p-0 flex flex-col hover:scale-95 active:scale-95 hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)]`}
                    onClick={() => selectPhoto(index)}
                  >
                    <div className="relative">
                      <div className="aspect-[9/16] rounded-t-lg overflow-hidden bg-muted">
                        <img
                          src={photo || "/placeholder.svg"}
                          alt={`Photo ${index}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleContentSelection("photo", index)
                          }}
                          className={`absolute top-3 left-3 z-10 rounded-full bg-transparent backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg p-2.5 ${
                            isSelected
                              ? "hover:shadow-[inset_0_2px_12px_rgba(253,180,132,0.5)]"
                              : "hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)]"
                          }`}
                        >
                          <div
                            className={`rounded-full border-2 flex items-center justify-center size-[28px] ${
                              isSelected ? "bg-[#FDB484] border-[#FDB484]" : "border-white bg-transparent"
                            }`}
                          >
                            {isSelected && orderNumber && (
                              <span className="text-white text-xs font-bold">{orderNumber}</span>
                            )}
                          </div>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            if (window.confirm("Delete this photo?")) {
                              deletePhoto(index)
                            }
                          }}
                          className="absolute top-3 right-3 z-10 rounded-full bg-transparent backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] bg-transparent p-2.5"
                        >
                          <Trash2 className="w-5 h-5 text-white" />
                        </button>
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-t-lg" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Publishing Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Visibility</Label>
                <p className="text-sm text-muted-foreground">Who can see this story</p>
              </div>
              <Badge variant="secondary">Public</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Comments</Label>
                <p className="text-sm text-muted-foreground">Allow comments on this story</p>
              </div>
              <Badge variant="secondary">Enabled</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Breaking News</Label>
                <p className="text-sm text-muted-foreground">Mark as breaking news</p>
              </div>
              <Badge variant="outline">Off</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {showPhotoGallery && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="w-full h-2/3 bg-white/10 backdrop-blur-md rounded-t-3xl p-6 transform transition-transform duration-500 ease-out">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-semibold">Photos ({capturedPhotos.length})</h3>
              <button
                onClick={closePhotoGallery}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedPhoto !== null ? (
              <div className="h-full flex flex-col">
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="text-white hover:text-gray-300 transition-colors mb-4 self-start"
                >
                  ← Back
                </button>
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative max-w-full max-h-full">
                    <img
                      src={capturedPhotos[selectedPhoto] || "/placeholder.svg"}
                      alt={`Photo ${selectedPhoto + 1}`}
                      className="max-w-full max-h-full object-contain rounded-lg"
                      onClick={closePhotoGallery}
                      onDoubleClick={closePhotoGallery}
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleContentSelection("photo", selectedPhoto)
                        }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all font-bold ${
                          isContentSelected("photo", selectedPhoto)
                            ? "bg-[#FDB484] text-white"
                            : "bg-white/20 text-white hover:bg-white/30"
                        }`}
                      >
                        {(isContentSelected("photo", selectedPhoto) && getContentOrderNumber("photo", selectedPhoto)) ||
                          "+"}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deletePhoto(selectedPhoto)
                          setSelectedPhoto(null)
                        }}
                        className="w-10 h-10 rounded-full bg-green-700/80 text-white flex items-center justify-center hover:bg-green-700 transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 h-full overflow-y-auto">
                {capturedPhotos.map((photo, index) => {
                  const orderNumber = getContentOrderNumber("photo", index)
                  const isSelected = isContentSelected("photo", index)

                  return (
                    <div key={index} className="relative group">
                      <div
                        className={`aspect-square rounded-lg overflow-hidden cursor-pointer ${
                          isSelected ? "ring-4 ring-[#FDB484]" : ""
                        }`}
                        onClick={() => setSelectedPhoto(index)}
                      >
                        <img
                          src={photo || "/placeholder.svg"}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleContentSelection("photo", index)
                        }}
                        className={`absolute top-2 left-2 w-[28px] h-[28px] rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_12px_rgba(255,255,255,0.4)] p-2 ${
                          isSelected
                            ? "bg-[#FDB484] text-white border-[#FDB484]"
                            : "bg-transparent text-white hover:bg-white/20 hover:border-white"
                        }`}
                      >
                        {isSelected && orderNumber && (
                          <span className="text-white text-xs font-bold">{orderNumber}</span>
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deletePhoto(index)
                        }}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] bg-transparent p-2.5"
                      >
                        <Trash2 className="w-5 h-5 text-white drop-shadow-lg" />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {showVideoGallery && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="w-full h-2/3 bg-white/10 backdrop-blur-md rounded-t-3xl p-6 transform transition-transform duration-500 ease-out">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-semibold">Videos ({capturedVideos.length})</h3>
              <button
                onClick={closeVideoGallery}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedVideo !== null ? (
              <div className="h-full flex flex-col">
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="text-white hover:text-gray-300 transition-colors mb-4 self-start"
                >
                  ← Back
                </button>
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative max-w-full max-h-full">
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                      <img
                        src={capturedVideos[selectedVideo]?.thumbnail || "/placeholder.svg"}
                        alt={`Video ${selectedVideo + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleContentSelection("video", 0, capturedVideos[selectedVideo].id)
                        }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_12px_rgba(255,255,255,0.4)] p-2 ${
                          isContentSelected("video", 0, capturedVideos[selectedVideo].id)
                            ? "bg-[#FDB484] text-white"
                            : "bg-transparent text-white hover:bg-white/20 hover:border-white"
                        }`}
                      >
                        {(isContentSelected("video", 0, capturedVideos[selectedVideo].id) &&
                          getContentOrderNumber("video", 0, capturedVideos[selectedVideo].id)) ||
                          "+"}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteVideo(capturedVideos[selectedVideo].id)
                          setSelectedVideo(null)
                        }}
                        className="w-10 h-10 rounded-full bg-green-700/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] bg-transparent p-2.5"
                      >
                        <Trash2 className="w-5 h-5 text-white drop-shadow-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 h-full overflow-y-auto">
                {capturedVideos.map((video, index) => {
                  const orderNumber = getContentOrderNumber("video", 0, video.id)
                  const isSelected = isContentSelected("video", 0, video.id)

                  return (
                    <div key={video.id} className="relative group">
                      <div
                        className={`aspect-video rounded-lg overflow-hidden cursor-pointer ${
                          isSelected ? "ring-4 ring-[#FDB484]" : ""
                        }`}
                        onClick={() => setSelectedVideo(index)}
                      >
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={`Video ${video.id}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-white ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="absolute top-2 left-2 flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleContentSelection("video", 0, video.id)
                          }}
                          className={`w-[28px] h-[28px] rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_12px_rgba(255,255,255,0.4)] p-2 ${
                            isSelected
                              ? "bg-[#FDB484] text-white border-[#FDB484]"
                              : "bg-transparent border-white hover:border-[#FDB484]"
                          }`}
                        >
                          {isSelected && orderNumber && (
                            <span className="text-white text-xs font-bold">{orderNumber}</span>
                          )}
                        </button>
                      </div>
                      <div className="absolute top-2 right-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteVideo(video.id)
                          }}
                          className="w-8 h-8 rounded-full bg-red-500/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-110 shadow-lg hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] bg-transparent p-2.5"
                        >
                          <Trash2 className="w-5 h-5 text-white drop-shadow-lg" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
