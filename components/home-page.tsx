"use client"

import { useState, useEffect } from "react"
import { Search, Play, Star, Clock, LogOut, ChevronLeft, ChevronRight, Facebook, MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MovieModal } from "@/components/movie-modal"
import { VideoPlayer } from "@/components/video-player"
import { UserAuthModal } from "@/components/user-auth-modal"
import { TelegramPopup } from "@/components/telegram-popup"

const TRENDING_MOVIE_IDS = [12, 14, 18, 23, 27, 28, 29]
const MOVIES_PER_PAGE = 20

const movies = [
  {
    id: 1,
    title: "INSAAF - Tale of Legends",
    poster: "/1id.jpg",
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
    telegramLink: "https://t.me/flixoryproxy/1803",
    trailerLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    googleDrivePlayUrl: "https://drive.google.com/file/d/19gueMTIe2PL9e7WDUZbUUro6fRIWjaX4/preview",
    googleDriveDownloadUrl: "",
  },
]

export function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authenticatedUser, setAuthenticatedUser] = useState<string | null>(null)
  const [sessionExpired, setSessionExpired] = useState(false)
  const [showTelegramPopup, setShowTelegramPopup] = useState(false)
  const [currentTelegramLink, setCurrentTelegramLink] = useState("")
  const [currentMovieTitle, setCurrentMovieTitle] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const sortedMovies = [...movies].sort((a, b) => b.id - a.id)

  const slideshowMovies = sortedMovies.filter((movie) => TRENDING_MOVIE_IDS.includes(movie.id))

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowMovies.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [slideshowMovies.length])

  useEffect(() => {
    const checkAuthStatus = () => {
      const savedAuth = localStorage.getItem("flixory_user_auth")
      if (savedAuth) {
        const authData = JSON.parse(savedAuth)

        if (authData.expiresAt && new Date(authData.expiresAt) < new Date()) {
          localStorage.removeItem("flixory_user_auth")
          setAuthenticatedUser(null)
          setSessionExpired(true)
          return
        }

        const approvedUsers = JSON.parse(localStorage.getItem("flixory_approved_users") || "[]")
        const user = approvedUsers.find(
          (u: any) => u.username.toLowerCase() === authData.username.toLowerCase() && u.isActive,
        )

        if (!user) {
          localStorage.removeItem("flixory_user_auth")
          setAuthenticatedUser(null)
          return
        }

        if (authData.username) {
          setAuthenticatedUser(authData.username)
        }
      }
    }

    checkAuthStatus()

    const authCheckInterval = setInterval(checkAuthStatus, 60000)

    return () => clearInterval(authCheckInterval)
  }, [])

  const filteredMovies = sortedMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE)
  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE
  const endIndex = startIndex + MOVIES_PER_PAGE
  const currentMovies = filteredMovies.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("...")
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowMovies.length) % slideshowMovies.length)
  }

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowMovies.length)
  }

  const handleOpenTelegram = (telegramLink: string, movieTitle: string) => {
    setCurrentTelegramLink(telegramLink)
    setCurrentMovieTitle(movieTitle)
    setShowTelegramPopup(true)
    setSelectedMovie(null)
  }

  const handlePlayTrailer = (trailerLink: string) => {
    const videoUrl = convertYouTubeLink(trailerLink)
    setCurrentVideoUrl(videoUrl)
    setIsPlaying(true)
    setSelectedMovie(null)
  }

  const handleUserAuth = (username: string) => {
    setAuthenticatedUser(username)
    setShowAuthModal(false)
    setSessionExpired(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("flixory_user_auth")

    const approvedUsers = JSON.parse(localStorage.getItem("flixory_approved_users") || "[]")
    const updatedUsers = approvedUsers.map((u: any) =>
      u.username.toLowerCase() === authenticatedUser?.toLowerCase()
        ? { ...u, deviceId: null, deviceFingerprint: null, lastLoginTime: null }
        : u,
    )
    localStorage.setItem("flixory_approved_users", JSON.stringify(updatedUsers))

    setAuthenticatedUser(null)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className={`min-h-screen bg-background touch-manipulation pb-20 ${searchQuery ? "search-active" : ""}`}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 md:space-x-8">
              <div className="flex items-center space-x-2">
                <div className="relative w-8 h-8 md:w-10 md:h-10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full text-primary"
                  >
                    <rect x="2" y="7" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M8 20 L16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 20 L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M7 7 L9 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M17 7 L15 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[8px] md:text-[10px] font-bold text-primary mt-1">MV</span>
                  </div>
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-primary">FLIXORY</h1>
              </div>
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
              {authenticatedUser && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-foreground"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        {slideshowMovies.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
            onClick={() => setSelectedMovie(movie)}
            style={{ cursor: "pointer" }}
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
                  <Badge variant="secondary" className="flex items-center space-x-1 text-sm md:text-lg px-2 md:px-3 py-1">
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
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOpenTelegram(movie.telegramLink, movie.title)
                    }}
                  >
                    <Play className="w-4 md:w-6 h-4 md:h-6 mr-2 md:mr-3" />
                    Play
                  </Button>
                  <Button
                    variant="outline"
                    className="text-sm md:text-lg px-4 md:px-8 py-2 md:py-3"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedMovie(movie)
                    }}
                  >
                    More Info
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slideshowMovies.map((_, index) => (
            <button
              key={index}
              className={`w-2 md:w-3 h-2 md:h-3 rounded-full transition-all ${index === currentSlide ? "bg-primary" : "bg-white/30"}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Search Results or Movies Grid */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h3 className="text-xl md:text-2xl font-bold">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Hot and Fresh"}
          </h3>
          {filteredMovies.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages} ({filteredMovies.length} movies)
            </div>
          )}
        </div>

        {filteredMovies.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6">
              {currentMovies.map((movie) => (
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

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 md:mt-12">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline ml-1">Previous</span>
                </Button>

                <div className="flex items-center gap-1 md:gap-2">
                  {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                      <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                        ...
                      </span>
                    ) : (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page as number)}
                        className={`w-8 h-8 md:w-10 md:h-10 p-0 ${
                          currentPage === page
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "hover:bg-accent"
                        }`}
                      >
                        {page}
                      </Button>
                    ),
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2"
                >
                  <span className="hidden sm:inline mr-1">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 md:py-16 max-w-2xl mx-auto">
            <div className="mb-6">
              <Search className="w-12 md:w-16 h-12 md:h-16 text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg md:text-xl font-semibold mb-3">কোনো মুভি পাওয়া যায়নি</h4>
              <p className="text-muted-foreground text-sm md:text-lg leading-relaxed px-4 mb-6">
                এই নামে কোনো মুভি পাওয়া যায়নি। যদি তুমি এই মুভি রিকোয়েস্ট করতে চাও তাহলে নিচে দেওয়া Facebook গ্রুপ বা Telegram চ্যানেলে গিয়ে admin কে বলবে, তারা এই মুভি add করে দেবে।
              </p>
              
              <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
                <a
                  href="https://www.facebook.com/groups/733950559669339/?ref=share&mibextid=NSMWBT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  <span className="hidden sm:inline">Facebook Group</span>
                  <span className="sm:hidden">Facebook</span>
                </a>
                
                <a
                  href="https://t.me/moviesversebdreq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="hidden sm:inline">Telegram Channel</span>
                  <span className="sm:hidden">Telegram</span>
                </a>
              </div>
            </div>
            <Button variant="outline" onClick={() => setSearchQuery("")} className="mt-4">
              সব মুভি দেখুন
            </Button>
          </div>
        )}
      </section>

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onOpenTelegram={handleOpenTelegram}
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

      {/* Telegram Popup */}
      {showTelegramPopup && (
        <TelegramPopup
          telegramLink={currentTelegramLink}
          movieTitle={currentMovieTitle}
          onClose={() => {
            setShowTelegramPopup(false)
            setCurrentTelegramLink("")
            setCurrentMovieTitle("")
          }}
          isShort={false}
        />
      )}

      {showAuthModal && <UserAuthModal onAuth={handleUserAuth} onClose={() => setShowAuthModal(false)} />}

      {sessionExpired && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
            <p className="text-sm">আপনার সেশন শেষ হয়েছে। আবার লগইন করুন।</p>
          </div>
        </div>
      )}
    </div>
  )
}

function convertYouTubeLink(youtubeLink: string): string {
  const videoIdMatch = youtubeLink.match(/v=([a-zA-Z0-9_-]+)/)
  if (videoIdMatch) {
    const videoId = videoIdMatch[1]
    return `https://www.youtube.com/embed/${videoId}`
  }
  return youtubeLink
}
