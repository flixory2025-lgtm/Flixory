"use client"

import { useState, useEffect } from "react"
import { X, ArrowLeft, ThumbsUp, MessageCircle, Download, Share2, Play, Star, Clock, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { VideoPlayer } from "./video-player"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

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

interface EnhancedVideoPlayerProps {
  videoUrl: string
  movie: Movie
  allMovies: Movie[]
  onClose: () => void
  onMovieSelect: (movie: Movie) => void
  isTrailer?: boolean
}

export function EnhancedVideoPlayer({
  videoUrl,
  movie,
  allMovies,
  onClose,
  onMovieSelect,
  isTrailer = false,
}: EnhancedVideoPlayerProps) {
  const [showFullscreenPlayer, setShowFullscreenPlayer] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [showComments, setShowComments] = useState(false)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<Array<{ user: string; text: string; time: string; timestamp: number }>>([])
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const movieKey = `movie_${movie.id}`

    const savedLikes = localStorage.getItem(`${movieKey}_likes`)
    if (savedLikes) {
      const likesData = JSON.parse(savedLikes)
      setLikeCount(likesData.count || 0)
    } else {
      const initialLikes = Math.floor(Math.random() * 1000) + 100
      setLikeCount(initialLikes)
      localStorage.setItem(`${movieKey}_likes`, JSON.stringify({ count: initialLikes }))
    }

    const userLiked = localStorage.getItem(`${movieKey}_user_liked`)
    if (userLiked === "true") {
      setIsLiked(true)
    }

    const savedComments = localStorage.getItem(`${movieKey}_comments`)
    if (savedComments) {
      const commentsData = JSON.parse(savedComments)
      setComments(commentsData.sort((a: any, b: any) => b.timestamp - a.timestamp))
    } else {
      const initialComments = [
        { user: "রহিম", text: "দারুণ মুভি! অসাধারণ ছিল।", time: "২ ঘন্টা আগে", timestamp: Date.now() - 7200000 },
        { user: "করিম", text: "অনেক ভালো লাগলো দেখে।", time: "৫ ঘন্টা আগে", timestamp: Date.now() - 18000000 },
      ]
      setComments(initialComments)
      localStorage.setItem(`${movieKey}_comments`, JSON.stringify(initialComments))
    }
  }, [movie.id])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    const handlePopState = () => {
      onClose()
    }

    window.history.pushState({ modal: "enhanced-video" }, "", window.location.href)
    document.addEventListener("keydown", handleKeyDown)
    window.addEventListener("popstate", handlePopState)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [onClose])

  const handleLike = () => {
    const movieKey = `movie_${movie.id}`
    const newLiked = !isLiked
    const newCount = newLiked ? likeCount + 1 : likeCount - 1

    setIsLiked(newLiked)
    setLikeCount(newCount)

    localStorage.setItem(`${movieKey}_likes`, JSON.stringify({ count: newCount }))
    localStorage.setItem(`${movieKey}_user_liked`, newLiked.toString())
  }

  const handleComment = () => {
    if (comment.trim()) {
      const movieKey = `movie_${movie.id}`
      const newComment = {
        user: "আপনি",
        text: comment,
        time: "এখনই",
        timestamp: Date.now(),
      }
      const updatedComments = [newComment, ...comments]
      setComments(updatedComments)
      setComment("")

      localStorage.setItem(`${movieKey}_comments`, JSON.stringify(updatedComments))
    }
  }

  const handleDownload = () => {
    if (movie.googleDriveDownloadUrl) {
      window.open(movie.googleDriveDownloadUrl, "_blank")
    }
  }

  const handleShare = () => {
    setShowShareDialog(true)
  }

  const handleCopyLink = () => {
    const inviteLink = `${window.location.origin}?movie=${movie.id}&ref=invite`
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const embedUrl =
    videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")
      ? convertYouTubeLink(videoUrl)
      : videoUrl.includes("drive.google.com")
        ? `${videoUrl.replace("/preview", "/preview")}${videoUrl.includes("?") ? "&" : "?"}autoplay=1`
        : videoUrl

  console.log("[v0] Processing universal video URL:", embedUrl)

  const handleFullscreenPlayer = () => {
    setShowFullscreenPlayer(true)
  }

  const handleCloseFullscreenPlayer = () => {
    setShowFullscreenPlayer(false)
  }

  const relatedMovies = allMovies
    .filter((m) => {
      if (m.id === movie.id) return false
      return m.genre.some((g) => movie.genre.includes(g))
    })
    .slice(0, 10)

  return (
    <>
      {showFullscreenPlayer && <VideoPlayer videoUrl={videoUrl} onClose={handleCloseFullscreenPlayer} />}

      <div className="fixed inset-0 z-50 bg-black overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-gray-800">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onClose}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h2 className="text-lg font-semibold text-white truncate flex-1 mx-4">{movie.title}</h2>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onClose}>
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 max-w-6xl">
          {/* Video Player - Half Screen */}
          <div
            className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-6 cursor-pointer group"
            onClick={handleFullscreenPlayer}
          >
            <iframe
              src={embedUrl}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; encrypted-media; fullscreen; accelerometer; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => console.log("[v0] Iframe loaded successfully")}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
              <div className="bg-black/60 rounded-full p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Movie Info */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">{movie.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className="bg-primary/90 text-primary-foreground">
                <Star className="w-3 h-3 mr-1 fill-current" />
                {movie.rating}
              </Badge>
              <Badge variant="secondary">{movie.year}</Badge>
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{movie.duration}</span>
              </Badge>
              {movie.genre.map((genre) => (
                <Badge key={genre} variant="outline">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">বিবরণ</h3>
            <p className="text-gray-300 leading-relaxed">{movie.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Button
              variant={isLiked ? "default" : "outline"}
              className={`flex items-center space-x-2 ${isLiked ? "bg-primary" : "bg-transparent"}`}
              onClick={handleLike}
            >
              <ThumbsUp className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              <span>লাইক ({likeCount})</span>
            </Button>

            <Button
              variant="outline"
              className="flex items-center space-x-2 bg-transparent"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="w-5 h-5" />
              <span>মন্তব্য ({comments.length})</span>
            </Button>

            {movie.googleDriveDownloadUrl && (
              <Button variant="outline" className="flex items-center space-x-2 bg-transparent" onClick={handleDownload}>
                <Download className="w-5 h-5" />
                <span>ডাউনলোড</span>
              </Button>
            )}

            <Button variant="outline" className="flex items-center space-x-2 bg-transparent" onClick={handleShare}>
              <Share2 className="w-5 h-5" />
              <span>শেয়ার</span>
            </Button>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="mb-8 bg-gray-900 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">মন্তব্য</h3>

              {/* Add Comment */}
              <div className="mb-4">
                <Textarea
                  placeholder="আপনার মন্তব্য লিখুন..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white mb-2"
                  rows={3}
                />
                <Button onClick={handleComment} size="sm" disabled={!comment.trim()}>
                  মন্তব্য করুন
                </Button>
              </div>

              {/* Comments List */}
              <div className="space-y-3">
                {comments.map((c, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">{c.user}</span>
                      <span className="text-xs text-gray-400">{c.time}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Movies */}
          {relatedMovies.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">সম্পর্কিত মুভি</h3>
              <div className="overflow-x-auto pb-4">
                <div className="flex space-x-4">
                  {relatedMovies.map((relatedMovie) => (
                    <div
                      key={relatedMovie.id}
                      className="flex-shrink-0 w-40 cursor-pointer group"
                      onClick={() => onMovieSelect(relatedMovie)}
                    >
                      <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                        <img
                          src={relatedMovie.poster || "/placeholder.svg"}
                          alt={relatedMovie.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                          <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-primary/90 text-primary-foreground text-xs">
                            <Star className="w-2 h-2 mr-1 fill-current" />
                            {relatedMovie.rating}
                          </Badge>
                        </div>
                      </div>
                      <h4 className="font-semibold text-sm text-white line-clamp-2 mb-1">{relatedMovie.title}</h4>
                      <p className="text-xs text-gray-400">{relatedMovie.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>বন্ধুদের সাথে শেয়ার করুন</DialogTitle>
            <DialogDescription>এই লিংক কপি করে আপনার বন্ধুদের পাঠান এবং তাদের FLIXORY তে আমন্ত্রণ জানান!</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                readOnly
                value={`${typeof window !== "undefined" ? window.location.origin : ""}/?movie=${movie.id}&ref=invite`}
                className="bg-gray-800 text-white"
              />
            </div>
            <Button type="button" size="sm" className="px-3" onClick={handleCopyLink}>
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  <span className="sr-only">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  <span className="sr-only">Copy</span>
                </>
              )}
              {copied ? "কপি হয়েছে!" : "কপি করুন"}
            </Button>
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            <p>আপনার বন্ধুরা এই লিংকে ক্লিক করলে সরাসরি "{movie.title}" মুভিতে চলে যাবে!</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

function convertYouTubeLink(youtubeUrl: string): string {
  let videoId = ""

  if (youtubeUrl.includes("youtube.com/watch?v=")) {
    videoId = youtubeUrl.split("v=")[1].split("&")[0]
  } else if (youtubeUrl.includes("youtu.be/")) {
    videoId = youtubeUrl.split("youtu.be/")[1].split("?")[0]
  } else if (youtubeUrl.includes("youtube.com/embed/")) {
    videoId = youtubeUrl.split("embed/")[1].split("?")[0]
  }

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
  }

  return youtubeUrl
}
