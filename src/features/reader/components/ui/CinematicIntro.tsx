import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface CinematicIntroProps {
  title: string;
  isReady: boolean;
}

export default function CinematicIntro({ title, isReady }: CinematicIntroProps) {
  const [shouldRender, setShouldRender] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (isReady) {
      // Delay slightly for cinematic effect
      const timer1 = setTimeout(() => {
        setIsFading(true);
      }, 800);
      
      const timer2 = setTimeout(() => {
        setShouldRender(false);
      }, 2000); // Wait for fade out animation

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isReady]);

  if (!shouldRender) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center transition-opacity duration-1000",
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      <div className="flex flex-col items-center gap-6 animate-pulse">
        <h1 className="text-4xl md:text-6xl font-serif text-white tracking-widest text-center px-4" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
          {title}
        </h1>
        <div className="flex items-center gap-3 text-zinc-500">
           <Loader2 className="w-5 h-5 animate-spin" />
           <span className="text-sm font-medium tracking-widest uppercase">Initializing Scene</span>
        </div>
      </div>
    </div>
  );
}
