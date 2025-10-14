"use client"

import { useState } from "react"
import { Play, Film } from "lucide-react"
import { ShortsPlayer } from "./shorts-player"

interface Short {
  id: string
  title: string
  youtubeId: string
  likes: number
  comments: number
  telegramLink: string
}

const shortsData: Short[] = [
  {
    id: "52",
    title: "the legend tony jee",
    youtubeId: "aDAq_xbqYuI",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1291",
  },
  {
    id: "51",
    title: "chitti",
    youtubeId: "KeyOKSbFIFQ",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1291",
  },
  {
    id: "50",
    title: "alice in boarderland",
    youtubeId: "qY2XYCnPC7Y",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1291",
  },
  {
    id: "49",
    title: "weak hero class 1",
    youtubeId: "PgJH3PKFQ4Y",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1291",
  },
  {
    id: "48",
    title: "headquarter",
    youtubeId: "eytbyW6ndNA",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1525",
  },
  {
    id: "47",
    title: "weak hero class 2",
    youtubeId: "JhxYjaLdoZU",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1525",
  },
  {
    id: "46",
    title: "weak hero",
    youtubeId: "U-_M7ccaYjE",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/385",
  },
  {
    id: "45",
    title: "alice in boarderland",
    youtubeId: "51QBGINHliw",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/385",
  },
  {
    id: "44",
    title: "shark the strom",
    youtubeId: "YPoW_yiruv4",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/385",
  },
  {
    id: "43",
    title: "backbancher",
    youtubeId: "iYDAWtb8aAw",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "42",
    title: "sonic 1",
    youtubeId: "iS_RIOylEcI",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "41",
    title: "weak hero class 1",
    youtubeId: "pHcOrZeAmUk",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "40",
    title: "jenie make a wish",
    youtubeId: "uOWZT07ylV0",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1291",
  },
  {
    id: "39",
    title: "study group",
    youtubeId: "9h9KvS4QRNM",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1291",
  },
  {
    id: "38",
    title: "sonic 1",
    youtubeId: "bKepLS96j_g",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1291",
  },
  {
    id: "37",
    title: "genie make a wish",
    youtubeId: "gSdsflCHFHw",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1525",
  },
  {
    id: "36",
    title: "premalu",
    youtubeId: "CCnL-V7JLf8",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1525",
  },
  {
    id: "35",
    title: "bloodhounds",
    youtubeId: "Vkl5U6myFuc",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/385",
  },
  {
    id: "34",
    title: "alice in boarderland",
    youtubeId: "KZfk6Xpi7WA",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/385",
  },
  {
    id: "33",
    title: "avanger",
    youtubeId: "BaQSjZfLwC4",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/385",
  },
  {
    id: "32",
    title: "chitti",
    youtubeId: "qShPLjlWbd4",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "31",
    title: "jenie make a wish",
    youtubeId: "0pNhLrj57Ew",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "30",
    title: "alice in boarderland",
    youtubeId: "LIYrZQCpSno",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "29",
    title: "my name",
    youtubeId: "MRzSeLeYojE",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "28",
    title: "weak hero",
    youtubeId: "kG4bEbzS8jo",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "27",
    title: "chitti",
    youtubeId: "Q5S9QDWLb9o",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "26",
    title: "ধ্রুবতারা",
    youtubeId: "n4TtXgfqk8c",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "25",
    title: "weak hero season 2",
    youtubeId: "IpOJACj-K6Q",
    likes: 950,
    comments: 41,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "24",
    title: "jenie make a wish",
    youtubeId: "s-nIQWGkh10",
    likes: 2100,
    comments: 89,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "23",
    title: "my name",
    youtubeId: "nSa5VggXFTE",
    likes: 1500,
    comments: 67,
    telegramLink: "https://t.me/flixoryproxy/363",
  },
  {
    id: "22",
    title: "bengal tiger",
    youtubeId: "Pxc1uhffX_c",
    likes: 890,
    comments: 32,
    telegramLink: "https://t.me/flixoryproxy/344",
  },
  {
    id: "21",
    title: "the guardians",
    youtubeId: "xye4cNRfKh0",
    likes: 1200,
    comments: 45,
    telegramLink: "https://t.me/flixoryproxy/344",
  },
  {
    id: "20",
    title: "wednesday season 2 part 2",
    youtubeId: "gWWAsQGS79A",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1291",
  },
  {
    id: "19",
    title: "wednesday season 2 part 2",
    youtubeId: "7JGd2kfvDks",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1291",
  },
  {
    id: "18",
    title: "wednesday season 2 part 2",
    youtubeId: "7JGd2kfvDks",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1291",
  },
  {
    id: "17",
    title: "happiness season 1",
    youtubeId: "OJkg_PedirY",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1525",
  },
  {
    id: "16",
    title: "happiness season 1",
    youtubeId: "oDgMKByy2Kg",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/1525",
  },
  {
    id: "15",
    title: "all of us are dead",
    youtubeId: "FB20dkHjew0",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/385",
  },
  {
    id: "14",
    title: "all of us are dead",
    youtubeId: "HyxMyhL1cKM",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/385",
  },
  {
    id: "13",
    title: "all of us are dead",
    youtubeId: "U7cRZR_FokA",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/385",
  },
  {
    id: "12",
    title: "alice in boarderland season 3",
    youtubeId: "Tkjl6ye_f1U",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "11",
    title: "alice in boarderland season 3",
    youtubeId: "s_cZOSJeJ0g",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "10",
    title: "alice in boarderland season 3",
    youtubeId: "mIVyEcTLYyE",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "9",
    title: "alice in boarderland season 2",
    youtubeId: "ap8cmqMvagQ",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "8",
    title: "alice in boarderland season 2",
    youtubeId: "uFIFQZNgvB4",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "7",
    title: "alice in boarderland season 2",
    youtubeId: "4EyoHq_lEzE",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "6",
    title: "alice in boarderland season 3",
    youtubeId: "BGXjUX5UlwM",
    likes: 3200,
    comments: 156,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "5",
    title: "alice in boarderland season 3",
    youtubeId: "ClQxoxNdYJk",
    likes: 950,
    comments: 41,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "4",
    title: "alice in boarderland season 3",
    youtubeId: "KiG2y0H_gLY",
    likes: 2100,
    comments: 89,
    telegramLink: "https://t.me/flixoryproxy/2916",
  },
  {
    id: "3",
    title: "alice in boarderland",
    youtubeId: "NVKOHGD4dkQ",
    likes: 1500,
    comments: 67,
    telegramLink: "https://t.me/flixoryproxy/363",
  },
  {
    id: "2",
    title: "alice in boarderland",
    youtubeId: "otllNEww99s",
    likes: 890,
    comments: 32,
    telegramLink: "https://t.me/flixoryproxy/344",
  },
  {
    id: "1",
    title: "alice in boarderland",
    youtubeId: "aCZVOqBV3ug",
    likes: 1200,
    comments: 45,
    telegramLink: "https://t.me/flixoryproxy/344",
  },
]

