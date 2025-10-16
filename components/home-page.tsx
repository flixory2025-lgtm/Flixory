"use client"

import { useState, useEffect } from "react"
import { Search, Play, Star, Clock, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MovieModal } from "@/components/movie-modal"
import { VideoPlayer } from "@/components/video-player"
import { UserAuthModal } from "@/components/user-auth-modal"
import { TelegramPopup } from "@/components/telegram-popup"
import { EnhancedVideoPlayer } from "@/components/enhanced-video-player"
import { Pagination } from "@/components/pagination"

const TRENDING_MOVIE_IDS = [12, 14, 18, 23, 27, 28, 29]
const MOVIES_PER_PAGE = 20

const movies = [
  {
    id: 1,
    title: "INSAAF - Tale of Legends",
    poster: "/1id.jpg",
    rating: 8.5,
    year: 2024,
    duration: "2h 15m",
    genre: ["Action", "Drama", "Thriller"],
    description:
      "A gripping tale of justice and revenge set in the heart of Bengal. Three unlikely allies must unite to fight against corruption and bring justice to their community.",
    screenshots: [
      "/movie-scene-with-action-sequence.jpg",
      "/dramatic-dialogue-scene.jpg",
      "/emotional-character-moment.jpg",
      "/bengali-action-movie-fight-scene.jpg",
      "/dramatic-courtroom-scene-in-bengali-movie.jpg",
      "/emotional-family-moment-in-bengali-drama.jpg",
    ],
    telegramLink: "https://t.me/flixoryproxy/1803",
    trailerLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    googleDrivePlayUrl: "https://drive.google.com/file/d/19gueMTIe2PL9e7WDUZbUUro6fRIWjaX4/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 2,
    title: "Raghu dakat 2025",
    poster: "/2id.jpg",
    rating: 7.0,
    year: 2025,
    duration: "2h 30m",
    genre: ["History", "Drama", "Action"],
    description:
      "১৮শ শতাব্দীর বাঙালির ইতিহাসের পরশে রচিত এক period action-অ্যাডভেঞ্চার—যেখানে 'রঘু ডাকাত' বন্ধুর সঙ্গে জন-জনের চোখে নায়ক হয়ে ওঠে, সাধারণ মানুষের নির্যাতন ও অবিচারের বিরুদ্ধে লড়ায়।",
    screenshots: ["/ss2.png", "/ss22.png", "/ss222.png", "/ss2222.png"],
    telegramLink: "https://t.me/flixoryproxy/2939",
    trailerLink: "https://www.youtube.com/embed/QrWh3Ww3Zn0?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/10n6l6FRQsn3eLUS4RbnIOpmjTzXWO-V_/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 3,
    title: "Ek Villain Returns (2022)",
    poster: "/3id.jpg",
    rating: 4.6,
    year: 2022,
    duration: "2h 07m",
    genre: ["Action", "Romance", "Thriller"],
    description: "পুরনো ভিলেনের ছায়ায় নতুন প্রেম, নতুন প্রতিশোধ আর খুনের রহস্য—হিরো নয়, এখানে গল্প বলে শুধু ভিলেনরা।",
    screenshots: ["/ss3.jpg", "/ss33.jpg", "/ss333.jpg", "/ss3333.jpg"],
    telegramLink: "https://t.me/flixoryproxy/3000",
    trailerLink: "https://www.youtube.com/embed/swPhyd0g6K8?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1DxYZ9cpWRuEBCqhtcmpd8IEHWbZy4f2W/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 4,
    title: "Dangerous Animal (2025)",
    poster: "/4id.jpg",
    rating: 8.5,
    year: 2025,
    duration: "1h 38m",
    genre: ["Action", "Survival", "Thriller"],
    description:
      "এক ভয়ংকর বন্য প্রাণীর আক্রমণে আটকে পড়া মানুষদের টিকে থাকার সংগ্রাম। প্রতিটি মুহূর্তেই জীবন-মৃত্যুর লড়াই, আর প্রকৃতির ভয়ংকর শক্তির সামনে মানুষ কতটা অসহায়—সেই কাহিনি।",
    screenshots: ["/ss4.jpg", "/ss44.jpg", "/ss444.jpg", "/ss4444.jpg"],
    telegramLink: "https://t.me/flixoryproxy/3002",
    trailerLink: "https://www.youtube.com/embed/j19tLLKiYKY?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1aM6ddxMvhW3kHoav5Oe9rbaOiAaaOW6D/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 5,
    title: "Manush (2023)",
    poster: "/5id.jpg",
    rating: 6.5,
    year: 2023,
    duration: "2h 05m",
    genre: ["Action", "Drama", "Thriller"],
    description: "পরিচালক Sanjoy Somadder-এর এই ছবিতে অন্ধকার আন্ডারওয়ার্ল্ড, প্রতিশোধ আর ভালোবাসার গল্প মিলেছে একসাথে।",
    screenshots: ["/ss5.jpg", "/ss55.jpg"],
    telegramLink: "https://t.me/flixoryproxy/3010",
    trailerLink: "https://www.youtube.com/embed/J0SzT_184SE?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/14YRbj1MRECwb0b6fkrD6Rzv9XuDN5N_X/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 6,
    title: "প্রিয়তমা (Priyotoma)",
    poster: "/6id.jpg",
    rating: 6.8,
    year: 2023,
    duration: "2h 15m",
    genre: ["Romantic", "Drama", "Thriller"],
    description: "A bongo tv show",
    screenshots: [
      "/Priyotoma1.jpg",
      "/Priyotoma2.jpg",
      "/Priyotoma3.jpg",
      "/Priyotoma4.jpg",
      "/Priyotoma5.jpg",
      "/Priyotoma6.jpg",
    ],
    telegramLink: "https://t.me/flixoryproxy/15",
    trailerLink: "https://www.youtube.com/embed/oy7FY3k3TJc?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1GvhmXxIx9vBcZdEdXWUJH5TeZhGdQ0Ky/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 7,
    title: "Ekannoborti (2021)",
    poster: "/7id.jpg",
    rating: 6.7,
    year: 2021,
    duration: "2h 30m",
    genre: ["History", "Drama", "Family"],
    description:
      "১৮শ শতাব্দীর বাঙালির ইতিহাসের পরশে রচিত এক period action-অ্যাডভেঞ্চার—যেখানে 'রঘু ডাকাত' বন্ধুর সঙ্গে জন-জনের চোখে নায়ক হয়ে ওঠে, সাধারণ মানুষের নির্যাতন ও অবিচারের বিরুদ্ধে লড়ায়।",
    screenshots: [
      "/ekannoborti1.jpg",
      "/ekannoborti2.jpg",
      "/ekannoborti3.jpg",
      "/ekannoborti4.jpg",
      "/ekannoborti5.jpg",
      "/ekannoborti6.jpg",
    ],
    telegramLink: "https://t.me/flixoryproxy/17",
    trailerLink: "https://www.youtube.com/embed/P61w1qJG21M?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1ePbdQQ4sPuPPi8VXcQ6PiOxAiSHG2OgM/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 8,
    title: "annapurna (2025)",
    poster: "/8id.jpg",
    rating: 4.6,
    year: 2025,
    duration: "1h 46m",
    genre: ["Drama", "Family", "Emotional"],
    description: "পুরনো ভিলেনের ছায়ায় নতুন প্রেম, নতুন প্রতিশোধ আর খুনের রহস্য—হিরো নয়, এখানে গল্প বলে শুধু ভিলেনরা।",
    screenshots: [
      "/annapurna1.jpg",
      "/annapurna2.jpg",
      "/annapurna3.jpg",
      "/annapurna4.jpg",
      "/annapurna5.jpg",
      "/annapurna6.jpg",
    ],
    telegramLink: "https://t.me/flixoryproxy/19",
    trailerLink: "https://www.youtube.com/embed/gG__pFybD1o?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1f3piglNVdUX-rMz0mbYG_zc-Z-fRQ1Me/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 9,
    title: "Despatch (2024)",
    poster: "/9id.jpg",
    rating: 7.1,
    year: 2024,
    duration: "1h 38m",
    genre: ["Crime", "Mystery", "Thriller"],
    description:
      "এক ভয়ংকর বন্য প্রাণীর আক্রমণে আটকে পড়া মানুষদের টিকে থাকার সংগ্রাম। প্রতিটি মুহূর্তেই জীবন-মৃত্যুর লড়াই, আর প্রকৃতির ভয়ংকর শক্তির সামনে মানুষ কতটা অসহায়—সেই কাহিনি।",
    screenshots: [
      "/Despatch1.jpg",
      "/Despatch2.jpg",
      "/Despatch3.jpg",
      "/Despatch4.jpg",
      "/Despatch5.jpg",
      "/Despatch6.jpg",
    ],
    telegramLink: "https://t.me/flixoryproxy/21",
    trailerLink: "https://www.youtube.com/embed/BHPMcOqa3H4?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/15AgAtpDyxLnz5tpsmcmusoMZVat_96Ag/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 10,
    title: "Nandini (Season 1 – 2023)",
    poster: "/10id.jpg",
    rating: 6.5,
    year: 2023,
    duration: "3h 38m",
    genre: ["Action", "Drama", "Thriller"],
    description: "এক নারী সাপ আত্মার প্রতিশোধের গল্প — ভালোবাসা, বিশ্বাসঘাতকতা আর অলৌকিক রহস্যে ভরা এই সিরিজ মুগ্ধ করবে তোমাকে।",
    screenshots: ["/Nandini1.jpg", "/Nandini2.jpg", "/Nandini3.jpg", "/Nandini4.jpg", "/Nandini5.jpg", "/Nandini6.jpg"],
    telegramLink: "https://t.me/flixoryproxy/3418",
    trailerLink: "https://www.youtube.com/embed/b52Bjl5TeZ4?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/109jQPBJ3z6cDg1OeoMmg7LZvMwwvSD_3/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 11,
    title: "Chennai Express (2013)",
    poster: "/11id.jpg",
    rating: 6.0,
    year: 2013,
    duration: "2h 21m",
    genre: ["Romantic", "Drama", "Comedy"],
    description:
      "রাহুলের এক অদ্ভুত ট্রেন যাত্রা—যেখানে দুর্ঘটনাবশত দক্ষিণ ভারতের গ্রামে গিয়ে জড়িয়ে পড়ে প্রেম, পরিবার আর মাফিয়া গ্যাংয়ের ঝঞ্ঝাটে! ",
    screenshots: ["/Chennai1.jpg", "/Chennai2.jpg", "/Chennai3.jpg", "/Chennai4.jpg", "/Chennai5.jpg", "/Chennai6.jpg"],
    telegramLink: "https://t.me/flixoryproxy/1805",
    trailerLink: "https://www.youtube.com/embed/hZGR5Sj1Bfo?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1e0IsQySdsMrcHwjj0rKuR3W5PDwgjBet/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 12,
    title: "AKA (2025) ",
    poster: "/12id.jpg",
    rating: 6.7,
    year: 2025,
    duration: "2h 52m",
    genre: ["History", "Drama", "Family"],
    description:
      "আফরান নিশো একজন রহস্যময় চরিত্র আকা—1998-99 সালে অপরাধীদের ধাওয়া করে, একদিন আচমকা অদৃশ্য হয়ে যায়। পুলিশ স্টেশনের অন্ধকার থেকে উথ্থান আর প্রতিশোধের ছায়ায় তৈরি হয় এক ভীতিকর থ্রিলার।",
    screenshots: ["/AKA1.jpg", "/AKA2.jpg", "/AKA3.jpg", "/AKA4.jpg", "/AKA5.jpg", "/AKA6.jpg"],
    telegramLink: "https://t.me/flixoryproxy/1807",
    trailerLink: "https://www.youtube.com/embed/PMbogoDYDps?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1sDAlX-IOoHB6PirLSsdP1yTU7orzXih6/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 13,
    title: "Vash (2023)",
    poster: "/13id.jpg",
    rating: 4.6,
    year: 2023,
    duration: "1h 51m",
    genre: ["Horror", "Family", "Emotional"],
    description: "এক অপরিচিতের অদ্ভুত শয়তানি শক্তি—এক পরিবার যেন নিমিষে মরার ছায়ায় ফেঁসে যায়, যখন তাঁদের কন্যা হয়ে ওঠে দানবের মুগ্ধ!",
    screenshots: ["/Vash1.jpg", "/Vash2.jpg", "/Vash3.jpg", "/Vash4.jpg", "/Vash5.jpg", "/Vash6.jpg"],
    telegramLink: "https://t.me/flixoryproxy/1809",
    trailerLink: "https://www.youtube.com/embed/DuWOpHkG49s?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1MyedLgVUPMvxVugc_l0e2uhgM56lbe0d/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 14,
    title: "Nocturnal (2025)",
    poster: "/14id.jpg",
    rating: 7.1,
    year: 2025,
    duration: "1h 39m",
    genre: ["Crime", "Mystery", "Thriller"],
    description:
      "যেখানে সত্যের সন্ধানে আসে ভাবনার আঁধার—ভাইয়ের রহস্যময় মৃত্যু আর একটা বিখ্যাত উপন্যাসের অদ্ভুত ভবিষ্যদ্বাণী চায় তার বিরুদ্ধে যুদ্ধ করতে",
    screenshots: [
      "/Nocturnal1.jpg",
      "/Nocturnal2.jpg",
      "/Nocturnal3.jpg",
      "/Nocturnal4.jpg",
      "/Nocturnal5.jpg",
      "/Nocturnal6.jpg",
    ],
    telegramLink: "https://t.me/flixoryproxy/1811",
    trailerLink: "https://www.youtube.com/embed/GVqXPERk4e8?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1lgL7p8JbD-I41ZfwHM090zuwnhscxo9x/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 15,
    title: "One (2021)",
    poster: "/15id.jpg",
    rating: 6.7,
    year: 2021,
    duration: "2h 29m",
    genre: ["Action", "Drama", "Thriller"],
    description: "মুখ্যমন্ত্রী কাদাক্কল চন্দ্রদাস—জনগণের জন্য লড়াই করা এক নেতা, যার জীবনের গল্প উঠে আসে আদর্শ আর বাস্তব রাজনীতির দ্বন্দ্বে।",
    screenshots: ["/One1.jpg", "/One2.jpg", "/One3.jpg", "/One4.jpg", "/One5.jpg", "/One6.jpg"],
    telegramLink: "https://t.me/flixoryproxy/1813",
    trailerLink: "https://www.youtube.com/embed/Gwbb4yxRhEo?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1ApuZwNZob9LrJZqjssQ853N-hYEaIGfJ/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 16,
    title: "Fidaa (2018) (Bangladeshi Film)",
    poster: "/16id.jpg",
    rating: 5.1,
    year: 2023,
    duration: "2h 26m",
    genre: ["Romantic", "Drama", "Action"],
    description: "শাকিব খান ও নবাগত পূজা চেরী—তাদের ভালোবাসার গল্পে অ্যাকশন, আবেগ আর পারিবারিক টানাপোড়েনের রঙিন মিশেল।",
    screenshots: ["/Fidaa1.jpg", "/Fidaa2.jpg", "/Fidaa3.jpg", "/Fidaa4.jpg", "/Fidaa5.jpg", "/Fidaa6.jpg"],
    telegramLink: "https://t.me/flixoryproxy/1815",
    trailerLink: "https://www.youtube.com/embed/9hbVVnzN_7Y?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1vNomIdVw7VpplzWmTn2lQFtf15UGIoW3/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 17,
    title: "One (2017)",
    poster: "/17id.jpg",
    rating: 6.7,
    year: 2017,
    duration: "2h 21m",
    genre: ["Action", "Drama", "Thriller"],
    description:
      "একজন প্রশিক্ষণপ্রাপ্ত পুলিশ অফিসার সন্দেহ পায় এক প্রতিভাবান বিজ্ঞানীর অপরাধজগতের সঙ্গে জড়িত থাকার প্রমাণে। যতক্ষণ না তিনি সবুজ সংকেত পেয়ে তদন্ত করেন, ততক্ষণ পর্যন্ত চায়েন সত্য — কিন্তু বিজ্ঞানীর ধরা-ঢোকার কৌশল যে বিশাল, তা ওই পুলিশ অফিসারই বুঝতে পারে। এই সংঘর্ষে জন্ম নেয় এক দমবন্ধ এক অ্যাকশন থ্রিলার!",
    screenshots: ["/Onee1.jpg", "/Onee2.jpg", "/Onee3.jpg", "/Onee4.jpg", "/Onee5.jpg", "/Onee6.jpg"],
    telegramLink: "https://t.me/flixoryproxy/1817",
    trailerLink: "https://www.youtube.com/embed/_gaobCu3LEw?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1BgVWO6-lQuqG8VToQp9Ag8Gdu6u9iO_z/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 18,
    title: "Devara: Part 1 (2024)",
    poster: "/18id.jpg",
    rating: 7.6,
    year: 2024,
    duration: "2h 52m",
    genre: ["Action", "Thriller", "Drama"],
    description:
      "তেলেগু এক চিফেনের ছায়াযুদ্ধ—অস্ত্রচুরি ও নিজ গাঁয়ের সুরক্ষার গল্পে জড়িয়ে পড়ে প্রতিশোধ ও জটিল পরিবারের নাটক। সামগ্রিক ভিজ্যুয়াল ও স্কেলে তৈরি হয় নতুন মহাকাব্য।",
    screenshots: ["/Devara1.jpg", "/Devara2.jpg", "/Devara3.jpg", "/Devara4.jpg", "/Devara5.jpg", "/Devara6.jpg"],
    telegramLink: "https://t.me/flixoryproxy/1819",
    trailerLink: "https://www.youtube.com/embed/NcCYq3bvlJM?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1kdf00I0pIRbUxVCXLHAigiwIzU2kNPgT/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 19,
    title: "Abbara (2022)",
    poster: "/19id.jpg",
    rating: 7.1,
    year: 2022,
    duration: "1h 38m",
    genre: ["Romantic", "Action", "Thriller"],
    description:
      "একজন নায়কের তিন আলাদা জীবন—তার প্রতিটি রূপই লুকিয়ে বিশেষ গল্প আর রোম্যান্সের সম্ভার। তিন চরিত্রে ভিন্ন আবেগের বহুমুখী আকর্ষণ।",
    screenshots: ["/Abbara1.jpg", "/Abbara2.jpg", "/Abbara3.jpg", "/Abbara4.jpg", "/Abbara5.jpg", "/Abbara6.jpg"],
    telegramLink: "https://t.me/flixoryproxy/1821",
    trailerLink: "https://www.youtube.com/embed/gxitx6SuIFI?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1pRdxd5IJ-BTCGjk1m2NEjBqeyT1O1KAY/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 20,
    title: "Gana (2025)",
    poster: "/20id.jpg",
    rating: 7.5,
    year: 2025,
    duration: "2h 18m",
    genre: ["Science", "Drama", "Thriller"],
    description:
      "একটা জাদুকরী কলিং ফোন যা ১৯৯৩ সালের সাথে যোগায়—বর্তমানের জার্নালিস্ট আর অতীতের এক নারীর রহস্যময় কানেকশন ছড়িয়ে দেয় ফিউচারিস্টিক থ্রিল।",
    screenshots: ["/Gana1.jpg", "/Gana2.jpg", "/Gana3.jpg", "/Gana4.jpg", "/Gana5.jpg", "/Gana6.jpg"],
    telegramLink: "https://t.me/flixoryproxy/1823",
    trailerLink: "https://www.youtube.com/embed/rHcalVK-ock?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1VMZqMa1tyvFiGIh1DNOPSQDEnS2tnUOs/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 21,
    title: "Rakshasa (2025)",
    poster: "/21id.jpg",
    rating: 7.8,
    year: 2025,
    duration: "1h 58m",
    genre: ["Science", "Drama", "Thriller"],
    description: "a tv show Rakshasa (2025)",
    screenshots: [
      "/Rakshasa1.jpg",
      "/Rakshasa2.jpg",
      "/Rakshasa3.jpg",
      "/Rakshasa4.jpg",
      "/Rakshasa5.jpg",
      "/Rakshasa6.jpg",
    ],
    telegramLink: "https://t.me/flixoryproxy/1825",
    trailerLink: "https://www.youtube.com/embed/L5A3GrRMypA?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1OLNwZjtc5_oQc4GhNrg7Mou45NQuphOC/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 22,
    title: "bhairathi rangal (2024)",
    poster: "/22id.jpg",
    rating: 6.9,
    year: 2024,
    duration: "2h 09m",
    genre: ["Science", "Drama", "Family"],
    description:
      "১৮শ শতাব্দীর বাঙালির ইতিহাসের পরশে রচিত এক period action-অ্যাডভেঞ্চার—যেখানে রঘু ডাকাত বন্ধুর সঙ্গে জন-জনের চোখে নায়ক হয়ে ওঠে, সাধারণ মানুষের নির্যাতন ও অবিচারের বিরুদ্ধে লড়ায়।",
    screenshots: [
      "/bhairathi1.jpg",
      "/bhairathi2.jpg",
      "/bhairathi3.jpg",
      "/bhairathi4.jpg",
      "/bhairathi5.jpg",
      "/bhairathi6.jpg",
    ],
    telegramLink: "https://t.me/flixoryproxy/1827",
    trailerLink: "https://www.youtube.com/embed/FPcYWcASe5U?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1ozgAslhUAnmsz3f2d72Bq1VGok_pCtmq/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 23,
    title: "Salaar: Part 1 – Ceasefire (2023)",
    poster: "/23id.jpg",
    rating: 6.7,
    year: 2023,
    duration: "2h 54m",
    genre: ["Action", "Crime", "Drama"],
    description:
      "প্রভাসের দাপট!—শৈশবের বন্ধুত্ব, প্রতিশোধ আর মাফিয়া রাজত্বের মহাযুদ্ধ—যেখানে এক বন্ধু আরেকজনের জন্য পুরো সাম্রাজ্যের বিরুদ্ধে দাঁড়ায়।",
    screenshots: ["/Salaar1.jpg", "/Salaar2.jpg", "/Salaar3.jpg", "/Salaar4.jpg", "/Salaar5.jpg", "/Salaar6.jpg"],
    telegramLink: "https://t.me/flixoryproxy/1829",
    trailerLink: "https://www.youtube.com/embed/HihakYi5M2I?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1NLGRHEE2jFMKgc2o5z9waeYn4XdFB6QH/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 24,
    title: "Thor: The Dark World (2013)",
    poster: "/24id.jpg",
    rating: 6.8,
    year: 2013,
    duration: "2h 10m",
    genre: ["Action", "Adventure", "Fantasy"],
    description: "থরকে এবার লড়তে হয় এক প্রাচীন অন্ধকার শক্তির বিরুদ্ধে—ডার্ক এলভদের সাথে পৃথিবী ও আসগার্ড বাঁচানোর মহাযুদ্ধ!",
    screenshots: [
      "/ThorDark1.jpg",
      "/ThorDark2.jpg",
      "/ThorDark3.jpg",
      "/ThorDark4.jpg",
      "/ThorDark5.jpg",
      "/ThorDark6.jpg",
    ],
    telegramLink: "https://t.me/flixoryproxy/1831",
    trailerLink: "https://www.youtube.com/embed/biq0XGdmULc?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1Bq3QzAnZI2MhhUUG-D_FaKlCJC88LKo4/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 25,
    title: "Thor: Ragnarok (2017)",
    poster: "/25id.jpg",
    rating: 7.9,
    year: 2017,
    duration: "1h 52m",
    genre: ["Action", "Comedy", "Fantasy"],
    description:
      "আসগার্ডের ধ্বংস (Ragnarok) ঠেকাতে থরকে একেবারে গ্ল্যাডিয়েটর এরেনায় হাল্কের সাথে যুদ্ধ করতে হয়—হাসি, অ্যাকশন আর কালারফুল ভিজ্যুয়ালের মেলবন্ধন।",
    screenshots: [
      "/ThorRagnarok1.jpg",
      "/ThorRagnarok2.jpg",
      "/ThorRagnarok3.jpg",
      "/ThorRagnarok4.jpg",
      "/ThorRagnarok5.jpg",
      "/ThorRagnarok6.jpg",
    ],
    telegramLink: "https://t.me/flixoryproxy/1833",
    trailerLink: "https://www.youtube.com/embed/NNvt4OS7mhA?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/10FjfLIbecSg1rVmEnXOdjNL_dbRrbefD/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 26,
    title: "Thor: Love and Thunder (2022)",
    poster: "/26id.jpg",
    rating: 6.2,
    year: 2022,
    duration: "1h 58m",
    genre: ["Action", "Fantasy", "Romance"],
    description: "এবার থর পায় মাইটি থর জেন ফস্টারকে—ভালোবাসা, বজ্র আর দেবতা-শিকারি গর দ্য গড বুচারের বিরুদ্ধে লড়াই। ",
    screenshots: [
      "/ThorLove1.jpg",
      "/ThorLove2.jpg",
      "/ThorLove3.jpg",
      "/ThorLove4.jpg",
      "/ThorLove5.jpg",
      "/ThorLove6.jpg",
    ],
    telegramLink: "https://t.me/flixoryproxy/1835",
    trailerLink: "https://www.youtube.com/embed/sFTD5vBfRGY?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1ZOmghRYfX3wvsOvpZEYcg3XvcdpS3z7L/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 27,
    title: "Baaghi 4 (2025)",
    poster: "/27id.jpg",
    rating: 6.9,
    year: 2025,
    duration: "2h 34m",
    genre: ["Action", "Drama", "Thriller"],
    description:
      "Tiger Shroff রায়দর্শী থ্রিলার-অ্যাকশনের পরবর্তী অধ্যায়—Ronnie ফেরার এই অংশে রয়েছে দমবন্ধ করা যুদ্ধ, অতীতের দগ্ধ ছায়া আর এক অন্ধকারে ভরা প্রতিশোধের গল্প।",
    screenshots: ["/Baaghi41.jpg", "/Baaghi42.jpg", "/Baaghi43.jpg", "/Baaghi44.jpg", "/Baaghi45.jpg", "/Baaghi46.jpg"],
    telegramLink: "https://t.me/flixoryproxy/1837",
    trailerLink: "https://www.youtube.com/embed/rbYNMvTkp8U?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1YgWR1wJaV3r_YKmr_n_uCP-PrICNwz9l/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 28,
    title: "King Kong (2005)",
    poster: "/28id.jpg",
    rating: 7.2,
    year: 2005,
    duration: "2h 54m",
    genre: ["Action", "Adventure", "Fantasy"],
    description:
      "একদল অভিযাত্রী রহস্যময় Skull Island-এ গিয়ে আবিষ্কার করে এক দৈত্যাকার গরিলা—King Kong। কিন্তু মানব লোভ ও শোষণের কারণে দানব আর মানুষের মাঝে শুরু হয় এক করুণ যুদ্ধ, যার সমাপ্তি হয় নিউইয়র্ক সিটির আকাশচুম্বী টাওয়ারে।",
    screenshots: [
      "/KingKong1.jpg",
      "/KingKong2.jpg",
      "/KingKong3.jpg",
      "/KingKong4.jpg",
      "/KingKong5.jpg",
      "/KingKong6.jpg",
    ],
    telegramLink: "https://t.me/flixoryproxy/1839",
    trailerLink: "https://www.youtube.com/embed/t4-UjZccU_A?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1BdWPo_9-C9sFedA01t2dVJwUg0X7Chr_/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 29,
    title: "The Conjuring: Last Rites (2025)",
    poster: "/29id.jpg",
    rating: 8.8,
    year: 2025,
    duration: "2h 10m",
    genre: ["Horror", "Mystery", "Supernatural"],
    description:
      "এড ও লরেইন ওয়্যারেনের দীর্ঘ চলমান যাত্রার আবেগঘন শেষ অধ্যায়—এক ধ্বংসাত্মক কেস, স্মার্ক পরিবারের ভয়াবহ তত্ত্বাবধান এবং যুগান্তরিত আদর্শের নেশায় বয়ে যাওয়া এক চরম থ্রিলার ছন্দে মোড়া!",
    screenshots: [
      "/ConjuringLast1.jpg",
      "/ConjuringLast2.jpg",
      "/ConjuringLast3.jpg",
      "/ConjuringLast4.jpg",
      "/ConjuringLast5.jpg",
      "/ConjuringLast6.jpg",
    ],
    telegramLink: "https://t.me/flixoryproxy/1841",
    trailerLink: "https://www.youtube.com/embed/iJn5buVemKQ?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1dkoKIwb62Fli7Tnlzg7k05kWeq03ej3t/preview",
    googleDriveDownloadUrl: "",
  },
  {
    id: 30,
    title: "RRR (2022)",
    poster: "/30id.jpg",
    rating: 7.8,
    year: 2022,
    duration: "1h 52m",
    genre: ["Action", "Drama", "Fantasy"],
    description:
      "এস.এস. রাজামৌলি পরিচালিত এক মহাকাব্যিক ভিজ্যুয়াল—১৯২০ সালের ব্রিটিশ শাসনের প্রেক্ষাপটে দুই বিপ্লবী অল্লুরি সীতারামা রাজু (Ram Charan) ও কোমারাম ভীম (Jr. NTR)-এর বন্ধুত্ব, সংগ্রাম ও প্রতিশোধের গল্প।",
    screenshots: ["/RRR1.jpg", "/RRR2.jpg", "/RRR3.jpg", "/RRR4.jpg", "/RRR5.jpg", "/RRR6.jpg"],
    telegramLink: "https://t.me/flixoryproxy/1843",
    trailerLink: "https://www.youtube.com/embed/GY4BgdUSpbE?si",
    googleDrivePlayUrl: "https://drive.google.com/file/d/1oWQaLM32o4I5XXeyYzs2AgSwOMqDZedK/preview",
    googleDriveDownloadUrl: "",
  },
]

