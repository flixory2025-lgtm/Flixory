"use client"

import { useState, useRef, useEffect } from "react"
import {
  X,
  ArrowLeft,
  Maximize,
  Minimize,
  Lock,
  Unlock,
  PictureInPicture2,
  Settings,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Subtitles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface VideoPlayerProps {
  videoUrl: string
  onClose: () => void
}

export function VideoPlayer({ videoUrl, onClose }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [embedUrl, setEmbedUrl] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isYouTube, setIsYouTube] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState([100])
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState([0])
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null)
  const [showSubtitles, setShowSubtitles] = useState(false)

  useEffect(() => {
    const processVideoUrl = async () => {
      if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
        setIsYouTube(true)
        const youtubeUrl = convertYouTubeLink(videoUrl)
        setEmbedUrl(youtubeUrl)
        setIsLoading(false)
      } else if (videoUrl.includes("drive.google.com")) {
        try {
          const response = await fetch(`/api/stream?url=${encodeURIComponent(videoUrl)}`)
          const data = await response.json()

          if (data.success && data.embedUrl) {
            setEmbedUrl(data.embedUrl)
            setIsLoading(false)
          } else {
            setHasError(true)
            setIsLoading(false)
          }
        } catch (error) {
          console.error("Error processing Google Drive URL:", error)
          setHasError(true)
          setIsLoading(false)
        }
      } else {
        setEmbedUrl(videoUrl)
        setIsLoading(false)
      }
    }

    processVideoUrl()
  }, [videoUrl])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isLocked) return

      if (event.key === "Escape") {
        if (isFullscreen) {
          exitFullscreen()
        } else {
          onClose()
        }
      }
      if (event.key === "f" || event.key === "F") {
        toggleFullscreen()
      }
      if (event.key === " ") {
        event.preventDefault()
        togglePlayPause()
      }
      if (event.key === "m" || event.key === "M") {
        toggleMute()
      }
      if (event.key === "l" || event.key === "L") {
        toggleLock()
      }
    }

    const handleMouseMove = () => {
      if (!isLocked) {
        setShowControls(true)
        if (controlsTimeout) {
          clearTimeout(controlsTimeout)
        }
        const timeout = setTimeout(() => {
          setShowControls(false)
        }, 3000)
        setControlsTimeout(timeout)
      }
    }

    const handlePopState = () => {
      onClose()
    }

    window.history.pushState({ modal: "video" }, "", window.location.href)

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("popstate", handlePopState)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("popstate", handlePopState)
      if (controlsTimeout) {
        clearTimeout(controlsTimeout)
      }
    }
  }, [onClose, isFullscreen, isLocked, controlsTimeout])

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current

      const updateTime = () => {
        setCurrentTime(video.currentTime)
        setProgress([video.currentTime])
      }

      const updateDuration = () => {
        setDuration(video.duration)
      }

      const handlePlay = () => setIsPlaying(true)
      const handlePause = () => setIsPlaying(false)

      video.addEventListener("timeupdate", updateTime)
      video.addEventListener("loadedmetadata", updateDuration)
      video.addEventListener("play", handlePlay)
      video.addEventListener("pause", handlePause)

      return () => {
        video.removeEventListener("timeupdate", updateTime)
        video.removeEventListener("loadedmetadata", updateDuration)
        video.removeEventListener("play", handlePlay)
        video.removeEventListener("pause", handlePause)
      }
    }
  }, [embedUrl])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const toggleLock = () => {
    setIsLocked(!isLocked)
    if (!isLocked) {
      setShowControls(false)
    } else {
      setShowControls(true)
    }
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value)
    if (videoRef.current) {
      videoRef.current.volume = value[0] / 100
    }
  }

  const handleProgressChange = (value: number[]) => {
    setProgress(value)
    if (videoRef.current) {
      videoRef.current.currentTime = value[0]
    }
  }

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleRetry = () => {
    setIsLoading(true)
    setHasError(false)
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src
    }
  }

  const enterPictureInPicture = async () => {
    if (videoRef.current && "requestPictureInPicture" in videoRef.current) {
      try {
        await videoRef.current.requestPictureInPicture()
      } catch (error) {
        console.error("Picture-in-Picture failed:", error)
      }
    }
  }

  const toggleSubtitles = () => {
    setShowSubtitles(!showSubtitles)
  }

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center ${isFullscreen ? "fullscreen-video" : ""}`}
      onClick={() => !isLocked && setShowControls(!showControls)}
    >
      <div className="relative w-full h-full">
        {embedUrl && !hasError ? (
          <>
            {isYouTube || videoUrl.includes("drive.google.com") ? (
              <iframe
                ref={iframeRef}
                src={embedUrl}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; encrypted-media; fullscreen; accelerometer; gyroscope; picture-in-picture; web-share"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setHasError(true)
                  setIsLoading(false)
                }}
              />
            ) : (
              <video
                ref={videoRef}
                src={embedUrl}
                className="w-full h-full"
                controls={false}
                autoPlay
                onLoadedData={() => setIsLoading(false)}
                onError={() => {
                  setHasError(true)
                  setIsLoading(false)
                }}
              />
            )}
          </>
        ) : null}

        {showSubtitles && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-black/80 text-white px-4 py-2 rounded text-center max-w-md">
              <p className="text-sm md:text-base">Subtitles will appear here when available</p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-8 md:h-12 w-8 md:w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-sm md:text-base">{isYouTube ? "Loading trailer..." : "Loading video..."}</p>
            </div>
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-white text-center max-w-md px-4">
              <p className="text-lg md:text-xl mb-4">Video could not be loaded</p>
              <p className="text-sm text-gray-300 mb-4">Please check your internet connection and try again.</p>
              <Button onClick={handleRetry} variant="outline" className="mr-2 bg-transparent">
                Retry
              </Button>
              <Button onClick={onClose} variant="ghost">
                Close
              </Button>
            </div>
          </div>
        )}

        {showControls && !isLocked && (
          <>
            <div className="absolute top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 flex justify-between z-10">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 md:hidden bg-black/50"
                onClick={onClose}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>

              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 bg-black/50"
                  onClick={enterPictureInPicture}
                >
                  <PictureInPicture2 className="w-5 md:w-6 h-5 md:h-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 bg-black/50 hidden md:flex"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? (
                    <Minimize className="w-5 md:w-6 h-5 md:h-6" />
                  ) : (
                    <Maximize className="w-5 md:w-6 h-5 md:h-6" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 bg-black/50"
                  onClick={onClose}
                >
                  <X className="w-5 md:w-6 h-5 md:h-6" />
                </Button>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-10">
              <div className="mb-4">
                <Slider
                  value={progress}
                  onValueChange={handleProgressChange}
                  max={duration}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </Button>

                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleMute}>
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </Button>
                    <div className="w-20 hidden md:block">
                      <Slider value={volume} onValueChange={handleVolumeChange} max={100} step={1} />
                    </div>
                  </div>

                  <div className="text-white text-sm font-mono">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`text-white hover:bg-white/20 ${showSubtitles ? "bg-white/20" : ""}`}
                    onClick={toggleSubtitles}
                  >
                    <Subtitles className="w-5 h-5" />
                  </Button>

                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleLock}>
                    <Lock className="w-5 h-5" />
                  </Button>

                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Settings className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        {isLocked && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 bg-black/50"
              onClick={toggleLock}
            >
              <Unlock className="w-8 h-8" />
            </Button>
          </div>
        )}

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center md:hidden">
          <p className="text-xs bg-black/50 px-3 py-1 rounded">Rotate your device for better viewing experience</p>
        </div>
      </div>
    </div>
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
