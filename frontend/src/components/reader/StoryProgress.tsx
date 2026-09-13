import { MotionValue, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import type { RefObject } from 'react';

interface Props {
  total: number;
  progress: MotionValue<number>;
  containerRef: RefObject<HTMLDivElement | null>;
}

export default function StoryProgress({ total, progress, containerRef }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  
  useMotionValueEvent(progress, "change", (latest) => {
    const page = Math.min(total, Math.max(1, Math.round(latest * (total - 1)) + 1));
    setCurrentPage(page);
  });

  const scrollToPage = (index: number) => {
    if (containerRef.current) {
      const pageHeight = window.innerHeight;
      containerRef.current.scrollTo({
        top: index * pageHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Top Centered Page Number */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 text-white/80 mix-blend-difference font-mono text-sm tracking-widest pointer-events-none drop-shadow-md">
        PAGE {String(currentPage).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>

      {/* Right Side Vertical Rail */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2 pointer-events-auto hidden md:flex">
      <span className="text-xs font-mono text-white/70 mix-blend-difference mb-2">
        {String(currentPage).padStart(2, '0')}
      </span>
      
      <div className="flex flex-col gap-1.5 py-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToPage(i)}
            className="group py-1"
            aria-label={`Go to page ${i + 1}`}
          >
            <div className={`w-1 transition-all duration-300 ease-out rounded-full ${
              currentPage === i + 1 
                ? 'h-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' 
                : 'h-2 bg-white/30 group-hover:bg-white/60 group-hover:h-3'
            }`} />
          </button>
        ))}
      </div>
      
      <span className="text-xs font-mono text-white/70 mix-blend-difference mt-2">
        {String(total).padStart(2, '0')}
      </span>
    </div>
    </>
  );
}
