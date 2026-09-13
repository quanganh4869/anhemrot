import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { RefObject } from 'react';
import type { StoryScene } from '../../data/stories';

interface Props {
  scene: StoryScene;
  index: number;
  containerRef: RefObject<HTMLDivElement | null>;
}

export default function StoryPage({ scene, index, containerRef }: Props) {
  const pageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    container: containerRef as RefObject<HTMLElement>,
    offset: ["start end", "end start"]
  });

  const isTextHeavy = scene.text.length > 0;
  const hasImage = !!scene.visual.mainImage;
  const isImageDominant = hasImage && !isTextHeavy;
  const isHybrid = hasImage && isTextHeavy;

  // Subtle parallax — image drifts slightly as user scrolls
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  // Text slides up gently
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);

  return (
    <div
      ref={pageRef}
      className="relative w-full h-[100svh] min-h-[100svh] snap-start flex items-center justify-center overflow-hidden"
      id={`page-${index + 1}`}
    >
      {/* Artwork Layer — fills viewport, no card, no background panel */}
      {hasImage && (
        <motion.div
          className={`${isHybrid
            ? 'relative w-full h-[50vh] md:w-1/2 md:h-full shrink-0'
            : 'absolute inset-0 z-0'
          } flex items-center justify-center pointer-events-none`}
          style={{ y: imageY }}
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
          className={`relative z-10 w-full flex flex-col gap-6 px-8 ${isHybrid ? 'md:w-1/2 py-8' : 'max-w-2xl mx-auto py-16'}`}
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
    </div>
  );
}
