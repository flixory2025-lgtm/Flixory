"use client"

import { useState, useRef, useEffect } from "react"
import { X, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  videoUrl: string
  onClose: () => void
}

export function VideoPlayer({ videoUrl, onClose }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [embedUrl, setEmbedUrl] = useState<string | null>(null)

  useEffect(() => {
    const processVideoUrl = async () => {
      if (videoUrl.includes("drive.google.com")) {
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
        // For non-Google Drive URLs, use direct embedding
        setEmbedUrl(videoUrl)
        setIsLoading(false)
      }
    }

    processVideoUrl()
  }, [videoUrl])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    const handlePopState = () => {
      onClose()
    }

    window.history.pushState({ modal: "video" }, "", window.location.href)

    document.addEventListener("keydown", handleKeyDown)
    window.addEventListener("popstate", handlePopState)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [onClose])

  const handleRetry = () => {
    setIsLoading(true)
    setHasError(false)
    // Reload the iframe
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="relative w-full h-full">
        {embedUrl && !hasError ? (
          <iframe
            ref={iframeRef}
            src={embedUrl}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; encrypted-media; fullscreen"
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
              <p className="text-sm md:text-base">Loading video...</p>
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
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 ml-auto bg-black/50"
            onClick={onClose}
          >
            <X className="w-5 md:w-6 h-5 md:h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
