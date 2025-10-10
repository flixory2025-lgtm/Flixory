"use client"
import { useState, useRef, useEffect } from "react"
import { Heart, MessageCircle, Share2, Volume2, VolumeX, ChevronUp, ChevronDown, Play, X } from "lucide-react"
import { ShortsPopup } from "./shorts-popup"

interface Short {
  id: string
  title: string
  youtubeId: string
  likes: number
  comments: number
  telegramLink: string
}

const shortsData: Short[] = [
  {
    id: "1",
    title: "alice in boarderland",
    youtubeId: "aCZVOqBV3ug",
    likes: 1200,
    comments: 45,
    telegramLink: "https://t.me/flixoryproxy/344",
  },
  {
    id: "2",
    title: "alice in boarderland",
    youtubeId: "otllNEww99s",
    likes: 890,
    comments: 32,
    telegramLink: "https://t.me/flixoryproxy/344",
  },
  {
    id: "3",
    title: "alice in boarderland",
    youtubeId: "NVKOHGD4dkQ",
    likes: 1500,
    comments: 67,
    telegramLink: "https://t.me/flixoryproxy/363",
  },
  {
    id: "4",
    title: "alice in boarderland season 3",
    youtubeId: "KiG2y0H_gLY",
    likes: 2100,
    comments: 89,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "5",
    title: "alice in boarderland season 3",
    youtubeId: "ClQxoxNdYJk",
    likes: 950,
    comments: 41,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "6",
    title: "alice in boarderland season 3",
    youtubeId: "BGXjUX5UlwM",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "7",
    title: "alice in boarderland season 2",
    youtubeId: "4EyoHq_lEzE",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "8",
    title: "alice in boarderland season 2",
    youtubeId: "uFIFQZNgvB4",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "9",
    title: "alice in boarderland season 2",
    youtubeId: "ap8cmqMvagQ",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "10",
    title: "alice in boarderland season 3",
    youtubeId: "mIVyEcTLYyE",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "11",
    title: "alice in boarderland season 3",
    youtubeId: "s_cZOSJeJ0g",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "12",
    title: "alice in boarderland season 3",
    youtubeId: "Tkjl6ye_f1U",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "13",
    title: "all of us are dead",
    youtubeId: "U7cRZR_FokA",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/385",
  },
  {
    id: "14",
    title: "all of us are dead",
    youtubeId: "HyxMyhL1cKM",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/385",
  },
  {
    id: "15",
    title: "all of us are dead",
    youtubeId: "FB20dkHjew0",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/385",
  },
  {
    id: "16",
    title: "happiness season 1",
    youtubeId: "oDgMKByy2Kg",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1525",
  },
  {
    id: "17",
    title: "happiness season 1",
    youtubeId: "OJkg_PedirY",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1525",
  },
  {
    id: "18",
    title: "wednesday season 2 part 2",
    youtubeId: "7JGd2kfvDks",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1291",
  },
  {
    id: "19",
    title: "wednesday season 2 part 2",
    youtubeId: "7JGd2kfvDks",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1291",
  },
  {
    id: "20",
    title: "wednesday season 2 part 2",
    youtubeId: "gWWAsQGS79A",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1291",
  },
]

