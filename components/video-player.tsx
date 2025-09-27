"use client"

import { useState, useRef, useEffect } from "react"
import { X, ArrowLeft, Maximize, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  videoUrl: string
  onClose: () => void
}

export function VideoPlayer({ videoUrl, onClose }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [embedUrl, setEmbedUrl] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isYouTube, setIsYouTube] = useState(false)

  useEffect(() => {
    const processVideoUrl = async () => {
      if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
        setIsYouTube(true)
        const youtubeUrl = convertYouTubeLink(videoUrl)
        setEmbedUrl(youtubeUrl)
        setIsLoading(false)
      } else if (videoUrl.includes("drive.google.com")) {
        try {
          const response = await fetch(`/api/stream?url=${encodeURIComponent(videoUrl)}`)
          const data = await response.json()

          if (data.success && data.embedUrl) {
            setEmbedUrl(data.embedUrl)
            setIsLoading(false)
          } else {
            setHasError(true)
            setIsLoading(false)
          }
        } catch (error) {
          console.error("Error processing Google Drive URL:", error)
          setHasError(true)
          setIsLoading(false)
        }
      } else {
        setEmbedUrl(videoUrl)
        setIsLoading(false)
      }
    }

    processVideoUrl()
  }, [videoUrl])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isFullscreen) {
          exitFullscreen()
        } else {
          onClose()
        }
      }
      if (event.key === "f" || event.key === "F") {
        toggleFullscreen()
      }
    }

    const handlePopState = () => {
      onClose()
    }

    const handleOrientationChange = () => {
      if (window.screen && window.screen.orientation) {
        const orientation = window.screen.orientation.angle
        if (orientation === 90 || orientation === -90) {
          // Landscape mode
          if (containerRef.current) {
            containerRef.current.style.transform = "none"
          }
        }
      }
    }

    window.history.pushState({ modal: "video" }, "", window.location.href)

    document.addEventListener("keydown", handleKeyDown)
    window.addEventListener("popstate", handlePopState)
    window.addEventListener("orientationchange", handleOrientationChange)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("popstate", handlePopState)
      window.removeEventListener("orientationchange", handleOrientationChange)
    }
  }, [onClose, isFullscreen])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleRetry = () => {
    setIsLoading(true)
    setHasError(false)
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src
    }
  }

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center ${isFullscreen ? "fullscreen-video" : ""}`}
    >
      <div className="relative w-full h-full">
        {embedUrl && !hasError ? (
          <iframe
            ref={iframeRef}
            src={embedUrl}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; encrypted-media; fullscreen; accelerometer; gyroscope; picture-in-picture; web-share"
            onLoad={() => {
              setIsLoading(false)
            }}
            onError={() => {
              setHasError(true)
              setIsLoading(false)
            }}
          />
        ) : null}

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-8 md:h-12 w-8 md:w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-sm md:text-base">{isYouTube ? "Loading trailer..." : "Loading video..."}</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-white text-center max-w-md px-4">
              <p className="text-lg md:text-xl mb-4">Video could not be loaded</p>
              <p className="text-sm text-gray-300 mb-4">Please check your internet connection and try again.</p>
              <Button onClick={handleRetry} variant="outline" className="mr-2 bg-transparent">
                Retry
              </Button>
              <Button onClick={onClose} variant="ghost">
                Close
              </Button>
            </div>
          </div>
        )}

        {/* Controls Overlay */}
        <div className="absolute top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 flex justify-between z-10">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 md:hidden bg-black/50"
            onClick={onClose}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 bg-black/50 hidden md:flex"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <Minimize className="w-5 md:w-6 h-5 md:h-6" />
              ) : (
                <Maximize className="w-5 md:w-6 h-5 md:h-6" />
              )}
            </Button>

            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 bg-black/50" onClick={onClose}>
              <X className="w-5 md:w-6 h-5 md:h-6" />
            </Button>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center md:hidden">
          <p className="text-xs bg-black/50 px-3 py-1 rounded">Rotate your device for better viewing experience</p>
        </div>
      </div>
    </div>
  )
}

function convertYouTubeLink(youtubeUrl: string): string {
  // Extract video ID from various YouTube URL formats
  let videoId = ""

  if (youtubeUrl.includes("youtube.com/watch?v=")) {
    videoId = youtubeUrl.split("v=")[1].split("&")[0]
  } else if (youtubeUrl.includes("youtu.be/")) {
    videoId = youtubeUrl.split("youtu.be/")[1].split("?")[0]
  } else if (youtubeUrl.includes("youtube.com/embed/")) {
    videoId = youtubeUrl.split("embed/")[1].split("?")[0]
  }

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
  }

  return youtubeUrl
}
