"use client"

import type React from "react"

import { X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TelegramPopupProps {
  telegramLink: string
  movieTitle: string
  onClose: () => void
  isShort?: boolean
}

export function TelegramPopup({ telegramLink, movieTitle, onClose, isShort = false }: TelegramPopupProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleWatchOnTelegram = () => {
    const cleanLink = telegramLink.replace("?embed=1", "")
    window.open(cleanLink, "_blank")
  }

  return (
    <div
      className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-foreground">{movieTitle}</h2>
              <p className="text-sm text-muted-foreground">Flixory Telegram Channel</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content - Styled Bengali Message for Shorts */}
        {isShort && (
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            {/* Decorative top border */}
            <div className="w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>

            {/* Main Message */}
            <div className="space-y-4 text-center">
              <div className="text-4xl mb-2">🎬 🍿</div>

              <h3 className="text-xl md:text-2xl font-bold text-foreground">প্রিয় Movie Lover 💝</h3>

              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-4 md:p-6 space-y-3 border border-blue-500/20">
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  এই <span className="font-bold text-blue-500">Short</span> টির{" "}
                  <span className="font-bold text-purple-500">Full Movie</span> দেখতে নিচের বাটনে ক্লিক করুন 🎯
                </p>

                <div className="space-y-2 text-sm md:text-base text-muted-foreground">
                  <p className="flex items-center justify-center gap-2">
                    <span className="text-lg">✅</span>
                    <span>
                      সকল movie Telegram এ <span className="font-semibold text-green-500">safely</span> আছে
                    </span>
                  </p>

                  <p className="flex items-center justify-center gap-2">
                    <span className="text-lg">💬</span>
                    <span>Movie request করতে channel এ comment করুন</span>
                  </p>

                  <p className="flex items-center justify-center gap-2">
                    <span className="text-lg">⚡</span>
                    <span>
                      Admin <span className="font-bold text-orange-500">24 ঘন্টায়</span> দিয়ে দিবে
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative bottom border */}
            <div className="w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full"></div>
          </div>
        )}

        {isShort && (
          <div className="flex-shrink-0 p-4 md:p-6 border-t border-border bg-card">
            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-base md:text-lg py-6 shadow-lg hover:shadow-xl transition-all"
              onClick={handleWatchOnTelegram}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Watch on Telegram 📺
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
