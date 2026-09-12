import React from "react";
import { StoryConfig } from "../types";
import ChapterReader from "./ChapterReader";
import ReadingProgress from "./ui/ReadingProgress";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface StoryReaderProps {
  story: StoryConfig;
}

export default function StoryReader({ story }: StoryReaderProps) {
  const currentChapter = story.chapters[0];

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 min-h-screen flex flex-col font-sans">
      <ReadingProgress />
      
      {/* 1. Header identical to Home */}
      <Header />

      {/* 2. Main Reader Content: Fitted to screen with standard editorial margins, NOT full screen lock */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col items-center">
        
        {/* Navigation Breadcrumb / Chapter Title */}
        <div className="w-full mb-6 pb-4 border-b border-zinc-800 flex items-center justify-between text-sm">
          <Link 
            href={`/stories/${story.id || 'nightmare-dream'}`}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại chi tiết</span>
          </Link>

          <div className="font-serif text-zinc-200 text-base">
            <span>{story.title}</span> &bull; <span className="text-zinc-400">{currentChapter.title}</span>
          </div>
        </div>

        {/* Comic / Story Container: Fit with monitor, border framed, natural scroll */}
        <div className="w-full bg-black rounded-xl border border-zinc-800 shadow-2xl overflow-hidden">
          <ChapterReader chapter={currentChapter} />
        </div>
      </main>

      {/* 3. Footer identical to Home */}
      <Footer />
    </div>
  );
}
