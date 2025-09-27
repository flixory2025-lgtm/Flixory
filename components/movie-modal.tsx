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
  telegramLink: string
  trailerLink: string
}

interface MovieModalProps {
  movie: Movie
  onClose: () => void
  onPlay: (telegramLink: string) => void
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
      className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <img
            src={movie.poster || "/placeholder.svg"}
            alt={movie.title}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-t-lg" />

          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 md:hidden" onClick={onClose}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 ml-auto" onClick={onClose}>
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="absolute bottom-4 left-6">
            <h2 className="text-3xl font-bold text-white mb-2 text-balance">{movie.title}</h2>
            <div className="flex items-center space-x-4">
              <Badge className="bg-primary/90 text-primary-foreground">
                <Star className="w-3 h-3 mr-1 fill-current" />
                {movie.rating}
              </Badge>
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{movie.year}</span>
              </Badge>
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{movie.duration}</span>
              </Badge>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description */}
          <p className="text-muted-foreground mb-6 text-pretty">{movie.description}</p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genre.map((genre) => (
              <Badge key={genre} variant="outline">
                {genre}
              </Badge>
            ))}
          </div>

          {/* Screenshots */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Screenshots</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {movie.screenshots.map((screenshot, index) => (
                <img
                  key={index}
                  src={screenshot || "/placeholder.svg"}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 flex-1"
              onClick={() => onPlay(movie.telegramLink)}
            >
              <Play className="w-5 h-5 mr-2" />
              Play Movie
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => onPlayTrailer(movie.trailerLink)}
            >
              <Trailer className="w-5 h-5 mr-2" />
              Watch Trailer
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
