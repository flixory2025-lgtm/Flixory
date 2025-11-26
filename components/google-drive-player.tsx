"use client"

import { X, Maximize, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"

interface GoogleDrivePlayerProps {
  driveUrl: string
  title: string
  onClose: () => void
}

export function GoogleDrivePlayer({ driveUrl, title, onClose }: GoogleDrivePlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const getPreviewUrl = (url: string) => {
    const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`
    }
    return url
  }

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

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose, isFullscreen])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // Try iframe first, fallback to container
      const elementToFullscreen = iframeRef.current || containerRef.current

      if (elementToFullscreen) {
        elementToFullscreen
          .requestFullscreen()
          .then(() => {
            setIsFullscreen(true)
          })
          .catch((err) => {
            console.log("[v0] Fullscreen request failed:", err)
            // Fallback to container if iframe fullscreen fails
            containerRef.current?.requestFullscreen().then(() => {
              setIsFullscreen(true)
            })
          })
      }
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

  return (
    <div ref={containerRef} className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/90 backdrop-blur-sm">
        <h2 className="text-white font-semibold text-lg truncate flex-1">{title}</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="text-white hover:bg-white/20 flex-shrink-0"
            title={isFullscreen ? "Exit Fullscreen (F)" : "Fullscreen (F)"}
          >
            {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20 flex-shrink-0">
            <X className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Video Player */}
      <div className="flex-1 relative hide-drive-controls">
        <iframe
          ref={iframeRef}
          src={getPreviewUrl(driveUrl)}
          className="w-full h-full"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          title={title}
        />
        <div className="absolute top-2 right-2 bg-black/80 px-3 py-1.5 rounded-md pointer-events-none z-10">
          <span className="text-red-600 font-bold text-sm tracking-wider">FLIXORY</span>
        </div>
      </div>
    </div>
  )
}
