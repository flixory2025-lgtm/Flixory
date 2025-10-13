"use client"
import { useState, useRef, useEffect } from "react"
import {
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
  ChevronUp,
  ChevronDown,
  Play,
  X,
  Send,
  Copy,
  Check,
  RefreshCw,
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
  {
    id: "21",
    title: "the guardians",
    youtubeId: "xye4cNRfKh0",
    likes: 1200,
    comments: 45,
    telegramLink: "https://t.me/flixoryproxy/344",
  },
  {
    id: "22",
    title: "bengal tiger",
    youtubeId: "Pxc1uhffX_c",
    likes: 890,
    comments: 32,
    telegramLink: "https://t.me/flixoryproxy/344",
  },
  {
    id: "23",
    title: "my name",
    youtubeId: "nSa5VggXFTE",
    likes: 1500,
    comments: 67,
    telegramLink: "https://t.me/flixoryproxy/363",
  },
  {
    id: "24",
    title: "jenie make a wish",
    youtubeId: "s-nIQWGkh10",
    likes: 2100,
    comments: 89,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "25",
    title: "weak hero season 2",
    youtubeId: "IpOJACj-K6Q",
    likes: 950,
    comments: 41,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "26",
    title: "ধ্রুবতারা",
    youtubeId: "n4TtXgfqk8c",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "27",
    title: "chitti",
    youtubeId: "Q5S9QDWLb9o",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "28",
    title: "weak hero",
    youtubeId: "kG4bEbzS8jo",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "29",
    title: "my name",
    youtubeId: "MRzSeLeYojE",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "30",
    title: "alice in boarderland",
    youtubeId: "LIYrZQCpSno",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "31",
    title: "jenie make a wish",
    youtubeId: "0pNhLrj57Ew",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "32",
    title: "chitti",
    youtubeId: "qShPLjlWbd4",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "33",
    title: "avanger",
    youtubeId: "BaQSjZfLwC4",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/385",
  },
  {
    id: "34",
    title: "alice in boarderland",
    youtubeId: "KZfk6Xpi7WA",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/385",
  },
  {
    id: "35",
    title: "bloodhounds",
    youtubeId: "Vkl5U6myFuc",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/385",
  },
  {
    id: "36",
    title: "premalu",
    youtubeId: "CCnL-V7JLf8",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1525",
  },
  {
    id: "37",
    title: "genie make a wish",
    youtubeId: "gSdsflCHFHw",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1525",
  },
  {
    id: "38",
    title: "sonic 1",
    youtubeId: "bKepLS96j_g",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1291",
  },
  {
    id: "39",
    title: "study group",
    youtubeId: "9h9KvS4QRNM",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1291",
  },
  {
    id: "40",
    title: "jenie make a wish",
    youtubeId: "uOWZT07ylV0",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1291",
  },
  {
    id: "41",
    title: "weak hero class 1",
    youtubeId: "pHcOrZeAmUk",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "42",
    title: "sonic 1",
    youtubeId: "iS_RIOylEcI",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "43",
    title: "backbancher",
    youtubeId: "iYDAWtb8aA",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "44",
    title: "shark the strom",
    youtubeId: "YPoW_yiruv4",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/385",
  },
  {
    id: "45",
    title: "alice in boarderland",
    youtubeId: "51QBGINHliw",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/385",
  },
  {
    id: "46",
    title: "weak hero",
    youtubeId: "U-_M7ccaYjE",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/385",
  },
  {
    id: "47",
    title: "weak hero class 2",
    youtubeId: "JhxYjaLdoZU",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1525",
  },
  {
    id: "48",
    title: "headquarter",
    youtubeId: "eytbyW6ndNA",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1525",
  },
  {
    id: "49",
    title: "weak hero class 1",
    youtubeId: "PgJH3PKFQ4Y",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1291",
  },
  {
    id: "50",
    title: "alice in boarderland",
    youtubeId: "qY2XYCnPC7Y",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1291",
  },
  {
    id: "51",
    title: "chitti",
    youtubeId: "KeyOKSbFIFQ",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1291",
  },
  {
    id: "52",
    title: "the legend tony jee",
    youtubeId: "aDAq_xbqYuI",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1291",
  },
]

