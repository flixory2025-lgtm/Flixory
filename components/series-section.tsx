"use client"

import { useState } from "react"
import { ArrowLeft, Play, Folder, X, Download, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { VideoPlayer } from "./video-player"
import { GoogleDrivePlayer } from "./google-drive-player"
import { YouTubePlayer } from "./youtube-player"

interface Episode {
  id: string
  title: string
  episode: number
  duration: string
  trailerUrl: string // Renamed from videoUrl to trailerUrl
  telegramUrl: string
  thumbnail: string
  googleDrivePlayUrl?: string
  googleDriveDownloadUrl?: string
}

interface Season {
  id: string
  title: string
  episodes: Episode[]
}

interface Series {
  id: string
  title: string
  poster: string
  description: string
  genre: string
  year: string
  rating: string
  seasons: Season[]
}

const seriesData: Series[] = [
  {
    id: "hoichoi-original-1",
    title: "Byomkesh",
    poster: "/bengali-detective-series-poster.jpg",
    description: "The legendary Bengali detective Byomkesh Bakshi solves mysterious cases in colonial Calcutta.",
    genre: "Mystery, Drama",
    year: "2023",
    rating: "8.5",
    seasons: [
      {
        id: "season-1",
        title: "Season 1",
        episodes: [
          {
            id: "ep1",
            title: "Satyanweshi",
            episode: 1,
            duration: "45:30",
            trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            telegramUrl: "https://t.me/flixoryproxy/3490",
            thumbnail: "/byomkesh-episode-1-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1DxYZ9cpWRuEBCqhtcmpd8IEHWbZy4f2W/preview",
            googleDriveDownloadUrl: "https://drive.google.com/uc?export=download&id=1DxYZ9cpWRuEBCqhtcmpd8IEHWbZy4f2W",
          },
          {
            id: "ep2",
            title: "Pother Kanta",
            episode: 2,
            duration: "42:15",
            trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            telegramUrl: "https://t.me/your_channel/message_id",
            thumbnail: "/byomkesh-episode-2-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/19gueMTIe2PL9e7WDUZbUUro6fRIWjaX4/preview",
            googleDriveDownloadUrl: "https://drive.google.com/uc?export=download&id=19gueMTIe2PL9e7WDUZbUUro6fRIWjaX4",
          },
          {
            id: "ep3",
            title: "Seemanto Heera",
            episode: 3,
            duration: "48:20",
            trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            telegramUrl: "https://t.me/your_channel/message_id",
            thumbnail: "/byomkesh-episode-3-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/19gueMTIe2PL9e7WDUZbUUro6fRIWjaX4/preview",
            googleDriveDownloadUrl: "https://drive.google.com/uc?export=download&id=19gueMTIe2PL9e7WDUZbUUro6fRIWjaX4",
          },
        ],
      },
      {
        id: "season-2",
        title: "Season 2",
        episodes: [
          {
            id: "ep4",
            title: "Adim Ripu",
            episode: 1,
            duration: "46:10",
            trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            telegramUrl: "https://t.me/your_channel/message_id",
            thumbnail: "/byomkesh-s2-episode-1-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/19gueMTIe2PL9e7WDUZbUUro6fRIWjaX4/preview",
            googleDriveDownloadUrl: "https://drive.google.com/uc?export=download&id=19gueMTIe2PL9e7WDUZbUUro6fRIWjaX4",
          },
        ],
      },
    ],
  },
  {
    id: "hoichoi-original-2",
    title: "Tansener Tanpura",
    poster: "/bengali-musical-series-poster.jpg",
    description: "A musical journey through the life and times of legendary musician Tansen.",
    genre: "Musical, Drama",
    year: "2023",
    rating: "8.2",
    seasons: [
      {
        id: "season-1",
        title: "Season 1",
        episodes: [
          {
            id: "ep1",
            title: "Raag Bhairav",
            episode: 1,
            duration: "50:25",
            trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            telegramUrl: "https://t.me/your_channel/message_id",
            thumbnail: "/tansen-episode-1-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/19gueMTIe2PL9e7WDUZbUUro6fRIWjaX4/preview",
            googleDriveDownloadUrl: "https://drive.google.com/uc?export=download&id=19gueMTIe2PL9e7WDUZbUUro6fRIWjaX4",
          },
        ],
      },
    ],
  },
]

export function SeriesSection() {
  const [currentView, setCurrentView] = useState<"list" | "details" | "episodes">("list")
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null)
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null)
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
  const [episodePopup, setEpisodePopup] = useState<{ show: boolean; episode: Episode | null }>({
    show: false,
    episode: null,
  })
  const [showDrivePlayer, setShowDrivePlayer] = useState<{ show: boolean; episode: Episode | null }>({
    show: false,
    episode: null,
  })
  const [showTrailerPlayer, setShowTrailerPlayer] = useState<{ show: boolean; episode: Episode | null }>({
    show: false,
    episode: null,
  })

  const sortedSeries = [...seriesData].sort((a, b) => {
    const idA = Number.parseInt(a.id.split("-").pop() || "0")
    const idB = Number.parseInt(b.id.split("-").pop() || "0")
    return idB - idA
  })

  const handleSeriesClick = (series: Series) => {
    setSelectedSeries(series)
    setCurrentView("details")
  }

  const handleSeasonClick = (season: Season) => {
    setSelectedSeason(season)
    setCurrentView("episodes")
  }

  const handleEpisodePlay = (episode: Episode) => {
    setEpisodePopup({ show: true, episode })
  }

  const handleWatchOnTelegram = () => {
    if (episodePopup.episode?.telegramUrl) {
      window.open(episodePopup.episode.telegramUrl, "_blank")
      setEpisodePopup({ show: false, episode: null })
    }
  }

  const handleDirectDownload = () => {
    if (episodePopup.episode?.googleDriveDownloadUrl) {
      window.open(episodePopup.episode.googleDriveDownloadUrl, "_blank")
    }
  }

  const handleOnlinePlay = () => {
    if (episodePopup.episode) {
      setShowDrivePlayer({ show: true, episode: episodePopup.episode })
      setEpisodePopup({ show: false, episode: null })
    }
  }

  const handlePlayTrailer = () => {
    if (episodePopup.episode) {
      setShowTrailerPlayer({ show: true, episode: episodePopup.episode })
      setEpisodePopup({ show: false, episode: null })
    }
  }

  const handleBack = () => {
    if (currentView === "episodes") {
      setCurrentView("details")
      setSelectedSeason(null)
    } else if (currentView === "details") {
      setCurrentView("list")
      setSelectedSeries(null)
    }
  }

  if (playingVideo) {
    return <VideoPlayer videoUrl={playingVideo} onClose={() => setPlayingVideo(null)} />
  }

  if (showDrivePlayer.show && showDrivePlayer.episode?.googleDrivePlayUrl) {
    return (
      <GoogleDrivePlayer
        driveUrl={showDrivePlayer.episode.googleDrivePlayUrl}
        title={`${selectedSeries?.title} - Episode ${showDrivePlayer.episode.episode}`}
        onClose={() => setShowDrivePlayer({ show: false, episode: null })}
      />
    )
  }

  if (showTrailerPlayer.show && showTrailerPlayer.episode?.trailerUrl) {
    return (
      <YouTubePlayer
        youtubeUrl={showTrailerPlayer.episode.trailerUrl}
        title={`${selectedSeries?.title} - Episode ${showTrailerPlayer.episode.episode}`}
        onClose={() => setShowTrailerPlayer({ show: false, episode: null })}
      />
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {currentView !== "list" && (
          <Button variant="ghost" size="icon" onClick={handleBack} className="text-white hover:bg-gray-800">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        <h1 className="text-xl font-bold">
          {currentView === "list" && "Series"}
          {currentView === "details" && selectedSeries?.title}
          {currentView === "episodes" && selectedSeason?.title}
        </h1>
        <div className="w-10" />
      </div>

      {/* Series List View */}
      {currentView === "list" && (
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedSeries.map((series) => (
              <div key={series.id} className="cursor-pointer group" onClick={() => handleSeriesClick(series)}>
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                  <img
                    src={series.poster || "/placeholder.svg"}
                    alt={series.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{series.title}</h3>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <span>{series.year}</span>
                  <span>•</span>
                  <span>⭐ {series.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Series Details View */}
      {currentView === "details" && selectedSeries && (
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="w-full md:w-1/3">
              <img
                src={selectedSeries.poster || "/placeholder.svg"}
                alt={selectedSeries.title}
                className="w-full aspect-[2/3] object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{selectedSeries.title}</h2>
              <div className="flex items-center space-x-4 mb-4">
                <Badge variant="secondary">{selectedSeries.genre}</Badge>
                <span className="text-gray-400">{selectedSeries.year}</span>
                <span className="text-yellow-500">⭐ {selectedSeries.rating}</span>
              </div>
              <p className="text-gray-300 mb-6">{selectedSeries.description}</p>
            </div>
          </div>

          {/* Seasons */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Seasons</h3>
            {selectedSeries.seasons.map((season) => (
              <div
                key={season.id}
                className="flex items-center justify-between p-4 bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={() => handleSeasonClick(season)}
              >
                <div className="flex items-center space-x-3">
                  <Folder className="w-5 h-5 text-red-500" />
                  <span className="font-medium">{season.title}</span>
                  <span className="text-gray-400">({season.episodes.length} episodes)</span>
                </div>
                <ArrowLeft className="w-4 h-4 rotate-180 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Episodes View */}
      {currentView === "episodes" && selectedSeason && (
        <div className="p-4">
          <div className="space-y-4">
            {selectedSeason.episodes.map((episode) => (
              <div
                key={episode.id}
                className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={() => handleEpisodePlay(episode)}
              >
                <div className="relative w-20 h-12 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={episode.thumbnail || "/placeholder.svg"}
                    alt={episode.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">
                    Episode {episode.episode}: {episode.title}
                  </h4>
                  <p className="text-sm text-gray-400">{episode.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Episode Telegram Popup */}
      {episodePopup.show && episodePopup.episode && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            <button
              onClick={() => setEpisodePopup({ show: false, episode: null })}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-6">
              <div className="text-5xl mb-4">📺</div>

              <h3 className="text-xl font-bold text-white mb-2">Episode {episodePopup.episode.episode}</h3>

              <div className="space-y-3 text-gray-300 leading-relaxed">
                <p className="text-base">
                  🎬 আপনি এই episode টি{" "}
                  <span className="text-red-500 font-semibold">Telegram Flixory Proxy Channel</span> থেকে দেখতে হবে।
                </p>
                <p className="text-base">
                  👇 দেখতে নিচে <span className="text-blue-400 font-semibold">Watch on Telegram</span> বাটনে ক্লিক করুন।
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleWatchOnTelegram}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch on Telegram
                </Button>

                {episodePopup.episode.googleDrivePlayUrl && (
                  <Button
                    onClick={handleOnlinePlay}
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-green-500/50 transition-all duration-300"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Online Play
                  </Button>
                )}

                {episodePopup.episode.googleDriveDownloadUrl && (
                  <Button
                    onClick={handleDirectDownload}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Direct Download
                  </Button>
                )}

                {episodePopup.episode.trailerUrl && (
                  <Button
                    onClick={handlePlayTrailer}
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
                  >
                    <Film className="w-5 h-5 mr-2" />
                    Trailer
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
