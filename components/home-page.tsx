"use client"

import { useState, useEffect } from "react"
import { Search, Play, Star, Clock, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MovieModal } from "@/components/movie-modal"
import { VideoPlayer } from "@/components/video-player"
import { UserAuthModal } from "@/components/user-auth-modal"
import { TelegramPopup } from "@/components/telegram-popup"

const TRENDING_MOVIE_IDS = [2, 4, 6, 5]

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
    telegramLink: "https://t.me/flixoryproxy/3490",
    trailerLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1DxYZ9cpWRuEBCqhtcmpd8IEHWbZy4f2W/preview",
    googleDriveDownloadUrl: "https://drive.google.com/uc?export=download&id=1DxYZ9cpWRuEBCqhtcmpd8IEHWbZy4f2W",
  },
  {
    id: 2,
    title: "Raghu dakat 2025",
    poster: "/2id.jpg",
    rating: 7.0,
    year: 2025,
    duration: "2h 30m",
    genre: ["History", "Drama", "Action"],
    description:
      "১৮শ শতাব্দীর বাঙালির ইতিহাসের পরশে রচিত এক period action-অ্যাডভেঞ্চার—যেখানে 'রঘু ডাকাত' বন্ধুর সঙ্গে জন-জনের চোখে নায়ক হয়ে ওঠে, সাধারণ মানুষের নির্যাতন ও অবিচারের বিরুদ্ধে লড়ায়।",
    screenshots: ["/ss2.png", "/ss22.png", "/ss222.png", "/ss2222.png"],
    telegramLink: "https://t.me/your_channel/124?embed=1",
    trailerLink: "https://www.youtube.com/embed/QrWh3Ww3Zn0?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1DEF456xyz/view?usp=sharing",
    googleDriveDownloadUrl: "https://drive.google.com/file/d/1DEF456xyz/view?usp=sharing",
  },
  {
    id: 3,
    title: "Ek Villain Returns (2022)",
    poster: "/3id.jpg",
    rating: 4.6,
    year: 2022,
    duration: "2h 07m",
    genre: ["Action", "Romance", "Thriller"],
    description: "পুরনো ভিলেনের ছায়ায় নতুন প্রেম, নতুন প্রতিশোধ আর খুনের রহস্য—হিরো নয়, এখানে গল্প বলে শুধু ভিলেনরা।",
    screenshots: ["/ss3.jpg", "/ss33.jpg", "/ss333.jpg", "/ss3333.jpg"],
    telegramLink: "https://t.me/your_channel/125?embed=1",
    trailerLink: "https://www.youtube.com/embed/swPhyd0g6K8?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1GHI789xyz/view?usp=sharing",
    googleDriveDownloadUrl: "https://drive.google.com/file/d/1GHI789xyz/view?usp=sharing",
  },
  {
    id: 4,
    title: "Dangerous Animal (2025)",
    poster: "/4id.jpg",
    rating: 8.5,
    year: 2025,
    duration: "1h 38m",
    genre: ["Action", "Survival", "Thriller"],
    description:
      "এক ভয়ংকর বন্য প্রাণীর আক্রমণে আটকে পড়া মানুষদের টিকে থাকার সংগ্রাম। প্রতিটি মুহূর্তেই জীবন-মৃত্যুর লড়াই, আর প্রকৃতির ভয়ংকর শক্তির সামনে মানুষ কতটা অসহায়—সেই কাহিনি।",
    screenshots: ["/ss4.jpg", "/ss44.jpg", "/ss444.jpg", "/ss4444.jpg"],
    telegramLink: "https://t.me/your_channel/126?embed=1",
    trailerLink: "https://www.youtube.com/embed/j19tLLKiYKY?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1JKL012xyz/view?usp=sharing",
    googleDriveDownloadUrl: "https://drive.google.com/file/d/1JKL012xyz/view?usp=sharing",
  },
  {
    id: 5,
    title: "Manush (2023)",
    poster: "/5id.jpg",
    rating: 6.5,
    year: 2023,
    duration: "2h 05m",
    genre: ["Action", "Drama", "Thriller"],
    description: "পরিচালক Sanjoy Somadder-এর এই ছবিতে অন্ধকার আন্ডারওয়ার্ল্ড, প্রতিশোধ আর ভালোবাসার গল্প মিলেছে একসাথে।",
    screenshots: ["/ss5.jpg", "/ss55.jpg"],
    telegramLink: "https://t.me/your_channel/127?embed=1",
    trailerLink: "https://www.youtube.com/embed/J0SzT_184SE?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1MNO345xyz/view?usp=sharing",
    googleDriveDownloadUrl: "https://drive.google.com/file/d/1MNO345xyz/view?usp=sharing",
  },
  {
    id: 6,
    title: "Titanic (1997)",
    poster: "/6id.jpg",
    rating: 7.9,
    year: 2025,
    duration: "3h 14m",
    genre: ["Romance", "Drama", "Action"],
    description:
      "বিখ্যাত RMS Titanic জাহাজের ট্র্যাজেডির পটভূমিতে তৈরি এক অবিস্মরণীয় প্রেমকাহিনি। রোজ আর জ্যাকের ভালোবাসা ইতিহাসে এক ক্লাসিক গল্প হিসেবে জায়গা করে নিয়েছে।",
    screenshots: ["/ss6.jpg", "/ss66.jpg", "/ss666.jpg", "/ss6666.jpg", "/ss66666.jpg", "/ss666666.jpg"],
    telegramLink: "https://t.me/your_channel/128?embed=1",
    trailerLink: "https://www.youtube.com/embed/kVrqfYjkTdQ?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1PQR678xyz/view?usp=sharing",
    googleDriveDownloadUrl: "https://drive.google.com/file/d/1PQR678xyz/view?usp=sharing",
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

  const filteredMovies = sortedMovies.filter(
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

  const featuredMovie = slideshowMovies[currentSlide]

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowMovies.length) % slideshowMovies.length)
  }

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowMovies.length)
  }

  const handleOpenTelegram = (telegramLink: string, movieTitle: string) => {
    console.log("[v0] Opening Telegram link:", telegramLink)
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

  return (
    <div className={`min-h-screen bg-background touch-manipulation pb-20 ${searchQuery ? "search-active" : ""}`}>
      {/* Session Expired Notification */}
      {sessionExpired && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
            <p className="text-sm">Session expired. Please login again.</p>
          </div>
        </div>
      )}

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
              {authenticatedUser && (
                <div className="flex items-center space-x-2">
                  <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>Welcome, {authenticatedUser}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="text-muted-foreground hover:text-foreground"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden slideshow-container">
        {slideshowMovies.map((movie, index) => (
          <div
            key={movie.id}
            className={`slide ${index === currentSlide ? "active" : ""} ${index === currentSlide - 1 || (currentSlide === 0 && index === slideshowMovies.length - 1) ? "prev" : ""}`}
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
                    className="text-sm md:text-lg px-4 md:px-8 py-2 md:py-3 bg-transparent"
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
          {sortedMovies.map((movie) => (
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
