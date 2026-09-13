import { useRef } from 'react';
import type { RefObject } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { StoryScene } from '../../data/stories';
import CinematicArtwork from './CinematicArtwork';

interface Props {
  scene: StoryScene;
  index: number;
  total: number;
  containerRef: RefObject<HTMLDivElement | null>;
}

export default function StoryPage({ scene, index, containerRef }: Props) {
  const pageRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: pageRef,
    container: containerRef,
    offset: ["start end", "end start"]
  });



  // Text Animation (Slides up faster, fades in later)
  const textOpacity = useTransform(scrollYProgress, (v) => {
    if (v < 0.25) return 0;
    if (v >= 0.25 && v < 0.45) return (v - 0.25) / 0.2;
    if (v >= 0.45 && v < 0.55) return 1;
    if (v >= 0.55 && v < 0.75) return 1 - ((v - 0.55) / 0.2);
    return 0;
  });

  const textY = useTransform(scrollYProgress, (v) => {
    if (v < 0.25) return 80;
    if (v >= 0.25 && v < 0.5) return 80 - ((v - 0.25) / 0.25) * 80;
    if (v >= 0.5 && v < 0.75) return 0 - ((v - 0.5) / 0.25) * 80;
    return -80;
  });

  const isTextHeavy = scene.text.length > 0;

  return (
    <div 
      ref={pageRef}
      className="relative w-full h-[100svh] min-h-[100svh] snap-start flex items-center justify-center overflow-hidden"
      id={`page-${index + 1}`}
    >
      <div 
        className="w-full h-full flex flex-col md:flex-row items-center justify-center relative max-w-6xl mx-auto"
      >
        {/* Artwork Layer */}
        {scene.visual.mainImage && (
          <div 
            className={`${isTextHeavy ? 'relative w-full h-[40vh] md:w-1/2 md:h-[80vh] shrink-0' : 'absolute inset-0 z-0'} flex items-center justify-center pointer-events-none`}
          >
            <CinematicArtwork scene={scene} scrollYProgress={scrollYProgress} index={index} />
          </div>
        )}

        {/* Text Layer */}
        {isTextHeavy && (
          <motion.div 
            className={`relative z-10 w-full flex flex-col gap-6 px-6 ${scene.visual.mainImage ? 'md:w-1/2 py-4' : 'max-w-2xl mx-auto'}`}
            style={{ opacity: textOpacity, y: textY }}
          >
            <div className={`${scene.visual.backgroundTone === '#ffffff' && !scene.visual.mainImage ? '' : 'bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-white/50'} text-slate-800`}>
              {scene.text.map((paragraph, pIndex) => (
                <p 
                  key={pIndex} 
                  className="text-lg md:text-xl lg:text-2xl leading-relaxed font-serif mb-6 last:mb-0"
                >
                  {pIndex === 0 && scene.visual.dropCap && (
                    <span className="float-left text-6xl md:text-7xl font-display leading-none pr-3 pb-2 font-bold text-slate-900">
                      {scene.visual.dropCap}
                    </span>
                  )}
                  {pIndex === 0 && scene.visual.dropCap && paragraph.startsWith(scene.visual.dropCap)
                    ? paragraph.substring(scene.visual.dropCap.length)
                    : paragraph
                  }
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
