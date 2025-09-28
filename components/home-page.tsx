"use client"

import { useState, useEffect } from "react"
import { Search, Play, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MovieModal } from "@/components/movie-modal"
import { VideoPlayer } from "@/components/video-player"

const movies = [
  {
    id: 1,
    title: "INSAAF - Tale of Legends",
    poster: "/bengali-action-movie-poster-with-three-characters.jpg",
    rating: 8.5,
    year: 2024,
    duration: "2h 15m",
    genre: ["Action", "Drama", "Thriller"],
    description:
      "A gripping tale of justice and revenge set in the heart of Bengal. Three unlikely allies must unite to fight against corruption and bring justice to their community.",
    screenshots: [
      "/movie-scene-with-action-sequence.jpg",
      "/dramatic-dialogue-scene.jpg",
      "/emotional-character-moment.jpg",
      "/bengali-action-movie-fight-scene.jpg",
      "/dramatic-courtroom-scene-in-bengali-movie.jpg",
      "/emotional-family-moment-in-bengali-drama.jpg",
    ],
    driveLink: "https://drive.google.com/file/d/19gueMTIe2PL9e7WDUZbUUro6fRIWjaX4/view?usp=drivesdk",
    trailerLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
]

export function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5) // Cycle through movies 1-5
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
      searchQuery
        .toLowerCase()
        .split(" ")
        .some(
          (word) => movie.title.toLowerCase().includes(word) || movie.genre.some((g) => g.toLowerCase().includes(word)),
        ),
  )

  const handlePlayMovie = (driveLink: string) => {
    const videoUrl = convertDriveLink(driveLink)
    setCurrentVideoUrl(videoUrl)
    setIsPlaying(true)
    setSelectedMovie(null)
  }

  const handlePlayTrailer = (trailerLink: string) => {
    const videoUrl = convertYouTubeLink(trailerLink)
    setCurrentVideoUrl(videoUrl)
    setIsPlaying(true)
    setSelectedMovie(null)
  }

  const featuredMovie = movies[currentSlide]

  return (
    <div className={`min-h-screen bg-background touch-manipulation pb-20 ${searchQuery ? "search-active" : ""}`}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 md:space-x-8">
              <h1 className="text-xl md:text-2xl font-bold text-primary">FLIXORY</h1>
              <nav className="hidden md:flex space-x-6">
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  All
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                  Movies
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                  Series
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                  Originals
                </Button>
              </nav>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-40 md:w-64 bg-card border-border text-sm md:text-base"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden slideshow-container">
        {movies.slice(0, 5).map((movie, index) => (
          <div
            key={movie.id}
            className={`slide ${index === currentSlide ? "active" : ""} ${index === currentSlide - 1 || (currentSlide === 0 && index === 4) ? "prev" : ""}`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('${movie.poster}')`,
              }}
            />
            <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
              <div className="max-w-3xl">
                <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 text-balance">{movie.title}</h2>
                <p className="text-sm md:text-xl text-muted-foreground mb-6 md:mb-8 text-pretty leading-relaxed line-clamp-3 md:line-clamp-none">
                  {movie.description}
                </p>
                <div className="flex items-center space-x-2 md:space-x-4 mb-6 md:mb-10">
                  <Badge
                    variant="secondary"
                    className="flex items-center space-x-1 text-sm md:text-lg px-2 md:px-3 py-1"
                  >
                    <Star className="w-3 md:w-4 h-3 md:h-4 fill-yellow-400 text-yellow-400" />
                    <span>{movie.rating}</span>
                  </Badge>
                  <Badge variant="outline" className="text-sm md:text-lg px-2 md:px-3 py-1">
                    {movie.year}
                  </Badge>
                  <Badge variant="outline" className="flex items-center space-x-1 text-sm md:text-lg px-2 md:px-3 py-1">
                    <Clock className="w-3 md:w-4 h-3 md:h-4" />
                    <span>{movie.duration}</span>
                  </Badge>
                </div>
                <div className="flex space-x-3 md:space-x-6">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-sm md:text-lg px-4 md:px-8 py-2 md:py-3"
                    onClick={() => handlePlayMovie(movie.driveLink)}
                  >
                    <Play className="w-4 md:w-6 h-4 md:h-6 mr-2 md:mr-3" />
                    Play
                  </Button>
                  <Button
                    variant="outline"
                    className="text-sm md:text-lg px-4 md:px-8 py-2 md:py-3 bg-transparent"
                    onClick={() => setSelectedMovie(movie)}
                  >
                    More Info
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slideshow indicators */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {movies.slice(0, 5).map((_, index) => (
            <button
              key={index}
              className={`w-2 md:w-3 h-2 md:h-3 rounded-full transition-all ${index === currentSlide ? "bg-primary" : "bg-white/30"}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Search Results */}
      {searchQuery && (
        <section className="search-results container mx-auto px-4 py-8 md:py-12">
          <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">Search Results for "{searchQuery}"</h3>
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6">
              {filteredMovies.map((movie) => (
                <div key={movie.id} className="movie-card cursor-pointer group" onClick={() => setSelectedMovie(movie)}>
                  <div className="relative overflow-hidden rounded-lg bg-card">
                    <img
                      src={movie.poster || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-full h-[200px] md:h-[300px] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Play className="w-8 md:w-12 h-8 md:h-12 text-white" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary/90 text-primary-foreground text-xs">
                        <Star className="w-2 md:w-3 h-2 md:h-3 mr-1 fill-current" />
                        {movie.rating}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-3">
                    <h4 className="font-semibold text-xs md:text-sm line-clamp-2 text-balance">{movie.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{movie.year}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-16 max-w-2xl mx-auto">
              <div className="mb-6">
                <Search className="w-12 md:w-16 h-12 md:h-16 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-lg md:text-xl font-semibold mb-3">কোনো মুভি পাওয়া যায়নি</h4>
                <p className="text-muted-foreground text-sm md:text-lg leading-relaxed px-4">
                  আপনার দেওয়া নামে কোনো মুভি এখানে নেই অথবা আপনার নামে ভুল আছে। গুগল থেকে IMDB তে গিয়ে সঠিক নাম দিয়ে এখানে সার্চ করুন।
                </p>
              </div>
              <Button variant="outline" onClick={() => setSearchQuery("")} className="mt-4">
                সব মুভি দেখুন
              </Button>
            </div>
          )}
        </section>
      )}

      {/* Movies Grid */}
      <section className="movies-grid container mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h3 className="text-xl md:text-2xl font-bold">Hot and Fresh</h3>
          <Button variant="ghost" className="text-primary hover:text-primary/80 text-sm md:text-base">
            View More
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card cursor-pointer group" onClick={() => setSelectedMovie(movie)}>
              <div className="relative overflow-hidden rounded-lg bg-card">
                <img
                  src={movie.poster || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-full h-[200px] md:h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Play className="w-8 md:w-12 h-8 md:h-12 text-white" />
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-primary/90 text-primary-foreground text-xs">
                    <Star className="w-2 md:w-3 h-2 md:h-3 mr-1 fill-current" />
                    {movie.rating}
                  </Badge>
                </div>
              </div>
              <div className="mt-2 md:mt-3">
                <h4 className="font-semibold text-xs md:text-sm line-clamp-2 text-balance">{movie.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{movie.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onPlay={handlePlayMovie}
          onPlayTrailer={handlePlayTrailer}
        />
      )}

      {/* Video Player */}
      {isPlaying && (
        <VideoPlayer
          videoUrl={currentVideoUrl}
          onClose={() => {
            setIsPlaying(false)
            setCurrentVideoUrl("")
          }}
        />
      )}
    </div>
  )
}

// Function to convert Google Drive link to streamable format
function convertDriveLink(driveLink: string): string {
  // Extract file ID from Google Drive URL
  const fileIdMatch = driveLink.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (fileIdMatch) {
    const fileId = fileIdMatch[1]
    // Return direct embed URL for Google Drive
    return `https://drive.google.com/file/d/${fileId}/preview`
  }
  return driveLink
}

// Function to convert YouTube link to embed format
function convertYouTubeLink(youtubeLink: string): string {
  // Extract video ID from YouTube URL
  const videoIdMatch = youtubeLink.match(/v=([a-zA-Z0-9_-]+)/)
  if (videoIdMatch) {
    const videoId = videoIdMatch[1]
    // Return embed URL for YouTube
    return `https://www.youtube.com/embed/${videoId}`
  }
  return youtubeLink
}
