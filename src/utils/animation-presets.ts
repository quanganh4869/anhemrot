import { AnimationPresetConfig } from "@/types/story-anim";
import { CSSProperties } from "react";

/**
 * Given an animation config and current playhead time (0 to duration), 
 * returns the interpolated CSS properties (transform, opacity, etc)
 * We use CSS custom properties or inline styles.
 * Actually, the most performant way in React for this is to output the final CSS classes 
 * or inline CSS and let CSS transitions handle it.
 * So we will generate inline styles that apply the animation directly using standard CSS keyframes.
 */

// We will inject keyframes into a global stylesheet or use inline animation definitions.
// To keep it simple and powerful, we will return standard CSS animation string.

export function getAnimationStyles(
  animConfig?: AnimationPresetConfig, 
  isPlaying?: boolean,
  baseDurationSecs?: number,
  scrollProgress?: number
): CSSProperties {
  if (!animConfig || animConfig.preset === 'none') {
    return {};
  }

  const duration = animConfig.duration || baseDurationSecs || 5;
  const delay = animConfig.delay || 0;
  const easing = animConfig.easing || 'ease-in-out';
  
  const playState = isPlaying ? 'running' : 'paused';

  let animationName = '';

  switch (animConfig.preset) {
    case 'kenBurns':
      animationName = 'animKenBurns';
      break;
    case 'panLeft':
      animationName = 'animPanLeft';
      break;
    case 'panRight':
      animationName = 'animPanRight';
      break;
    case 'panUp':
      animationName = 'animPanUp';
      break;
    case 'panDown':
      animationName = 'animPanDown';
      break;
    case 'fade':
      animationName = 'animFade';
      break;
    case 'fadeUp':
      animationName = 'animFadeUp';
      break;
    case 'zoomIn':
      animationName = 'animZoomIn';
      break;
    case 'zoomOut':
      animationName = 'animZoomOut';
      break;
    case 'blurReveal':
      animationName = 'animBlurReveal';
      break;
    case 'typewriter':
      animationName = 'animTypewriter';
      // typewriter works best with steps, but linear is fine for basic css
      break;
    default:
      animationName = '';
  }

  if (!animationName) return {};

  if (scrollProgress !== undefined) {
    // Scrubbing mode via CSS animation delay trick
    const currentTime = scrollProgress * duration;
    const scrubDelay = Math.max(0, currentTime - delay);
    return {
      animationName,
      animationDuration: `${duration}s`,
      animationTimingFunction: 'linear',
      animationFillMode: 'both',
      animationDelay: `-${scrubDelay}s`,
      animationPlayState: 'paused',
    };
  }

  return {
    animationName,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    animationTimingFunction: easing,
    animationFillMode: 'both',
    animationPlayState: playState,
  };
}

// Global keyframes that we can inject via a style tag in our component
// Using CSS variables to allow parallax and dynamic scaling
export const GLOBAL_ANIMATION_KEYFRAMES = `
  @keyframes animKenBurns {
    0% { transform: scale(var(--start-scale, 1)) translate(0, 0); }
    100% { transform: scale(var(--end-scale, 1.08)) translate(var(--end-x, -1%), var(--end-y, -1%)); }
  }
  @keyframes animPanLeft {
    0% { transform: scale(var(--scale, 1.05)) translateX(var(--move-x, 2%)); }
    100% { transform: scale(var(--scale, 1.05)) translateX(calc(var(--move-x, 2%) * -1)); }
  }
  @keyframes animPanRight {
    0% { transform: scale(var(--scale, 1.05)) translateX(calc(var(--move-x, 2%) * -1)); }
    100% { transform: scale(var(--scale, 1.05)) translateX(var(--move-x, 2%)); }
  }
  @keyframes animPanUp {
    0% { transform: scale(var(--scale, 1.05)) translateY(var(--move-y, 2%)); }
    100% { transform: scale(var(--scale, 1.05)) translateY(calc(var(--move-y, 2%) * -1)); }
  }
  @keyframes animPanDown {
    0% { transform: scale(var(--scale, 1.05)) translateY(calc(var(--move-y, 2%) * -1)); }
    100% { transform: scale(var(--scale, 1.05)) translateY(var(--move-y, 2%)); }
  }
  @keyframes animZoomIn {
    0% { transform: scale(var(--start-scale, 1)); }
    100% { transform: scale(var(--end-scale, 1.1)); }
  }
  @keyframes animZoomOut {
    0% { transform: scale(var(--start-scale, 1.1)); }
    100% { transform: scale(var(--end-scale, 1)); }
  }
  @keyframes animFade {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes animFadeUp {
    0% { opacity: 0; transform: translateY(var(--move-y, 20px)); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes animBlurReveal {
    0% { opacity: 0; filter: blur(var(--start-blur, 10px)); }
    100% { opacity: 1; filter: blur(0px); }
  }
  @keyframes animTypewriter {
    from { clip-path: inset(0 100% 0 0); }
    to { clip-path: inset(0 0 0 0); }
  }
`;
