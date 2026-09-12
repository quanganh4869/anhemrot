"use client";

import React from "react";
import Link from "next/link";
import { Play, Heart, Share2, BookOpen, Clock, Star } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function StoryDetailPage({ params }: { params: { storyId: string } }) {
  const { language } = useLanguage();

  // Mock data for the landing page
  const story = {
    title: language === "en" ? "A Nightmare That Wanted To Become A Beautiful Dream" : "Cô Gái Bán Diêm",
    author: "San Anh",
    illustrator: "Mr. Ngòi",
    genres: ["Fantasy", "Drama", "Interactive"],
    rating: "4.9",
    views: "1.2M",
    synopsis: language === "en"
      ? "Follow the emotional journey of a little nightmare cast out by the gods, searching for its true purpose in the Realm of Dreams. An interactive scrollytelling experience like no other."
      : "Hành trình cảm động của một cơn ác mộng nhỏ bé trốn khỏi vùng đất tối tăm, đi tìm ánh sáng và tình yêu đích thực. Trải nghiệm đọc truyện tương tác hoàn toàn mới với hiệu ứng điện ảnh.",
    coverUrl: "/images/story/scene_02_title.webp",
    chapters: [
      { id: "1", title: "Prologue: The Fall", date: "Oct 12, 2026", isLocked: false },
      { id: "2", title: "Chapter 1: Whispers in the Dark", date: "Oct 19, 2026", isLocked: false },
      { id: "3", title: "Chapter 2: The Dream Weaver", date: "Oct 26, 2026", isLocked: true },
    ]
  };

  return (
    <div className="w-full bg-black min-h-screen text-zinc-100 font-sans pb-20">
      
      {/* Hero Banner with Blurred Background */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        {/* Blurred backdrop */}
        <div 
          className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 transform scale-110"
          style={{ backgroundImage: `url(${story.coverUrl})` }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        
        {/* Content Container */}
        <div className="absolute bottom-0 w-full px-4 md:px-12 lg:px-24 flex flex-col md:flex-row items-end gap-8 pb-12 max-w-7xl mx-auto left-0 right-0">
          
          {/* Main Cover */}
          <div className="w-40 md:w-64 shrink-0 rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/20 z-10 translate-y-12 md:translate-y-24 transition-transform hover:-translate-y-2 duration-500">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={story.coverUrl} alt="Cover" className="w-full aspect-[2/3] object-cover" />
          </div>

          {/* Title & Meta */}
          <div className="flex-1 space-y-4 z-10">
            <div className="flex gap-2 flex-wrap">
              {story.genres.map(g => (
                <span key={g} className="px-3 py-1 bg-white/10 backdrop-blur text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  {g}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-black font-fredoka text-white leading-tight drop-shadow-lg">
              {story.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-300 font-medium">
              <span className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {story.rating}</span>
              <span className="flex items-center gap-2"><EyeIcon className="w-4 h-4" /> {story.views} reads</span>
              <span className="flex items-center gap-2"><span className="text-white">Author:</span> {story.author}</span>
              <span className="flex items-center gap-2"><span className="text-white">Art:</span> {story.illustrator}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 mt-16 md:mt-32 flex flex-col lg:flex-row gap-12">
        
        {/* Left Column (Synopsis & Actions) */}
        <div className="flex-1 space-y-8">
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link 
              href={`/stories/${params.storyId}/read`}
              className="flex-1 min-w-[200px] bg-white hover:bg-zinc-200 text-black px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              <Play className="w-5 h-5 fill-current" />
              {language === "en" ? "Read First Episode" : "Đọc Tập Đầu Tiên"}
            </Link>
            
            <button className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors ring-1 ring-white/20">
              <Heart className="w-6 h-6 text-white" />
            </button>
            <button className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors ring-1 ring-white/20">
              <Share2 className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white font-fredoka border-b border-white/10 pb-2">
              {language === "en" ? "Synopsis" : "Tóm tắt nội dung"}
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed">
              {story.synopsis}
            </p>
          </div>
        </div>

        {/* Right Column (Chapter List) */}
        <div className="lg:w-[450px] shrink-0 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h2 className="text-xl font-bold text-white font-fredoka flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {language === "en" ? "Episodes" : "Danh sách tập"}
            </h2>
            <span className="text-sm text-zinc-500 font-medium">{story.chapters.length} Episodes</span>
          </div>

          <div className="space-y-3">
            {story.chapters.map((ch, idx) => (
              <Link 
                key={ch.id} 
                href={ch.isLocked ? "#" : `/stories/${params.storyId}/read`}
                className={`group flex items-center gap-4 p-4 rounded-xl transition-all ${
                  ch.isLocked 
                    ? "bg-white/5 opacity-50 cursor-not-allowed" 
                    : "bg-white/5 hover:bg-white/10 cursor-pointer ring-1 ring-transparent hover:ring-white/20"
                }`}
              >
                <div className="text-2xl font-black text-zinc-700 group-hover:text-zinc-500 w-8 text-center transition-colors">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold ${ch.isLocked ? "text-zinc-500" : "text-white"}`}>{ch.title}</h3>
                  <p className="text-sm text-zinc-500">{ch.date}</p>
                </div>
                {!ch.isLocked && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                )}
                {ch.isLocked && (
                  <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-zinc-400">
                    LOCKED
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
