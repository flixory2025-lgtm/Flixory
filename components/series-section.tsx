"use client"

import { useState } from "react"
import { ArrowLeft, Play, Folder, X, Download, Film, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
            googleDriveDownloadUrl: "",
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
            googleDriveDownloadUrl: "",
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
            googleDriveDownloadUrl: "",
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
            googleDriveDownloadUrl: "",
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
            googleDriveDownloadUrl: "",
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
            thumbnail: "/s3id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1oWO9G3vIz6dxnD_qtP4A_96Rbj_zvt9o/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep2",
            title: "প্রেমে বাজিমাত",
            episode: 2,
            duration: "42:15",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/479",
            thumbnail: "/s3id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1x-pYs71Jtz0Dh4mFkQ8VXNd_Ig4qs5wS/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep3",
            title: "চাকরি নাকি ভালোবাসা?",
            episode: 3,
            duration: "48:20",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/479",
            thumbnail: "/s3id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1ooNSFt7hHokwnw51Ds3I4qCi-wsrPPC6/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep4",
            title: "দাওয়াত বনাম ডেট",
            episode: 4,
            duration: "46:56",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/479",
            thumbnail: "/s3id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1IIXok69pHus6-q_UBXzQCvxMTmvJdRMq/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep5",
            title: "বিয়ে পাগল বনাম ব্যাচেলর গ্যাং",
            episode: 5,
            duration: "50:38",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/479",
            thumbnail: "/s3id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/19B11QAFr9y84gW8QNR4cYDqdT-7aTr1Y/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep6",
            title: "বন্ধুত্বে ফাটল",
            episode: 6,
            duration: "47:13",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/479",
            thumbnail: "/s3id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1nYMhdHT-m8njJjv8qWLz5Iig3jONWbzU/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep7",
            title: "পেছনের গল্প সামনে",
            episode: 7,
            duration: "21:20",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/479",
            thumbnail: "/s3id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1rZTDRtE57ZZxnBD5yDxAmIhg_47AIs6b/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep8",
            title: "সত্য প্রকাশের রাত",
            episode: 8,
            duration: "22:45",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/479",
            thumbnail: "/s3id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1RVP3o3UshZsKmNRehdAXh-CPLSri-iae/preview",
            googleDriveDownloadUrl: "",
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
            thumbnail: "/s4id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1uKHHZILIWFQPmVOlLI2mUE0veqYwBKCq/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep10",
            title: "bachalor point season 5",
            episode: 10,
            duration: "22:59",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/1284",
            thumbnail: "/s4id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1tn1NS-q31B0VLZuWTUPshWMlfncahsWh/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep11",
            title: "bachalor point season 5",
            episode: 11,
            duration: "22:43",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/1286",
            thumbnail: "/s4id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1p2qiwa81q_rbpvE7NvMCrohWCcZTanNU/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep12",
            title: "bachalor point season 5",
            episode: 12,
            duration: "21:35",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/1288",
            thumbnail: "/s4id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1e1QsQi2UK8bTA9Mg8EKAaNOVOjlPRo0j/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep13",
            title: "bachalor point season 5",
            episode: 13,
            duration: "22:18",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/1290",
            thumbnail: "/s4id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1eWNkvZJ-qYQq6SHb3_WRfpUZl4HhvdQr/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep14",
            title: "bachalor point season 5",
            episode: 14,
            duration: "21:29",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/1292",
            thumbnail: "/s4id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1Hxq0uJ3wj_NVZxCfw7jcE21GR26uYMuA/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep15",
            title: "bachalor point season 5",
            episode: 15,
            duration: "20:59",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/1294",
            thumbnail: "/s4id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1YemIYsoxpsq9WI9utI3keO7z8eim5N5x/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep16",
            title: "bachalor point season 5",
            episode: 16,
            duration: "22:16",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/1296",
            thumbnail: "/s4id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1NXhqaiREg_JHyW6hDpApDu2ou4VabmOS/preview",
            googleDriveDownloadUrl: "",
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
            thumbnail: "/s5id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1WuAG09TPHShursOcHKhZmnyHFF4PF6wI/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep18",
            title: "bachalor point season 5",
            episode: 18,
            duration: "21:18",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/663",
            thumbnail: "/s5id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1CBRv8WBicgNazrcYtLRhEcICpsuVwELy/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep19",
            title: "bachalor point season 5",
            episode: 19,
            duration: "22:57",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/665",
            thumbnail: "/s5id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1KUVMJjlG8Tr-KNcb_lgHdoSY56YCv7fw/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep20",
            title: "bachalor point season 5",
            episode: 20,
            duration: "22:40",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/667",
            thumbnail: "/s5id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/18LbURSMKaBlamje8nNUV830dAffvxgDl/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep21",
            title: "bachalor point season 5",
            episode: 21,
            duration: "22:59",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/669",
            thumbnail: "/s5id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1jeDE8L2FFMMuCmKwXiD_EBV7C-v-S8N-/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep22",
            title: "bachalor point season 5",
            episode: 22,
            duration: "22:53",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/671",
            thumbnail: "/s5id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1o1LQ2LR3oIO4B5C-6DluB4_L6OZyBuNh/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep23",
            title: "bachalor point season 5",
            episode: 23,
            duration: "22:59",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/673",
            thumbnail: "/s5id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1RQrCs5XE4GaKVL6GGbLGmqQoe8eQag7A/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep24",
            title: "bachalor point season 5",
            episode: 24,
            duration: "21:24",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/675",
            thumbnail: "/s5id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1x6_n9g_fETi-pO7FrH8Qj-dckOnus4MZ/preview",
            googleDriveDownloadUrl: "",
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
            thumbnail: "/s6id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1ZG6dYqVUtjdZXsW5UDH8D1GUFRyUJPGw/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep26",
            title: "bachalor point season 5",
            episode: 26,
            duration: "21:06",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/2192",
            thumbnail: "/s6id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1_3gdMzpz-w-e4WvzFHyL3rVG_SvYStVw/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep27",
            title: "bachalor point season 5",
            episode: 27,
            duration: "21:12",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/2194",
            thumbnail: "/s6id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1hO_mTPj0raWXndFPRJtFTxz8q1lbhFzN/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep28",
            title: "bachalor point season 5",
            episode: 28,
            duration: "21:00",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/2196",
            thumbnail: "/s6id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1HfMEnnyHMY4WIyjrQbVd_7A2WNuqq_Yx/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep29",
            title: "bachalor point season 5",
            episode: 29,
            duration: "21:57",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/2198",
            thumbnail: "/s6id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1A9wap6T7sOzstrMFA6MLU4oAlc6vq3MG/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep30",
            title: "bachalor point season 5",
            episode: 30,
            duration: "21:19",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/2200",
            thumbnail: "/s6id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1yAv78fW45UihaTYSFChTQlXK6SC_0XPV/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep31",
            title: "bachalor point season 5",
            episode: 31,
            duration: "22:03",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/2202",
            thumbnail: "/s6id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1-knL7j3-kGvoDSRKIE0RHt6lVPc7fxLY/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep32",
            title: "bachalor point season 5",
            episode: 32,
            duration: "20:29",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/flixoryproxy/2204",
            thumbnail: "/s6id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1ekUj9Z5ju23g-mQsUWq2cj15DZTfgzVX/preview",
            googleDriveDownloadUrl: "",
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
            thumbnail: "/s7id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1Xetq4u90xDyFj7T3WA-Ko0IMXurUAdjX/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep34",
            title: "bachalor point season 5",
            episode: 34,
            duration: "21:59",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/3630",
            thumbnail: "/s7id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1EQUa2F9Fv4suauzKPnRMvS24L7ZDNwim/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep35",
            title: "bachalor point season 5",
            episode: 35,
            duration: "22:08",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/3633",
            thumbnail: "/s7id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1NKn_R8KrHpD9DHCJJMMqnn6BdmOiHb_Z/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep36",
            title: "bachalor point season 5",
            episode: 36,
            duration: "21:53",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/3635",
            thumbnail: "/s7id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1xZXzl6FGUFR1dJGgdA1dPjmzwazopnCQ/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep37",
            title: "bachalor point season 5",
            episode: 37,
            duration: "20:57",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/3637",
            thumbnail: "/s7id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1eKH-GSHLyDqf3xUGoDEdMuM-jdilQ7GD/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep38",
            title: "bachalor point season 5",
            episode: 38,
            duration: "21:25",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/3639",
            thumbnail: "/s7id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1F5khWaPWj7062OIJwofT_qIlA88W6J7B/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep39",
            title: "bachalor point season 5",
            episode: 39,
            duration: "20:33",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/3641",
            thumbnail: "/s7id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1eXzFM3ynUZOsRGmGZ9TPs_XK6dC6rYSB/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep40",
            title: "bachalor point season 5",
            episode: 40,
            duration: "20:39",
            trailerUrl: "https://www.youtube.com/watch?v=Qwzg-V1DYGE",
            telegramUrl: "https://t.me/MVPMCC/3643",
            thumbnail: "/s7id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/172FRjBJRQ5UQ2FnSMkpgcRP7MR3GL0RU/preview",
            googleDriveDownloadUrl: "",
          },
        ],
      },
    ],
  },
  {
    id: "kdrama-original-8",
    title: "school (2017) season 1",
    poster: "/s8id.jpg",
    description: "flixory proxy original amazon prime video",
    genre: "kdrama, Comedy ,Drama ,Mystery ,School Life",
    year: "2017",
    rating: "7.1",
    seasons: [
      {
        id: "season-1",
        title: "season-1",
        episodes: [
          {
            id: "ep1",
            title: "school (2017)",
            episode: 1,
            duration: "01:02:11",
            trailerUrl: "https://www.youtube.com/watch?v=JV04wyVD1zQ",
            telegramUrl: "https://t.me/flixoryproxy/25",
            thumbnail: "/s8id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1WUNIBqwOTQcio4bsWgSMFGinJBAyW4BS/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep2",
            title: "school (2017)",
            episode: 2,
            duration: "01:02:49",
            trailerUrl: "https://www.youtube.com/watch?v=JV04wyVD1zQ",
            telegramUrl: "https://t.me/flixoryproxy/27",
            thumbnail: "/s8id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/19c15EUyuIqNgps7Axu0qHwrBsP4yQBJL/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep3",
            title: "school (2017)",
            episode: 3,
            duration: "01:03:05",
            trailerUrl: "https://www.youtube.com/watch?v=JV04wyVD1zQ",
            telegramUrl: "https://t.me/flixoryproxy/29",
            thumbnail: "/s8id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/14LaGUMYutxHzB82QNnbJy2cqfZ7wGVza/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep4",
            title: "school (2017)",
            episode: 4,
            duration: "01:03:29",
            trailerUrl: "https://www.youtube.com/watch?v=JV04wyVD1zQ",
            telegramUrl: "https://t.me/flixoryproxy/31",
            thumbnail: "/s8id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1kCNXRm1acREvjk8FWf5RdBnX0xoMv227/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep5",
            title: "school (2017)",
            episode: 5,
            duration: "01:04:20",
            trailerUrl: "https://www.youtube.com/watch?v=JV04wyVD1zQ",
            telegramUrl: "https://t.me/flixoryproxy/33",
            thumbnail: "/s8id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1idjcO3xRDGaRnM3wuy1eOedvQ2NkQ7Tx/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep6",
            title: "school (2017)",
            episode: 6,
            duration: "01:04:43",
            trailerUrl: "https://www.youtube.com/watch?v=JV04wyVD1zQ",
            telegramUrl: "https://t.me/flixoryproxy/35",
            thumbnail: "/s8id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1eCjHOeUt91ZnIydKciDAXfQYJgglomVU/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep7",
            title: "school (2017)",
            episode: 7,
            duration: "01:05:09",
            trailerUrl: "https://www.youtube.com/watch?v=JV04wyVD1zQ",
            telegramUrl: "https://t.me/flixoryproxy/37",
            thumbnail: "/s8id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1XWkhUSc9_-GUcjtUpVYmyYUYNfVx4tTm/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep8",
            title: "school (2017)",
            episode: 8,
            duration: "01:05:39",
            trailerUrl: "https://www.youtube.com/watch?v=JV04wyVD1zQ",
            telegramUrl: "https://t.me/flixoryproxy/39",
            thumbnail: "/s8id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1Xbxxdp5T5LYLUaEVB0FgIbBTxYlx0Zvk/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep9",
            title: "school (2017)",
            episode: 9,
            duration: "01:04:59",
            trailerUrl: "https://www.youtube.com/watch?v=JV04wyVD1zQ",
            telegramUrl: "https://t.me/flixoryproxy/41",
            thumbnail: "/s8id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1u2E7bnqKInuWGrG2x4JthTjFv83zI1PI/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep10",
            title: "school (2017)",
            episode: 10,
            duration: "01:04:48",
            trailerUrl: "https://www.youtube.com/watch?v=JV04wyVD1zQ",
            telegramUrl: "https://t.me/flixoryproxy/43",
            thumbnail: "/s8id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1CWtAaAZg0CMKGNYNkaf2JsWVA6AwWToS/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep11",
            title: "school (2017)",
            episode: 11,
            duration: "01:05:36",
            trailerUrl: "https://www.youtube.com/watch?v=JV04wyVD1zQ",
            telegramUrl: "https://t.me/flixoryproxy/45",
            thumbnail: "/s8id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1oCDQQljekX4UKQV5U56ngtJnBzFcSu9c/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep12",
            title: "school (2017)",
            episode: 12,
            duration: "01:03:13",
            trailerUrl: "https://www.youtube.com/watch?v=JV04wyVD1zQ",
            telegramUrl: "https://t.me/flixoryproxy/47",
            thumbnail: "/s8id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1Y4mmdT0k3pRi8EQNj9_RT6YhY0tipgfx/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep13",
            title: "school (2017)",
            episode: 13,
            duration: "01:03:13",
            trailerUrl: "https://www.youtube.com/watch?v=JV04wyVD1zQ",
            telegramUrl: "https://t.me/flixoryproxy/49",
            thumbnail: "/s8id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/18Dhx7vtu1CnVKl11nEWadJzdryXx1RcL/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep14",
            title: "school (2017)",
            episode: 14,
            duration: "01:03:52",
            trailerUrl: "https://www.youtube.com/watch?v=JV04wyVD1zQ",
            telegramUrl: "https://t.me/flixoryproxy/51",
            thumbnail: "/s8id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1UecyxggRMLPLtfClJ3cMbPo7i9NcSKgv/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep15",
            title: "school (2017)",
            episode: 15,
            duration: "01:03:32",
            trailerUrl: "https://www.youtube.com/watch?v=JV04wyVD1zQ",
            telegramUrl: "https://t.me/flixoryproxy/53",
            thumbnail: "/s8id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1wanBJKYPt9Ck6SbsC9w5qpXmmE-zXyCq/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep16",
            title: "school (2017) season 1 complete",
            episode: 16,
            duration: "01:04:23",
            trailerUrl: "https://www.youtube.com/watch?v=JV04wyVD1zQ",
            telegramUrl: "https://t.me/flixoryproxy/55",
            thumbnail: "/s8id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1MaUszvyBgi1aCste66wz_r95pkg6_PmA/preview",
            googleDriveDownloadUrl: "",
          },
        ],
      },
    ],
  },
  {
    id: "Netflix-original-9",
    title: "My Name (2021)",
    poster: "/s9id.jpg",
    description: "flixory proxy a original netflix series",
    genre: "Action | Crime | Thriller",
    year: "2021",
    rating: "7.8",
    seasons: [
      {
        id: "season-1",
        title: "season-1",
        episodes: [
          {
            id: "ep1",
            title: "My Name (2021) season 1",
            episode: 1,
            duration: "54:08",
            trailerUrl: "https://www.youtube.com/watch?v=lDZWs4Aa8C0",
            telegramUrl: "https://t.me/flixoryproxy/172",
            thumbnail: "/s9id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1Kp_yPbGUBk10nvaqWl-_EJCEtprrXREt/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep2",
            title: "My Name (2021) season 1",
            episode: 2,
            duration: "46:23",
            trailerUrl: "https://www.youtube.com/watch?v=lDZWs4Aa8C0",
            telegramUrl: "https://t.me/flixoryproxy/174",
            thumbnail: "/s9id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1mnJkTZey0MXnwDXX6tzI6tICKPqFn7DL/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep3",
            title: "My Name (2021) season 1",
            episode: 3,
            duration: "47:27",
            trailerUrl: "https://www.youtube.com/watch?v=lDZWs4Aa8C0",
            telegramUrl: "https://t.me/flixoryproxy/176",
            thumbnail: "/s9id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1yW3QHKuy0dCXtgAMR1X0epKwxQmGLhrG/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep4",
            title: "My Name (2021) season 1",
            episode: 4,
            duration: "46:33",
            trailerUrl: "https://www.youtube.com/watch?v=lDZWs4Aa8C0",
            telegramUrl: "https://t.me/flixoryproxy/178",
            thumbnail: "/s9id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1biOaQCzHYtE1oVjcwxueMIYp7DBK1Q95/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep5",
            title: "My Name (2021) season 1",
            episode: 5,
            duration: "50:46",
            trailerUrl: "https://www.youtube.com/watch?v=lDZWs4Aa8C0",
            telegramUrl: "https://t.me/flixoryproxy/180",
            thumbnail: "/s9id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1bDCZhZKrHNcG33W9wAM_mQDOmsnzAOHG/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep6",
            title: "My Name (2021) season 1",
            episode: 6,
            duration: "49:49",
            trailerUrl: "https://www.youtube.com/watch?v=lDZWs4Aa8C0",
            telegramUrl: "https://t.me/flixoryproxy/182",
            thumbnail: "/s9id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/12NV6v-cDSmkl1cMbXD4tt16lIsCc2xn5/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep7",
            title: "My Name (2021) season 1",
            episode: 7,
            duration: "45:27",
            trailerUrl: "https://www.youtube.com/watch?v=lDZWs4Aa8C0",
            telegramUrl: "https://t.me/flixoryproxy/184",
            thumbnail: "/s9id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1HXlHtT44_N3CIRaSx_jp8X0xNdmQvDsb/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep8",
            title: "My Name (2021) season 1",
            episode: 8,
            duration: "58:32",
            trailerUrl: "https://www.youtube.com/watch?v=lDZWs4Aa8C0",
            telegramUrl: "https://t.me/flixoryproxy/186",
            thumbnail: "/s9id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1yGgkVH94bb_9nH2uqlUcnZy0PP8ZcQlr/preview",
            googleDriveDownloadUrl: "",
          },
        ],
      },
    ],
  },
  {
    id: "Amazon-original-10",
    title: "the family man season 1 (2019)",
    poster: "/s10id.jpg",
    description: "flixory proxy a original amazon prime series",
    genre: "Action | Drama | Thriller",
    year: "2019",
    rating: "8.7",
    seasons: [
      {
        id: "season-1",
        title: "Season 1",
        episodes: [
          {
            id: "ep1",
            title: "the family man season 1",
            episode: 1,
            duration: "53:29",
            trailerUrl: "https://www.youtube.com/watch?v=XatRGut65VI",
            telegramUrl: "https://t.me/flixoryproxy/253",
            thumbnail: "/s10id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1mt_XZBS_Jj_YqH16XoYZ2VNWDdLwyabb/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep2",
            title: "the family man season 1",
            episode: 2,
            duration: "47:10",
            trailerUrl: "https://www.youtube.com/watch?v=XatRGut65VI",
            telegramUrl: "https://t.me/flixoryproxy/255",
            thumbnail: "/s10id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/132JYfaD1rmEwwF2qAZsEek3C8zMTjqan/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep3",
            title: "the family man season 1",
            episode: 3,
            duration: "46:59",
            trailerUrl: "https://www.youtube.com/watch?v=XatRGut65VI",
            telegramUrl: "https://t.me/flixoryproxy/257",
            thumbnail: "/s10id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1cVaMiqeMW7ke6ptJIllzwIinPulkRhoW/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep4",
            title: "the family man season 1",
            episode: 4,
            duration: "42:32",
            trailerUrl: "https://www.youtube.com/watch?v=XatRGut65VI",
            telegramUrl: "https://t.me/flixoryproxy/259",
            thumbnail: "/s10id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1FOQxQQfoK0FVroCu8OUdeGRqv74haEx0/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep5",
            title: "the family man season 1",
            episode: 5,
            duration: "48:12",
            trailerUrl: "https://www.youtube.com/watch?v=XatRGut65VI",
            telegramUrl: "https://t.me/flixoryproxy/261",
            thumbnail: "/s10id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1qqhjDY2CBR0h95CW3JpOAz2DpGpJj1AK/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep6",
            title: "the family man season 1",
            episode: 6,
            duration: "40:00",
            trailerUrl: "https://www.youtube.com/watch?v=XatRGut65VI",
            telegramUrl: "https://t.me/flixoryproxy/263",
            thumbnail: "/s10id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1mTKzxzFJzGk3o2AFeJ_udgQVPedGciYd/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep7",
            title: "the family man season 1",
            episode: 7,
            duration: "39:59",
            trailerUrl: "https://www.youtube.com/watch?v=XatRGut65VI",
            telegramUrl: "https://t.me/flixoryproxy/265",
            thumbnail: "/s10id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/15_VeYczELgiQMfb9GoKMmZyNnF01PhG4/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep8",
            title: "the family man season 1",
            episode: 8,
            duration: "43:41",
            trailerUrl: "https://www.youtube.com/watch?v=XatRGut65VI",
            telegramUrl: "https://t.me/flixoryproxy/267",
            thumbnail: "/s10id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1oH8h-fdwvmb5b7XuWQVG6-kqLqccgukM/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep9",
            title: "the family man season 1",
            episode: 9,
            duration: "38:00",
            trailerUrl: "https://www.youtube.com/watch?v=XatRGut65VI",
            telegramUrl: "https://t.me/flixoryproxy/269",
            thumbnail: "/s10id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1DiX4v51XxNQ2wvAk4OREpWhU7Zyignz7/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep10",
            title: "the family man season 1",
            episode: 10,
            duration: "48:48",
            trailerUrl: "https://www.youtube.com/watch?v=XatRGut65VI",
            telegramUrl: "https://t.me/flixoryproxy/271",
            thumbnail: "/s10id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1N_P5VnCGnTNKoIqDbZ3y3szshXrEVIS3/preview",
            googleDriveDownloadUrl: "",
          },
        ],
      },
    ],
  },
  {
    id: "netflix-original-11",
    title: "wednesday (2025)",
    poster: "/s11id.jpg",
    description: "flixory proxy a original netflix series",
    genre: "Comedy | Crime | Fantasy",
    year: "2025",
    rating: "8.1",
    seasons: [
      {
        id: "season-1",
        title: "Season 1",
        episodes: [
          {
            id: "ep1",
            title: "wednesday season 1",
            episode: 1,
            duration: "59:28",
            trailerUrl: "https://www.youtube.com/watch?v=E7kKBbsSQKw",
            telegramUrl: "https://t.me/flixoryproxy/1294",
            thumbnail: "/s11id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1qoH9s2UtKg5_NyQhGD28yT0peVzS8BKr/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep2",
            title: "wednesday season 1",
            episode: 2,
            duration: "48:47",
            trailerUrl: "https://www.youtube.com/watch?v=E7kKBbsSQKw",
            telegramUrl: "https://t.me/flixoryproxy/1296",
            thumbnail: "/s11id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1wtK-Hb81DEzm5NcAeqBlg4xa5rWhL721/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep3",
            title: "wednesday season 1",
            episode: 3,
            duration: "48:27",
            trailerUrl: "https://www.youtube.com/watch?v=E7kKBbsSQKw",
            telegramUrl: "https://t.me/flixoryproxy/1298",
            thumbnail: "/s11id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/16uoQK0IKx_wCelwZIQ4AaBicaC3z6jxy/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep4",
            title: "wednesday season 1",
            episode: 4,
            duration: "49:43",
            trailerUrl: "https://www.youtube.com/watch?v=E7kKBbsSQKw",
            telegramUrl: "https://t.me/flixoryproxy/1300",
            thumbnail: "/s11id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1BD1wpgn1Hbuhf09sdth2f7ZXWBFdw-7r/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep5",
            title: "wednesday season 1",
            episode: 5,
            duration: "52:09",
            trailerUrl: "https://www.youtube.com/watch?v=E7kKBbsSQKw",
            telegramUrl: "https://t.me/flixoryproxy/1302",
            thumbnail: "/s11id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1QVdJimpSt0NnrAXqK8RTcmtwwZUB3Y5O/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep6",
            title: "wednesday season 1",
            episode: 6,
            duration: "50:17",
            trailerUrl: "https://www.youtube.com/watch?v=E7kKBbsSQKw",
            telegramUrl: "https://t.me/flixoryproxy/1304",
            thumbnail: "/s11id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1IlW7ZLVPxizvEj40-FScViuIqM5EgvhV/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep7",
            title: "wednesday season 1",
            episode: 7,
            duration: "47:25",
            trailerUrl: "https://www.youtube.com/watch?v=E7kKBbsSQKw",
            telegramUrl: "https://t.me/flixoryproxy/1306",
            thumbnail: "/s11id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1x62Vtk0EY2j6gY-Z7qX19emzCMT4JQgx/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep8",
            title: "wednesday season 1",
            episode: 8,
            duration: "52:15",
            trailerUrl: "https://www.youtube.com/watch?v=E7kKBbsSQKw",
            telegramUrl: "https://t.me/flixoryproxy/1308",
            thumbnail: "/s11id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/15CLbsTEqjM5v1LVd6md85EWsAMrZrLeC/preview",
            googleDriveDownloadUrl: "",
          },
        ],
      },
      {
        id: "season-2 part 1",
        title: "Season 2 part 1",
        episodes: [
          {
            id: "ep1",
            title: "wednesday season 2 part 1",
            episode: 1,
            duration: "1:00:22",
            trailerUrl: "https://www.youtube.com/watch?v=51HkogV-W7c",
            telegramUrl: "https://t.me/flixoryproxy/281",
            thumbnail: "/s11id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1QpPGhHh87BzMKYwrGcGdKF_ZmpztajRY/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep2",
            title: "wednesday season 2 part 1",
            episode: 2,
            duration: "1:01:11",
            trailerUrl: "https://www.youtube.com/watch?v=51HkogV-W7c",
            telegramUrl: "https://t.me/flixoryproxy/283",
            thumbnail: "/s11id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1K0HTlMZo89qcU2ih7MqBTqWxY1YdHUZ0/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep3",
            title: "wednesday season 2 part 1",
            episode: 3,
            duration: "59:47",
            trailerUrl: "https://www.youtube.com/watch?v=51HkogV-W7c",
            telegramUrl: "https://t.me/flixoryproxy/285",
            thumbnail: "/s11id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1Ab2lC4JCle9VAuJzBRFEOwYuS3KKqxjq/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep4",
            title: "wednesday season 2 part 1",
            episode: 4,
            duration: "1:00:19",
            trailerUrl: "https://www.youtube.com/watch?v=51HkogV-W7c",
            telegramUrl: "https://t.me/flixoryproxy/287",
            thumbnail: "/s11id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1x_0Gn1UfdmbANNypuCKfLjbLlEUNOAuB/preview",
            googleDriveDownloadUrl: "",
          },
        ],
      },
      {
        id: "season-2 part 2",
        title: "Season 2 part 2",
        episodes: [
          {
            id: "ep5",
            title: "wednesday season 2 part 2",
            episode: 5,
            duration: "1:00:22",
            trailerUrl: "https://www.youtube.com/watch?v=LyJyCG_COis",
            telegramUrl: "https://t.me/flixoryproxy/281",
            thumbnail: "/s11id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1bvZkefQtrvO69rgUI5t8GhqtY7bipLbu/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep6",
            title: "wednesday season 2 part 2",
            episode: 6,
            duration: "1:01:11",
            trailerUrl: "https://www.youtube.com/watch?v=LyJyCG_COis",
            telegramUrl: "https://t.me/flixoryproxy/283",
            thumbnail: "/s11id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1Z2ggbSZBZeRZU6kSN603VhOi4HEI08-o/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep7",
            title: "wednesday season 2 part 2",
            episode: 7,
            duration: "59:47",
            trailerUrl: "https://www.youtube.com/watch?v=LyJyCG_COis",
            telegramUrl: "https://t.me/flixoryproxy/285",
            thumbnail: "/s11id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1nY33ZQQJzgdzRW6aUGNGg15qnD3QlNGs/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep8",
            title: "wednesday season 2 part 2",
            episode: 8,
            duration: "1:00:19",
            trailerUrl: "https://www.youtube.com/watch?v=LyJyCG_COis",
            telegramUrl: "https://t.me/flixoryproxy/287",
            thumbnail: "/s11id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1Mch0xz8Bc5h8kB-xO2icg5ZmdwMxyqX_/preview",
            googleDriveDownloadUrl: "",
          },
        ],
      },
    ],
  },
  {
    id: "bongo-original-13",
    title: "The emoji (2024) season 1",
    poster: "/s13id.jpg",
    description: "flixory proxy original bongo series",
    genre: "Animation | Adventure | Comedy",
    year: "2024",
    rating: "7.1",
    seasons: [
      {
        id: "season-1",
        title: "season-1",
        episodes: [
          {
            id: "ep1",
            title: "The emoji (2024) season 1",
            episode: 1,
            duration: "28:35",
            trailerUrl: "https://www.youtube.com/watch?v=JvCuK6HCzaU",
            telegramUrl: "https://t.me/flixoryproxy/291",
            thumbnail: "/s13id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1_4nEzRW2FOciz6pU-j0QbiBxKSYuTLaN/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep2",
            title: "The emoji (2024) season 1",
            episode: 2,
            duration: "26:56",
            trailerUrl: "https://www.youtube.com/watch?v=JvCuK6HCzaU",
            telegramUrl: "https://t.me/flixoryproxy/293",
            thumbnail: "/s13id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1XUdGYDI0Zrmf0lbYvPUnR4xvkox88OJY/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep3",
            title: "The emoji (2024) season 1",
            episode: 3,
            duration: "33:12",
            trailerUrl: "https://www.youtube.com/watch?v=JvCuK6HCzaU",
            telegramUrl: "https://t.me/flixoryproxy/295",
            thumbnail: "/s13id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/15uqzfMr4GWpA35ZI69Q2WXJRLArVCdiR/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep4",
            title: "The emoji (2024) season 1",
            episode: 4,
            duration: "33:00",
            trailerUrl: "https://www.youtube.com/watch?v=JvCuK6HCzaU",
            telegramUrl: "https://t.me/flixoryproxy/297",
            thumbnail: "/s13id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1cOO_lzvRA7jpXvTIN5ge7jH8c8ukZ2FU/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep5",
            title: "The emoji (2024) season 1",
            episode: 5,
            duration: "30:06",
            trailerUrl: "https://www.youtube.com/watch?v=JvCuK6HCzaU",
            telegramUrl: "https://t.me/flixoryproxy/299",
            thumbnail: "/s13id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1pcRCbFR3mAZ8W3kVXKS9ObVr1mnaWXaD/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep6",
            title: "The emoji (2024) season 1",
            episode: 6,
            duration: "30:17",
            trailerUrl: "https://www.youtube.com/watch?v=JvCuK6HCzaU",
            telegramUrl: "https://t.me/flixoryproxy/301",
            thumbnail: "/s13id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1rkzkc-cHgMZIuUTumkjdXw3JWRaNxqvS/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep7",
            title: "The emoji (2024) season 1",
            episode: 7,
            duration: "36:52",
            trailerUrl: "https://www.youtube.com/watch?v=JvCuK6HCzaU",
            telegramUrl: "https://t.me/flixoryproxy/303",
            thumbnail: "/s13id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1C-v_-2y0ieyiMhCljsIMuHGcTSRcmM_f/preview",
            googleDriveDownloadUrl: "",
          },
        ],
      },
    ],
  },
  {
    id: "Netflix-original-14",
    title: "Alice in Borderland: Season 1 (2020)",
    poster: "/s14id.jpg",
    description: "flixory proxy a original netflix series",
    genre: "Action | Drama | Mystery",
    year: "2020",
    rating: "7.7",
    seasons: [
      {
        id: "season-1",
        title: "season-1",
        episodes: [
          {
            id: "ep1",
            title: "Alice in Borderland: Season 1",
            episode: 1,
            duration: "49:09",
            trailerUrl: "https://www.youtube.com/watch?v=49_44FFKZ1M",
            telegramUrl: "https://t.me/flixoryproxy/347",
            thumbnail: "/s14id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1jTHvlG4g2RTnw44Vv-6YL6Du_LKQRdDV/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep2",
            title: "Alice in Borderland: Season 1",
            episode: 2,
            duration: "51:23",
            trailerUrl: "https://www.youtube.com/watch?v=49_44FFKZ1M",
            telegramUrl: "https://t.me/flixoryproxy/349",
            thumbnail: "/s14id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1cDte6mP5Sw-bx5FUSK8QddTn9JcQ0N3C/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep3",
            title: "Alice in Borderland: Season 1",
            episode: 3,
            duration: "43:07",
            trailerUrl: "https://www.youtube.com/watch?v=49_44FFKZ1M",
            telegramUrl: "https://t.me/flixoryproxy/351",
            thumbnail: "/s14id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1JfMK9N1EM-GixJokBHKa8L1b1BLkV41F/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep4",
            title: "Alice in Borderland: Season 1",
            episode: 4,
            duration: "47:49",
            trailerUrl: "https://www.youtube.com/watch?v=49_44FFKZ1M",
            telegramUrl: "https://t.me/flixoryproxy/353",
            thumbnail: "/s14id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1Ejr95ytbe_KmkCCIRxiWyxCcP8_CQmvH/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep5",
            title: "Alice in Borderland: Season 1",
            episode: 5,
            duration: "52:26",
            trailerUrl: "https://www.youtube.com/watch?v=49_44FFKZ1M",
            telegramUrl: "https://t.me/flixoryproxy/355",
            thumbnail: "/s14id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1O3tZTfK6YI67DESpqzEhm4TmXU8_xBw1/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep6",
            title: "Alice in Borderland: Season 1",
            episode: 6,
            duration: "42:19",
            trailerUrl: "https://www.youtube.com/watch?v=49_44FFKZ1M",
            telegramUrl: "https://t.me/flixoryproxy/357",
            thumbnail: "/s14id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1qFrvFTyZQH40n_44yVWxqsiZCmxS5o10/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep7",
            title: "Alice in Borderland: Season 1",
            episode: 7,
            duration: "49:03",
            trailerUrl: "https://www.youtube.com/watch?v=49_44FFKZ1M",
            telegramUrl: "https://t.me/flixoryproxy/359",
            thumbnail: "/s14id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1pgTpxepP0jxhljfjbbBnC1mul8eSH8ui/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep8",
            title: "Alice in Borderland: Season 1",
            episode: 8,
            duration: "53:46",
            trailerUrl: "https://www.youtube.com/watch?v=49_44FFKZ1M",
            telegramUrl: "https://t.me/flixoryproxy/361",
            thumbnail: "/s14id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1gy_scwrDcsz2WVmxyrBk_EQnZxKwGVHC/preview",
            googleDriveDownloadUrl: "",
          },
        ],
      },
      {
        id: "season-2",
        title: "season-2",
        episodes: [
          {
            id: "ep1",
            title: "Alice in Borderland: Season 2",
            episode: 1,
            duration: "48:35",
            trailerUrl: "https://www.youtube.com/watch?v=lDZWs4Aa8C0",
            telegramUrl: "https://t.me/flixoryproxy/366",
            thumbnail: "/s14id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1BKTc6nBmxyxYP3aX50aWRv_U7LeZhTyG/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep2",
            title: "Alice in Borderland: Season 2",
            episode: 2,
            duration: "52:12",
            trailerUrl: "https://www.youtube.com/watch?v=kScNmy_wKz4",
            telegramUrl: "https://t.me/flixoryproxy/368",
            thumbnail: "/s14id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1UYLaZQKJkUyB1rKRjsnKtZqXMbmxujBc/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep3",
            title: "Alice in Borderland: Season 2",
            episode: 3,
            duration: "1:00:16",
            trailerUrl: "https://www.youtube.com/watch?v=kScNmy_wKz4",
            telegramUrl: "https://t.me/flixoryproxy/370",
            thumbnail: "/s14id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1RGT4A3seDNiYZig2JHpAecSKayPkux4V/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep4",
            title: "Alice in Borderland: Season 2",
            episode: 4,
            duration: "59:32",
            trailerUrl: "https://www.youtube.com/watch?v=kScNmy_wKz4",
            telegramUrl: "https://t.me/flixoryproxy/372",
            thumbnail: "/s14id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1YCrAH-ods8hYkzyPbB3Bke43Nu4kr41L/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep5",
            title: "Alice in Borderland: Season 2",
            episode: 5,
            duration: "1:06:19",
            trailerUrl: "https://www.youtube.com/watch?v=kScNmy_wKz4",
            telegramUrl: "https://t.me/flixoryproxy/374",
            thumbnail: "/s14id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1Mm4G-lJAeM4ZK-5F6N9Czh664gZpNtwh/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep6",
            title: "Alice in Borderland: Season 2",
            episode: 6,
            duration: "1:15:35",
            trailerUrl: "https://www.youtube.com/watch?v=kScNmy_wKz4",
            telegramUrl: "https://t.me/flixoryproxy/376",
            thumbnail: "/s14id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1MQefEycvEhLUuQkT6lm_8YmCm68gyxV-/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep7",
            title: "Alice in Borderland: Season 2",
            episode: 7,
            duration: "1:20:17",
            trailerUrl: "https://www.youtube.com/watch?v=kScNmy_wKz4",
            telegramUrl: "https://t.me/flixoryproxy/378",
            thumbnail: "/s14id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1SjjTndtLX3c9qyo7K1ndtHU0oUxwzPWS/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep8",
            title: "Alice in Borderland: Season 2",
            episode: 8,
            duration: "1:07:53",
            trailerUrl: "https://www.youtube.com/watch?v=kScNmy_wKz4",
            telegramUrl: "https://t.me/flixoryproxy/380",
            thumbnail: "/s14id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1s3u1Juce_Zs8JQ6Cqqs0r5ew-2KRlGYh/preview",
            googleDriveDownloadUrl: "",
          },
        ],
      },
      {
        id: "season-3",
        title: "season-3",
        episodes: [
          {
            id: "ep1",
            title: "Alice in Borderland: Season 3",
            episode: 1,
            duration: "1:01:47",
            trailerUrl: "https://www.youtube.com/watch?v=1FP49Fg9meg",
            telegramUrl: "https://t.me/flixoryproxy/2919",
            thumbnail: "/s14id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1LKTLlsHXhJAecOTO-UwFv1XyXuFYLFKi/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep2",
            title: "Alice in Borderland: Season 3",
            episode: 2,
            duration: "55:55",
            trailerUrl: "https://www.youtube.com/watch?v=1FP49Fg9meg",
            telegramUrl: "https://t.me/flixoryproxy/2921",
            thumbnail: "/s14id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1LCN5S_8NQJxrZjATzYpa6AwBhB0CrUz8/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep3",
            title: "Alice in Borderland: Season 3",
            episode: 3,
            duration: "1:02:08",
            trailerUrl: "https://www.youtube.com/watch?v=1FP49Fg9meg",
            telegramUrl: "https://t.me/flixoryproxy/2923",
            thumbnail: "/s14id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1--hyxNvwHBiTWTrZ5dVMd98caZwjl9L-/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep4",
            title: "Alice in Borderland: Season 3",
            episode: 4,
            duration: "1:01:39",
            trailerUrl: "https://www.youtube.com/watch?v=1FP49Fg9meg",
            telegramUrl: "https://t.me/flixoryproxy/2925",
            thumbnail: "/s14id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1YgNit6C2DP5R5_PDhjLpiVQVw2SX6Gqf/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep5",
            title: "Alice in Borderland: Season 3",
            episode: 5,
            duration: "1:17:19",
            trailerUrl: "https://www.youtube.com/watch?v=1FP49Fg9meg",
            telegramUrl: "https://t.me/flixoryproxy/2927",
            thumbnail: "/s14id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1tT-Vzm5fsEUArOkaCn83S3WM9yH75F2v/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep6",
            title: "Alice in Borderland: Season 3",
            episode: 6,
            duration: "1:16:29",
            trailerUrl: "https://www.youtube.com/watch?v=1FP49Fg9meg",
            telegramUrl: "https://t.me/flixoryproxy/2929",
            thumbnail: "/s14id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1--NZxiTUqj-NpvzVDJlSe7vIXDTxTCgz/preview",
            googleDriveDownloadUrl: "",
          },
        ],
      },
    ],
  },
  {
    id: "Netflix-original-15",
    title: "All of Us Are Dead (2022)",
    poster: "/s15id.jpg",
    description: "flixory proxy a original NETFLIX series",
    genre: "Action | Horror | Drama | Zombie",
    year: "2022",
    rating: "8.7",
    seasons: [
      {
        id: "season-1",
        title: "Season 1",
        episodes: [
          {
            id: "ep1",
            title: "All of Us Are Dead (2022) season 1",
            episode: 1,
            duration: "1:06:22",
            trailerUrl: "https://www.youtube.com/watch?v=mScYq7PzagY",
            telegramUrl: "https://t.me/flixoryproxy/385",
            thumbnail: "/s15id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1jKEyyv0gW5CLZXKly-iknpJu5dUfGIgw/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep2",
            title: "All of Us Are Dead (2022) season 1",
            episode: 2,
            duration: "1:10:01",
            trailerUrl: "https://www.youtube.com/watch?v=mScYq7PzagY",
            telegramUrl: "https://t.me/flixoryproxy/387",
            thumbnail: "/s15id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1zgu-fJ5_ELRmL_o7BQ5coeEsgm19GSBy/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep3",
            title: "All of Us Are Dead (2022) season 1",
            episode: 3,
            duration: "1:02:18",
            trailerUrl: "https://www.youtube.com/watch?v=mScYq7PzagY",
            telegramUrl: "https://t.me/flixoryproxy/389",
            thumbnail: "/s15id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/17W52GBN96hjgzLNCGcPxl1DNQoLFEU8d/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep4",
            title: "All of Us Are Dead (2022) season 1",
            episode: 4,
            duration: "1:11:33",
            trailerUrl: "https://www.youtube.com/watch?v=mScYq7PzagY",
            telegramUrl: "https://t.me/flixoryproxy/391",
            thumbnail: "/s15id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1N9Ebo_30OdBmGBpaafa_fva3as597vYP/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep5",
            title: "All of Us Are Dead (2022) season 1",
            episode: 5,
            duration: "56:18",
            trailerUrl: "https://www.youtube.com/watch?v=mScYq7PzagY",
            telegramUrl: "https://t.me/flixoryproxy/393",
            thumbnail: "/s15id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1Nr8IeLhgGXA33Wm_bQGQMEIW1oZ4KqPa/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep6",
            title: "All of Us Are Dead (2022) season 1",
            episode: 6,
            duration: "1:06:44",
            trailerUrl: "https://www.youtube.com/watch?v=mScYq7PzagY",
            telegramUrl: "https://t.me/flixoryproxy/395",
            thumbnail: "/s15id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1RfSYBZRktoqCyz-GqPLYH9AYDx1imF-8/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep7",
            title: "All of Us Are Dead (2022) season 1",
            episode: 7,
            duration: "59:32",
            trailerUrl: "https://www.youtube.com/watch?v=mScYq7PzagY",
            telegramUrl: "https://t.me/flixoryproxy/397",
            thumbnail: "/s15id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1L7i9H2ZBlcE3t7EcwZaOIkpVFpX58yWA/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep8",
            title: "All of Us Are Dead (2022) season 1",
            episode: 8,
            duration: "57:30",
            trailerUrl: "https://www.youtube.com/watch?v=mScYq7PzagY",
            telegramUrl: "https://t.me/flixoryproxy/399",
            thumbnail: "/s15id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1jHEu6gDKxMpBmyZCcYvaota5ST1vifCV/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep9",
            title: "All of Us Are Dead (2022) season 1",
            episode: 9,
            duration: "1:00:52",
            trailerUrl: "https://www.youtube.com/watch?v=mScYq7PzagY",
            telegramUrl: "https://t.me/flixoryproxy/401",
            thumbnail: "/s15id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1oeRFWrq0-9jKKR3INdxS7YhDBUgl9dN4/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep10",
            title: "All of Us Are Dead (2022) season 1",
            episode: 10,
            duration: "53:52",
            trailerUrl: "https://www.youtube.com/watch?v=mScYq7PzagY",
            telegramUrl: "https://t.me/flixoryproxy/403",
            thumbnail: "/s15id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1b35zbBaOSuYjbh4HR25Jpb-9bOyrjfsM/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep11",
            title: "All of Us Are Dead (2022) season 1",
            episode: 11,
            duration: "55:38",
            trailerUrl: "https://www.youtube.com/watch?v=mScYq7PzagY",
            telegramUrl: "https://t.me/flixoryproxy/405",
            thumbnail: "/s15id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1nx8IYvdQIGfl6OK3DYs75Q7Q5an34pus/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep12",
            title: "All of Us Are Dead (2022) season 1",
            episode: 12,
            duration: "53:01",
            trailerUrl: "https://www.youtube.com/watch?v=mScYq7PzagY",
            telegramUrl: "https://t.me/flixoryproxy/407",
            thumbnail: "/s15id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1b_pl4JEyi0dB1ppwEAlhej5R9ZCGHZNB/preview",
            googleDriveDownloadUrl: "",
          },
        ],
      },
    ],
  },
  {
    id: "netflix-original-16",
    title: "Squid Game (2021)",
    poster: "/s16id.jpg",
    description: "flixory proxy a original netflix series",
    genre: "Comedy | Crime | Fantasy",
    year: "2021",
    rating: "8.1",
    seasons: [
      {
        id: "season-1",
        title: "Season 1",
        episodes: [
          {
            id: "ep1",
            title: "Squid Game (2021) season 1",
            episode: 1,
            duration: "59:42",
            trailerUrl: "https://www.youtube.com/watch?v=hEqk10Kbgh4",
            telegramUrl: "https://t.me/flixoryproxy/412",
            thumbnail: "/s16id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1Sa48zT0B2ch--jMIkSrigW2HTae8kvPh/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep2",
            title: "Squid Game (2021) season 1",
            episode: 2,
            duration: "1:02:32",
            trailerUrl: "https://www.youtube.com/watch?v=hEqk10Kbgh4",
            telegramUrl: "https://t.me/flixoryproxy/414",
            thumbnail: "/s16id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1iUd67VEmP77dbGkEH5keMFXTYAIawL8r/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep3",
            title: "Squid Game (2021) season 1",
            episode: 3,
            duration: "54:06",
            trailerUrl: "https://www.youtube.com/watch?v=hEqk10Kbgh4",
            telegramUrl: "https://t.me/flixoryproxy/416",
            thumbnail: "/s16id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1kUDHoF3G3045ydE4MfIYVlk1t5rL1YEl/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep4",
            title: "Squid Game (2021) season 1",
            episode: 4,
            duration: "54:54",
            trailerUrl: "https://www.youtube.com/watch?v=hEqk10Kbgh4",
            telegramUrl: "https://t.me/flixoryproxy/418",
            thumbnail: "/s16id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1U6XKoqxTAdlAla79vHU7ai0YDL1pKPFx/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep5",
            title: "Squid Game (2021) season 1",
            episode: 5,
            duration: "51:35",
            trailerUrl: "https://www.youtube.com/watch?v=hEqk10Kbgh4",
            telegramUrl: "https://t.me/flixoryproxy/420",
            thumbnail: "/s16id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1rPjFwzFFsOzy56r_OoDClVeQ8kYH6OEX/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep6",
            title: "Squid Game (2021) season 1",
            episode: 6,
            duration: "1:01:38",
            trailerUrl: "https://www.youtube.com/watch?v=hEqk10Kbgh4",
            telegramUrl: "https://t.me/flixoryproxy/422",
            thumbnail: "/s16id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1QDrfB_Ezo4AU_iskKfhIlPt2v4zM9FeZ/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep7",
            title: "Squid Game (2021) season 1",
            episode: 7,
            duration: "57:58",
            trailerUrl: "https://www.youtube.com/watch?v=hEqk10Kbgh4",
            telegramUrl: "https://t.me/flixoryproxy/424",
            thumbnail: "/s16id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/14j4OJKwS3o9skRIOHOi7Xw-4imtyVPkP/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep8",
            title: "Squid Game (2021) season 1",
            episode: 8,
            duration: "32:14",
            trailerUrl: "https://www.youtube.com/watch?v=hEqk10Kbgh4",
            telegramUrl: "https://t.me/flixoryproxy/426",
            thumbnail: "/s16id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1Jx29KqBIsJV-XuwyVHm0dS0e25CWgJS7/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep9",
            title: "Squid Game (2021) season 1",
            episode: 9,
            duration: "55:30",
            trailerUrl: "https://www.youtube.com/watch?v=hEqk10Kbgh4",
            telegramUrl: "https://t.me/flixoryproxy/428",
            thumbnail: "/s16id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/16Nun4NKBwVnckmJRZhTe9Az5EOUA5gov/preview",
            googleDriveDownloadUrl: "",
          },
        ],
      },
      {
        id: "season-2",
        title: "Season 2",
        episodes: [
          {
            id: "ep1",
            title: "Squid Game (2021) season 2",
            episode: 1,
            duration: "1:00:22",
            trailerUrl: "https://www.youtube.com/watch?v=fg8lCbXgP4U",
            telegramUrl: "https://t.me/flixoryproxy/433",
            thumbnail: "/s16id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/153xCMmgile1oJa7D6_T0pLz3t-32qGUG/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep2",
            title: "Squid Game (2021) season 2",
            episode: 2,
            duration: "1:01:11",
            trailerUrl: "https://www.youtube.com/watch?v=fg8lCbXgP4U",
            telegramUrl: "https://t.me/flixoryproxy/435",
            thumbnail: "/s16id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1fVHltAG9uCPAtxZpcxSMz_t7kAIBrLPC/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep3",
            title: "Squid Game (2021) season 2",
            episode: 3,
            duration: "59:47",
            trailerUrl: "https://www.youtube.com/watch?v=fg8lCbXgP4U",
            telegramUrl: "https://t.me/flixoryproxy/437",
            thumbnail: "/s16id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1gH86ZfjGppFcRXAi-0YD5DpHioLH7lv0/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep4",
            title: "Squid Game (2021) season 2",
            episode: 4,
            duration: "1:00:19",
            trailerUrl: "https://www.youtube.com/watch?v=fg8lCbXgP4U",
            telegramUrl: "https://t.me/flixoryproxy/439",
            thumbnail: "/s16id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1LpluWZPhmit4XH5cwSx66bPA7a8nw79X/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep5",
            title: "Squid Game (2021) season 2",
            episode: 5,
            duration: "1:00:19",
            trailerUrl: "https://www.youtube.com/watch?v=fg8lCbXgP4U",
            telegramUrl: "https://t.me/flixoryproxy/441",
            thumbnail: "/s16id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/17IReajVwda5f55IifnaABg4JXRhro6Ej/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep6",
            title: "Squid Game (2021) season 2",
            episode: 6,
            duration: "1:00:19",
            trailerUrl: "https://www.youtube.com/watch?v=fg8lCbXgP4U",
            telegramUrl: "https://t.me/flixoryproxy/443",
            thumbnail: "/s16id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1QtlW7cl5_mjDwDQXwYEmhhehcDIAPD0v/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep7",
            title: "Squid Game (2021) season 2",
            episode: 7,
            duration: "1:00:19",
            trailerUrl: "https://www.youtube.com/watch?v=fg8lCbXgP4U",
            telegramUrl: "https://t.me/flixoryproxy/445",
            thumbnail: "/s16id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1EI_2DfTJEPsx83h8iuNgYxomgSudIyqf/preview",
            googleDriveDownloadUrl: "",
          },
        ],
      },
      {
        id: "season-3",
        title: "Season 3",
        episodes: [
          {
            id: "ep1",
            title: "Squid Game (2021) season 3",
            episode: 1,
            duration: "1:00:22",
            trailerUrl: "https://www.youtube.com/watch?v=ULi6SmLifVg",
            telegramUrl: "https://t.me/flixoryproxy/959",
            thumbnail: "/s16id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1htCgT6JQMwZTlVMsn1duSIGtuP1wYtz4/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep2",
            title: "Squid Game (2021) season 3",
            episode: 2,
            duration: "1:01:11",
            trailerUrl: "https://www.youtube.com/watch?v=ULi6SmLifVg",
            telegramUrl: "https://t.me/flixoryproxy/961",
            thumbnail: "/s16id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1_E2DKMYeN1liKMntouL5FTWokXO8_xbZ/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep3",
            title: "Squid Game (2021) season 3",
            episode: 3,
            duration: "59:47",
            trailerUrl: "https://www.youtube.com/watch?v=ULi6SmLifVg",
            telegramUrl: "https://t.me/flixoryproxy/963",
            thumbnail: "/s16id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1TaHrak8-cGBljBr0yM2kOtZHr7AzQEAW/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep4",
            title: "Squid Game (2021) season 3",
            episode: 4,
            duration: "1:00:19",
            trailerUrl: "https://www.youtube.com/watch?v=ULi6SmLifVg",
            telegramUrl: "https://t.me/flixoryproxy/965",
            thumbnail: "/s16id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1CaFBEB1fhtG0COh_ad2i7GEZbEQRpgPl/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep5",
            title: "Squid Game (2021) season 3",
            episode: 5,
            duration: "1:00:19",
            trailerUrl: "https://www.youtube.com/watch?v=ULi6SmLifVg",
            telegramUrl: "https://t.me/flixoryproxy/967",
            thumbnail: "/s16id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1V5JiICQVppCbJcRJsSV0ejU49z-9nVKi/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep6",
            title: "Squid Game (2021) season 3",
            episode: 6,
            duration: "1:00:19",
            trailerUrl: "https://www.youtube.com/watch?v=ULi6SmLifVg",
            telegramUrl: "https://t.me/flixoryproxy/969",
            thumbnail: "/s16id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1L6RyKdyXzobOYPQq5aDFhT3agvoUGWpT/preview",
            googleDriveDownloadUrl: "",
          },
        ],
      },
    ],
  },
  {
    id: "bongo-original-17",
    title: "Bachelor Point – Season 5 (Episodes 41-48) combined",
    poster: "/s17id.jpg",
    description: "চার বন্ধু এক বাড়িতে বাস করে—হাসি, ভুলভাল ও প্রেমাসঙ্কটে ভরা প্রতিদিনের গল্প। এখন ৫ম সিজনের ৪১-৪৮ পর্বে তাদের বেঁচে থাকার নতুন রোমাঞ্চ শুরু হয়েছে!",
    genre: "Comedy | Drama | Family",
    year: "2025",
    rating: "8.1",
    seasons: [
      {
        id: "season-1",
        title: "season-5 chapter-6",
        episodes: [
          {
            id: "ep 41-48",
            title: "Episodes 41-48",
            episode: 1,
            duration: "2:48:49",
            trailerUrl: "https://www.youtube.com/watch?v=zh8pKmKJRww",
            telegramUrl: "https://t.me/c/3117912335/4946",
            thumbnail: "/s17id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1Z6A_ib8_KGiBCMFcoNNfQe0cFsEp6Nuw/preview",
            googleDriveDownloadUrl: "",
          },
        ],
      },
    ],
  },
  {
    id: "toffy-original-18",
    title: "Kurulus Osman – Season 2 (2020) EP-01-95 Added☑️",
    poster: "/s18id.jpg",
    description: "অটোমান সাম্রাজ্য গঠনের পথে ওসমান বেইয়ের সামনে নতুন শত্রু, বিশ্বাসঘাতকতা ও রক্তক্ষয়ী লড়াই। পরিবার, রাষ্ট্র ও তূর্কি জাতির ভবিষ্যৎ রক্ষার জন্য সে শুরু করে তার শক্ততম অভিযান।",
    genre: "History | Action | Drama",
    year: "2025",
    rating: "7.5",
    seasons: [
      {
        id: "season-2",
        title: "season-2",
        episodes: [
          {
            id: "ep 01-05",
            title: "Episodes 01-05☑️",
            episode: 1-5,
            duration: "3:17:13",
            trailerUrl: "https://www.youtube.com/watch?v=c6ztNdsZZrc",
            telegramUrl: "https://t.me/c/3117912335",
            thumbnail: "/s18id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1gIHXZ6gqCzPLkOUYktbIRY4Z022CwvNb/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep 06-10",
            title: "Episodes 06-10☑️",
            episode: 6-10,
            duration: "3:16:40",
            trailerUrl: "https://www.youtube.com/watch?v=c6ztNdsZZrc",
            telegramUrl: "https://t.me/c/3117912335",
            thumbnail: "/s18id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1izmDYReUDMLDLj1IiGyuu_aY2QwvPTO_/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep 11-15",
            title: "Episodes 11-15☑️",
            episode: 11-15,
            duration: "3:16:20",
            trailerUrl: "https://www.youtube.com/watch?v=c6ztNdsZZrc",
            telegramUrl: "https://t.me/c/3117912335",
            thumbnail: "/s18id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1sG6K2y-GHE5TQI9YVDZa9JlDuh6rkcH1/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep 16-20",
            title: "Episodes 16-20☑️",
            episode: 16-20,
            duration: "3:16:27",
            trailerUrl: "https://www.youtube.com/watch?v=c6ztNdsZZrc",
            telegramUrl: "https://t.me/c/3117912335",
            thumbnail: "/s18id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1RCUS9SzjNLq51d01R4LcklzsCUOUVcf7/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep 21-25",
            title: "Episodes 21-25☑️",
            episode: 21-25,
            duration: "3:16:35",
            trailerUrl: "https://www.youtube.com/watch?v=c6ztNdsZZrc",
            telegramUrl: "https://t.me/c/3117912335",
            thumbnail: "/s18id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1Qg7aIWHVRa8nhl_Gfe8q0BrIPW_5eN9p/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep 26-30",
            title: "Episodes 26-30☑️",
            episode: 26-30,
            duration: "3:16:55",
            trailerUrl: "https://www.youtube.com/watch?v=c6ztNdsZZrc",
            telegramUrl: "https://t.me/c/3117912335",
            thumbnail: "/s18id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1qFkmdSodLx9HBvVNePZ24glkdJ0qTS9U/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep 31-35",
            title: "Episodes 31-35☑️",
            episode: 31-35,
            duration: "3:15:57",
            trailerUrl: "https://www.youtube.com/watch?v=c6ztNdsZZrc",
            telegramUrl: "https://t.me/c/3117912335",
            thumbnail: "/s18id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1Z3Eb_MROJF7bnjNbSzojS5gGoYGxXD-2/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep 36-40",
            title: "Episodes 36-40☑️",
            episode: 36-40,
            duration: "3:16:32",
            trailerUrl: "https://www.youtube.com/watch?v=c6ztNdsZZrc",
            telegramUrl: "https://t.me/c/3117912335",
            thumbnail: "/s18id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/11NatqBk-aNhrLXdMXyXP9hmPbFDSRhdS/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep 41-45",
            title: "Episodes 41-45☑️",
            episode: 41-45,
            duration: "3:16:19",
            trailerUrl: "https://www.youtube.com/watch?v=c6ztNdsZZrc",
            telegramUrl: "https://t.me/c/3117912335",
            thumbnail: "/s18id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1AqqW1qykpbXC-kGWQ38axLJxGitA9CN0/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep 46-50",
            title: "Episodes 46-50☑️",
            episode: 46-50,
            duration: "3:16:04",
            trailerUrl: "https://www.youtube.com/watch?v=c6ztNdsZZrc",
            telegramUrl: "https://t.me/c/3117912335",
            thumbnail: "/s18id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1CuXAIoqUVOSJKnOk0MsE2KfcOYiqgxik/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep 51-55",
            title: "Episodes 51-55☑️",
            episode: 51-55,
            duration: "3:16:41",
            trailerUrl: "https://www.youtube.com/watch?v=c6ztNdsZZrc",
            telegramUrl: "https://t.me/c/3117912335",
            thumbnail: "/s18id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1o3CTk9-Ki6wRix-90VxEQUV3GJ-YTEgK/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep 56-60",
            title: "Episodes 56-60☑️",
            episode: 56-60,
            duration: "3:16:20",
            trailerUrl: "https://www.youtube.com/watch?v=c6ztNdsZZrc",
            telegramUrl: "https://t.me/c/3117912335",
            thumbnail: "/s18id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1shU2qcat5PkaZXXfUfcoLh_bijr5htip/preview",
            googleDriveDownloadUrl: "",
          },
           {
            id: "ep 61-65",
            title: "Episodes 61-65☑️",
            episode: 61-65,
            duration: "3:16:27",
            trailerUrl: "https://www.youtube.com/watch?v=c6ztNdsZZrc",
            telegramUrl: "https://t.me/c/3117912335",
            thumbnail: "/s18id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1qOZUfwWzdWFgx54h3nXDycGpEemvqQbJ/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep 66-70",
            title: "Episodes 66-70☑️",
            episode: 66-70,
            duration: "3:16:20",
            trailerUrl: "https://www.youtube.com/watch?v=c6ztNdsZZrc",
            telegramUrl: "https://t.me/c/3117912335",
            thumbnail: "/s18id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1HgeZGxB86s8NhRYsbc7UNQfhTI3YrGWV/preview",
            googleDriveDownloadUrl: "",
          },
           {
            id: "ep 71-75",
            title: "Episodes 71-75☑️",
            episode: 71-75,
            duration: "3:16:27",
            trailerUrl: "https://www.youtube.com/watch?v=c6ztNdsZZrc",
            telegramUrl: "https://t.me/c/3117912335",
            thumbnail: "/s18id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1vjgfxPhvIIwm2d9qSbIXpD9IM9qPSo4V/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep 76-80",
            title: "Episodes 76-80☑️",
            episode: 76-80,
            duration: "3:16:20",
            trailerUrl: "https://www.youtube.com/watch?v=c6ztNdsZZrc",
            telegramUrl: "https://t.me/c/3117912335",
            thumbnail: "/s18id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1mXP8JytqyEaVhvVKkt0wWhTlsRo_MYBH/preview",
            googleDriveDownloadUrl: "",
          },
           {
            id: "ep 81-85",
            title: "Episodes 81-85☑️",
            episode: 81-85,
            duration: "3:16:27",
            trailerUrl: "https://www.youtube.com/watch?v=c6ztNdsZZrc",
            telegramUrl: "https://t.me/c/3117912335",
            thumbnail: "/s18id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1Z2zfQvgcu7j3iUnxxK9efKXpsNTGRdPy/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep 86-90",
            title: "Episodes 86-90☑️",
            episode: 86-90,
            duration: "3:16:27",
            trailerUrl: "https://www.youtube.com/watch?v=c6ztNdsZZrc",
            telegramUrl: "https://t.me/c/3117912335",
            thumbnail: "/s18id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1mH1cbEVQi9_-4rJ1grHNdandULJjl68C/preview",
            googleDriveDownloadUrl: "",
          },
          {
            id: "ep 91-95",
            title: "Episodes 91-95☑️",
            episode: 91-95,
            duration: "3:16:27",
            trailerUrl: "https://www.youtube.com/watch?v=c6ztNdsZZrc",
            telegramUrl: "https://t.me/c/3117912335",
            thumbnail: "/s18id.jpg",
            googleDrivePlayUrl: "https://drive.google.com/file/d/1MPEvMQPsOaMkGD10nxPt8Dl77Ji91ZrE/preview",
            googleDriveDownloadUrl: "",
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
  const [searchQuery, setSearchQuery] = useState("")

  const sortedSeries = [...seriesData].sort((a, b) => {
    const idA = Number.parseInt(a.id.split("-").pop() || "0")
    const idB = Number.parseInt(b.id.split("-").pop() || "0")
    return idB - idA
  })

  const filteredSeries = sortedSeries.filter((series) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      series.title.toLowerCase().includes(query) ||
      series.genre.toLowerCase().includes(query) ||
      series.description.toLowerCase().includes(query) ||
      series.year.includes(query)
    )
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

      {currentView === "list" && (
        <div className="p-4 border-b border-gray-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="সিরিজ খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>
        </div>
      )}

      {/* Series List View */}
      {currentView === "list" && (
        <div className="p-4">
          {filteredSeries.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="mb-6">
                <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-white">কোনো সিরিজ পাওয়া যায়নি</h3>
                <div className="max-w-md mx-auto space-y-3 text-gray-300 leading-relaxed">
                  <p className="text-base">
                    আপনার সার্চ করা নামে কোনো সিরিজ নেই। গুগলে গিয়ে মুভির পোস্টার দেখে সঠিক বানান দিয়ে সার্চ করুন।
                  </p>
                  <p className="text-base">এরপরও না পেলে এটা আমাদের এখানে নেই, দুঃখিত।</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => setSearchQuery("")}
                className="mt-4 bg-gray-900 border-gray-700 text-white hover:bg-gray-800"
              >
                সব সিরিজ দেখুন
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredSeries.map((series) => (
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
          )}
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
              <div className="text-5xl mb-4">🎬</div>

              <h3 className="text-xl font-bold text-white mb-2">Episode {episodePopup.episode.episode}</h3>

              <div className="space-y-4 text-gray-300 leading-relaxed bg-gray-800/50 p-4 rounded-xl">
                <p className="text-base">
                  📺 এই এপিসোডটি আপনি চাইলে টেলিগ্রাম চ্যানেল থেকে দেখতে পারেন। টেলিগ্রাম থেকে দেখতে{" "}
                  <span className="text-blue-400 font-semibold">'Watch on Telegram'</span> এ ক্লিক করুন।
                </p>
                <p className="text-base">
                  💻 আর সরাসরি এখানেই দেখতে চাইলে <span className="text-green-400 font-semibold">'Online Watch'</span> এ
                  ক্লিক করুন।
                </p>
                <p className="text-base">
                  🎥 আর এই সিরিজের ট্রেইলার দেখতে <span className="text-orange-400 font-semibold">'Trailer'</span> বাটনে
                  ক্লিক করুন।
                </p>
                <p className="text-base">
                  ⬇️ আর যদি আপনি ডাইরেক্ট ডাউনলোড করতে চান, ওইটা আপাতত বন্ধ রেখেছি। আমরা কাজ চলমান, অতি শীঘ্রই ওই সিস্টেমও দেওয়া হবে।
                  🔧
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

                <Button
                  onClick={handleOnlinePlay}
                  disabled={!episodePopup.episode.googleDrivePlayUrl}
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-green-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Online Watch
                </Button>

                <Button
                  onClick={handlePlayTrailer}
                  disabled={!episodePopup.episode.trailerUrl}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-orange-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Film className="w-5 h-5 mr-2" />
                  Trailer
                </Button>

                <Button
                  disabled
                  className="w-full bg-gradient-to-r from-gray-700 to-gray-600 text-gray-400 font-semibold py-6 rounded-xl shadow-lg cursor-not-allowed opacity-60"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Direct Download (Coming Soon)
                </Button>
              </div>
            </div>
            {/* </CHANGE> */}
          </div>
        </div>
      )}
    </div>
  )
}