export function ShortsSection() {
  const [currentIndex, setCurrentIndex] = useState(() => {
    return Math.floor(Math.random() * shortsData.length)
  })
  const [isMuted, setIsMuted] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [selectedTelegramLink, setSelectedTelegramLink] = useState("")
  const [selectedMovieTitle, setSelectedMovieTitle] = useState("")
  const [likedShorts, setLikedShorts] = useState<Set<string>>(new Set())
  const [shortLikes, setShortLikes] = useState<Record<string, number>>(() => {
    const initialLikes: Record<string, number> = {}
    shortsData.forEach((short) => {
      initialLikes[short.id] = short.likes
    })
    return initialLikes
  })
  const [showComments, setShowComments] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop
      const itemHeight = containerRef.current.clientHeight
      const newIndex = Math.round(scrollTop / itemHeight)
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < shortsData.length) {
        setCurrentIndex(newIndex)
      }
    }
  }

  const scrollToIndex = (index: number) => {
    if (containerRef.current && index >= 0 && index < shortsData.length) {
      const itemHeight = containerRef.current.clientHeight
      containerRef.current.scrollTo({
        top: index * itemHeight,
        behavior: "smooth",
      })
    }
  }

  const handlePrevShort = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1)
    }
  }

  const handleNextShort = () => {
    if (currentIndex < shortsData.length - 1) {
      scrollToIndex(currentIndex + 1)
    }
  }

  const handleWatchMovie = (telegramLink: string, title: string) => {
    setSelectedTelegramLink(telegramLink)
    setSelectedMovieTitle(title)
    setShowPopup(true)
  }

  const handleLike = (shortId: string) => {
    setLikedShorts((prev) => {
      const newLiked = new Set(prev)
      if (newLiked.has(shortId)) {
        newLiked.delete(shortId)
        setShortLikes((prevLikes) => ({
          ...prevLikes,
          [shortId]: prevLikes[shortId] - 1,
        }))
      } else {
        newLiked.add(shortId)
        setShortLikes((prevLikes) => ({
          ...prevLikes,
          [shortId]: prevLikes[shortId] + 1,
        }))
      }
      return newLiked
    })
  }

  const handleComment = () => {
    setShowComments(true)
  }

  const handleShare = async (short: Short) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: short.title,
          text: `Check out this short: ${short.title}`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Share cancelled")
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      const itemHeight = containerRef.current.clientHeight
      containerRef.current.scrollTo({
        top: currentIndex * itemHeight,
        behavior: "auto",
      })
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [currentIndex])

  return (
    <div className="fixed inset-0 bg-black">
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/90 to-transparent p-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold text-white">Shorts</h1>
          <span className="text-white/60 text-sm">
            {currentIndex + 1} / {shortsData.length}
          </span>
        </div>
        <p className="text-white/80 text-xs text-center">
          এখানের সব short movie clips video এর full movie দেখতে Watch Movie বাটনে ক্লিক করুন
        </p>
      </div>

      <div
        ref={containerRef}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {shortsData.map((short, index) => (
          <div
            key={short.id}
            className="relative w-full h-full snap-start snap-always flex items-center justify-center"
          >
            <div className="relative w-full h-full max-w-[500px] mx-auto">
              <iframe
                src={`https://www.youtube.com/embed/${short.youtubeId}?autoplay=${index === currentIndex ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${short.youtubeId}&modestbranding=1&rel=0&fs=0&playsinline=1&disablekb=1&iv_load_policy=3&cc_load_policy=0&showinfo=0&enablejsapi=1`}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  border: "none",
                  outline: "none",
                  pointerEvents: "none",
                }}
              />

              {index === currentIndex && (
                <>
                  {/* Right side action buttons */}
                  <div className="absolute right-4 bottom-24 z-20 flex flex-col space-y-6">
                    <button
                      onClick={() => handleLike(short.id)}
                      className="flex flex-col items-center space-y-1 text-white"
                    >
                      <div
                        className={`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${
                          likedShorts.has(short.id) ? "bg-red-500/80 scale-110" : "bg-white/20 hover:bg-white/30"
                        }`}
                      >
                        <Heart className={`w-6 h-6 ${likedShorts.has(short.id) ? "fill-white" : ""}`} />
                      </div>
                      <span className="text-xs font-semibold">{shortLikes[short.id]}</span>
                    </button>

                    <button onClick={handleComment} className="flex flex-col items-center space-y-1 text-white">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <span className="text-xs">{short.comments}</span>
                    </button>

                    <button
                      onClick={() => handleShare(short)}
                      className="flex flex-col items-center space-y-1 text-white"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Share2 className="w-6 h-6" />
                      </div>
                      <span className="text-xs">Share</span>
                    </button>

                    <button
                      className="flex flex-col items-center space-y-1 text-white"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                      </div>
                    </button>
                  </div>

                  {/* Video title and Watch Movie button */}
                  <div className="absolute bottom-24 left-4 right-20 z-20">
                    <h3 className="text-white font-semibold text-lg mb-3 text-balance">{short.title}</h3>
                    {/* Watch Movie button */}
                    <button
                      onClick={() => handleWatchMovie(short.telegramLink, short.title)}
                      className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-full font-semibold transition-all shadow-lg"
                    >
                      <Play className="w-5 h-5" />
                      <span>Watch Movie</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {currentIndex > 0 && (
        <button
          onClick={handlePrevShort}
          className="absolute top-1/2 left-4 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors text-white"
          aria-label="Previous short"
        >
          <ChevronUp className="w-8 h-8" />
        </button>
      )}

      {currentIndex < shortsData.length - 1 && (
        <button
          onClick={handleNextShort}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors text-white"
          aria-label="Next short"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      )}

      {/* Progress Indicator */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-30 flex space-x-1">
        {shortsData.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all ${index === currentIndex ? "w-8 bg-white" : "w-1 bg-white/40"}`}
          />
        ))}
      </div>

      {/* Telegram popup */}
      {showPopup && (
        <ShortsPopup
          telegramLink={selectedTelegramLink}
          movieTitle={selectedMovieTitle}
          onClose={() => setShowPopup(false)}
        />
      )}

      {/* Comments modal */}
      {showComments && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-gray-900 rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">Comments</h3>
              <button
                onClick={() => setShowComments(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-white/80 text-sm text-center">
                  কমেন্ট ফিচার শীঘ্রই আসছে! 🎉
                  <br />
                  <span className="text-xs text-white/60">Comments feature coming soon!</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
