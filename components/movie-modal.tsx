"use client"

import type React from "react"

import { X, Play, Eraser as Trailer, Star, Clock, Calendar, ArrowLeft } from "lucide-react"
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
  driveLink: string
  trailerLink: string
}

interface MovieModalProps {
  movie: Movie
  onClose: () => void
  onPlay: (driveLink: string) => void
  onPlayTrailer: (trailerLink: string) => void
}

export function MovieModal({ movie, onClose, onPlay, onPlayTrailer }: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    const handlePopState = () => {
      onClose()
    }

    // Add history entry for back button support
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

  return (
    <div
      className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-2 md:p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
        {/* Header */}
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

        {/* Content */}
        <div className="p-4 md:p-6">
          {/* Description */}
          <p className="text-muted-foreground mb-4 md:mb-6 text-pretty text-sm md:text-base">{movie.description}</p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
            {movie.genre.map((genre) => (
              <Badge key={genre} variant="outline" className="text-xs md:text-sm">
                {genre}
              </Badge>
            ))}
          </div>

          {/* Screenshots */}
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

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
            <Button
              className="bg-primary hover:bg-primary/90 flex-1 text-sm md:text-base"
              onClick={() => onPlay(movie.driveLink)}
            >
              <Play className="w-4 md:w-5 h-4 md:h-5 mr-2" />
              Play Movie
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-transparent text-sm md:text-base"
              onClick={() => onPlayTrailer(movie.trailerLink)}
            >
              <Trailer className="w-4 md:w-5 h-4 md:h-5 mr-2" />
              Watch Trailer
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
