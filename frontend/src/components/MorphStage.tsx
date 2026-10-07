import React, { useMemo, useState, useEffect } from 'react';
import type { SlideScene } from '../data/slidesData';

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
  mediaB?: string;
  crossfadeProgress?: number;
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
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Compute Fullscreen Responsive Scale factor to eliminate all black bars
  const scale = useMemo(() => {
    const { width, height } = viewport;
    const isPortrait = height > width && width < 768;

    if (isPortrait) {
      // In mobile portrait, scale to fit content comfortably with slight zoom
      const scaleW = width / 1920;
      const scaleH = height / 1080;
      return Math.max(scaleW * 1.7, scaleH * 0.75);
    }

    // In desktop / landscape / tablet, cover the entire screen (100% full screen, zero borders)
    return Math.max(width / 1920, height / 1080);
  }, [viewport]);

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

      // Priority 1: same name (if both have media, media must match)
      for (let i = 0; i < elemsB.length; i++) {
        if (!matchedBIndices.has(i) && elemsB[i].name === eA.name) {
          if (!eA.media || !elemsB[i].media || eA.media === elemsB[i].media) {
            matchIdx = i;
            break;
          }
        }
      }

      // Priority 2: same media
      if (matchIdx === -1 && eA.media) {
        for (let i = 0; i < elemsB.length; i++) {
          if (!matchedBIndices.has(i) && elemsB[i].media === eA.media) {
            matchIdx = i;
            break;
          }
        }
      }

      // Priority 3: both are speech bubbles (role === 'bubble' and close in position, but NEVER match different callout images)
      if (matchIdx === -1 && eA.role === 'bubble') {
        for (let i = 0; i < elemsB.length; i++) {
          const eB = elemsB[i];
          if (
            !matchedBIndices.has(i) &&
            eB.role === 'bubble' &&
            (!eA.media || !eB.media || eA.media === eB.media)
          ) {
            const dist = Math.hypot(eA.left - eB.left, eA.top - eB.top);
            if (dist < 45) {
              matchIdx = i;
              break;
            }
          }
        }
      }

      // Priority 4: both are baby (crying baby <-> sleeping baby)
      if (
        matchIdx === -1 &&
        (eA.name.includes('Baby') || eA.name === 'Picture 21' || eA.media?.includes('baby'))
      ) {
        for (let i = 0; i < elemsB.length; i++) {
          const eB = elemsB[i];
          if (
            !matchedBIndices.has(i) &&
            (eB.name.includes('Baby') || eB.name === 'Picture 21' || eB.media?.includes('baby'))
          ) {
            matchIdx = i;
            break;
          }
        }
      }

      // Priority 5: same character role and same name
      if (matchIdx === -1 && eA.role === 'character') {
        for (let i = 0; i < elemsB.length; i++) {
          if (!matchedBIndices.has(i) && elemsB[i].role === 'character' && elemsB[i].name === eA.name) {
            matchIdx = i;
            break;
          }
        }
      }

      // Priority 6: both are text-only captions
      if (matchIdx === -1 && eA.role === 'caption' && !eA.media) {
        for (let i = 0; i < elemsB.length; i++) {
          if (!matchedBIndices.has(i) && elemsB[i].role === 'caption' && !elemsB[i].media) {
            matchIdx = i;
            break;
          }
        }
      }

      if (matchIdx !== -1) {
        matchedBIndices.add(matchIdx);
        const eB = elemsB[matchIdx];

        let posT = t;
        let opT = t;
        if (slideA.slideNumber === 25 && slideB.slideNumber === 26 && (eA.name === 'Rabbit Arms' || eA.name === 'Baby Held')) {
          // Slide-up completes earlier by t = 0.65, so characters are completely in place before dialogue bubble appears!
          posT = Math.min(1, t / 0.65);
          // Opaque quickly during slide-up
          opT = Math.min(1, t / 0.35);
        }

        // Smoothly interpolate position, scale, rotation
        const left = lerp(eA.left, eB.left, posT);
        const top = lerp(eA.top, eB.top, posT);
        const width = lerp(eA.width, eB.width, posT);
        const height = lerp(eA.height, eB.height, posT);
        const rotation = lerp(eA.rotation, eB.rotation, posT);
        const zIndex = Math.max(eA.zIndex, eB.zIndex);

        const isA = t < 0.5;
        const textToUse = isA ? eA.text : eB.text;
        const textOpacity = isA ? Math.max(0, 1 - t * 2.2) : Math.max(0, (t - 0.5) * 2.2);
        const opacityA = eA.opacity ?? 1;
        const opacityB = eB.opacity ?? 1;
        let opacity = lerp(opacityA, opacityB, opT);

        // Slide 26 -> 27: Picture 8 shooting stars slide left and fade out cleanly
        if (
          slideA.slideNumber === 26 &&
          slideB.slideNumber === 27 &&
          (eA.name === 'Picture 8' || eA.media === 'image28.png')
        ) {
          opacity = lerp(opacityA, 0, Math.min(1, t / 0.7));
        }

        const isSameMedia = Boolean(eA.media && eB.media && eA.media === eB.media);

        // STABLE KEY: Keep identical key across matching elements so React smoothly animates them
        const stableKey = isSameMedia
          ? `morph-${eA.id}-${eB.id}`
          : eA.name === eB.name
          ? `name-${eA.name}-${eA.id}`
          : `m-${eA.id}-${eB.id}`;

        // Slide 26 -> 27: Rabbit transformation starts after bubble 26 fades and blooms before bubble 27
        let crossfadeT = t;
        if (
          (slideA.slideNumber === 26 && slideB.slideNumber === 27) ||
          (slideA.slideNumber === 27 && slideB.slideNumber === 26)
        ) {
          if (eA.name === 'Rabbit Arms' || eB.name === 'Rabbit Arms') {
            crossfadeT = Math.max(0, Math.min(1, (t - 0.15) / 0.6));
          }
        }

        result.push({
          key: stableKey,
          type: eA.type,
          role: eA.role,
          name: eA.name,
          media: eA.media,
          mediaB: !isSameMedia && eB.media ? eB.media : undefined,
          crossfadeProgress: crossfadeT,
          left,
          top,
          width,
          height,
          rotation,
          opacity,
          zIndex,
          fill: isA ? eA.fill : eB.fill,
          text: textToUse,
          textOpacity,
          slideNumber: isA ? slideA.slideNumber : slideB.slideNumber,
        });
      } else {
        // Element only in A -> Smooth linear fade out across transition
        const baseOpacityA = eA.opacity ?? 1;
        let opacity = baseOpacityA * (1 - t);
        if (eA.role === 'bubble' || eA.role === 'caption') {
          // Bubble fades out cleanly in the first 35% of transition
          opacity = baseOpacityA * Math.max(0, 1 - t / 0.35);
        }
        if (opacity > 0.005) {
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

    // Elements only in B -> Smooth linear fade in across transition
    for (let i = 0; i < elemsB.length; i++) {
      if (!matchedBIndices.has(i)) {
        const eB = elemsB[i];
        const baseOpacityB = eB.opacity ?? 1;
        let opacity = baseOpacityB * t;
        if (eB.role === 'bubble' || eB.role === 'caption') {
          if (slideB.slideNumber === 26 || slideB.slideNumber === 27) {
            // Slide 26 & 27: dialogue bubble appears strictly AFTER character movement/cracking completes (t >= 0.65)
            const bubbleT = Math.max(0, Math.min(1, (t - 0.65) / 0.35));
            opacity = baseOpacityB * bubbleT;
          } else {
            const bubbleT = Math.max(0, Math.min(1, (t - 0.45) / 0.55));
            opacity = baseOpacityB * bubbleT;
          }
        }
        if (opacity > 0.005) {
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

    return result.sort((a, b) => a.zIndex - b.zIndex);
  }, [slideA, slideB, t]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden flex items-center justify-center select-none"
      style={{ backgroundColor: currentBgColor }}
    >
      {/* 1920x1080 Stage perfectly scaled to cover full screen with zero black bars */}
      <div
        className="absolute overflow-hidden"
        style={{
          width: '1920px',
          height: '1080px',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        {renderElements.map((el) => (
          <RenderElementItem key={el.key} element={el} />
        ))}
      </div>
    </div>
  );
};

const RenderElementItem: React.FC<{ element: RenderElement }> = ({ element }) => {
  const {
    role,
    media,
    mediaB,
    crossfadeProgress = 0,
    left,
    top,
    width,
    height,
    rotation,
    opacity,
    zIndex,
    fill,
    text,
    textOpacity = 1,
  } = element;

  // Render Image Element or Cloud Callout or Banner
  if (media) {
    const isSvg = media.endsWith('.svg');
    const isCry =
      media.includes('text_s19_8') ||
      media.includes('text_s20_5') ||
      media.includes('text_s25_21') ||
      (text && text.some((t) => t.includes('OE')));
    const isBabyRock = media.includes('image31_baby') || media.includes('image20_baby');
    const isDecoration = (role === 'decoration' || isSvg) && !isCry && !isBabyRock;

    // Crossfade between two different media images (e.g. Cloud 21 -> Cloud 22, Crying Baby -> Sleeping Baby, Black Rabbit -> Cracked Rabbit)
    if (mediaB) {
      const isRabbitTransformation =
        (media?.includes('image30') && mediaB?.includes('image29')) ||
        (media?.includes('image29') && mediaB?.includes('image30'));

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
          {/* Media A (fading out smoothly, or solid base if rabbit transformation) */}
          <img
            src={`/media/${media}`}
            alt=""
            loading="eager"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ opacity: isRabbitTransformation ? 1 : 1 - crossfadeProgress }}
          />
          {/* Media B (fading in smoothly) */}
          <img
            src={`/media/${mediaB}`}
            alt=""
            loading="eager"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ opacity: crossfadeProgress }}
          />
        </div>
      );
    }

    // Single persistent image: NEVER multiply by textOpacity so it stays rock solid without flickering
    const bubbleScale = role === 'bubble' ? 0.9 + 0.1 * Math.min(1, opacity) : 1;
    const transformStr = [
      rotation ? `rotate(${rotation}deg)` : '',
      bubbleScale !== 1 ? `scale(${bubbleScale})` : '',
    ]
      .filter(Boolean)
      .join(' ') || undefined;

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
          transform: transformStr,
          willChange: 'transform, opacity, left, top',
        }}
      >
        <img
          src={`/media/${media}`}
          alt=""
          loading="eager"
          className={`w-full h-full object-contain ${
            isCry
              ? 'animate-cry drop-shadow-[0_4px_12px_rgba(237,0,129,0.35)]'
              : isBabyRock
              ? 'animate-rock origin-bottom'
              : isDecoration
              ? 'animate-float-gentle'
              : ''
          }`}
        />
      </div>
    );
  }

  // Fallback for Plain Textbox if media is not set
  if (text && text.length > 0) {
    const isBanner = element.name.includes('Scroll') || fill === '#ED0081';
    const isCry = text.some((t) => t.includes('OE'));
    const isLightSlide = (element.slideNumber >= 11 && element.slideNumber <= 15) || element.slideNumber === 29;

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
          className={`flex flex-col w-full ${
            isBanner
              ? 'items-center justify-center bg-gradient-to-r from-[#FF007A] to-[#ED0081] text-white px-5 py-2 rounded-2xl font-black tracking-widest text-lg shadow-md uppercase border-2 border-white/60'
              : isCry
              ? 'items-center justify-center text-[#ED0081] font-black tracking-widest text-3xl animate-bounce'
              : role === 'bubble'
              ? isLightSlide
                ? 'items-start justify-start text-left text-slate-900 font-semibold text-lg md:text-xl leading-relaxed'
                : 'items-start justify-start text-left text-white font-medium text-lg md:text-xl leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]'
              : isLightSlide
              ? 'items-center justify-center text-slate-900 font-medium text-xl'
              : 'items-center justify-center text-white font-medium text-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]'
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
