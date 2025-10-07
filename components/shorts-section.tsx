"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Heart, MessageCircle, Share2, Volume2, VolumeX } from "lucide-react"

interface Short {
  id: string
  title: string
  youtubeId: string
  likes: number
  comments: number
}

const shortsData: Short[] = [
  {
    id: "1",
    title: "INSAAF - Epic Action Scene",
    youtubeId: "dQw4w9WgXcQ",
    likes: 1200,
    comments: 45,
  },
  {
    id: "2",
    title: "Raghu Dakat - Intense Moment",
    youtubeId: "QrWh3Ww3Zn0",
    likes: 890,
    comments: 32,
  },
  {
    id: "3",
    title: "Ek Villain Returns - Thriller Scene",
    youtubeId: "swPhyd0g6K8",
    likes: 1500,
    comments: 67,
  },
  {
    id: "4",
    title: "Dangerous Animal - Survival Clip",
    youtubeId: "j19tLLKiYKY",
    likes: 2100,
    comments: 89,
  },
  {
    id: "5",
    title: "Manush - Action Packed",
    youtubeId: "J0SzT_184SE",
    likes: 950,
    comments: 41,
  },
  {
    id: "6",
    title: "Titanic - Romantic Scene",
    youtubeId: "kVrqfYjkTdQ",
    likes: 3200,
    comments: 156,
  },
]

export function ShortsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const handleTouchEnd = () => {
    if (isScrolling) return

    if (touchStart - touchEnd > 50) {
      handleNextShort()
    }

    if (touchStart - touchEnd < -50) {
      handlePrevShort()
    }
  }

  const handleNextShort = () => {
    if (currentIndex < shortsData.length - 1 && !isScrolling) {
      setIsScrolling(true)
      setCurrentIndex(currentIndex + 1)
      setTimeout(() => setIsScrolling(false), 500)
    }
  }

  const handlePrevShort = () => {
    if (currentIndex > 0 && !isScrolling) {
      setIsScrolling(true)
      setCurrentIndex(currentIndex - 1)
      setTimeout(() => setIsScrolling(false), 500)
    }
  }

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault()
    if (isScrolling) return

    if (e.deltaY > 0) {
      handleNextShort()
    } else if (e.deltaY < 0) {
      handlePrevShort()
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
      return () => container.removeEventListener("wheel", handleWheel)
    }
  }, [currentIndex, isScrolling])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        handleNextShort()
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        handlePrevShort()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, isScrolling])

  const currentShort = shortsData[currentIndex]

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Shorts</h1>
          <span className="text-white/60 text-sm">
            {currentIndex + 1} / {shortsData.length}
          </span>
        </div>
      </div>

      {/* Video Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="relative w-full h-full max-w-[500px] mx-auto transition-transform duration-300"
          style={{
            transform: `translateY(${-currentIndex * 100}vh)`,
          }}
        >
          {shortsData.map((short, index) => (
            <div
              key={short.id}
              className="absolute inset-0 w-full h-full"
              style={{
                transform: `translateY(${index * 100}vh)`,
              }}
            >
              {Math.abs(index - currentIndex) <= 1 && (
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
              )}

              {index === currentIndex && (
                <>
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

                  <div className="absolute bottom-24 left-4 right-20 z-20">
                    <h3 className="text-white font-semibold text-lg mb-2 text-balance">{short.title}</h3>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20 flex space-x-1">
        {shortsData.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all ${index === currentIndex ? "w-8 bg-white" : "w-1 bg-white/40"}`}
          />
        ))}
      </div>

      {/* Navigation Hints */}
      {currentIndex > 0 && (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
          <div className="text-white/30 text-sm">↑ Swipe up or scroll</div>
        </div>
      )}
      {currentIndex < shortsData.length - 1 && (
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
          <div className="text-white/30 text-sm">↓ Swipe down or scroll</div>
        </div>
      )}
    </div>
  )
}
