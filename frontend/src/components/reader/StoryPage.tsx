import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { StoryScene } from '../../data/stories';

interface Props {
  scene: StoryScene;
  index: number;
}

export default function StoryPage({ scene, index }: Props) {
  const pageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start end", "end start"]
  });

  const isTextHeavy = scene.text.length > 0;
  const hasImage = !!scene.visual.mainImage;
  const isImageDominant = hasImage && !isTextHeavy;
  const isHybrid = hasImage && isTextHeavy;

  // Tasteful image-level motion: subtle parallax and scale
  // Using direct mapping, avoiding Framer WAAPI bugs by providing continuous ranges
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1.12, 1.02]);
  
  // Page level opacity for smooth transitions between pages without fade-to-white
  // The opacity fades out precisely as the global background color interpolates,
  // creating a seamless transition.
  const pageOpacity = useTransform(scrollYProgress, (v) => {
    if (v < 0.15) return 0;
    if (v >= 0.15 && v < 0.35) return (v - 0.15) / 0.2;
    if (v >= 0.35 && v < 0.65) return 1;
    if (v >= 0.65 && v < 0.85) return 1 - ((v - 0.65) / 0.2);
    return 0;
  });

  // Text slides up subtly as you scroll
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  return (
    <div 
      ref={pageRef}
      className="relative w-full h-[100svh] min-h-[100svh] snap-start flex items-center justify-center overflow-hidden"
      id={`page-${index + 1}`}
    >
      <motion.div 
        className="w-full h-full flex flex-col md:flex-row items-center justify-center relative max-w-[1400px] mx-auto"
        style={{ opacity: pageOpacity }}
      >
        {/* Artwork Layer */}
        {hasImage && (
          <motion.div 
            className={`${isHybrid ? 'relative w-full h-[50vh] md:w-1/2 md:h-full shrink-0' : 'absolute inset-0 z-0'} flex items-center justify-center pointer-events-none`}
            style={{ y: imageY, scale: imageScale }}
          >
            <img 
              src={`/images/${scene.visual.mainImage}`} 
              alt={`Illustration for page ${index + 1}`}
              className={`w-full h-full ${isImageDominant ? 'object-cover' : 'object-contain p-6 md:p-12'}`}
              loading={index < 3 ? "eager" : "lazy"}
            />
          </motion.div>
        )}

        {/* Text Layer */}
        {isTextHeavy && (
          <motion.div 
            className={`relative z-10 w-full flex flex-col gap-6 px-6 ${isHybrid ? 'md:w-1/2 py-8' : 'max-w-2xl mx-auto'}`}
            style={{ y: textY }}
          >
            <div className="text-slate-800">
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
      </motion.div>
    </div>
  );
}
