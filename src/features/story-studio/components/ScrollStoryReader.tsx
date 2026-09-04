"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChapterAnimConfig, Scene } from "@/types/story-anim";
import SceneRenderer from "./SceneRenderer";

interface ScrollStoryReaderProps {
  config: ChapterAnimConfig;
}

export default function ScrollStoryReader({ config }: ScrollStoryReaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scenes = config.scenes;

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far we've scrolled into the container
      const scrolled = -top;
      const totalScrollable = height - viewportHeight;
      
      if (scrolled < 0) {
        setActiveIndex(0);
        setScrollProgress(0);
        return;
      }
      
      if (scrolled >= totalScrollable) {
        setActiveIndex(scenes.length - 1);
        setScrollProgress(1);
        return;
      }

      // Progress overall
      const progress = scrolled / totalScrollable;
      
      // Calculate which scene is active (each scene gets equal scroll space)
      const sceneIndex = Math.floor(progress * scenes.length);
      const safeIndex = Math.min(sceneIndex, scenes.length - 1);
      
      // Calculate progress WITHIN the current scene (0 to 1)
      const sceneProgress = (progress * scenes.length) % 1;
      
      setActiveIndex(safeIndex);
      setScrollProgress(sceneProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calc
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scenes.length]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-black"
      style={{ height: `${scenes.length * 150}vh` }} // Each scene takes 1.5 screen heights to scroll through
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
        {/* We can use CSS variables to tie animation to scroll progress! */}
        <div 
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{
            // A simple way to map scroll to animation is to use a CSS variable 
            // that the internal renderer or our override can use.
            '--scroll-progress': scrollProgress
          } as React.CSSProperties}
        >
          {scenes[activeIndex] && (
            <SceneRenderer 
              scene={scenes[activeIndex]} 
              isPlaying={true} 
              className="w-full h-full"
            />
          )}
        </div>
        
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-75" style={{ width: `${(activeIndex + scrollProgress) / scenes.length * 100}%` }} />
      </div>
    </div>
  );
}
