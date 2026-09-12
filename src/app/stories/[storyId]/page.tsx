"use client";

import React from "react";
import StoryReader from "@/features/reader/components/StoryReader";
import { mockStoryData } from "@/features/reader/data/mockStory";

export default function StoryReaderPage() {
  // Normally we would fetch the story data by storyId here from the API.
  // For now, we pass the mockStoryData to verify the engine.
  
  return (
    <div className="w-full bg-zinc-950 text-white min-h-screen">
      {/* 
        We don't render standard Header/Footer here to maintain the 
        immersive cinematic experience as architected.
        The StoryReader component manages its own minimal navigation UI.
      */}
      <main className="w-full h-full">
        <StoryReader story={mockStoryData} />
      </main>
    </div>
  );
}
