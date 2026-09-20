import React from 'react';
import { motion } from 'framer-motion';
import type { SlideScene, SlideElement } from '../data/slidesData';

interface SlideRendererProps {
  slide: SlideScene;
  index: number;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
  return (
    <section
      id={slide.id}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-4 md:py-8 select-none"
      style={{ backgroundColor: slide.bgColor }}
    >
      {/* 16:9 Presentation Stage - Matching PPTX slide aspect ratio exactly */}
      <div className="relative w-full max-w-[1778px] aspect-[16/9] max-h-screen overflow-hidden shadow-2xl mx-auto">
        {slide.elements.map((el) => (
          <SlideElementRenderer key={el.id} element={el} />
        ))}
      </div>
    </section>
  );
};

const SlideElementRenderer: React.FC<{ element: SlideElement }> = ({ element }) => {
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
        }}
        initial={
          isDecoration
            ? { opacity: 0, y: 15 }
            : isCharacter
            ? { opacity: 0, scale: 0.92, y: 20 }
            : { opacity: 0.7 }
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
          duration: isCharacter ? 0.8 : 0.6,
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
      >
        <motion.img
          src={`/media/${media}`}
          alt={element.name}
          loading="lazy"
          className={`w-full h-full object-contain ${
            isDecoration ? 'animate-float-gentle' : ''
          }`}
          style={{
            transform: rotation ? `rotate(${rotation}deg)` : undefined,
          }}
        />
      </motion.div>
    );
  }

  // Render Thought Bubble
  if (role === 'bubble' && text && text.length > 0) {
    const isDark = fill === '#092F5E' || element.name.includes('Cloud 11') || element.name.includes('Cloud 8') || element.name.includes('Cloud 6');
    const isMagentaText = text.some((t) =>
      t.includes('Được một thời gian') ||
      t.includes('Trong thế giới của giấc mơ') ||
      t.includes('Dù Ác Mộng có đổi bao nhiêu') ||
      t.includes('Chịu thua trước em bé') ||
      t.includes('Không biết từ bao giờ') ||
      t.includes('Và giờ đây') ||
      t.includes('Khi em bé lớn lên')
    );

    return (
      <motion.div
        className="absolute pointer-events-auto flex items-center justify-center p-4 md:p-6"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${width}%`,
          height: `${height}%`,
          zIndex,
          transform: rotation ? `rotate(${rotation}deg)` : undefined,
        }}
        initial={{ opacity: 0, scale: 0.86, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      >
        <div
          className={`w-full h-full flex flex-col items-center justify-center p-4 md:p-6 text-center shadow-xl transition-all duration-300 ${
            isDark && !isMagentaText
              ? 'bg-[#092F5E] text-slate-100 border-2 border-[#16467d] rounded-[40px]'
              : 'bg-white text-slate-800 border-2 border-pink-200 rounded-[40px]'
          }`}
          style={{
            color: isMagentaText ? '#ED0081' : undefined,
            fontWeight: isMagentaText ? 600 : 400,
          }}
        >
          {text.map((paragraph, pIdx) => (
            <p
              key={pIdx}
              className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed tracking-wide"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>
    );
  }

  // Render Caption / Banner / Plain Textbox
  if (text && text.length > 0) {
    const isBanner = element.name.includes('Scroll') || fill === '#ED0081';
    const isCry = text.some((t) => t.includes('OE'));

    return (
      <motion.div
        className="absolute pointer-events-none flex items-center justify-center text-center p-2"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${width}%`,
          height: `${height}%`,
          zIndex,
          transform: rotation ? `rotate(${rotation}deg)` : undefined,
        }}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      >
        <div
          className={`flex flex-col items-center justify-center ${
            isBanner
              ? 'bg-[#ED0081] text-white px-6 py-2 rounded-full font-black tracking-widest text-sm md:text-xl shadow-lg uppercase'
              : isCry
              ? 'text-[#ED0081] font-black tracking-widest text-lg md:text-3xl animate-bounce'
              : 'text-slate-800 dark:text-white font-medium text-xs sm:text-sm md:text-base lg:text-xl'
          }`}
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
