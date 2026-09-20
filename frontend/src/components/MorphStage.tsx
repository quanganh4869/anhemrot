import React, { useMemo } from 'react';
import type { SlideScene } from '../data/slidesData';
import { CloudCallout } from './CloudCallout';

interface MorphStageProps {
  slides: SlideScene[];
  progress: number; // 0 to slides.length - 1
}

interface RenderElement {
  key: string;
  type: 'image' | 'shape' | 'textbox';
  role: 'background' | 'character' | 'decoration' | 'bubble' | 'caption';
  name: string;
  media?: string;
  left: number;
  top: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  zIndex: number;
  fill?: string | null;
  text?: string[];
  textOpacity?: number;
  slideNumber: number;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function parseHex(hex: string): [number, number, number] {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function interpolateColor(color1: string, color2: string, t: number): string {
  try {
    const [r1, g1, b1] = parseHex(color1);
    const [r2, g2, b2] = parseHex(color2);
    const r = Math.round(lerp(r1, r2, t));
    const g = Math.round(lerp(g1, g2, t));
    const b = Math.round(lerp(b1, b2, t));
    return `rgb(${r}, ${g}, ${b})`;
  } catch {
    return t < 0.5 ? color1 : color2;
  }
}

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export const MorphStage: React.FC<MorphStageProps> = ({ slides, progress }) => {
  const total = slides.length;
  const clampedProgress = Math.max(0, Math.min(total - 1, progress));
  const slideAIdx = Math.min(Math.floor(clampedProgress), total - 2);
  const slideBIdx = slideAIdx + 1;
  const rawT = clampedProgress - slideAIdx;
  const t = easeInOutCubic(rawT);

  const slideA = slides[slideAIdx];
  const slideB = slides[slideBIdx];

  // Interpolated Background Color
  const currentBgColor = useMemo(() => {
    if (!slideA || !slideB) return '#000000';
    return interpolateColor(slideA.bgColor, slideB.bgColor, t);
  }, [slideA, slideB, t]);

  // Interpolated Elements
  const renderElements = useMemo<RenderElement[]>(() => {
    if (!slideA || !slideB) return [];

    const elemsA = slideA.elements;
    const elemsB = slideB.elements;
    const matchedBIndices = new Set<number>();
    const result: RenderElement[] = [];

    // Match elements from A to B
    for (const eA of elemsA) {
      let matchIdx = -1;

      // Priority 1: same name
      for (let i = 0; i < elemsB.length; i++) {
        if (!matchedBIndices.has(i) && elemsB[i].name === eA.name) {
          matchIdx = i;
          break;
        }
      }

      // Priority 2: same media
      if (matchIdx === -1 && eA.type === 'image' && eA.media) {
        for (let i = 0; i < elemsB.length; i++) {
          if (!matchedBIndices.has(i) && elemsB[i].type === 'image' && elemsB[i].media === eA.media) {
            matchIdx = i;
            break;
          }
        }
      }

      // Priority 3: both are thought bubbles
      if (matchIdx === -1 && eA.role === 'bubble') {
        for (let i = 0; i < elemsB.length; i++) {
          if (!matchedBIndices.has(i) && elemsB[i].role === 'bubble') {
            matchIdx = i;
            break;
          }
        }
      }

      // Priority 4: both are captions
      if (matchIdx === -1 && eA.role === 'caption') {
        for (let i = 0; i < elemsB.length; i++) {
          if (!matchedBIndices.has(i) && elemsB[i].role === 'caption') {
            matchIdx = i;
            break;
          }
        }
      }

      if (matchIdx !== -1) {
        matchedBIndices.add(matchIdx);
        const eB = elemsB[matchIdx];

        // Smoothly interpolate position, scale, rotation
        const left = lerp(eA.left, eB.left, t);
        const top = lerp(eA.top, eB.top, t);
        const width = lerp(eA.width, eB.width, t);
        const height = lerp(eA.height, eB.height, t);
        const rotation = lerp(eA.rotation, eB.rotation, t);
        const zIndex = Math.max(eA.zIndex, eB.zIndex);

        const isA = t < 0.5;
        const textToUse = isA ? eA.text : eB.text;
        const textOpacity = isA ? Math.max(0, 1 - t * 2.2) : Math.max(0, (t - 0.5) * 2.2);

        result.push({
          key: `m-${eA.id}-${eB.id}`,
          type: eA.type,
          role: eA.role,
          name: eA.name,
          media: eA.media || eB.media,
          left,
          top,
          width,
          height,
          rotation,
          opacity: 1,
          zIndex,
          fill: isA ? eA.fill : eB.fill,
          text: textToUse,
          textOpacity,
          slideNumber: isA ? slideA.slideNumber : slideB.slideNumber,
        });
      } else {
        // Element only in A -> Fades out
        const opacity = Math.max(0, 1 - t * 1.8);
        if (opacity > 0.01) {
          result.push({
            key: `a-${eA.id}`,
            type: eA.type,
            role: eA.role,
            name: eA.name,
            media: eA.media,
            left: eA.left,
            top: eA.top,
            width: eA.width,
            height: eA.height,
            rotation: eA.rotation,
            opacity,
            zIndex: eA.zIndex,
            fill: eA.fill,
            text: eA.text,
            textOpacity: opacity,
            slideNumber: slideA.slideNumber,
          });
        }
      }
    }

    // Elements only in B -> Fades in
    for (let i = 0; i < elemsB.length; i++) {
      if (!matchedBIndices.has(i)) {
        const eB = elemsB[i];
        const opacity = Math.max(0, Math.min(1, (t - 0.2) * 1.8));
        if (opacity > 0.01) {
          result.push({
            key: `b-${eB.id}`,
            type: eB.type,
            role: eB.role,
            name: eB.name,
            media: eB.media,
            left: eB.left,
            top: eB.top,
            width: eB.width,
            height: eB.height,
            rotation: eB.rotation,
            opacity,
            zIndex: eB.zIndex,
            fill: eB.fill,
            text: eB.text,
            textOpacity: opacity,
            slideNumber: slideB.slideNumber,
          });
        }
      }
    }

    // Sort by zIndex to preserve layer stack
    return result.sort((a, b) => a.zIndex - b.zIndex);
  }, [slideA, slideB, t]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden flex items-center justify-center select-none"
      style={{ backgroundColor: currentBgColor }}
    >
      {/* 16:9 Presentation Stage - Seamlessly fits full viewport without card framing */}
      <div className="relative w-full h-full max-w-[177.78vh] max-h-[56.25vw] aspect-[16/9] overflow-hidden mx-auto">
        {renderElements.map((el) => (
          <RenderElementItem key={el.key} element={el} />
        ))}
      </div>
    </div>
  );
};

const RenderElementItem: React.FC<{ element: RenderElement }> = ({ element }) => {
  const { type, role, media, left, top, width, height, rotation, opacity, zIndex, fill, text, textOpacity = 1, slideNumber } = element;

  // Render Image Element
  if (type === 'image' && media) {
    const isSvg = media.endsWith('.svg');
    const isDecoration = role === 'decoration' || isSvg;

    return (
      <div
        className="absolute pointer-events-none"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${width}%`,
          height: `${height}%`,
          zIndex,
          opacity,
          transform: rotation ? `rotate(${rotation}deg)` : undefined,
          willChange: 'transform, opacity, left, top',
        }}
      >
        <img
          src={`/media/${media}`}
          alt=""
          loading="eager"
          className={`w-full h-full ${isDecoration ? 'animate-float-gentle' : ''}`}
        />
      </div>
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
      <div
        className="absolute pointer-events-none flex items-center justify-center"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${width}%`,
          height: `${height}%`,
          zIndex,
          opacity: opacity * textOpacity,
          transform: rotation ? `rotate(${rotation}deg)` : undefined,
          willChange: 'transform, opacity, left, top',
        }}
      >
        <CloudCallout texts={text} theme={theme} tailSide={tailSide} />
      </div>
    );
  }

  // Render Caption / Banner / Plain Textbox
  if (text && text.length > 0) {
    const isBanner = element.name.includes('Scroll') || fill === '#ED0081';
    const isCry = text.some((t) => t.includes('OE'));

    return (
      <div
        className="absolute pointer-events-none flex items-center justify-center text-center p-1"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${width}%`,
          height: `${height}%`,
          zIndex,
          opacity: opacity * textOpacity,
          transform: rotation ? `rotate(${rotation}deg)` : undefined,
          willChange: 'transform, opacity, left, top',
        }}
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
      </div>
    );
  }

  return null;
};

export default MorphStage;