export function ShortsSection() {
  const [selectedShortIndex, setSelectedShortIndex] = useState<number | null>(null)

  const handleShortClick = (index: number) => {
    setSelectedShortIndex(index)
  }

  const handleClosePlayer = () => {
    setSelectedShortIndex(null)
  }

  if (selectedShortIndex !== null) {
    return <ShortsPlayer shorts={shortsData} initialIndex={selectedShortIndex} onClose={handleClosePlayer} />
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-gradient-to-b from-black via-black/95 to-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
              <Film className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Shorts</h1>
          </div>
          <div className="text-sm text-white/60 font-medium">{shortsData.length} videos</div>
        </div>
      </header>

      {/* Grid Layout */}
      <div className="px-2 py-4">
        <div className="grid grid-cols-3 gap-2">
          {shortsData.map((short, index) => (
            <button
              key={short.id}
              onClick={() => handleShortClick(index)}
              className="relative aspect-[9/16] rounded-lg overflow-hidden bg-gray-900 group"
            >
              {/* YouTube Thumbnail */}
              <img
                src={`https://img.youtube.com/vi/${short.youtubeId}/mqdefault.jpg`}
                alt={short.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 group-hover:opacity-90 transition-opacity" />

              {/* Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                </div>
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <p className="text-xs font-medium text-white line-clamp-2 text-left leading-tight">{short.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-16 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent py-4 px-4 text-center">
        <p className="text-xs text-white/40">Scroll to explore more shorts</p>
      </footer>
    </div>
  )
}
