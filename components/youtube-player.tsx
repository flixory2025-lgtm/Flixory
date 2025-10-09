"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface YouTubePlayerProps {
  youtubeUrl: string
  title: string
  onClose: () => void
}

export function YouTubePlayer({ youtubeUrl, title, onClose }: YouTubePlayerProps) {
  // Convert YouTube URL to embed format
  const getEmbedUrl = (url: string) => {
    // Handle different YouTube URL formats
    const videoIdMatch =
      url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/) ||
      url.match(/\/d\/([a-zA-Z0-9_-]+)/)

    if (videoIdMatch && videoIdMatch[1]) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1&rel=0`
    }

    // If already an embed URL or preview URL, return as is
    if (url.includes("/embed/") || url.includes("/preview")) {
      return url
    }

    return url
  }

  const embedUrl = getEmbedUrl(youtubeUrl)

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
      <div className="relative w-full h-full max-w-7xl mx-auto p-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-semibold">{title} - Trailer</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10 rounded-full">
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Video Player */}
        <div className="flex-1 relative bg-black rounded-lg overflow-hidden">
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        </div>

        {/* Close button at bottom for mobile */}
        <div className="mt-4 flex justify-center md:hidden">
          <Button onClick={onClose} variant="secondary" className="px-8">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
