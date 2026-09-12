import React, { useState, useEffect, useRef } from "react";
import { StoryConfig } from "../types";
import ChapterReader from "./ChapterReader";
import ReadingProgress from "./ui/ReadingProgress";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StoryReaderProps {
  story: StoryConfig;
}

export default function StoryReader({ story }: StoryReaderProps) {
  const currentChapter = story.chapters[0];
  const [isFocusMode, setIsFocusMode] = useState(false);
  const scrollPosRef = useRef(0);

  // Refresh ScrollTrigger once scenes mount or when focus mode toggles
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);
    return () => clearTimeout(timer);
  }, [isFocusMode]);

  // Handle ESC key to exit focus mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFocusMode) {
        exitFocusMode();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocusMode]);

  const enterFocusMode = () => {
    scrollPosRef.current = window.scrollY;
    setIsFocusMode(true);
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {
        // Fallback gracefully if browser blocks Fullscreen API
      });
    }
  };

  const exitFocusMode = () => {
    setIsFocusMode(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    // Restore scroll position after leaving focus mode
    setTimeout(() => {
      window.scrollTo({ top: scrollPosRef.current, behavior: "instant" });
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <div className={cn(
      "w-full bg-zinc-950 text-zinc-100 min-h-screen flex flex-col font-sans selection:bg-white/30",
      isFocusMode ? "fixed inset-0 z-[100] overflow-y-auto bg-black" : "relative"
    )}>
      <ReadingProgress />

      {/* 1. Real Website Header - only visible in normal mode */}
      {!isFocusMode && <Header />}

      {/* 2. Reader Context Bar - concise, non-intrusive */}
      {!isFocusMode && (
        <section className="w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-sm sticky top-16 z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-3 truncate">
              <Link 
                href={`/stories/${story.id || 'nightmare-dream'}`}
                className="hover:text-white flex items-center gap-1.5 transition-colors font-semibold uppercase tracking-wider"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Library</span>
              </Link>
              <span className="text-zinc-700">/</span>
              <span className="font-serif text-zinc-200 text-sm hidden sm:inline truncate">{story.title}</span>
              <span className="text-zinc-700 hidden sm:inline">/</span>
              <span className="text-zinc-400 font-medium truncate">{currentChapter.title}</span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={enterFocusMode}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white transition-colors rounded text-xs font-medium uppercase tracking-wider"
                title="Mở chế độ Focus toàn màn hình"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Focus Mode</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Floating Exit Button in Focus Mode */}
      {isFocusMode && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
          <button
            onClick={exitFocusMode}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700 rounded-full text-xs font-medium uppercase tracking-widest backdrop-blur shadow-2xl transition-all"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Thoát Focus (ESC)</span>
          </button>
        </div>
      )}

      {/* 3. Main Reader Content Area */}
      <main className="flex-grow w-full">
        {/* The Scenes */}
        <ChapterReader chapter={currentChapter} isFocusMode={isFocusMode} />

        {/* 4. Cinematic Chapter Completion & Next Chapter Section */}
        <section className={cn(
          "w-full bg-zinc-950 flex flex-col items-center justify-center text-center py-24 border-t border-zinc-900 mt-12",
          isFocusMode ? "px-6" : "px-4"
        )}>
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-3">
            Hoàn tất chương
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white font-bold mb-4">
            {currentChapter.title}
          </h2>
          <p className="text-zinc-400 font-serif italic max-w-lg mb-12 text-base sm:text-lg leading-relaxed">
            Bạn đã đi qua hành trình khởi sinh của giấc mơ. Chương tiếp theo đang chờ đón bạn.
          </p>

          {/* Next Chapter Preview Card (Editorial, not SaaS) */}
          <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 p-6 text-left mb-12 hover:border-zinc-700 transition-colors">
            <div className="aspect-video w-full bg-zinc-950 mb-4 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/story/scene_15_dream.webp" 
                alt="Next chapter preview" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              />
            </div>
            <span className="text-xs uppercase tracking-wider text-zinc-500 block mb-1">Chương tiếp theo</span>
            <h3 className="font-serif text-xl text-white font-semibold mb-2">Chương 2: Người Dệt Giấc Mơ</h3>
            <p className="text-sm text-zinc-400 line-clamp-2">
              Băng qua rừng ảo ảnh để tìm kiếm vị thần dệt nên những giấc chiêm bao nhiệm màu nhất.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-8 py-3 border border-zinc-700 hover:border-zinc-400 text-zinc-300 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider rounded"
            >
              Đọc lại từ đầu
            </button>
            <Link
              href={`/stories/${story.id || 'nightmare-dream'}`}
              className="px-8 py-3 bg-white text-black hover:bg-zinc-200 transition-colors text-xs font-bold uppercase tracking-wider rounded"
            >
              Về trang chi tiết
            </Link>
          </div>
        </section>
      </main>

      {/* 5. Real Website Footer - only visible in normal mode */}
      {!isFocusMode && <Footer />}
    </div>
  );
}
