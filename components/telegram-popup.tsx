"use client"

import type React from "react"

import { useState } from "react"
import { X, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TelegramPopupProps {
  telegramLink: string
  movieTitle: string
  onClose: () => void
}

export function TelegramPopup({ telegramLink, movieTitle, onClose }: TelegramPopupProps) {
  const [isLoading, setIsLoading] = useState(true)

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{movieTitle}</h2>
              <p className="text-sm text-muted-foreground">Telegram Channel</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="relative bg-black" style={{ height: "70vh" }}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                <p className="text-sm">Loading Telegram content...</p>
              </div>
            </div>
          )}

          <iframe
            src={telegramLink}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; encrypted-media; fullscreen"
            onLoad={() => setIsLoading(false)}
            style={{
              border: "none",
              outline: "none",
            }}
          />
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => window.open(telegramLink, "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in Telegram
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => {
                // Create a temporary link to trigger download
                const link = document.createElement("a")
                link.href = telegramLink
                link.download = `${movieTitle}.mp4`
                link.target = "_blank"
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            You can watch or download this movie directly from our Telegram channel
          </p>
        </div>
      </div>
    </div>
  )
}