export function ShortsSection() {
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * shortsData.length))
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
  const [showSharePopup, setShowSharePopup] = useState(false)
  const [shareLink, setShareLink] = useState("")
  const [linkCopied, setLinkCopied] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState<
    Record<string, Array<{ id: string; text: string; user: string; timestamp: Date }>>
  >({})
  const [isPlaying, setIsPlaying] = useState(true)
  const [players, setPlayers] = useState<Record<string, any>>({})

  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRefs = useRef<Record<string, HTMLIFrameElement | null>>({})

  useEffect(() => {
    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName("script")[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    // @ts-ignore
    window.onYouTubeIframeAPIReady = () => {
      console.log("[v0] YouTube IFrame API ready")
    }
  }, [])

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop
      const itemHeight = containerRef.current.clientHeight
      const newIndex = Math.round(scrollTop / itemHeight)
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < shortsData.length) {
        setCurrentIndex(newIndex)
        setIsPlaying(true)
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

  const handlePostComment = (shortId: string) => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now().toString(),
        text: commentText,
        user: "আপনি", // "You" in Bengali
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
    setIsPlaying(!isPlaying)
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

  const currentShort = shortsData[currentIndex]

  const handleRefresh = () => {
    const randomIndex = Math.floor(Math.random() * shortsData.length)
    setCurrentIndex(randomIndex)
    scrollToIndex(randomIndex)
    setIsPlaying(true)
  }

  return (
    <div className="fixed inset-0 bg-black">
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-4 pb-20">
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-bold text-white">Shorts</h1>
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-1.5 text-white/70 hover:text-white transition-colors group"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-xs font-medium">Refresh</span>
            </button>
          </div>
          <span className="text-white/80 text-sm font-medium bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
            {currentIndex + 1} / {shortsData.length}
          </span>
        </div>
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
            className="relative w-full h-full snap-start snap-always flex items-center justify-center bg-black"
          >
            <div className="relative w-full h-full">
              <iframe
                key={`${short.id}-${index === currentIndex}`}
                ref={(el) => {
                  iframeRefs.current[short.id] = el
                }}
                src={`https://www.youtube.com/embed/${short.youtubeId}?autoplay=${index === currentIndex && isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${short.youtubeId}&modestbranding=1&rel=0&fs=0&playsinline=1&disablekb=1&iv_load_policy=3&cc_load_policy=0&showinfo=0&enablejsapi=1`}
                className="w-full h-full object-cover"
                frameBorder="0"
                allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  border: "none",
                  outline: "none",
                }}
              />

              {index === currentIndex && (
                <>
                  <div className="absolute right-3 bottom-20 z-20 flex flex-col space-y-5">
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

                  <div className="absolute bottom-4 left-4 z-20 space-y-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleWatchMovie(short.telegramLink, short.title)
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

      {currentIndex > 0 && (
        <button
          onClick={handlePrevShort}
          className="absolute top-1/3 left-4 z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/60 transition-colors text-white"
          aria-label="Previous short"
        >
          <ChevronUp className="w-8 h-8" />
        </button>
      )}

      {currentIndex < shortsData.length - 1 && (
        <button
          onClick={handleNextShort}
          className="absolute bottom-36 left-4 z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/60 transition-colors text-white"
          aria-label="Next short"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      )}

      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30 flex space-x-1.5">
        {shortsData
          .slice(Math.max(0, currentIndex - 2), Math.min(shortsData.length, currentIndex + 3))
          .map((_, idx) => {
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

      {showPopup && (
        <ShortsPopup
          telegramLink={selectedTelegramLink}
          movieTitle={selectedMovieTitle}
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

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
                <p className="text-blue-300 text-xs text-center">💡 সবার কমেন্ট দেখতে ডাটাবেস ইন্টিগ্রেশন প্রয়োজন</p>
              </div>
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
