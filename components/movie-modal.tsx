"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import type { MovieModalProps } from "@/types/movie-modal"
import YouTubeStylePlayer from "@/components/youtube-style-player"
import { Send, Play, Download, Trailer } from "@/components/icons"

export function MovieModal({ movie, onClose, onOpenTelegram, onPlayTrailer }: MovieModalProps) {
  const [showDrivePlayer, setShowDrivePlayer] = useState(false)
  const [showYouTubePlayer, setShowYouTubePlayer] = useState(false)
  const [playerVideoUrl, setPlayerVideoUrl] = useState("")
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false)

  const handleWatchOnTelegram = () => {
    onOpenTelegram(movie.googleDrivePlayUrl)
    onClose()
  }

  const handleOnlinePlay = () => {
    if (movie.googleDrivePlayUrl) {
      setPlayerVideoUrl(movie.googleDrivePlayUrl)
      setIsPlayingTrailer(false)
      setShowYouTubePlayer(true)
      onClose()
    }
  }

  const handleWatchTrailer = () => {
    const videoUrl = convertYouTubeLink(movie.trailerLink)
    setPlayerVideoUrl(videoUrl)
    setIsPlayingTrailer(true)
    setShowYouTubePlayer(true)
    onClose()
  }

  const handleDirectDownload = () => {
    window.open(movie.googleDriveDownloadUrl, "_blank")
    onClose()
  }

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  if (showYouTubePlayer) {
    return (
      <YouTubeStylePlayer
        videoUrl={playerVideoUrl}
        title={movie.title}
        description={movie.description}
        genre={movie.genre}
        allMovies={[]} // Will be passed from parent
        currentMovie={movie}
        onClose={() => {
          setShowYouTubePlayer(false)
          setPlayerVideoUrl("")
        }}
        onMovieSelect={(selectedMovie) => {
          // Handle movie selection from related movies
          console.log("[v0] Selected related movie:", selectedMovie)
        }}
        isTrailer={isPlayingTrailer}
      />
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-2 md:p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6">
          <div className="space-y-3">
            <Button
              className="bg-blue-500 hover:bg-blue-600 w-full text-sm md:text-base"
              onClick={handleWatchOnTelegram}
            >
              <Send className="w-4 md:w-5 h-4 md:h-5 mr-2" />
              Watch on Telegram
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {movie.googleDrivePlayUrl && (
                <Button className="bg-green-600 hover:bg-green-700 text-sm md:text-base" onClick={handleOnlinePlay}>
                  <Play className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                  Online Play
                </Button>
              )}

              {movie.googleDriveDownloadUrl && (
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-sm md:text-base"
                  onClick={handleDirectDownload}
                >
                  <Download className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                  Direct Download
                </Button>
              )}
            </div>

            <Button
              variant="outline"
              className="w-full bg-transparent text-sm md:text-base"
              onClick={handleWatchTrailer}
            >
              <Trailer className="w-4 md:w-5 h-4 md:h-5 mr-2" />
              Watch Trailer
            </Button>
          </div>
        </div>
      </div>
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
