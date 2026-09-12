import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const updateProgress = () => {
      if (!barRef.current) return;
      
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;
      const maxScroll = documentHeight - windowHeight;
      
      if (maxScroll <= 0) {
        barRef.current.style.transform = `scaleX(0)`;
      } else {
        const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateProgress);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress(); // Init

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[9000] pointer-events-none">
      <div 
        ref={barRef}
        className="h-full bg-white/40 backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,255,0.5)] origin-left will-change-transform transition-none"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
