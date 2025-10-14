"use client"

import { useState, useRef, useEffect } from "react"
import {
  X,
  ChevronUp,
  ChevronDown,
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
  Play,
  Send,
  Copy,
  Check,
} from "lucide-react"
import { ShortsPopup } from "./shorts-popup"

interface Short {
  id: string
  title: string
  youtubeId: string
  likes: number
  comments: number
  telegramLink: string
}

interface ShortsPlayerProps {
  shorts: Short[]
  initialIndex: number
  onClose: () => void
}

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export function ShortsPlayer({ shorts, initialIndex, onClose }: ShortsPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isMuted, setIsMuted] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [likedShorts, setLikedShorts] = useState<Set<string>>(new Set())
  const [shortLikes, setShortLikes] = useState<Record<string, number>>(() => {
    const initialLikes: Record<string, number> = {}
    shorts.forEach((short) => {
      initialLikes[short.id] = short.likes
    })
    return initialLikes
  })
  const [showComments, setShowComments] = useState(false)
  const [showSharePopup, setShowSharePopup] = useState(false)
  const [shareLink, setShareLink] = useState("")
  const [linkCopied, setLinkCopied] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState<
    Record<string, Array<{ id: string; text: string; user: string; timestamp: Date }>>
  >({})
  const [isPlaying, setIsPlaying] = useState(true)
  const [players, setPlayers] = useState<Record<string, any>>({})
  const [apiReady, setApiReady] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setApiReady(true)
      return
    }

    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName("script")[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    window.onYouTubeIframeAPIReady = () => {
      setApiReady(true)
    }

    return () => {
      window.onYouTubeIframeAPIReady = () => {}
    }
  }, [])

  useEffect(() => {
    if (!apiReady) return

    const indicesToLoad = [currentIndex - 1, currentIndex, currentIndex + 1].filter(
      (idx) => idx >= 0 && idx < shorts.length,
    )

    indicesToLoad.forEach((index) => {
      const short = shorts[index]
      const playerId = `player-${short.id}`

      if (players[short.id]) return

      const checkElement = setInterval(() => {
        const element = document.getElementById(playerId)
        if (element) {
          clearInterval(checkElement)

          try {
            const player = new window.YT.Player(playerId, {
              videoId: short.youtubeId,
              playerVars: {
                autoplay: index === currentIndex ? 1 : 0,
                mute: isMuted ? 1 : 0,
                controls: 0,
                loop: 1,
                playlist: short.youtubeId,
                modestbranding: 1,
                rel: 0,
                fs: 0,
                playsinline: 1,
                disablekb: 1,
                iv_load_policy: 3,
                cc_load_policy: 0,
                showinfo: 0,
              },
              events: {
                onReady: (event: any) => {
                  setPlayers((prev) => ({ ...prev, [short.id]: event.target }))
                  if (index === currentIndex) {
                    event.target.playVideo()
                  }
                },
                onStateChange: (event: any) => {
                  if (event.data === window.YT.PlayerState.ENDED) {
                    event.target.playVideo()
                  }
                },
              },
            })
          } catch (error) {
            console.error("[v0] Error creating YouTube player:", error)
          }
        }
      }, 100)

      setTimeout(() => clearInterval(checkElement), 5000)
    })
  }, [apiReady, currentIndex, isMuted, shorts])

  useEffect(() => {
    if (!apiReady || Object.keys(players).length === 0) return

    Object.entries(players).forEach(([shortId, player]) => {
      if (player && typeof player.pauseVideo === "function") {
        player.pauseVideo()
      }
    })

    const currentShort = shorts[currentIndex]
    const currentPlayer = players[currentShort.id]

    if (currentPlayer && typeof currentPlayer.playVideo === "function") {
      currentPlayer.playVideo()
      setIsPlaying(true)
    }
  }, [currentIndex, apiReady, players, shorts])

  useEffect(() => {
    if (!apiReady) return

    Object.entries(players).forEach(([shortId, player]) => {
      if (player) {
        if (isMuted) {
          player.mute?.()
        } else {
          player.unMute?.()
        }
      }
    })
  }, [isMuted, players, apiReady])

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop
      const itemHeight = containerRef.current.clientHeight
      const newIndex = Math.round(scrollTop / itemHeight)
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < shorts.length) {
        setCurrentIndex(newIndex)
        setIsPlaying(true)
      }
    }
  }

  const scrollToIndex = (index: number) => {
    if (containerRef.current && index >= 0 && index < shorts.length) {
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
    if (currentIndex < shorts.length - 1) {
      scrollToIndex(currentIndex + 1)
    }
  }

  const handleWatchMovie = () => {
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

  const handlePostComment = (shortId: string) => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now().toString(),
        text: commentText,
        user: "আপনি",
        timestamp: new Date(),
      }

      setComments((prev) => ({
        ...prev,
        [shortId]: [...(prev[shortId] || []), newComment],
      }))

      setCommentText("")
    }
  }

  const handleShare = async (short: Short) => {
    const link = `${window.location.origin}?short=${short.id}`
    setShareLink(link)
    setShowSharePopup(true)
    setLinkCopied(false)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Flixory Shorts",
          text: "Check out this short on Flixory!",
          url: shareLink,
        })
      } catch (err) {
        console.log("Share cancelled")
      }
    }
  }

  const handleVideoClick = () => {
    const currentShort = shorts[currentIndex]
    const player = players[currentShort.id]

    if (player) {
      if (isPlaying) {
        player.pauseVideo()
        setIsPlaying(false)
      } else {
        player.playVideo()
        setIsPlaying(true)
      }
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

  const currentShort = shorts[currentIndex]

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 z-40 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/60 transition-colors text-white"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 right-4 z-40 text-white/80 text-sm font-medium bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
        {currentIndex + 1} / {shorts.length}
      </div>

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {shorts.map((short, index) => (
          <div
            key={short.id}
            className="relative w-full h-full snap-start snap-always flex items-center justify-center bg-black"
          >
            <div className="relative w-full h-full" onClick={handleVideoClick}>
              <div
                id={`player-${short.id}`}
                className="w-full h-full"
                style={{
                  pointerEvents: "none",
                }}
              />

              {index === currentIndex && !isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Play className="w-10 h-10 text-white fill-white ml-1" />
                  </div>
                </div>
              )}

              {index === currentIndex && (
                <>
                  {/* Right Side Actions */}
                  <div className="absolute right-3 bottom-32 z-20 flex flex-col space-y-5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLike(short.id)
                      }}
                      className="flex flex-col items-center space-y-1 text-white"
                    >
                      <div
                        className={`w-14 h-14 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                          likedShorts.has(short.id)
                            ? "bg-red-500/90 scale-110 shadow-lg shadow-red-500/50"
                            : "bg-black/40 hover:bg-black/60 border border-white/20"
                        }`}
                      >
                        <Heart className={`w-7 h-7 ${likedShorts.has(short.id) ? "fill-white" : ""}`} />
                      </div>
                      <span className="text-sm font-bold drop-shadow-lg">{shortLikes[short.id]}</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleComment()
                      }}
                      className="flex flex-col items-center space-y-1 text-white"
                    >
                      <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/60 transition-colors">
                        <MessageCircle className="w-7 h-7" />
                      </div>
                      <span className="text-sm font-bold drop-shadow-lg">
                        {comments[short.id]?.length || short.comments}
                      </span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleShare(short)
                      }}
                      className="flex flex-col items-center space-y-1 text-white"
                    >
                      <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/60 transition-colors">
                        <Share2 className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-bold drop-shadow-lg">Share</span>
                    </button>

                    <button
                      className="flex flex-col items-center space-y-1 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsMuted(!isMuted)
                      }}
                    >
                      <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/60 transition-colors">
                        {isMuted ? <VolumeX className="w-7 h-7" /> : <Volume2 className="w-7 h-7" />}
                      </div>
                    </button>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-4 left-4 right-20 z-20 space-y-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleWatchMovie()
                      }}
                      className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-full font-bold transition-all shadow-lg hover:shadow-xl"
                    >
                      <Play className="w-5 h-5" />
                      <span>Watch Full Movie</span>
                    </button>

                    <h3 className="text-white font-bold text-xl drop-shadow-lg text-balance leading-tight">
                      {short.title}
                    </h3>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrevShort}
          className="absolute top-1/3 left-4 z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/60 transition-colors text-white"
          aria-label="Previous short"
        >
          <ChevronUp className="w-8 h-8" />
        </button>
      )}

      {currentIndex < shorts.length - 1 && (
        <button
          onClick={handleNextShort}
          className="absolute bottom-36 left-4 z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/60 transition-colors text-white"
          aria-label="Next short"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      )}

      {/* Progress Indicators */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30 flex space-x-1.5">
        {shorts.slice(Math.max(0, currentIndex - 2), Math.min(shorts.length, currentIndex + 3)).map((_, idx) => {
          const actualIndex = Math.max(0, currentIndex - 2) + idx
          return (
            <div
              key={actualIndex}
              className={`h-1 rounded-full transition-all ${
                actualIndex === currentIndex ? "w-8 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          )
        })}
      </div>

      {/* Popups */}
      {showPopup && (
        <ShortsPopup
          telegramLink={currentShort.telegramLink}
          movieTitle={currentShort.title}
          onClose={() => setShowPopup(false)}
        />
      )}

      {showComments && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-gradient-to-b from-gray-900 to-black rounded-t-3xl shadow-2xl max-h-[75vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <h3 className="text-white font-bold text-xl">Comments ({comments[currentShort.id]?.length || 0})</h3>
              <button
                onClick={() => setShowComments(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {comments[currentShort.id]?.length > 0 ? (
                comments[currentShort.id].map((comment) => (
                  <div key={comment.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-semibold text-sm">{comment.user}</span>
                      <span className="text-white/40 text-xs">
                        {comment.timestamp.toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">{comment.text}</p>
                  </div>
                ))
              ) : (
                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <MessageCircle className="w-12 h-12 text-white/40 mx-auto mb-3" />
                  <p className="text-white/60 text-sm">এখনো কোনো কমেন্ট নেই। প্রথম কমেন্ট করুন! 💬</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-black/50">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handlePostComment(currentShort.id)
                    }
                  }}
                  placeholder="একটি কমেন্ট লিখুন..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                />
                <button
                  onClick={() => handlePostComment(currentShort.id)}
                  disabled={!commentText.trim()}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:opacity-50 flex items-center justify-center text-white transition-all shadow-lg"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSharePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
            <button
              onClick={() => setShowSharePopup(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
              <div className="text-6xl mb-3">🔗</div>
              <h2 className="text-2xl font-bold text-white">শেয়ার করুন</h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-white/60 text-xs mb-2">লিংক</p>
                <p className="text-white text-sm break-all font-mono">{shareLink}</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg"
                >
                  {linkCopied ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>কপি হয়েছে!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>লিংক কপি করুন</span>
                    </>
                  )}
                </button>

                {navigator.share && (
                  <button
                    onClick={handleNativeShare}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>অন্যত্র শেয়ার করুন</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
