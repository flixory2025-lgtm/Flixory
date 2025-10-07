"use client"
import { useState, useRef, useEffect } from "react"
import { Heart, MessageCircle, Share2, Volume2, VolumeX, ChevronUp, ChevronDown, Play } from "lucide-react"
import { TelegramPopup } from "./telegram-popup"

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
    telegramLink: "https://t.me/MVPMCC/326",
  },
  {
    id: "2",
    title: "Raghu Dakat - Intense Moment",
    youtubeId: "QrWh3Ww3Zn0",
    likes: 890,
    comments: 32,
    telegramLink: "https://t.me/your_channel/124",
  },
  {
    id: "3",
    title: "Ek Villain Returns - Thriller Scene",
    youtubeId: "swPhyd0g6K8",
    likes: 1500,
    comments: 67,
    telegramLink: "https://t.me/your_channel/125",
  },
  {
    id: "4",
    title: "Dangerous Animal - Survival Clip",
    youtubeId: "j19tLLKiYKY",
    likes: 2100,
    comments: 89,
    telegramLink: "https://t.me/your_channel/126",
  },
  {
    id: "5",
    title: "Manush - Action Packed",
    youtubeId: "J0SzT_184SE",
    likes: 950,
    comments: 41,
    telegramLink: "https://t.me/your_channel/127",
  },
  {
    id: "6",
    title: "Titanic - Romantic Scene",
    youtubeId: "kVrqfYjkTdQ",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/your_channel/128",
  },
]

export function ShortsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [showTelegramPopup, setShowTelegramPopup] = useState(false)
  const [selectedTelegramLink, setSelectedTelegramLink] = useState("")
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

  const handleWatchMovie = (telegramLink: string) => {
    setSelectedTelegramLink(telegramLink)
    setShowTelegramPopup(true)
  }

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
                src={`https://www.youtube.com/embed/${short.youtubeId}?autoplay=${index === currentIndex ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${short.youtubeId}&modestbranding=1&rel=0&fs=0&playsinline=1`}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
                style={{
                  border: "none",
                  outline: "none",
                }}
              />

              {index === currentIndex && (
                <>
                  {/* Right side action buttons */}
                  <div className="absolute right-4 bottom-24 z-20 flex flex-col space-y-6">
                    <button className="flex flex-col items-center space-y-1 text-white">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Heart className="w-6 h-6" />
                      </div>
                      <span className="text-xs">{short.likes}</span>
                    </button>

                    <button className="flex flex-col items-center space-y-1 text-white">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <span className="text-xs">{short.comments}</span>
                    </button>

                    <button className="flex flex-col items-center space-y-1 text-white">
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
                      onClick={() => handleWatchMovie(short.telegramLink)}
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
      {showTelegramPopup && (
        <TelegramPopup telegramLink={selectedTelegramLink} onClose={() => setShowTelegramPopup(false)} />
      )}
    </div>
  )
}
