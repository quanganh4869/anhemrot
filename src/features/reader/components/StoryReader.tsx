import React, { useState, useEffect } from "react";
import { StoryConfig } from "../types";
import ChapterReader from "./ChapterReader";
import ReadingProgress from "./ui/ReadingProgress";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface StoryReaderProps {
  story: StoryConfig;
}

export default function StoryReader({ story }: StoryReaderProps) {
  const currentChapter = story.chapters[0];
  const [isNavVisible, setIsNavVisible] = useState(true);

  // Auto-hide navigation after 2 seconds of inactivity, show on mouse movement
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleMouseMove = () => {
      setIsNavVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsNavVisible(false), 2500);
    };
    window.addEventListener("mousemove", handleMouseMove);
    timeout = setTimeout(() => setIsNavVisible(false), 2500);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 min-h-screen flex flex-col font-sans overflow-x-hidden selection:bg-white/30 relative">
      <ReadingProgress />
      
      {/* Cinematic Auto-Hiding Navigation Overlay */}
      <div className={cn(
        "fixed top-0 left-0 w-full h-32 z-50 bg-gradient-to-b from-black/80 to-transparent flex items-start px-6 sm:px-12 pt-8 transition-opacity duration-700",
        isNavVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <Link 
          href={`/stories/${story.id || 'nightmare-dream'}`}
          className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors"
        >
          <div className="p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Quay lại thư viện</span>
            <span className="font-serif text-lg leading-tight">{story.title}</span>
          </div>
        </Link>
      </div>

      {/* Main Reader Canvas: Full bleed, no generic containers, controlled by scenes */}
      <main className="w-full">
        <ChapterReader chapter={currentChapter} />
      </main>
    </div>
  );
}
