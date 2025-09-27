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
    ],
    telegramLink: "https://t.me/MVBDN/1760", // Simplified ID-based format
    trailerLink: "https://t.me/MVBDN/1001", // Trailer with higher ID
  },
  {
    id: 2,
    title: "জয়া তারি",
    poster: "/bengali-romantic-drama-movie-poster.jpg",
    rating: 7.8,
    year: 2024,
    duration: "2h 5m",
    genre: ["Romance", "Drama"],
    description:
      "A beautiful love story that transcends time and social boundaries. Follow the journey of two souls destined to be together.",
    screenshots: [
      "/romantic-scene-in-bengali-movie.jpg",
      "/traditional-bengali-wedding-scene.jpg",
      "/placeholder.svg?height=200&width=350",
    ],
    telegramLink: "https://t.me/MVBDN/2", // Easy ID management
    trailerLink: "https://t.me/MVBDN/1002",
  },
  {
    id: 3,
    title: "মন যামিনী",
    poster: "/bengali-psychological-thriller-movie-poster.jpg",
    rating: 8.2,
    year: 2024,
    duration: "1h 55m",
    genre: ["Thriller", "Mystery"],
    description:
      "A psychological thriller that will keep you on the edge of your seat. Unravel the mysteries of the human mind.",
    screenshots: ["/dark-mysterious-scene.jpg", "/suspenseful-thriller-moment.jpg", "/psychological-drama-scene.jpg"],
    telegramLink: "https://t.me/MVBDN/3", // Sequential ID system
    trailerLink: "https://t.me/MVBDN/1003",
  },
  {
    id: 4,
    title: "কালরাত্রি",
    poster: "/bengali-horror-movie-poster-with-dark-atmosphere.jpg",
    rating: 7.5,
    year: 2024,
    duration: "1h 45m",
    genre: ["Horror", "Supernatural"],
    description: "A spine-chilling horror story that will haunt your dreams. Enter the world of supernatural terror.",
    screenshots: [
      "/scary-horror-movie-scene.jpg",
      "/supernatural-ghost-appearance.jpg",
      "/placeholder.svg?height=200&width=350",
    ],
    telegramLink: "https://t.me/MVBDN/4", // Simple ID-based linking
    trailerLink: "https://t.me/MVBDN/1004",
  },
  {
    id: 5,
    title: "বিপ্লব",
    poster: "/placeholder.svg?height=400&width=300",
    rating: 8.7,
    year: 2024,
    duration: "2h 30m",
    genre: ["Historical", "Drama", "War"],
    description:
      "An epic tale of revolution and sacrifice. Witness the struggle for freedom through the eyes of brave revolutionaries.",
    screenshots: [
      "/placeholder.svg?height=200&width=350",
      "/placeholder.svg?height=200&width=350",
      "/placeholder.svg?height=200&width=350",
    ],
    telegramLink: "https://t.me/MVBDN/5", // Consistent ID pattern
    trailerLink: "https://t.me/MVBDN/1005",
  },
]

export default function HomePage() {
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

  const handlePlayMovie = (telegramLink: string) => {
    // Convert Telegram link to streamable format
    const videoUrl = convertTelegramLink(telegramLink)
    setCurrentVideoUrl(videoUrl)
    setIsPlaying(true)
    setSelectedMovie(null)
  }

  const handlePlayTrailer = (trailerLink: string) => {
    const videoUrl = convertTelegramLink(trailerLink)
    setCurrentVideoUrl(videoUrl)
    setIsPlaying(true)
    setSelectedMovie(null)
  }

  const featuredMovie = movies[currentSlide]

  return (
    <div className={`min-h-screen bg-background ${searchQuery ? "search-active" : ""}`}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-primary">FLIXORY</h1>
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
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-card border-border"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90">Subscribe</Button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative h-[80vh] overflow-hidden slideshow-container">
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
                <h2 className="text-6xl font-bold mb-6 text-balance">{movie.title}</h2>
                <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">{movie.description}</p>
                <div className="flex items-center space-x-4 mb-10">
                  <Badge variant="secondary" className="flex items-center space-x-1 text-lg px-3 py-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{movie.rating}</span>
                  </Badge>
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {movie.year}
                  </Badge>
                  <Badge variant="outline" className="flex items-center space-x-1 text-lg px-3 py-1">
                    <Clock className="w-4 h-4" />
                    <span>{movie.duration}</span>
                  </Badge>
                </div>
                <div className="flex space-x-6">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-lg px-8 py-3"
                    onClick={() => handlePlayMovie(movie.telegramLink)}
                  >
                    <Play className="w-6 h-6 mr-3" />
                    Play
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-3 bg-transparent"
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
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {movies.slice(0, 5).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-primary" : "bg-white/30"}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {searchQuery && (
        <section className="search-results container mx-auto px-4 py-12">
          <h3 className="text-2xl font-bold mb-8">Search Results for "{searchQuery}"</h3>
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {filteredMovies.map((movie) => (
                <div key={movie.id} className="movie-card cursor-pointer group" onClick={() => setSelectedMovie(movie)}>
                  <div className="relative overflow-hidden rounded-lg bg-card">
                    <img
                      src={movie.poster || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-full h-[300px] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary/90 text-primary-foreground">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {movie.rating}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h4 className="font-semibold text-sm line-clamp-2 text-balance">{movie.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{movie.year}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 max-w-2xl mx-auto">
              <div className="mb-6">
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-3">কোনো মুভি পাওয়া যায়নি</h4>
                <p className="text-muted-foreground text-lg leading-relaxed">
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

      {/* Movies Grid - Hidden when searching */}
      <section className="movies-grid container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold">Hot and Fresh</h3>
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            View More
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card cursor-pointer group" onClick={() => setSelectedMovie(movie)}>
              <div className="relative overflow-hidden rounded-lg bg-card">
                <img
                  src={movie.poster || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-full h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white" />
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-primary/90 text-primary-foreground">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {movie.rating}
                  </Badge>
                </div>
              </div>
              <div className="mt-3">
                <h4 className="font-semibold text-sm line-clamp-2 text-balance">{movie.title}</h4>
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

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">FLIXORY</h3>
              <p className="text-muted-foreground leading-relaxed">
                বাংলা সিনেমার সবচেয়ে বড় অনলাইন প্ল্যাটফর্ম। সেরা মুভি, সিরিয়াল এবং অরিজিনাল কন্টেন্ট উপভোগ করুন।
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="outline" className="w-10 h-10 p-0 bg-transparent">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Button>
                <Button size="sm" variant="outline" className="w-10 h-10 p-0 bg-transparent">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </Button>
                <Button size="sm" variant="outline" className="w-10 h-10 p-0 bg-transparent">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 .34.04.67.11.98C8.28 9.09 5.7 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    All Movies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Latest Releases
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Top Rated
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Bengali Movies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Web Series
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Categories</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Action
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Romance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Drama
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Thriller
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Comedy
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 FLIXORY. All rights reserved. Made with ❤️ for Bengali cinema lovers.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Badge variant="outline" className="text-xs">
                HD Quality
              </Badge>
              <Badge variant="outline" className="text-xs">
                Fast Streaming
              </Badge>
              <Badge variant="outline" className="text-xs">
                Mobile Friendly
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Function to convert Telegram link to streamable format
function convertTelegramLink(telegramLink: string): string {
  // This is a simplified conversion - you'll need to implement actual Telegram bot API integration
  // For now, returning a placeholder video URL
  return `/api/stream?url=${encodeURIComponent(telegramLink)}`
}
