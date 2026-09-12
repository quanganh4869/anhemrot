import React, { useState, useEffect } from "react";
import { StoryConfig } from "../types";
import ChapterReader from "./ChapterReader";
import CinematicIntro from "./ui/CinematicIntro";
import ReadingProgress from "./ui/ReadingProgress";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
    <div className="w-full bg-black min-h-screen text-white font-sans overflow-x-hidden selection:bg-white/30 relative flex flex-col">
      <CinematicIntro title={story.title} isReady={isReady} />
      <ReadingProgress />

      <Header />

      <main className="flex-grow relative z-10 w-full">
         <ChapterReader chapter={currentChapter} />
      </main>

      <Footer />
    </div>
  );
}
