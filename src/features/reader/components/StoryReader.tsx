import React, { useState, useEffect } from "react";
import { StoryConfig } from "../types";
import ChapterReader from "./ChapterReader";
import CinematicIntro from "./ui/CinematicIntro";
import ReadingProgress from "./ui/ReadingProgress";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface StoryReaderProps {
  story: StoryConfig;
}

export default function StoryReader({ story }: StoryReaderProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const currentChapter = story.chapters[0];

  return (
    <div className="w-full bg-black min-h-screen text-white font-sans overflow-x-hidden selection:bg-white/30 relative flex flex-col group/reader">
      <CinematicIntro title={story.title} isReady={isReady} />
      <ReadingProgress />

      {/* Subtle UI Overlay - Appears only when hovered near top */}
      <div className="fixed top-0 left-0 w-full h-24 z-50 opacity-0 group-hover/reader:opacity-100 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-black/80 to-transparent flex items-start px-6 pt-6">
        <Link 
          href={`/stories/nightmare-dream`}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium uppercase tracking-widest">{story.title}</span>
        </Link>
      </div>

      <main className="flex-grow relative z-10 w-full">
         <ChapterReader chapter={currentChapter} />
      </main>
    </div>
  );
}
