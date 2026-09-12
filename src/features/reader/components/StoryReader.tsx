import React, { useState, useEffect } from "react";
import { StoryConfig } from "../types";
import ChapterReader from "./ChapterReader";
import ReadingProgress from "./ui/ReadingProgress";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StoryReaderProps {
  story: StoryConfig;
}

export default function StoryReader({ story }: StoryReaderProps) {
  const currentChapter = story.chapters[0];
  const [isNavVisible, setIsNavVisible] = useState(true);

  // Refresh ScrollTrigger once scenes mount
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

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

        {/* Cinematic Chapter Completion / Epilogue */}
        <section className="w-full min-h-[50vh] bg-black flex flex-col items-center justify-center text-center px-6 py-24 border-t border-zinc-900">
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4">
            Hoàn thành chương
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-zinc-100 font-bold mb-4">
            {currentChapter.title}
          </h2>
          <p className="text-zinc-400 font-serif italic max-w-md mb-12 text-lg">
            Cảm ơn bạn đã đồng hành cùng chuyến hành trình vào Vùng Đất Giấc Mơ.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-3.5 border border-zinc-700 hover:border-zinc-400 text-zinc-200 hover:text-white transition-colors text-sm font-medium tracking-wider uppercase"
            >
              Đọc lại từ đầu
            </button>
            <Link
              href={`/stories/${story.id || 'nightmare-dream'}`}
              className="px-8 py-3.5 bg-white text-black hover:bg-zinc-200 transition-colors text-sm font-semibold tracking-wider uppercase"
            >
              Về trang chi tiết
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
