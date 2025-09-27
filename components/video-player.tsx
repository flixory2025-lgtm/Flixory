"use client"

import { useState, useRef, useEffect } from "react"
import { X, Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface VideoPlayerProps {
  videoUrl: string
  onClose: () => void
}

export function VideoPlayer({ videoUrl, onClose }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState([100])
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [streamUrl, setStreamUrl] = useState<string | null>(null)
  const [useTelegramEmbed, setUseTelegramEmbed] = useState(false)

  useEffect(() => {
    const processVideoUrl = async () => {
      console.log("[v0] Processing video URL:", videoUrl)

      if (videoUrl.includes("t.me/")) {
        console.log("[v0] Detected Telegram URL, attempting to process")

        try {
          const response = await fetch(`/api/stream?url=${encodeURIComponent(videoUrl)}`)
          const data = await response.json()

          console.log("[v0] Stream API response:", data)

          if (data.success && data.embedUrl) {
            console.log("[v0] Using Telegram embed approach")
            setUseTelegramEmbed(true)
            setStreamUrl(data.embedUrl)
            setIsLoading(false)
          } else {
            console.log("[v0] Falling back to direct URL")
            setStreamUrl(videoUrl)
            setUseTelegramEmbed(false)
          }
        } catch (error) {
          console.error("[v0] Error processing Telegram URL:", error)
          setStreamUrl(videoUrl)
          setUseTelegramEmbed(false)
        }
      } else {
        console.log("[v0] Using direct video URL")
        setStreamUrl(videoUrl)
        setUseTelegramEmbed(false)
      }
    }

    processVideoUrl()
  }, [videoUrl])

  useEffect(() => {
    const video = videoRef.current
    if (!video || useTelegramEmbed) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)
    const handleLoadStart = () => {
      console.log("[v0] Video loading started")
      setIsLoading(true)
      setHasError(false)
    }
    const handleCanPlay = () => {
      console.log("[v0] Video can play")
      setIsLoading(false)
    }
    const handleError = (e: Event) => {
      console.log("[v0] Video error:", e)
      setHasError(true)
      setIsLoading(false)
    }

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)
    video.addEventListener("loadstart", handleLoadStart)
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("error", handleError)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateDuration)
      video.removeEventListener("loadstart", handleLoadStart)
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("error", handleError)
    }
  }, [useTelegramEmbed])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          onClose()
          break
        case " ":
          event.preventDefault()
          togglePlay()
          break
        case "ArrowLeft":
          event.preventDefault()
          if (videoRef.current) videoRef.current.currentTime -= 10
          break
        case "ArrowRight":
          event.preventDefault()
          if (videoRef.current) videoRef.current.currentTime += 10
          break
        case "ArrowUp":
          event.preventDefault()
          setVolume((prev) => [Math.min(100, prev[0] + 10)])
          break
        case "ArrowDown":
          event.preventDefault()
          setVolume((prev) => [Math.max(0, prev[0] - 10)])
          break
      }
    }

    const handlePopState = () => {
      onClose()
    }

    window.history.pushState({ modal: "video" }, "", window.location.href)

    document.addEventListener("keydown", handleKeyDown)
    window.addEventListener("popstate", handlePopState)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [onClose])

  const togglePlay = () => {
    if (useTelegramEmbed) {
      // For Telegram embeds, we can't control playback directly
      return
    }

    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = value[0]
    video.volume = newVolume / 100
    setVolume(value)
    setIsMuted(newVolume === 0)
  }

  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      video.requestFullscreen()
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div
        className="relative w-full h-full"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {useTelegramEmbed && streamUrl ? (
          <iframe
            ref={iframeRef}
            src={streamUrl}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; encrypted-media"
            onLoad={() => {
              console.log("[v0] Telegram embed loaded")
              setIsLoading(false)
            }}
            onError={() => {
              console.log("[v0] Telegram embed error")
              setHasError(true)
              setIsLoading(false)
            }}
          />
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            src={streamUrl || undefined}
            onClick={togglePlay}
            crossOrigin="anonymous"
            preload="metadata"
          />
        )}

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading video...</p>
            </div>
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-white text-center max-w-md">
              <p className="text-xl mb-4">Video could not be loaded</p>
              <p className="text-sm text-gray-300 mb-4">Please check your internet connection and try again.</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Retry
              </Button>
            </div>
          </div>
        )}

        {showControls && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60">
            <div className="absolute top-4 left-4 right-4 flex justify-between">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 md:hidden" onClick={onClose}>
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onClose}>
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Show simplified controls for Telegram embeds */}
            {!useTelegramEmbed && (
              <>
                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-16 h-16 text-white hover:bg-white/20 rounded-full"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                  </Button>
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <Slider
                      value={[currentTime]}
                      max={duration}
                      step={1}
                      onValueChange={handleSeek}
                      className="w-full"
                    />
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={togglePlay}>
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                        onClick={() => {
                          const video = videoRef.current
                          if (video) video.currentTime -= 10
                        }}
                      >
                        <SkipBack className="w-5 h-5" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                        onClick={() => {
                          const video = videoRef.current
                          if (video) video.currentTime += 10
                        }}
                      >
                        <SkipForward className="w-5 h-5" />
                      </Button>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/20"
                          onClick={toggleMute}
                        >
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </Button>
                        <div className="w-20">
                          <Slider value={volume} max={100} step={1} onValueChange={handleVolumeChange} />
                        </div>
                      </div>

                      <span className="text-white text-sm">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={toggleFullscreen}
                    >
                      <Maximize className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