export function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authenticatedUser, setAuthenticatedUser] = useState<string | null>(null)
  const [sessionExpired, setSessionExpired] = useState(false)
  const [showTelegramPopup, setShowTelegramPopup] = useState(false)
  const [currentTelegramLink, setCurrentTelegramLink] = useState("")
  const [currentMovieTitle, setCurrentMovieTitle] = useState("")
  const [showEnhancedPlayer, setShowEnhancedPlayer] = useState(false)
  const [enhancedPlayerMovie, setEnhancedPlayerMovie] = useState<any>(null)
  const [enhancedPlayerUrl, setEnhancedPlayerUrl] = useState("")
  const [isEnhancedTrailer, setIsEnhancedTrailer] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const sortedMovies = [...movies].sort((a, b) => b.id - a.id)

  const slideshowMovies = sortedMovies.filter((movie) => TRENDING_MOVIE_IDS.includes(movie.id))

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowMovies.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [slideshowMovies.length])

  useEffect(() => {
    const checkAuthStatus = () => {
      const savedAuth = localStorage.getItem("flixory_user_auth")
      if (savedAuth) {
        const authData = JSON.parse(savedAuth)

        if (authData.expiresAt && new Date(authData.expiresAt) < new Date()) {
          localStorage.removeItem("flixory_user_auth")
          setAuthenticatedUser(null)
          setSessionExpired(true)
          return
        }

        const approvedUsers = JSON.parse(localStorage.getItem("flixory_approved_users") || "[]")
        const user = approvedUsers.find(
          (u: any) => u.username.toLowerCase() === authData.username.toLowerCase() && u.isActive,
        )

        if (!user) {
          localStorage.removeItem("flixory_user_auth")
          setAuthenticatedUser(null)
          return
        }

        if (authData.username) {
          setAuthenticatedUser(authData.username)
        }
      }
    }

    checkAuthStatus()

    const authCheckInterval = setInterval(checkAuthStatus, 60000)

    return () => clearInterval(authCheckInterval)
  }, [])

  const totalPages = Math.ceil(sortedMovies.length / MOVIES_PER_PAGE)
  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE
  const endIndex = startIndex + MOVIES_PER_PAGE
  const paginatedMovies = sortedMovies.slice(startIndex, endIndex)

  const filteredMovies = sortedMovies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
      searchQuery
        .toLowerCase()
        .split(" ")
        .some(
          (word) => movie.title.toLowerCase().includes(word) || movie.genre.some((g) => g.toLowerCase().includes(word)),
        ),
  )

  const featuredMovie = slideshowMovies[currentSlide]

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowMovies.length) % slideshowMovies.length)
  }

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowMovies.length)
  }

  const handleOpenTelegram = (telegramLink: string, movieTitle: string) => {
    console.log("[v0] Opening Telegram link:", telegramLink)
    setCurrentTelegramLink(telegramLink)
    setCurrentMovieTitle(movieTitle)
    setShowTelegramPopup(true)
    setSelectedMovie(null)
  }

  const handlePlayOnline = (movie: any) => {
    if (movie.googleDrivePlayUrl) {
      setEnhancedPlayerMovie(movie)
      setEnhancedPlayerUrl(movie.googleDrivePlayUrl)
      setIsEnhancedTrailer(false)
      setShowEnhancedPlayer(true)
      setSelectedMovie(null)
    }
  }

  const handlePlayTrailer = (movie: any) => {
    if (movie.trailerLink) {
      setEnhancedPlayerMovie(movie)
      setEnhancedPlayerUrl(movie.trailerLink)
      setIsEnhancedTrailer(true)
      setShowEnhancedPlayer(true)
      setSelectedMovie(null)
    }
  }

  const handleEnhancedMovieSelect = (movie: any) => {
    setEnhancedPlayerMovie(movie)
    // Keep the same type (trailer or online play)
    if (isEnhancedTrailer) {
      setEnhancedPlayerUrl(movie.trailerLink)
    } else {
      setEnhancedPlayerUrl(movie.googleDrivePlayUrl || movie.trailerLink)
    }
  }

  const handleUserAuth = (username: string) => {
    setAuthenticatedUser(username)
    setShowAuthModal(false)
    setSessionExpired(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("flixory_user_auth")

    const approvedUsers = JSON.parse(localStorage.getItem("flixory_approved_users") || "[]")
    const updatedUsers = approvedUsers.map((u: any) =>
      u.username.toLowerCase() === authenticatedUser?.toLowerCase()
        ? { ...u, deviceId: null, deviceFingerprint: null, lastLoginTime: null }
        : u,
    )
    localStorage.setItem("flixory_approved_users", JSON.stringify(updatedUsers))

    setAuthenticatedUser(null)
  }

  return (
    <div className={`min-h-screen bg-background touch-manipulation pb-20 ${searchQuery ? "search-active" : ""}`}>
      {/* Session Expired Notification */}
      {sessionExpired && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
            <p className="text-sm">Session expired. Please login again.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 md:space-x-8">
              {/* TV icon with MV text next to FLIXORY */}
              <div className="flex items-center space-x-2">
                <div className="relative w-8 h-8 md:w-10 md:h-10">
                  {/* TV Screen */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full text-primary"
                  >
                    <rect x="2" y="7" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                    {/* TV Stand */}
                    <path d="M8 20 L16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 20 L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    {/* Antenna */}
                    <path d="M7 7 L9 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M17 7 L15 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {/* MV Text inside TV */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[8px] md:text-[10px] font-bold text-primary mt-1">MV</span>
                  </div>
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-primary">FLIXORY</h1>
              </div>
              <nav className="hidden md:flex space-x-6">
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  All
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                  Movies
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                  Series
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                  Originals
                </Button>
              </nav>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-40 md:w-64 bg-card border-border text-sm md:text-base"
                />
              </div>
              {authenticatedUser && (
                <div className="flex items-center space-x-2">
                  <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>Welcome, {authenticatedUser}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="text-muted-foreground hover:text-foreground"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              )}
              {!authenticatedUser && (
                <Button onClick={() => setShowAuthModal(true)} className="text-sm md:text-base">
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden slideshow-container">
        {slideshowMovies.map((movie, index) => (
          <div
            key={movie.id}
            className={`slide ${index === currentSlide ? "active" : ""} ${index === currentSlide - 1 || (currentSlide === 0 && index === slideshowMovies.length - 1) ? "prev" : ""}`}
            onClick={() => setSelectedMovie(movie)}
            style={{ cursor: "pointer" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('${movie.poster}')`,
              }}
            />
            <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
              <div className="max-w-3xl">
                <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 text-balance">{movie.title}</h2>
                <p className="text-sm md:text-xl text-muted-foreground mb-6 md:mb-8 text-pretty leading-relaxed line-clamp-3 md:line-clamp-none">
                  {movie.description}
                </p>
                <div className="flex items-center space-x-2 md:space-x-4 mb-6 md:mb-10">
                  <Badge
                    variant="secondary"
                    className="flex items-center space-x-1 text-sm md:text-lg px-2 md:px-3 py-1"
                  >
                    <Star className="w-3 md:w-4 h-3 md:h-4 fill-yellow-400 text-yellow-400" />
                    <span>{movie.rating}</span>
                  </Badge>
                  <Badge variant="outline" className="text-sm md:text-lg px-2 md:px-3 py-1">
                    {movie.year}
                  </Badge>
                  <Badge variant="outline" className="flex items-center space-x-1 text-sm md:text-lg px-2 md:px-3 py-1">
                    <Clock className="w-3 md:w-4 h-3 md:h-4" />
                    <span>{movie.duration}</span>
                  </Badge>
                </div>
                <div className="flex space-x-3 md:space-x-6">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-sm md:text-lg px-4 md:px-8 py-2 md:py-3"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOpenTelegram(movie.telegramLink, movie.title)
                    }}
                  >
                    <Play className="w-4 md:w-6 h-4 md:h-6 mr-2 md:mr-3" />
                    Play
                  </Button>
                  <Button
                    variant="outline"
                    className="text-sm md:text-lg px-4 md:px-8 py-2 md:py-3 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedMovie(movie)
                    }}
                  >
                    More Info
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slideshowMovies.map((_, index) => (
            <button
              key={index}
              className={`w-2 md:w-3 h-2 md:h-3 rounded-full transition-all ${index === currentSlide ? "bg-primary" : "bg-white/30"}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Search Results */}
      {searchQuery && (
        <section className="search-results container mx-auto px-4 py-8 md:py-12">
          <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">Search Results for "{searchQuery}"</h3>
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6">
              {filteredMovies.map((movie) => (
                <div key={movie.id} className="movie-card cursor-pointer group" onClick={() => setSelectedMovie(movie)}>
                  <div className="relative overflow-hidden rounded-lg bg-card">
                    <img
                      src={movie.poster || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-full h-[200px] md:h-[300px] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Play className="w-8 md:w-12 h-8 md:h-12 text-white" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary/90 text-primary-foreground text-xs">
                        <Star className="w-2 md:w-3 h-2 md:h-3 mr-1 fill-current" />
                        {movie.rating}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-3">
                    <h4 className="font-semibold text-xs md:text-sm line-clamp-2 text-balance">{movie.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{movie.year}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-16 max-w-2xl mx-auto">
              <div className="mb-6">
                <Search className="w-12 md:w-16 h-12 md:h-16 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-lg md:text-xl font-semibold mb-3">কোনো মুভি পাওয়া যায়নি</h4>
                <p className="text-muted-foreground text-sm md:text-lg leading-relaxed px-4">
                  আপনার দেওয়া নামে কোনো মুভি এখানে নেই অথবা আপনার নামে ভুল আছে। গুগল থেকে IMDB তে গিয়ে সঠিক নাম দিয়ে এখানে সার্চ করুন।
                </p>
              </div>
              <Button variant="outline" onClick={() => setSearchQuery("")} className="mt-4">
                সব মুভি দেখুন
              </Button>
            </div>
          )}
        </section>
      )}

      {/* Movies Grid */}
      <section className="movies-grid container mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h3 className="text-xl md:text-2xl font-bold">Hot and Fresh</h3>
          <span className="text-sm text-muted-foreground">
            পৃষ্ঠা {currentPage} / {totalPages}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6">
          {paginatedMovies.map((movie) => (
            <div key={movie.id} className="movie-card cursor-pointer group" onClick={() => setSelectedMovie(movie)}>
              <div className="relative overflow-hidden rounded-lg bg-card">
                <img
                  src={movie.poster || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-full h-[200px] md:h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Play className="w-8 md:w-12 h-8 md:h-12 text-white" />
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-primary/90 text-primary-foreground text-xs">
                    <Star className="w-2 md:w-3 h-2 md:h-3 mr-1 fill-current" />
                    {movie.rating}
                  </Badge>
                </div>
              </div>
              <div className="mt-2 md:mt-3">
                <h4 className="font-semibold text-xs md:text-sm line-clamp-2 text-balance">{movie.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{movie.year}</p>
              </div>
            </div>
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </section>

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onOpenTelegram={handleOpenTelegram}
          onPlayTrailer={() => handlePlayTrailer(selectedMovie)}
          onPlayOnline={() => handlePlayOnline(selectedMovie)}
        />
      )}

      {showEnhancedPlayer && enhancedPlayerMovie && (
        <EnhancedVideoPlayer
          videoUrl={enhancedPlayerUrl}
          movie={enhancedPlayerMovie}
          allMovies={sortedMovies}
          onClose={() => {
            setShowEnhancedPlayer(false)
            setEnhancedPlayerMovie(null)
            setEnhancedPlayerUrl("")
          }}
          onMovieSelect={handleEnhancedMovieSelect}
          isTrailer={isEnhancedTrailer}
        />
      )}

      {/* Video Player - Kept for potential fallback or simpler cases */}
      {isPlaying && (
        <VideoPlayer
          videoUrl={currentVideoUrl}
          onClose={() => {
            setIsPlaying(false)
            setCurrentVideoUrl("")
          }}
        />
      )}

      {showTelegramPopup && (
        <TelegramPopup
          telegramLink={currentTelegramLink}
          movieTitle={currentMovieTitle}
          onClose={() => {
            setShowTelegramPopup(false)
            setCurrentTelegramLink("")
            setCurrentMovieTitle("")
          }}
          isShort={false}
        />
      )}

      {showAuthModal && <UserAuthModal onAuth={handleUserAuth} onClose={() => setShowAuthModal(false)} />}
    </div>
  )
}

function convertYouTubeLink(youtubeLink: string): string {
  const videoIdMatch = youtubeLink.match(/v=([a-zA-Z0-9_-]+)/)
  if (videoIdMatch) {
    const videoId = videoIdMatch[1]
    return `https://www.youtube.com/embed/${videoId}`
  }
  return youtubeLink
}
