"use client";

import React, { useState, useEffect } from "react";
import { ChapterAnimConfig } from "@/types/story-anim";
import SceneRenderer from "./SceneRenderer";
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface StoryReaderProps {
  config: ChapterAnimConfig;
  onClose: () => void;
}

export default function StoryReader({ config, onClose }: StoryReaderProps) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const scenes = config.scenes;
  const currentScene = scenes[currentSceneIndex];

  const handleNext = () => setCurrentSceneIndex(Math.min(scenes.length - 1, currentSceneIndex + 1));
  const handlePrev = () => setCurrentSceneIndex(Math.max(0, currentSceneIndex - 1));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSceneIndex, scenes.length]);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) handleNext(); // swipe left
    if (diff < -50) handlePrev(); // swipe right
    setTouchStart(null);
  };

  // Auto-play logic
  useEffect(() => {
    if (!isPlaying || !currentScene) return;

    const timer = setTimeout(() => {
      if (currentSceneIndex < scenes.length - 1) {
        setCurrentSceneIndex(prev => prev + 1);
      } else {
        setIsPlaying(false); // End of story
      }
    }, currentScene.duration * 1000);

    return () => clearTimeout(timer);
  }, [currentSceneIndex, isPlaying, currentScene, scenes.length]);

  if (!currentScene) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col font-sans">
        {/* Header Overlay */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/60 to-transparent z-10 flex items-center justify-between px-6">
          <div className="text-white font-medium text-sm drop-shadow-md">
            Scene {currentSceneIndex + 1} of {scenes.length}
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white/80 hover:text-white transition-colors bg-black/40 hover:bg-black/60 p-2 rounded-full backdrop-blur-sm"
              title={isPlaying ? "Pause Auto-play" : "Start Auto-play"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={onClose} className="text-white/80 hover:text-white transition-colors bg-black/40 hover:bg-black/60 p-2 rounded-full backdrop-blur-sm">
              <X size={20} />
            </button>
          </div>
        </div>

      {/* Main Reader Area */}
      <div 
        className="flex-1 relative w-full max-w-lg mx-auto flex items-center justify-center bg-black/90 shadow-2xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* We use SceneRenderer */}
        <SceneRenderer 
          scene={currentScene} 
          isPlaying={isPlaying} 
          isEditor={false}
          className="aspect-[9/16] w-full max-h-full"
        />

        {/* Navigation Overlays */}
        <div className="absolute inset-y-0 left-0 w-1/3 z-10 cursor-pointer flex items-center" onClick={handlePrev}>
          <div className="w-12 h-12 ml-4 rounded-full bg-black/20 text-white/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity backdrop-blur-sm">
            <ChevronLeft size={24} />
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 w-1/3 z-10 cursor-pointer flex items-center justify-end" onClick={handleNext}>
           <div className="w-12 h-12 mr-4 rounded-full bg-black/20 text-white/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity backdrop-blur-sm">
            <ChevronRight size={24} />
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full z-10 border border-white/10">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-white hover:text-blue-400 transition-colors"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        
        {/* Progress indicator */}
        <div className="flex gap-1.5 items-center">
          {scenes.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSceneIndex ? 'w-6 bg-white' : 
                idx < currentSceneIndex ? 'w-1.5 bg-white/50' : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Preload Next Scene Assets */}
      {currentSceneIndex < scenes.length - 1 && (
        <div className="hidden">
          {scenes[currentSceneIndex + 1].background.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={scenes[currentSceneIndex + 1].background.url} alt="preload-bg" />
          )}
          {scenes[currentSceneIndex + 1].layers.map(l => l.asset && (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={`preload-${l.id}`} src={l.asset} alt="preload-layer" />
          ))}
        </div>
      )}
    </div>
  );
}
