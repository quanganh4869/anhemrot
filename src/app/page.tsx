"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StoryHero from "@/components/story/StoryHero";
import { useLanguage } from "@/components/providers/LanguageProvider";
import ScrollStoryReader from "@/features/story-studio/components/ScrollStoryReader";
import { ChapterAnimConfig } from "@/types/story-anim";

export default function Home() {
  const { language } = useLanguage();

  // Mock Animated Config for Demo
  const mockAnimatedStory: ChapterAnimConfig = {
    storyId: "1",
    chapterId: "1",
    status: "published",
    updatedAt: new Date().toISOString(),
    scenes: [
      {
        id: "scene1",
        order: 0,
        duration: 8,
        status: "ready",
        aspectRatio: "16:9",
        background: {
          url: "/images/hero_firefly.png",
          animation: { preset: "kenBurns", duration: 8 }
        },
        transition: { type: "crossfade", duration: 1 },
        layers: [
          {
            id: "title",
            type: "text",
            content: language === "en" ? "How Firefly Got His Light" : "Chú Đom Đóm Tìm Lại Ánh Sáng",
            x: 50, y: 50, scale: 1, rotation: 0, opacity: 1, zIndex: 10,
            visible: true, locked: false,
            fontSize: 42, fontWeight: "bold", textShadow: "2px 2px 10px rgba(0,0,0,0.8)",
            animation: { preset: "blurReveal", duration: 2, delay: 0.5 }
          }
        ]
      },
      {
        id: "scene2",
        order: 1,
        duration: 8,
        status: "ready",
        aspectRatio: "16:9",
        background: {
          url: "/images/sad_firefly.png",
          animation: { preset: "panLeft", duration: 8 }
        },
        transition: { type: "crossfade", duration: 1 },
        layers: [
          {
            id: "text1",
            type: "text",
            content: language === "en" ? "He didn't know how to shine his light..." : "Cậu không biết làm thế nào để phát sáng...",
            x: 50, y: 80, scale: 1, rotation: 0, opacity: 1, zIndex: 10,
            visible: true, locked: false,
            fontSize: 24, fontWeight: "medium", textShadow: "1px 1px 5px rgba(0,0,0,0.8)",
            animation: { preset: "fadeUp", duration: 1, delay: 1 }
          }
        ]
      },
      {
        id: "scene3",
        order: 2,
        duration: 8,
        status: "ready",
        aspectRatio: "16:9",
        background: {
          url: "/images/happy_firefly.png",
          animation: { preset: "panRight", duration: 8 }
        },
        transition: { type: "fade", duration: 1 },
        layers: [
          {
            id: "text2",
            type: "text",
            content: language === "en" ? "POP! A brilliant, golden light burst from his tail!" : "BÙM! Một tia sáng vàng rực rỡ lóe lên từ đuôi cậu!",
            x: 50, y: 80, scale: 1, rotation: 0, opacity: 1, zIndex: 10,
            visible: true, locked: false,
            fontSize: 24, fontWeight: "medium", textShadow: "1px 1px 5px rgba(0,0,0,0.8)",
            animation: { preset: "fadeUp", duration: 1, delay: 1 }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <Header />
      <main className="flex-grow">
        <StoryHero 
          title={language === "en" ? "How Firefly Got His Light" : "Chú Đom Đóm Tìm Lại Ánh Sáng"}
          author="Daniel Errico"
          coverImage="/images/hero_firefly.png"
        />
        <div className="flex justify-center py-6">
          <p className="text-zinc-500 text-sm">Scroll down to read the story</p>
        </div>

        {/* Scroll-based storytelling effect */}
        <ScrollStoryReader config={mockAnimatedStory} />
        
      </main>
      <Footer />
    </div>
  );
}
