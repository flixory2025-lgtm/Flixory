"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface GoogleDrivePlayerProps {
  driveUrl: string
  title: string
  onClose: () => void
}

export function GoogleDrivePlayer({ driveUrl, title, onClose }: GoogleDrivePlayerProps) {
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
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/90 backdrop-blur-sm">
        <h2 className="text-white font-semibold text-lg truncate flex-1">{title}</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20 flex-shrink-0">
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Video Player */}
      <div className="flex-1 relative hide-drive-controls">
        <iframe
          src={getPreviewUrl(driveUrl)}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
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
