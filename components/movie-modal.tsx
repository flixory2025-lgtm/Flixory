"use client"

import type React from "react"

import { X, Send, Eraser as Trailer, Star, Clock, Calendar, ArrowLeft, Play, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect } from "react"

interface Movie {
  id: number
  title: string
  poster: string
  rating: number
  year: number
  duration: string
  genre: string[]
  description: string
  screenshots: string[]
  telegramLink: string
  trailerLink: string
  googleDrivePlayUrl?: string
  googleDriveDownloadUrl?: string
}

interface MovieModalProps {
  movie: Movie
  onClose: () => void
  onOpenTelegram: (telegramLink: string, movieTitle: string) => void
  onPlayTrailer: () => void
  onPlayOnline: () => void
}

export function MovieModal({ movie, onClose, onOpenTelegram, onPlayTrailer, onPlayOnline }: MovieModalProps) {
  const handleDirectDownload = () => {
    if (movie.googleDriveDownloadUrl) {
      let downloadUrl = movie.googleDriveDownloadUrl

      if (downloadUrl.includes("uc?export=download")) {
        window.open(downloadUrl, "_blank")
        return
      }

      const fileIdMatch = downloadUrl.match(/\/d\/([a-zA-Z0-9_-]+)/) || downloadUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/)

      if (fileIdMatch && fileIdMatch[1]) {
        downloadUrl = `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`
        window.open(downloadUrl, "_blank")
      }
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    const handlePopState = () => {
      onClose()
    }

    window.history.pushState({ modal: "movie" }, "", window.location.href)

    document.addEventListener("keydown", handleKeyDown)
    window.addEventListener("popstate", handlePopState)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleWatchOnTelegram = () => {
    const cleanLink = movie.telegramLink.replace("?embed=1", "")
    window.open(cleanLink, "_blank")
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-2 md:p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={movie.poster || "/placeholder.svg"}
            alt={movie.title}
            className="w-full h-48 md:h-64 object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-t-lg" />

          <div className="absolute top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 flex justify-between">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 md:hidden" onClick={onClose}>
              <ArrowLeft className="w-5 md:w-6 h-5 md:h-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 ml-auto" onClick={onClose}>
              <X className="w-5 md:w-6 h-5 md:h-6" />
            </Button>
          </div>

          <div className="absolute bottom-2 md:bottom-4 left-3 md:left-6">
            <h2 className="text-xl md:text-3xl font-bold text-white mb-2 text-balance">{movie.title}</h2>
            <div className="flex items-center space-x-2 md:space-x-4">
              <Badge className="bg-primary/90 text-primary-foreground text-xs md:text-sm">
                <Star className="w-2 md:w-3 h-2 md:h-3 mr-1 fill-current" />
                {movie.rating}
              </Badge>
              <Badge variant="secondary" className="flex items-center space-x-1 text-xs md:text-sm">
                <Calendar className="w-2 md:w-3 h-2 md:h-3" />
                <span>{movie.year}</span>
              </Badge>
              <Badge variant="secondary" className="flex items-center space-x-1 text-xs md:text-sm">
                <Clock className="w-2 md:w-3 h-2 md:h-3" />
                <span>{movie.duration}</span>
              </Badge>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <p className="text-muted-foreground mb-4 md:mb-6 text-pretty text-sm md:text-base">{movie.description}</p>

          <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
            {movie.genre.map((genre) => (
              <Badge key={genre} variant="outline" className="text-xs md:text-sm">
                {genre}
              </Badge>
            ))}
          </div>

          <div className="mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Screenshots</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {movie.screenshots.map((screenshot, index) => (
                <img
                  key={index}
                  src={screenshot || "/placeholder.svg"}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-24 md:h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Button
              className="bg-blue-500 hover:bg-blue-600 w-full text-sm md:text-base"
              onClick={handleWatchOnTelegram}
            >
              <Send className="w-4 md:w-5 h-4 md:h-5 mr-2" />
              Watch on Telegram
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {movie.googleDrivePlayUrl && (
                <Button className="bg-green-600 hover:bg-green-700 text-sm md:text-base" onClick={onPlayOnline}>
                  <Play className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                  Online Play
                </Button>
              )}

              {movie.googleDriveDownloadUrl && (
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-sm md:text-base"
                  onClick={handleDirectDownload}
                >
                  <Download className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                  Direct Download
                </Button>
              )}
            </div>

            <Button variant="outline" className="w-full bg-transparent text-sm md:text-base" onClick={onPlayTrailer}>
              <Trailer className="w-4 md:w-5 h-4 md:h-5 mr-2" />
              Watch Trailer
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
