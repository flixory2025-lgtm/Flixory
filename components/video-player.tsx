"use client"

import { useState, useRef, useEffect } from "react"
import {
  X,
  ArrowLeft,
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
  const [videoQuality, setVideoQuality] = useState("HD")
  const [lastTap, setLastTap] = useState(0)
  const [tapPosition, setTapPosition] = useState({ x: 0, y: 0 })

  // ... existing useEffect and other functions remain the same ...

  const handleDoubleTap = (event: React.MouseEvent) => {
    if (isLocked) return

    const currentTime = new Date().getTime()
    const tapLength = currentTime - lastTap
    const tapX = event.clientX
    const tapY = event.clientY

    // Double tap detection (within 300ms and similar position)
    if (lastTap && tapLength < 300 && 
        Math.abs(tapX - tapPosition.x) < 50 && 
        Math.abs(tapY - tapPosition.y) < 50) {
      
      const container = containerRef.current
      if (!container) return

      const containerWidth = container.clientWidth
      const tapSide = tapX < containerWidth / 2 ? 'left' : 'right'

      if (tapSide === 'right') {
        // Double tap on right side - skip forward 10 seconds
        skipForward()
        
        // Show forward skip indicator
        showSkipIndicator('forward')
      } else {
        // Double tap on left side - skip backward 10 seconds
        skipBackward()
        
        // Show backward skip indicator
        showSkipIndicator('backward')
      }

      setLastTap(0)
    } else {
      setLastTap(currentTime)
      setTapPosition({ x: tapX, y: tapY })
    }
  }

  const [skipIndicator, setSkipIndicator] = useState<{ show: boolean; type: 'forward' | 'backward' }>({ 
    show: false, 
    type: 'forward' 
  })

  const showSkipIndicator = (type: 'forward' | 'backward') => {
    setSkipIndicator({ show: true, type })
    setTimeout(() => {
      setSkipIndicator({ show: false, type })
    }, 1000)
  }

  const skipBackward = () => {
    if (videoRef.current && !useIframe) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10)
    } else if (useIframe && iframeRef.current) {
      // For iframe videos, try to seek backward
      try {
        const iframe = iframeRef.current
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[${currentTime-10},true]}', "*")
        }
      } catch (error) {
        console.log("[v0] Could not send seek command to iframe")
      }
    }
  }

  const skipForward = () => {
    if (videoRef.current && !useIframe) {
      videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10)
    } else if (useIframe && iframeRef.current) {
      // For iframe videos, try to seek forward
      try {
        const iframe = iframeRef.current
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[${currentTime+10},true]}', "*")
        }
      } catch (error) {
        console.log("[v0] Could not send seek command to iframe")
      }
    }
  }

  // ... existing functions remain the same ...

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-all duration-300 ${isFullscreen ? "fullscreen-video" : ""}`}
      onClick={() => !isLocked && setShowControls(!showControls)}
      onDoubleClick={handleDoubleTap}
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
                onDoubleClick={handleDoubleTap}
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
                onDoubleClick={handleDoubleTap}
              />
            )}
          </>
        ) : null}

        {/* Double Tap Skip Indicators */}
        {skipIndicator.show && (
          <div className={`absolute top-1/2 ${skipIndicator.type === 'forward' ? 'right-8' : 'left-8'} transform -translate-y-1/2 z-30`}>
            <div className="bg-black/70 text-white rounded-full p-4 flex items-center justify-center">
              {skipIndicator.type === 'forward' ? (
                <SkipForward className="w-8 h-8" />
              ) : (
                <SkipBack className="w-8 h-8" />
              )}
              <span className="ml-2 text-lg font-semibold">10s</span>
            </div>
          </div>
        )}

        {/* Connection Status */}
        {connectionStatus === "offline" && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-red-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 animate-pulse">
              <WifiOff className="w-4 h-4" />
              <span className="text-sm">No Internet Connection</span>
            </div>
          </div>
        )}

        {/* ... rest of the existing JSX remains the same ... */}

        {/* Loading Screen */}
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

        {/* ... rest of the existing JSX remains the same ... */}

      </div>
    </div>
  )
}

// ... existing helper functions (convertYouTubeLink, extractFileId, etc.) remain the same ...
