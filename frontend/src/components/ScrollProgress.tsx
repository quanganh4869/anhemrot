import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ScrollProgressProps {
  totalScenes: number;
  currentScene: number;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ totalScenes, currentScene }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    
    const handleScroll = () => {
      setIsVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    timeout = setTimeout(() => setIsVisible(false), 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  const scrollToScene = (sceneIndex: number) => {
    const padded = String(sceneIndex).padStart(2, '0');
    const element = document.getElementById(`scene-${padded}`) || document.getElementById(`scene-${sceneIndex}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scenes = Array.from({ length: totalScenes }, (_, i) => i + 1);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-1.5 py-3"
        >
          {scenes.map((scene) => {
            const isCurrent = scene === currentScene;
            const distance = Math.abs(scene - currentScene);
            const showAsTiny = distance > 3;

            if (showAsTiny && distance > 4 && scene !== 1 && scene !== totalScenes) {
               return null;
            }
            if (showAsTiny && distance === 4 && scene !== 1 && scene !== totalScenes) {
                if (scene < currentScene && scene === currentScene - 4) {
                    return <div key={scene} className="w-1 h-1 bg-white/30 rounded-full my-1" />;
                }
                if (scene > currentScene && scene === currentScene + 4) {
                    return <div key={scene} className="w-1 h-1 bg-white/30 rounded-full my-1" />;
                }
                return null;
            }

            return (
              <div
                key={scene}
                onClick={() => scrollToScene(scene)}
                className={`relative group cursor-pointer flex justify-center items-center rounded-full transition-all duration-300 ${
                  isCurrent ? 'w-2.5 h-2.5 bg-white' : showAsTiny ? 'w-1 h-1 bg-white/30' : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                }`}
                title={`Scene ${scene}`}
              >
                <div className="absolute right-full mr-4 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                  Scene {scene}
                </div>
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
