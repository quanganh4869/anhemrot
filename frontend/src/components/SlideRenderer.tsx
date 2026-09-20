import React from 'react';
import { motion } from 'framer-motion';
import type { SlideScene, SlideElement } from '../data/slidesData';
import { CloudCallout } from './CloudCallout';

interface SlideRendererProps {
  slide: SlideScene;
  index: number;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
  return (
    <section
      id={slide.id}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden select-none"
      style={{ backgroundColor: slide.bgColor }}
    >
      {/* 16:9 Presentation Stage - fills screen, fits perfectly without borders or card margins */}
      <div className="relative w-full h-full max-w-[177.78vh] max-h-[56.25vw] aspect-[16/9] overflow-hidden mx-auto">
        {slide.elements.map((el) => (
          <SlideElementRenderer key={el.id} element={el} slideNumber={slide.slideNumber} />
        ))}
      </div>
    </section>
  );
};

interface SlideElementRendererProps {
  element: SlideElement;
  slideNumber: number;
}

const SlideElementRenderer: React.FC<SlideElementRendererProps> = ({ element, slideNumber }) => {
  const { type, role, media, left, top, width, height, rotation, fill, text, zIndex, delay } = element;

  // Render Image Element
  if (type === 'image' && media) {
    const isSvg = media.endsWith('.svg');
    const isDecoration = role === 'decoration' || isSvg;
    const isCharacter = role === 'character';

    return (
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${width}%`,
          height: `${height}%`,
          zIndex,
          transform: rotation ? `rotate(${rotation}deg)` : undefined,
        }}
        initial={
          isDecoration
            ? { opacity: 0, y: 15 }
            : isCharacter
            ? { opacity: 0, scale: 0.96, y: 12 }
            : { opacity: 0.75 }
        }
        whileInView={
          isDecoration
            ? { opacity: 1, y: 0 }
            : isCharacter
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 1 }
        }
        viewport={{ once: false, amount: 0.2 }}
        transition={{
          duration: isCharacter ? 0.7 : 0.5,
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
      >
        <img
          src={`/media/${media}`}
          alt=""
          loading="lazy"
          className={`w-full h-full ${isDecoration ? 'animate-float-gentle' : ''}`}
        />
      </motion.div>
    );
  }

  // Render Thought Bubble using exact SVG Cloud Callout
  if (role === 'bubble' && text && text.length > 0) {
    let theme: 'gradient' | 'navy' | 'white' = 'gradient';
    let tailSide: 'left' | 'right' = 'right';

    if (slideNumber >= 23 && slideNumber <= 29) {
      theme = 'white';
      tailSide = 'right';
    } else if (slideNumber >= 16 && slideNumber <= 22) {
      theme = 'navy';
      tailSide = slideNumber >= 18 ? 'left' : 'right';
    } else {
      theme = 'gradient';
      tailSide = 'right';
    }

    return (
      <motion.div
        className="absolute pointer-events-none flex items-center justify-center"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${width}%`,
          height: `${height}%`,
          zIndex,
          transform: rotation ? `rotate(${rotation}deg)` : undefined,
        }}
        initial={{ opacity: 0, scale: 0.88, y: 15 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      >
        <CloudCallout texts={text} theme={theme} tailSide={tailSide} />
      </motion.div>
    );
  }

  // Render Caption / Banner / Plain Textbox
  if (text && text.length > 0) {
    const isBanner = element.name.includes('Scroll') || fill === '#ED0081';
    const isCry = text.some((t) => t.includes('OE'));

    return (
      <motion.div
        className="absolute pointer-events-none flex items-center justify-center text-center p-1"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${width}%`,
          height: `${height}%`,
          zIndex,
          transform: rotation ? `rotate(${rotation}deg)` : undefined,
        }}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      >
        <div
          className={`flex flex-col items-center justify-center w-full ${
            isBanner
              ? 'bg-gradient-to-r from-[#FF007A] to-[#ED0081] text-white px-5 py-2 rounded-2xl font-black tracking-widest text-xs sm:text-sm md:text-lg shadow-md uppercase border-2 border-white/60'
              : isCry
              ? 'text-[#ED0081] font-black tracking-widest text-base sm:text-xl md:text-3xl animate-bounce'
              : 'text-slate-800 dark:text-white font-medium text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'
          }`}
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {text.map((t, i) => (
            <p key={i} className="leading-snug">
              {t}
            </p>
          ))}
        </div>
      </motion.div>
    );
  }

  return null;
};

export default SlideRenderer;
