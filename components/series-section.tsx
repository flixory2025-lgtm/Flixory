"use client"

import { useState } from "react"
import { ArrowLeft, Play, Folder } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { VideoPlayer } from "./video-player"

interface Episode {
  id: string
  title: string
  episode: number
  duration: string
  videoUrl: string
  thumbnail: string
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
            videoUrl: "https://drive.google.com/file/d/19gueMTIe2PL9e7WDUZbUUro6fRIWjaX4/view?usp=drivesdk",
            thumbnail: "/byomkesh-episode-1-thumbnail.jpg",
          },
          {
            id: "ep2",
            title: "Pother Kanta",
            episode: 2,
            duration: "42:15",
            videoUrl: "https://drive.google.com/file/d/19gueMTIe2PL9e7WDUZbUUro6fRIWjaX4/view?usp=drivesdk",
            thumbnail: "/byomkesh-episode-2-thumbnail.jpg",
          },
          {
            id: "ep3",
            title: "Seemanto Heera",
            episode: 3,
            duration: "48:20",
            videoUrl: "https://drive.google.com/file/d/19gueMTIe2PL9e7WDUZbUUro6fRIWjaX4/view?usp=drivesdk",
            thumbnail: "/byomkesh-episode-3-thumbnail.jpg",
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
            videoUrl: "https://drive.google.com/file/d/19gueMTIe2PL9e7WDUZbUUro6fRIWjaX4/view?usp=drivesdk",
            thumbnail: "/byomkesh-s2-episode-1-thumbnail.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "TV-series-2",
    title: "school (2017)",
    poster: "/s2id.jpg",
    description: "flixory proxy site school k-drama tv series",
    genre: "Comedy , Drama , Mystery",
    year: "2017",
    rating: "7.1",
    seasons: [
      {
        id: "season-1",
        title: "Season 1",
        episodes: [
          {
            id: "ep1",
            title: "school k-drama",
            episode: 1,
            duration: "01:02:11",
            videoUrl: "https://t.me/flixoryproxy/25",
            thumbnail: "/th1id.jpg",
          },
          {
            id: "ep2",
            title: "school k-drama",
            episode: 2,
            duration: "01:02:49",
            videoUrl: "https://t.me/flixoryproxy/27",
            thumbnail: "/th2id.jpg",
          },
          {
            id: "ep3",
            title: "school k-drama",
            episode: 3,
            duration: "01:03:05",
            videoUrl: "https://t.me/flixoryproxy/29",
            thumbnail: "/th3id.jpg",
          },
          {
            id: "ep4",
            title: "school k-drama",
            episode: 4,
            duration: "01:03:29",
            videoUrl: "https://t.me/flixoryproxy/31",
            thumbnail: "/th4id.jpg",
          },
          {
            id: "ep5",
            title: "school k-drama",
            episode: 5,
            duration: "01:04:20",
            videoUrl: "https://t.me/flixoryproxy/33",
            thumbnail: "/th5id.jpg",
          },
          {
            id: "ep6",
            title: "school k-drama",
            episode: 6,
            duration: "01:04:43",
            videoUrl: "https://t.me/flixoryproxy/35",
            thumbnail: "/th6id.jpg",
          },
          {
            id: "ep7",
            title: "school k-drama",
            episode: 7,
            duration: "01:05:09",
            videoUrl: "https://t.me/flixoryproxy/37",
            thumbnail: "/th7id.jpg",
          },
          {
            id: "ep8",
            title: "school k-drama",
            episode: 8,
            duration: "01:05:39",
            videoUrl: "https://t.me/flixoryproxy/39",
            thumbnail: "/th8id.jpg",
          },
          {
            id: "ep9",
            title: "school k-drama",
            episode: 9,
            duration: "01:04:59",
            videoUrl: "https://t.me/flixoryproxy/41",
            thumbnail: "/th9id.jpg",
          },
          {
            id: "ep10",
            title: "school k-drama",
            episode: 10,
            duration: "01:04:48",
            videoUrl: "https://t.me/flixoryproxy/43",
            thumbnail: "/th10id.jpg",
          },
          {
            id: "ep11",
            title: "school k-drama",
            episode: 11,
            duration: "01:05:36",
            videoUrl: "https://t.me/flixoryproxy/45",
            thumbnail: "/th11id.jpg",
          },
          {
            id: "ep12",
            title: "school k-drama",
            episode: 12,
            duration: "01:03:13",
            videoUrl: "https://t.me/flixoryproxy/47",
            thumbnail: "/th12id.jpg",
          },
          {
            id: "ep13",
            title: "school k-drama",
            episode: 13,
            duration: "01:03:13",
            videoUrl: "https://t.me/flixoryproxy/49",
            thumbnail: "/th13id.jpg",
          },
          {
            id: "ep14",
            title: "school k-drama",
            episode: 14,
            duration: "01:03:52",
            videoUrl: "https://t.me/flixoryproxy/51",
            thumbnail: "/th14id.jpg",
          },
          {
            id: "ep15",
            title: "school k-drama",
            episode: 15,
            duration: "01:03:32",
            videoUrl: "https://t.me/flixoryproxy/53",
            thumbnail: "/th15id.jpg",
          },
          {
            id: "ep16 season 1 complete",
            title: "school k-drama",
            episode: 16,
            duration: "01:04:23",
            videoUrl: "https://t.me/flixoryproxy/55",
            thumbnail: "/th16id.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "TV-series-3",
    title: "CID season 2 bangla (2025)",
    poster: "/s3id.jpg",
    description: "flixory proxy site CID BANGLA tv series",
    genre: "Comedy , Drama , Mystery",
    year: "2017",
    rating: "7.1",
    seasons: [
      {
        id: "season-2",
        title: "Season 2",
        episodes: [
          {
            id: "ep1",
            title: "CID bangla 2025",
            episode: 1,
            duration: "51:50",
            videoUrl: "https://t.me/flixoryproxy/102",
            thumbnail: "/th1id.jpg",
          },
          {
            id: "ep2",
            title: "CID bangla 2025",
            episode: 2,
            duration: "47:52",
            videoUrl: "https://t.me/flixoryproxy/104",
            thumbnail: "/th2id.jpg",
          },
          {
            id: "ep3",
            title: "CID bangla 2025",
            episode: 3,
            duration: "48:55",
            videoUrl: "https://t.me/flixoryproxy/106",
            thumbnail: "/th3id.jpg",
          },
          {
            id: "ep4",
            title: "CID bangla 2025",
            episode: 4,
            duration: "48:59",
            videoUrl: "https://t.me/flixoryproxy/108",
            thumbnail: "/th4id.jpg",
          },
          {
            id: "ep5",
            title: "CID bangla 2025",
            episode: 5,
            duration: "48:06",
            videoUrl: "https://t.me/flixoryproxy/110",
            thumbnail: "/th5id.jpg",
          },
          {
            id: "ep6",
            title: "CID bangla 2025",
            episode: 6,
            duration: "43:50",
            videoUrl: "https://t.me/flixoryproxy/112",
            thumbnail: "/th6id.jpg",
          },
          {
            id: "ep7",
            title: "CID bangla 2025",
            episode: 7,
            duration: "46:42",
            videoUrl: "https://t.me/flixoryproxy/114",
            thumbnail: "/th7id.jpg",
          },
          {
            id: "ep8",
            title: "CID bangla 2025",
            episode: 8,
            duration: "47:47",
            videoUrl: "https://t.me/flixoryproxy/116",
            thumbnail: "/th8id.jpg",
          },
          {
            id: "ep9",
            title: "CID bangla 2025",
            episode: 9,
            duration: "44:36",
            videoUrl: "https://t.me/flixoryproxy/118",
            thumbnail: "/th9id.jpg",
          },
          {
            id: "ep10",
            title: "CID bangla 2025",
            episode: 10,
            duration: "46:35",
            videoUrl: "https://t.me/flixoryproxy/120",
            thumbnail: "/th10id.jpg",
          },
          {
            id: "ep11",
            title: "CID bangla 2025",
            episode: 11,
            duration: "46:45",
            videoUrl: "https://t.me/flixoryproxy/122",
            thumbnail: "/th11id.jpg",
          },
          {
            id: "ep12",
            title: "CID bangla 2025",
            episode: 12,
            duration: "44:15",
            videoUrl: "https://t.me/flixoryproxy/124",
            thumbnail: "/th12id.jpg",
          },
          {
            id: "ep13",
            title: "CID bangla 2025",
            episode: 13,
            duration: "46:27",
            videoUrl: "https://t.me/flixoryproxy/126",
            thumbnail: "/th13id.jpg",
          },
          {
            id: "ep14",
            title: "CID bangla 2025",
            episode: 14,
            duration: "46:12",
            videoUrl: "https://t.me/flixoryproxy/128",
            thumbnail: "/th14id.jpg",
          },
          {
            id: "ep15",
            title: "CID bangla 2025",
            episode: 15,
            duration: "44:51",
            videoUrl: "https://t.me/flixoryproxy/130",
            thumbnail: "/th15id.jpg",
          },
          {
            id: "ep16",
            title: "CID bangla 2025",
            episode: 16,
            duration: "50:57",
            videoUrl: "https://t.me/flixoryproxy/132",
            thumbnail: "/th16id.jpg",
          },
          {
            id: "ep17",
            title: "CID bangla 2025",
            episode: 17,
            duration: "48:39",
            videoUrl: "https://t.me/flixoryproxy/134",
            thumbnail: "/th17id.jpg",
          },
          {
            id: "ep18",
            title: "CID bangla 2025",
            episode: 18,
            duration: "48:54",
            videoUrl: "https://t.me/flixoryproxy/136",
            thumbnail: "/th18id.jpg",
          },
          {
            id: "ep19",
            title: "CID bangla 2025",
            episode: 19,
            duration: "45:40",
            videoUrl: "https://t.me/flixoryproxy/138",
            thumbnail: "/th19id.jpg",
          },
          {
            id: "ep20",
            title: "CID bangla 2025",
            episode: 20,
            duration: "48:37",
            videoUrl: "https://t.me/flixoryproxy/140",
            thumbnail: "/th20id.jpg",
          },
          {
            id: "ep21",
            title: "CID bangla 2025",
            episode: 21,
            duration: "43:52",
            videoUrl: "https://t.me/flixoryproxy/142",
            thumbnail: "/th21id.jpg",
          },
          {
            id: "ep22",
            title: "CID bangla 2025",
            episode: 22,
            duration: "45:41",
            videoUrl: "https://t.me/flixoryproxy/144",
            thumbnail: "/th22id.jpg",
          },
          {
            id: "ep23",
            title: "CID bangla 2025",
            episode: 23,
            duration: "50:43",
            videoUrl: "https://t.me/flixoryproxy/146",
            thumbnail: "/th23id.jpg",
          },
          {
            id: "ep24",
            title: "CID bangla 2025",
            episode: 24,
            duration: "45:14",
            videoUrl: "https://t.me/flixoryproxy/148",
            thumbnail: "/th24id.jpg",
          },
          {
            id: "ep25",
            title: "CID bangla 2025",
            episode: 25,
            duration: "45:01",
            videoUrl: "https://t.me/flixoryproxy/150",
            thumbnail: "/th25id.jpg",
          },
          {
            id: "ep26",
            title: "CID bangla 2025",
            episode: 26,
            duration: "45:01",
            videoUrl: "https://t.me/flixoryproxy/152",
            thumbnail: "/th26id.jpg",
          },
          {
            id: "ep27",
            title: "CID bangla 2025",
            episode: 27,
            duration: "45:44",
            videoUrl: "https://t.me/flixoryproxy/154",
            thumbnail: "/th27id.jpg",
          },
          {
            id: "ep28",
            title: "CID bangla 2025",
            episode: 28,
            duration: "45:11",
            videoUrl: "https://t.me/flixoryproxy/156",
            thumbnail: "/th28id.jpg",
          },
          {
            id: "ep29",
            title: "CID bangla 2025",
            episode: 29,
            duration: "46:10",
            videoUrl: "https://t.me/flixoryproxy/158",
            thumbnail: "/th29id.jpg",
          },
          {
            id: "ep30",
            title: "CID bangla 2025",
            episode: 30,
            duration: "45:41",
            videoUrl: "https://t.me/flixoryproxy/160",
            thumbnail: "/th30id.jpg",
          },
          {
            id: "ep31",
            title: "CID bangla 2025",
            episode: 31,
            duration: "44:45",
            videoUrl: "https://t.me/flixoryproxy/162",
            thumbnail: "/th31id.jpg",
          },
          {
            id: "ep32",
            title: "CID bangla 2025",
            episode: 32,
            duration: "44:48",
            videoUrl: "https://t.me/flixoryproxy/164",
            thumbnail: "/th32id.jpg",
          },
          {
            id: "ep33",
            title: "CID bangla 2025",
            episode: 33,
            duration: "44:14",
            videoUrl: "https://t.me/flixoryproxy/166",
            thumbnail: "/th33id.jpg",
          },
          {
            id: "ep34",
            title: "CID bangla 2025",
            episode: 34,
            duration: "44:22",
            videoUrl: "https://t.me/flixoryproxy/168",
            thumbnail: "/th34id.jpg",
          },
          {
            id: "ep35",
            title: "CID bangla 2025",
            episode: 35,
            duration: "47:02",
            videoUrl: "https://t.me/flixoryproxy/3007",
            thumbnail: "/th35id.jpg",
          },
          {
            id: "ep36",
            title: "CID bangla 2025",
            episode: 36,
            duration: "48:59",
            videoUrl: "https://t.me/flixoryproxy/3009",
            thumbnail: "/th36id.jpg",
          },
          {
            id: "ep37",
            title: "CID bangla 2025",
            episode: 37,
            duration: "45:49",
            videoUrl: "https://t.me/flixoryproxy/3490",
            thumbnail: "/th37id.jpg",
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

  const handleEpisodePlay = (videoUrl: string) => {
    setPlayingVideo(videoUrl)
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
                onClick={() => handleEpisodePlay(episode.videoUrl)}
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
    </div>
  )
}
