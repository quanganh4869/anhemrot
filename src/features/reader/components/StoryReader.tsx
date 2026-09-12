import React from "react";
import { StoryConfig } from "../types";
import ChapterReader from "./ChapterReader";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface StoryReaderProps {
  story: StoryConfig;
}

export default function StoryReader({ story }: StoryReaderProps) {
  const router = useRouter();
  
  // For now, we just render the first chapter
  const currentChapter = story.chapters[0];

  return (
    <div className="relative w-full bg-zinc-950 min-h-screen">
      {/* Minimalist UI Controls */}
      <div className="fixed top-4 left-4 z-50">
        <button 
          onClick={() => router.push('/')}
          className="w-10 h-10 bg-black/20 hover:bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all ring-1 ring-white/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="fixed top-4 right-4 z-50">
        <div className="px-4 py-2 bg-black/20 backdrop-blur rounded-full text-white/70 text-sm font-medium ring-1 ring-white/10 shadow-xl">
          {story.title} - {currentChapter.title}
        </div>
      </div>

      <ChapterReader chapter={currentChapter} />
      
    </div>
  );
}
