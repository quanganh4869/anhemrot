"use client";

import React from "react";
import StoryReader from "@/features/reader/components/StoryReader";
import { mockStoryData } from "@/features/reader/data/mockStory";

export default function StoryReaderPage() {
  // Normally we would fetch the story data by storyId here from the API.
  return (
    <div className="w-full bg-black text-white min-h-screen">
      <main className="w-full h-full">
        <StoryReader story={mockStoryData} />
      </main>
    </div>
  );
}
