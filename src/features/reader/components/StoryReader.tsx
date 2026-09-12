import React, { useState, useEffect } from "react";
import { StoryConfig } from "../types";
import ChapterReader from "./ChapterReader";
import CinematicIntro from "./ui/CinematicIntro";
import ReadingProgress from "./ui/ReadingProgress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface StoryReaderProps {
  story: StoryConfig;
}

export default function StoryReader({ story }: StoryReaderProps) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate asset preloading check
    // In a real app, this would wait for fonts and first scene images to load
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const currentChapter = story.chapters[0];

  return (
    <div className="w-full bg-black min-h-screen text-white font-sans overflow-x-hidden selection:bg-white/30 relative">
      <CinematicIntro title={story.title} isReady={isReady} />
      <ReadingProgress />

      {/* Minimalist UI Controls */}
      <div className="fixed top-4 left-4 z-[9000]">
        <button 
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-black/70 transition-all"
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
