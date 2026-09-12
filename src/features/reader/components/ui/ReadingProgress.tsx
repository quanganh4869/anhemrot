import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate scroll progress (0 to 1)
      const scrollY = window.scrollY;
      const maxScroll = documentHeight - windowHeight;
      
      if (maxScroll <= 0) {
        setProgress(0);
        return;
      }
      
      const currentProgress = (scrollY / maxScroll) * 100;
      setProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Init
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[9000] pointer-events-none">
      <div 
        className="h-full bg-white/20 backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
