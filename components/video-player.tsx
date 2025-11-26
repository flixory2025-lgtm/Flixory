"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  X,
  Maximize,
  Minimize,
  Lock,
  Unlock,
  RotateCcw,
  WifiOff,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Maximize2,
  SkipBack,
  SkipForward,
  Subtitles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface VideoPlayerProps {
  videoUrl: string
  onClose: () => void
}

interface DoubleTapState {
  lastTapTime: number
  tapX: number
}

const DOUBLE_TAP_DELAY = 300
const SKIP_DURATION = 10

export function VideoPlayer({ videoUrl, onClose }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [embedUrl, setEmbedUrl] = useState<string | null>(null)
  const [useIframe, setUseIframe] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
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
  const [isBuffering, setIsBuffering] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"online" | "offline">("online")
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showSettings, setShowSettings] = useState(false)
  const [videoQuality] = useState("HD")

  const doubleTapStateRef = useRef<DoubleTapState>({ lastTapTime: 0, tapX: 0 })
  const [skipFeedback, setSkipFeedback] = useState<{ type: "forward" | "backward" | null; timestamp: number }>({
    type: null,
    timestamp: 0,
  })

  useEffect(() => {
    const processVideoUrl = async () => {
      setIsLoading(true)
      setHasError(false)

      if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
        const youtubeUrl = convertYouTubeLink(videoUrl)
        setEmbedUrl(youtubeUrl)
        setUseIframe(true)
        setIsLoading(false)
      } else if (videoUrl.includes("drive.google.com")) {
        const fileId = extractFileId(videoUrl)
        if (fileId) {
          setEmbedUrl(`https://drive.google.com/file/d/${fileId}/preview?usp=sharing&autoplay=1`)
          setUseIframe(true)
          setIsLoading(false)
        } else {
          setHasError(true)
          setIsLoading(false)
        }
      } else if (
        videoUrl.includes("pcloud.com") ||
        videoUrl.includes("my.pcloud.com") ||
        videoUrl.includes("u.pcloud.link")
      ) {
        const pcloudEmbedUrl = convertPCloudLink(videoUrl)
        setEmbedUrl(pcloudEmbedUrl)
        setUseIframe(true)
        setIsLoading(false)
      } else if (videoUrl.includes("dropbox.com")) {
        const dropboxEmbedUrl = convertDropboxLink(videoUrl)
        setEmbedUrl(dropboxEmbedUrl)
        setUseIframe(true)
        setIsLoading(false)
      } else if (videoUrl.includes("onedrive.live.com") || videoUrl.includes("1drv.ms")) {
        const onedriveEmbedUrl = convertOneDriveLink(videoUrl)
        setEmbedUrl(onedriveEmbedUrl)
        setUseIframe(true)
        setIsLoading(false)
      } else if (videoUrl.includes("mega.nz")) {
        const megaEmbedUrl = convertMegaLink(videoUrl)
        setEmbedUrl(megaEmbedUrl)
        setUseIframe(true)
        setIsLoading(false)
      } else {
        setEmbedUrl(videoUrl)
        setUseIframe(false)
        setIsLoading(false)
      }
    }

    processVideoUrl()
  }, [videoUrl])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isLocked) return

      switch (event.key) {
        case "Escape":
          if (isFullscreen) {
            exitFullscreen()
          } else {
            onClose()
          }
          break
        case "f":
        case "F":
          toggleFullscreen()
          break
        case " ":
          event.preventDefault()
          togglePlayPause()
          break
        case "m":
        case "M":
          toggleMute()
          break
        case "l":
        case "L":
          toggleLock()
          break
        case "ArrowLeft":
          skipBackward()
          break
        case "ArrowRight":
          skipForward()
          break
        case "ArrowUp":
          event.preventDefault()
          adjustVolume(10)
          break
        case "ArrowDown":
          event.preventDefault()
          adjustVolume(-10)
          break
        case "s":
        case "S":
          toggleSubtitles()
          break
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

    const handleOnline = () => setConnectionStatus("online")
    const handleOffline = () => setConnectionStatus("offline")

    const handlePopState = () => {
      onClose()
    }

    window.history.pushState({ modal: "video" }, "", window.location.href)

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    window.addEventListener("popstate", handlePopState)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("popstate", handlePopState)
      if (controlsTimeout) {
        clearTimeout(controlsTimeout)
      }
    }
  }, [onClose, isFullscreen, isLocked, controlsTimeout])

  useEffect(() => {
    if (videoRef.current && !useIframe) {
      const video = videoRef.current

      const updateTime = () => {
        setCurrentTime(video.currentTime)
        setProgress([video.currentTime])
      }

      const updateDuration = () => {
        setDuration(video.duration)
      }

      const handlePlay = () => {
        setIsPlaying(true)
        setIsBuffering(false)
      }

      const handlePause = () => setIsPlaying(false)
      const handleWaiting = () => setIsBuffering(true)
      const handleCanPlay = () => setIsBuffering(false)
      const handleLoadStart = () => setIsLoading(true)
      const handleLoadedData = () => setIsLoading(false)

      video.addEventListener("timeupdate", updateTime)
      video.addEventListener("loadedmetadata", updateDuration)
      video.addEventListener("play", handlePlay)
      video.addEventListener("pause", handlePause)
      video.addEventListener("waiting", handleWaiting)
      video.addEventListener("canplay", handleCanPlay)
      video.addEventListener("loadstart", handleLoadStart)
      video.addEventListener("loadeddata", handleLoadedData)

      return () => {
        video.removeEventListener("timeupdate", updateTime)
        video.removeEventListener("loadedmetadata", updateDuration)
        video.removeEventListener("play", handlePlay)
        video.removeEventListener("pause", handlePause)
        video.removeEventListener("waiting", handleWaiting)
        video.removeEventListener("canplay", handleCanPlay)
        video.removeEventListener("loadstart", handleLoadStart)
        video.removeEventListener("loadeddata", handleLoadedData)
      }
    }
  }, [embedUrl, useIframe])

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLocked) return

    const now = Date.now()
    const containerRect = containerRef.current?.getBoundingClientRect()

    if (!containerRect) {
      setShowControls(!showControls)
      return
    }

    const clickX = e.clientX - containerRect.left
    const isRightSide = clickX > containerRect.width / 2

    // Check if it's a double-tap within the threshold
    if (now - doubleTapStateRef.current.lastTapTime < DOUBLE_TAP_DELAY) {
      e.preventDefault()

      if (isRightSide) {
        skipForward()
        setSkipFeedback({ type: "forward", timestamp: now })
      } else {
        skipBackward()
        setSkipFeedback({ type: "backward", timestamp: now })
      }

      doubleTapStateRef.current = { lastTapTime: 0, tapX: 0 }
    } else {
      doubleTapStateRef.current = { lastTapTime: now, tapX: clickX }
      setShowControls(!showControls)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const elementToFullscreen =
        useIframe && iframeRef.current
          ? iframeRef.current
          : !useIframe && videoRef.current
            ? videoRef.current
            : containerRef.current

      if (elementToFullscreen) {
        elementToFullscreen
          .requestFullscreen()
          .then(() => {
            setIsFullscreen(true)
          })
          .catch(() => {
            containerRef.current?.requestFullscreen().then(() => {
              setIsFullscreen(true)
            })
          })
      }
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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const toggleLock = () => {
    setIsLocked(!isLocked)
    if (!isLocked) {
      setShowControls(false)
    } else {
      setShowControls(true)
    }
  }

  const togglePlayPause = () => {
    if (videoRef.current && !useIframe) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current && !useIframe) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value)
    if (videoRef.current && !useIframe) {
      videoRef.current.volume = value[0] / 100
    }
  }

  const adjustVolume = (delta: number) => {
    const newVolume = Math.max(0, Math.min(100, volume[0] + delta))
    handleVolumeChange([newVolume])
  }

  const handleProgressChange = (value: number[]) => {
    setProgress(value)
    if (videoRef.current && !useIframe) {
      videoRef.current.currentTime = value[0]
    }
  }

  const skipBackward = () => {
    if (videoRef.current && !useIframe) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - SKIP_DURATION)
    }
  }

  const skipForward = () => {
    if (videoRef.current && !useIframe) {
      videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + SKIP_DURATION)
    }
  }

  const changePlaybackRate = (rate: number) => {
    if (videoRef.current && !useIframe) {
      videoRef.current.playbackRate = rate
      setPlaybackRate(rate)
    }
    setShowSettings(false)
  }

  const toggleSubtitles = () => {
    setShowSubtitles(!showSubtitles)
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
    } else if (videoRef.current) {
      videoRef.current.load()
    }
  }

  const handleIframeLoad = () => {
    setIsLoading(false)
    setHasError(false)
    if (useIframe) {
      setIsPlaying(true)
    }
  }

  const handleIframeError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  const handleVideoError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  const handleIframeClick = () => {
    if (useIframe && iframeRef.current) {
      try {
        const iframe = iframeRef.current
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
        }
      } catch (error) {
        console.log("Could not send play command to iframe")
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-all duration-300 ${isFullscreen ? "fullscreen-video" : ""}`}
      onClick={handleContainerClick}
    >
      <div className="relative w-full h-full">
        {embedUrl && !hasError ? (
          <>
            {useIframe ? (
              <iframe
                ref={iframeRef}
                src={embedUrl}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; encrypted-media; fullscreen; accelerometer; gyroscope; picture-in-picture; web-share"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                onClick={handleIframeClick}
                style={{
                  border: "none",
                  outline: "none",
                }}
              />
            ) : (
              <video
                ref={videoRef}
                src={embedUrl}
                className="w-full h-full object-contain"
                controls={false}
                autoPlay
                onLoadedData={() => setIsLoading(false)}
                onError={handleVideoError}
              />
            )}
          </>
        ) : null}

        {skipFeedback.type && Date.now() - skipFeedback.timestamp < 500 && (
          <>
            {skipFeedback.type === "backward" && (
              <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 pointer-events-none">
                <div className="flex flex-col items-center gap-2 animate-pulse">
                  <SkipBack className="w-12 h-12 text-white drop-shadow-lg" />
                  <span className="text-white text-sm font-semibold drop-shadow-lg">{SKIP_DURATION}s</span>
                </div>
              </div>
            )}
            {skipFeedback.type === "forward" && (
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 pointer-events-none">
                <div className="flex flex-col items-center gap-2 animate-pulse">
                  <SkipForward className="w-12 h-12 text-white drop-shadow-lg" />
                  <span className="text-white text-sm font-semibold drop-shadow-lg">{SKIP_DURATION}s</span>
                </div>
              </div>
            )}
          </>
        )}

        {connectionStatus === "offline" && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-red-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 animate-pulse">
              <WifiOff className="w-4 h-4" />
              <span className="text-sm">No Internet Connection</span>
            </div>
          </div>
        )}

        {isBuffering && !isLoading && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="bg-black/80 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
              <span className="text-sm">Buffering...</span>
            </div>
          </div>
        )}

        <div className="absolute top-4 right-4 z-20">
          <div className="bg-black/60 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">{videoQuality}</div>
        </div>

        {showSubtitles && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-black/80 text-white px-4 py-2 rounded text-center max-w-md backdrop-blur-sm">
              <p className="text-sm md:text-base">Subtitles will appear here when available</p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-white text-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 md:h-16 w-12 md:w-16 border-4 border-red-500 border-t-transparent mx-auto mb-4"></div>
                <div className="absolute inset-0 animate-pulse">
                  <div className="rounded-full h-12 md:h-16 w-12 md:w-16 border-2 border-red-500/30 mx-auto"></div>
                </div>
              </div>
              <p className="text-sm md:text-base animate-pulse">Loading video...</p>
              <div className="mt-2 flex justify-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-white text-center max-w-md px-4">
              <p className="text-lg md:text-xl mb-4">Video could not be loaded</p>
              <p className="text-sm text-gray-300 mb-4">Please check your internet connection and try again.</p>
              <div className="space-x-2">
                <Button onClick={handleRetry} variant="outline" className="bg-transparent">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button onClick={onClose} variant="ghost">
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {showControls && !isLocked && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 pointer-events-auto">
              <div className="flex justify-between items-center">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onClose}>
                  <X className="w-6 h-6" />
                </Button>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={toggleFullscreen}
                  >
                    {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onClose}>
                    <X className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 bg-black/50 backdrop-blur-sm w-16 h-16 rounded-full"
                onClick={useIframe ? handleIframeClick : togglePlayPause}
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
              </Button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pointer-events-auto">
              {!useIframe && (
                <div className="mb-4">
                  <Slider
                    value={progress}
                    onValueChange={handleProgressChange}
                    max={duration}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-white/70 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={useIframe ? handleIframeClick : togglePlayPause}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>

                  {!useIframe && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                        onClick={skipBackward}
                      >
                        <SkipBack className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                        onClick={skipForward}
                      >
                        <SkipForward className="w-5 h-5" />
                      </Button>
                    </>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  {!useIframe && (
                    <>
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
                          <Slider value={volume} onValueChange={handleVolumeChange} max={100} step={1} />
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className={`text-white hover:bg-white/20 ${showSubtitles ? "bg-white/20" : ""}`}
                        onClick={toggleSubtitles}
                      >
                        <Subtitles className="w-5 h-5" />
                      </Button>

                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/20"
                          onClick={() => setShowSettings(!showSettings)}
                        >
                          <Settings className="w-5 h-5" />
                        </Button>
                        {showSettings && (
                          <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-sm rounded-lg p-2 min-w-[120px]">
                            <div className="text-white text-sm mb-2">Playback Speed</div>
                            {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                              <button
                                key={rate}
                                className={`block w-full text-left px-2 py-1 text-sm text-white hover:bg-white/20 rounded ${playbackRate === rate ? "bg-white/20" : ""}`}
                                onClick={() => changePlaybackRate(rate)}
                              >
                                {rate}x
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleLock}>
                    <Lock className="w-5 h-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={toggleFullscreen}
                  >
                    <Maximize2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isLocked && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 bg-black/50 backdrop-blur-sm w-16 h-16 rounded-full animate-pulse"
              onClick={toggleLock}
            >
              <Unlock className="w-8 h-8" />
            </Button>
          </div>
        )}
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

function extractFileId(driveUrl: string): string | null {
  const match = driveUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)
  return match ? match[1] : null
}

function convertPCloudLink(pcloudUrl: string): string {
  if (pcloudUrl.includes("u.pcloud.link/publink/show")) {
    const codeMatch = pcloudUrl.match(/code=([^&]+)/)
    if (codeMatch) {
      const code = codeMatch[1]
      const streamUrl = `https://u.pcloud.link/publink/download?code=${code}&forcedownload=0`
      return streamUrl
    }
  } else if (pcloudUrl.includes("/publink/show")) {
    const directUrl = pcloudUrl.replace("/publink/show", "/publink/download").replace("?", "?forcedownload=0&")
    return directUrl
  }

  return pcloudUrl
}

function convertDropboxLink(dropboxUrl: string): string {
  return dropboxUrl.replace("dropbox.com", "dropbox.com/embed")
}

function convertOneDriveLink(onedriveUrl: string): string {
  if (onedriveUrl.includes("1drv.ms")) {
    return onedriveUrl + "&embed=1"
  }
  return onedriveUrl.replace("/view", "/embed")
}

function convertMegaLink(megaUrl: string): string {
  return megaUrl
}
