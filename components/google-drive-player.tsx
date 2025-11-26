"use client"

import { X, Maximize, Minimize, SkipBack, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"

interface GoogleDrivePlayerProps {
  driveUrl: string
  title: string
  onClose: () => void
}

export function GoogleDrivePlayer({ driveUrl, title, onClose }: GoogleDrivePlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [lastTap, setLastTap] = useState(0)
  const [tapPosition, setTapPosition] = useState({ x: 0, y: 0 })
  const [skipIndicator, setSkipIndicator] = useState<{ show: boolean; type: 'forward' | 'backward' }>({ 
    show: false, 
    type: 'forward' 
  })

  const getPreviewUrl = (url: string) => {
    const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`
    }
    return url
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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
      // Keyboard shortcuts for skipping
      if (event.key === "ArrowLeft") {
        skipBackward()
      }
      if (event.key === "ArrowRight") {
        skipForward()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose, isFullscreen])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // Try iframe first, fallback to container
      const elementToFullscreen = iframeRef.current || containerRef.current

      if (elementToFullscreen) {
        elementToFullscreen
          .requestFullscreen()
          .then(() => {
            setIsFullscreen(true)
          })
          .catch((err) => {
            console.log("[v0] Fullscreen request failed:", err)
            // Fallback to container if iframe fullscreen fails
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

  const handleDoubleTap = (event: React.MouseEvent) => {
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
        showSkipIndicator('forward')
      } else {
        // Double tap on left side - skip backward 10 seconds
        skipBackward()
        showSkipIndicator('backward')
      }

      setLastTap(0)
    } else {
      setLastTap(currentTime)
      setTapPosition({ x: tapX, y: tapY })
    }
  }

  const showSkipIndicator = (type: 'forward' | 'backward') => {
    setSkipIndicator({ show: true, type })
    setTimeout(() => {
      setSkipIndicator({ show: false, type })
    }, 1000)
  }

  const skipBackward = () => {
    // Google Drive iframe e seek korar try kori
    try {
      const iframe = iframeRef.current
      if (iframe && iframe.contentWindow) {
        // Google Drive player e seek command pathai
        iframe.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[0,true]}', "*")
        
        // Alternative: Keyboard event simulate kore seek kora
        const seekBackEvent = new KeyboardEvent('keydown', {
          key: 'ArrowLeft',
          code: 'ArrowLeft',
          keyCode: 37,
          which: 37,
          bubbles: true
        })
        iframe.contentWindow.document.dispatchEvent(seekBackEvent)
      }
    } catch (error) {
      console.log("[v0] Could not send seek command to Google Drive iframe")
    }
  }

  const skipForward = () => {
    // Google Drive iframe e seek korar try kori
    try {
      const iframe = iframeRef.current
      if (iframe && iframe.contentWindow) {
        // Google Drive player e seek command pathai
        iframe.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[0,true]}', "*")
        
        // Alternative: Keyboard event simulate kore seek kora
        const seekForwardEvent = new KeyboardEvent('keydown', {
          key: 'ArrowRight',
          code: 'ArrowRight',
          keyCode: 39,
          which: 39,
          bubbles: true
        })
        iframe.contentWindow.document.dispatchEvent(seekForwardEvent)
      }
    } catch (error) {
      console.log("[v0] Could not send seek command to Google Drive iframe")
    }
  }

  // Google Drive iframe load hoye gele event listener add kori
  useEffect(() => {
    const iframe = iframeRef.current
    if (iframe) {
      const handleIframeLoad = () => {
        try {
          // Iframe fully load hoye gele seek functionality enable kori
          console.log("[v0] Google Drive iframe loaded successfully")
        } catch (error) {
          console.log("[v0] Could not access Google Drive iframe content")
        }
      }

      iframe.addEventListener('load', handleIframeLoad)
      return () => iframe.removeEventListener('load', handleIframeLoad)
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 bg-black z-50 flex flex-col"
      onDoubleClick={handleDoubleTap}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/90 backdrop-blur-sm">
        <h2 className="text-white font-semibold text-lg truncate flex-1">{title}</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="text-white hover:bg-white/20 flex-shrink-0"
            title={isFullscreen ? "Exit Fullscreen (F)" : "Fullscreen (F)"}
          >
            {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20 flex-shrink-0">
            <X className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Video Player */}
      <div className="flex-1 relative hide-drive-controls">
        <iframe
          ref={iframeRef}
          src={getPreviewUrl(driveUrl)}
          className="w-full h-full"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          title={title}
          onDoubleClick={handleDoubleTap}
        />
        
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

        {/* Flixory Branding */}
        <div className="absolute top-2 right-2 bg-black/80 px-3 py-1.5 rounded-md pointer-events-none z-10">
          <span className="text-red-600 font-bold text-sm tracking-wider">FLIXORY</span>
        </div>

        {/* Double Tap Instructions (Temporary) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-lg text-sm pointer-events-none z-10">
          Double tap left/right to skip 10 seconds
        </div>
      </div>
    </div>
  )
}
