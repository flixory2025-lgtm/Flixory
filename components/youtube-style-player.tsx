"use client"

import { useState, useEffect, useRef } from "react"
import { X, Maximize, Minimize, Play, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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

interface YouTubeStylePlayerProps {
  videoUrl: string
  title: string
  description: string
  genre: string[]
  allMovies: Movie[]
  currentMovie: Movie
  onClose: () => void
  onMovieSelect: (movie: Movie) => void
  isTrailer?: boolean
}

export function YouTubeStylePlayer({
  videoUrl,
  title,
  description,
  genre,
  allMovies,
  currentMovie,
  onClose,
  onMovieSelect,
  isTrailer = false,
}: YouTubeStylePlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const relatedMovies = allMovies
    .filter((movie) => {
      // Exclude current movie
      if (movie.id === currentMovie.id) return false
      // Check if movie shares at least one genre
      return movie.genre.some((g) => genre.includes(g))
    })
    .slice(0, 12) // Limit to 12 related movies

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isFullscreen) {
          exitFullscreen()
        } else {
          onClose()
        }
      }
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [isFullscreen, onClose])

  const toggleFullscreen = async () => {
    if (!containerRef.current) return

    try {
      if (!isFullscreen) {
        await containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (error) {
      console.error("[v0] Fullscreen error:", error)
    }
  }

  const exitFullscreen = async () => {
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen()
        setIsFullscreen(false)
      } catch (error) {
        console.error("[v0] Exit fullscreen error:", error)
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-y-auto">
      <div ref={containerRef} className={`${isFullscreen ? "h-screen" : "min-h-screen"} bg-black`}>
        {/* Video Player Section */}
        <div className={`relative ${isFullscreen ? "h-full" : "h-[50vh] md:h-[70vh]"} bg-black`}>
          {/* Close and Fullscreen Controls */}
          {!isFullscreen && (
            <div className="absolute top-4 right-4 z-20 flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="bg-black/50 hover:bg-black/70 text-white"
              >
                <Maximize className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="bg-black/50 hover:bg-black/70 text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          )}

          {isFullscreen && (
            <div className="absolute top-4 right-4 z-20">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="bg-black/50 hover:bg-black/70 text-white"
              >
                <Minimize className="w-5 h-5" />
              </Button>
            </div>
          )}

          {/* Video iframe */}
          <iframe
            src={videoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            title={title}
          />

          {/* Landscape instruction for mobile */}
          <div className="landscape-instruction absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm md:hidden">
            Rotate your device for better viewing
          </div>
        </div>

        {/* Content Section - Hidden in fullscreen */}
        {!isFullscreen && (
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            {/* Title and Description */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 text-balance">{title}</h1>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className="bg-primary/90 text-primary-foreground">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  {currentMovie.rating}
                </Badge>
                <Badge variant="outline" className="text-white border-gray-600">
                  {currentMovie.year}
                </Badge>
                <Badge variant="outline" className="text-white border-gray-600 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {currentMovie.duration}
                </Badge>
                {isTrailer && (
                  <Badge variant="secondary" className="bg-red-600 text-white">
                    Trailer
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {genre.map((g) => (
                  <Badge key={g} variant="outline" className="text-white border-gray-600">
                    {g}
                  </Badge>
                ))}
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed text-pretty">{description}</p>
            </div>

            {/* Related Movies Section */}
            {relatedMovies.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Related Movies</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                  {relatedMovies.map((movie) => (
                    <div
                      key={movie.id}
                      className="cursor-pointer group"
                      onClick={() => {
                        onMovieSelect(movie)
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }}
                    >
                      <div className="relative overflow-hidden rounded-lg bg-card">
                        <img
                          src={movie.poster || "/placeholder.svg"}
                          alt={movie.title}
                          className="w-full h-[150px] md:h-[200px] object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Play className="w-8 md:w-12 h-8 md:h-12 text-white" />
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-primary/90 text-primary-foreground text-xs">
                            <Star className="w-2 h-2 mr-1 fill-current" />
                            {movie.rating}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-2">
                        <h4 className="font-semibold text-xs md:text-sm text-white line-clamp-2 text-balance">
                          {movie.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">{movie.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
