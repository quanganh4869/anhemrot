import React, { useState, useEffect } from 'react';
import { scenes } from './data/scenes';
import { SceneRenderer } from './components/SceneRenderer';
import { ScrollProgress } from './components/ScrollProgress';
import { Maximize2, Minimize2 } from 'lucide-react';

export const StoryApp: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    // Observe all scenes to track active scene
    const observers: IntersectionObserver[] = [];
    
    scenes.forEach((scene, index) => {
      const element = document.getElementById(scene.id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setCurrentScene(index + 1);
            }
          });
        },
        { threshold: 0.45 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      observers.forEach((obs) => obs.disconnect());
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen request failed:', err);
    }
  };

  return (
    <main className="relative w-full min-h-screen bg-black text-white selection:bg-pink-500/30 overflow-x-hidden">
      {/* Minimal Optional Fullscreen Button */}
      <button
        onClick={toggleFullscreen}
        aria-label="Toggle Fullscreen"
        className="fixed top-4 right-4 z-50 p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white/70 hover:text-white backdrop-blur-md border border-white/10 transition-all duration-300 opacity-60 hover:opacity-100 hover:scale-105"
      >
        {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
      </button>

      {/* Minimal Scene Dot Navigation */}
      <ScrollProgress totalScenes={scenes.length} currentScene={currentScene} />

      {/* Sequential Scenes Flow */}
      <div className="flex flex-col w-full">
        {scenes.map((scene, idx) => (
          <SceneRenderer key={scene.id} scene={scene} index={idx} />
        ))}
      </div>
    </main>
  );
};

export default StoryApp;
