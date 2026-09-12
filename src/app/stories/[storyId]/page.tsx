"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function StoryDetailPage({ params }: { params: { storyId: string } }) {
  const { language } = useLanguage();

  const story = {
    title: language === "en" ? "A Nightmare That Wanted To Become A Beautiful Dream" : "Cô Gái Bán Diêm",
    author: "San Anh",
    illustrator: "Mr. Ngòi",
    genres: ["Fantasy", "Drama", "Interactive"],
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
    <div className="w-full bg-zinc-950 min-h-screen text-zinc-100 font-sans pb-32">
      
      {/* Minimal Nav */}
      <nav className="w-full px-6 py-8 flex justify-between items-center max-w-7xl mx-auto border-b border-zinc-900 mb-12">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight">
          S.
        </Link>
        <div className="flex gap-6 text-sm font-medium text-zinc-400">
          <Link href="/" className="hover:text-zinc-100 transition-colors">Library</Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left: Cover */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="w-full aspect-[3/4] bg-zinc-900 sticky top-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={story.coverUrl} alt="Cover" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        </div>

        {/* Right: Info & Chapters */}
        <div className="flex-1 space-y-16">
          
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-serif leading-tight">
              {story.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm font-medium text-zinc-500 uppercase tracking-widest">
              <span>{story.author}</span>
              <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
              <span>{story.illustrator}</span>
            </div>

            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl border-l border-zinc-800 pl-6">
              {story.synopsis}
            </p>

            <div className="flex gap-3 pt-4">
              {story.genres.map(g => (
                <span key={g} className="px-3 py-1 border border-zinc-800 text-zinc-400 text-xs font-medium uppercase tracking-wider">
                  {g}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-900">
            <h2 className="text-2xl font-serif mb-8">Contents</h2>
            
            <div className="space-y-0">
              {story.chapters.map((ch, idx) => (
                <Link 
                  key={ch.id} 
                  href={ch.isLocked ? "#" : `/stories/${params.storyId}/read`}
                  className={`group flex items-baseline gap-6 py-6 border-b border-zinc-900 transition-colors ${
                    ch.isLocked ? "opacity-40 cursor-not-allowed" : "hover:bg-zinc-900/50"
                  }`}
                >
                  <span className="text-xl font-serif text-zinc-600 w-8 text-right">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-zinc-200 group-hover:text-white">{ch.title}</h3>
                  </div>
                  <span className="text-sm text-zinc-500 hidden md:block">{ch.date}</span>
                </Link>
              ))}
            </div>
          </div>
          
          {!story.chapters[0].isLocked && (
             <Link 
               href={`/stories/${params.storyId}/read`}
               className="inline-block mt-8 px-12 py-4 bg-white text-black font-semibold hover:bg-zinc-200 transition-colors"
             >
               Start Reading
             </Link>
          )}

        </div>

      </div>
    </div>
  );
}
