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
  {
    id: "bongo-original-3",
    title: "Bachelor Point – Season 5 (2025) chapter 1",
    poster: "/s3id.jpg",
    description: "flixory proxy original bongo series bachelor point",
    genre: "natok, Drama",
    year: "2025",
    rating: "8.5",
    seasons: [
      {
        id: "season-5 chapter 1",
        title: "Season 5 chapter 1",
        episodes: [
          {
            id: "ep1",
            title: "নতুন ফ্ল্যাট, পুরান বন্ধু",
            episode: 1,
            duration: "45:30",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/479",
            thumbnail: "/byomkesh-episode-1-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1oWO9G3vIz6dxnD_qtP4A_96Rbj_zvt9o/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep2",
            title: "প্রেমে বাজিমাত",
            episode: 2,
            duration: "42:15",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/479",
            thumbnail: "/byomkesh-episode-2-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1x-pYs71Jtz0Dh4mFkQ8VXNd_Ig4qs5wS/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep3",
            title: "চাকরি নাকি ভালোবাসা?",
            episode: 3,
            duration: "48:20",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/479",
            thumbnail: "/byomkesh-episode-3-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1ooNSFt7hHokwnw51Ds3I4qCi-wsrPPC6/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep4",
            title: "দাওয়াত বনাম ডেট",
            episode: 4,
            duration: "46:56",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/479",
            thumbnail: "/byomkesh-episode-4-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1IIXok69pHus6-q_UBXzQCvxMTmvJdRMq/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep5",
            title: "বিয়ে পাগল বনাম ব্যাচেলর গ্যাং",
            episode: 5,
            duration: "50:38",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/479",
            thumbnail: "/byomkesh-episode-5-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/19B11QAFr9y84gW8QNR4cYDqdT-7aTr1Y/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep6",
            title: "বন্ধুত্বে ফাটল",
            episode: 6,
            duration: "47:13",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/479",
            thumbnail: "/byomkesh-episode-6-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1nYMhdHT-m8njJjv8qWLz5Iig3jONWbzU/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep7",
            title: "পেছনের গল্প সামনে",
            episode: 7,
            duration: "21:20",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/479",
            thumbnail: "/byomkesh-episode-7-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1rZTDRtE57ZZxnBD5yDxAmIhg_47AIs6b/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep8",
            title: "সত্য প্রকাশের রাত",
            episode: 8,
            duration: "22:45",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/479",
            thumbnail: "/byomkesh-episode-3-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1RVP3o3UshZsKmNRehdAXh-CPLSri-iae/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
        ],
      },
    ],
  },
  {
    id: "bongo-original-4",
    title: "Bachelor Point – Season 5 (2025) chapter 2",
    poster: "/s4id.jpg",
    description: "flixory proxy original bongo series bachelor point",
    genre: "natok, Drama",
    year: "2025",
    rating: "preview",
    seasons: [
      {
        id: "season-5 chapter 2",
        title: "Season 5 chapter 2",
        episodes: [
          {
            id: "ep9",
            title: "bachalor point season 5",
            episode: 9,
            duration: "21:29",
            trailerUrl: "https://www.youtube.com/watch?v=itm9H22H8GI",
            telegramUrl: "https://t.me/MVPMCC/1282",
            thumbnail: "/byomkesh-episode-3-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1uKHHZILIWFQPmVOlLI2mUE0veqYwBKCq/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep10",
            title: "bachalor point season 5",
            episode: 10,
            duration: "22:59",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/1284",
            thumbnail: "/byomkesh-episode-10-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1tn1NS-q31B0VLZuWTUPshWMlfncahsWh/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep11",
            title: "bachalor point season 5",
            episode: 11,
            duration: "22:43",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/1286",
            thumbnail: "/byomkesh-episode-11-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1p2qiwa81q_rbpvE7NvMCrohWCcZTanNU/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep12",
            title: "bachalor point season 5",
            episode: 12,
            duration: "21:35",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/1288",
            thumbnail: "/byomkesh-episode-12-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1e1QsQi2UK8bTA9Mg8EKAaNOVOjlPRo0j/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep13",
            title: "bachalor point season 5",
            episode: 13,
            duration: "22:18",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/1290",
            thumbnail: "/byomkesh-episode-13-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1eWNkvZJ-qYQq6SHb3_WRfpUZl4HhvdQr/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep14",
            title: "bachalor point season 5",
            episode: 14,
            duration: "21:29",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/1292",
            thumbnail: "/byomkesh-episode-14-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1Hxq0uJ3wj_NVZxCfw7jcE21GR26uYMuA/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep15",
            title: "bachalor point season 5",
            episode: 15,
            duration: "20:59",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/1294",
            thumbnail: "/byomkesh-episode-15-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1YemIYsoxpsq9WI9utI3keO7z8eim5N5x/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep16",
            title: "bachalor point season 5",
            episode: 16,
            duration: "22:16",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/1296",
            thumbnail: "/byomkesh-episode-16-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1NXhqaiREg_JHyW6hDpApDu2ou4VabmOS/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
        ],
      },
    ],
  },
  {
    id: "bongo-original-5",
    title: "Bachelor Point – Season 5 (2025) chapter 3",
    poster: "/s5id.jpg",
    description: "flixory proxy original bongo series bachelor point",
    genre: "natok, Drama",
    year: "2025",
    rating: "8.9",
    seasons: [
      {
        id: "season-5 chapter 3",
        title: "Season 5 chapter 3",
        episodes: [
          {
            id: "ep17",
            title: "bachalor point season 5",
            episode: 17,
            duration: "22:46",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/661",
            thumbnail: "/byomkesh-episode-17-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1WuAG09TPHShursOcHKhZmnyHFF4PF6wI/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep18",
            title: "bachalor point season 5",
            episode: 18,
            duration: "21:18",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/663",
            thumbnail: "/byomkesh-episode-18-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1CBRv8WBicgNazrcYtLRhEcICpsuVwELy/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep19",
            title: "bachalor point season 5",
            episode: 19,
            duration: "22:57",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/665",
            thumbnail: "/byomkesh-episode-19-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1KUVMJjlG8Tr-KNcb_lgHdoSY56YCv7fw/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep20",
            title: "bachalor point season 5",
            episode: 20,
            duration: "22:40",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/667",
            thumbnail: "/byomkesh-episode-20-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/18LbURSMKaBlamje8nNUV830dAffvxgDl/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep21",
            title: "bachalor point season 5",
            episode: 21,
            duration: "22:59",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/669",
            thumbnail: "/byomkesh-episode-21-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1jeDE8L2FFMMuCmKwXiD_EBV7C-v-S8N-/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep22",
            title: "bachalor point season 5",
            episode: 22,
            duration: "22:53",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/671",
            thumbnail: "/byomkesh-episode-22-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1o1LQ2LR3oIO4B5C-6DluB4_L6OZyBuNh/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep23",
            title: "bachalor point season 5",
            episode: 23,
            duration: "22:59",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/673",
            thumbnail: "/byomkesh-episode-23-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1RQrCs5XE4GaKVL6GGbLGmqQoe8eQag7A/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep24",
            title: "bachalor point season 5",
            episode: 24,
            duration: "21:24",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/675",
            thumbnail: "/byomkesh-episode-24-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1x6_n9g_fETi-pO7FrH8Qj-dckOnus4MZ/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
        ],
      },
    ],
  },
  {
    id: "bongo-original-6",
    title: "Bachelor Point – Season 5 (2025) chapter 4",
    poster: "/s6id.jpg",
    description: "flixory proxy original bongo series bachelor point",
    genre: "natok, Drama",
    year: "2025",
    rating: "8.5",
    seasons: [
      {
        id: "season-5 chapter 4",
        title: "Season 5 chapter 4",
        episodes: [
          {
            id: "ep25",
            title: "bachalor point season 5",
            episode: 25,
            duration: "22:09",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/2190",
            thumbnail: "/byomkesh-episode-25-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1ZG6dYqVUtjdZXsW5UDH8D1GUFRyUJPGw/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep26",
            title: "bachalor point season 5",
            episode: 26,
            duration: "21:06",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/2192",
            thumbnail: "/byomkesh-episode-26-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1_3gdMzpz-w-e4WvzFHyL3rVG_SvYStVw/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep27",
            title: "bachalor point season 5",
            episode: 27,
            duration: "21:12",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/2194",
            thumbnail: "/byomkesh-episode-27-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1hO_mTPj0raWXndFPRJtFTxz8q1lbhFzN/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep28",
            title: "bachalor point season 5",
            episode: 28,
            duration: "21:00",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/2196",
            thumbnail: "/byomkesh-episode-28-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1HfMEnnyHMY4WIyjrQbVd_7A2WNuqq_Yx/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep29",
            title: "bachalor point season 5",
            episode: 29,
            duration: "21:57",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/2198",
            thumbnail: "/byomkesh-episode-29-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1A9wap6T7sOzstrMFA6MLU4oAlc6vq3MG/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep30",
            title: "bachalor point season 5",
            episode: 30,
            duration: "21:19",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/2200",
            thumbnail: "/byomkesh-episode-30-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1yAv78fW45UihaTYSFChTQlXK6SC_0XPV/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep31",
            title: "bachalor point season 5",
            episode: 31,
            duration: "22:03",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/2202",
            thumbnail: "/byomkesh-episode-31-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1-knL7j3-kGvoDSRKIE0RHt6lVPc7fxLY/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep32",
            title: "bachalor point season 5",
            episode: 32,
            duration: "20:29",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/2204",
            thumbnail: "/byomkesh-episode-32-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1ekUj9Z5ju23g-mQsUWq2cj15DZTfgzVX/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
        ],
      },
    ],
  },
  {
    id: "bongo-original-7",
    title: "Bachelor Point – Season 5 (2025) chapter 5",
    poster: "/s7id.jpg",
    description: "flixory proxy original bongo series bachelor point",
    genre: "natok, Drama",
    year: "2025",
    rating: "8.5",
    seasons: [
      {
        id: "season-5 chapter 5",
        title: "Season 5 chapter 5",
        episodes: [
          {
            id: "ep33",
            title: "bachalor point season 5",
            episode: 33,
            duration: "20:30",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/3628",
            thumbnail: "/byomkesh-episode-33-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1Xetq4u90xDyFj7T3WA-Ko0IMXurUAdjX/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep34",
            title: "bachalor point season 5",
            episode: 34,
            duration: "21:59",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/3630",
            thumbnail: "/byomkesh-episode-34-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1EQUa2F9Fv4suauzKPnRMvS24L7ZDNwim/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep35",
            title: "bachalor point season 5",
            episode: 35,
            duration: "22:08",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/3633",
            thumbnail: "/byomkesh-episode-35-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1NKn_R8KrHpD9DHCJJMMqnn6BdmOiHb_Z/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep36",
            title: "bachalor point season 5",
            episode: 36,
            duration: "21:53",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/3635",
            thumbnail: "/byomkesh-episode-4-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1xZXzl6FGUFR1dJGgdA1dPjmzwazopnCQ/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep37",
            title: "bachalor point season 5",
            episode: 37,
            duration: "20:57",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/3637",
            thumbnail: "/byomkesh-episode-37-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1eKH-GSHLyDqf3xUGoDEdMuM-jdilQ7GD/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep38",
            title: "bachalor point season 5",
            episode: 38,
            duration: "21:25",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/3639",
            thumbnail: "/byomkesh-episode-38-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1F5khWaPWj7062OIJwofT_qIlA88W6J7B/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep39",
            title: "bachalor point season 5",
            episode: 39,
            duration: "20:33",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/3641",
            thumbnail: "/byomkesh-episode-39-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1eXzFM3ynUZOsRGmGZ9TPs_XK6dC6rYSB/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
          },
          {
            id: "ep40",
            title: "bachalor point season 5",
            episode: 40,
            duration: "20:39",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/3643",
            thumbnail: "/byomkesh-episode-40-thumbnail.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/172FRjBJRQ5UQ2FnSMkpgcRP7MR3GL0RU/preview",
            googleDriveDownloadUrl: "https://t.me/flixoryproxy/479",
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
