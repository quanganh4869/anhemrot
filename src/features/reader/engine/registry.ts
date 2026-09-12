import gsap from "gsap";
import { AnimationConfig, AnimProperty } from "./schema";

export interface AnimationHandler {
  apply(
    tl: gsap.core.Timeline,
    target: Element | string,
    config: AnimationConfig,
    sceneDurationMultiplier: number
  ): void;
}

class EngineRegistry {
  private handlers = new Map<AnimProperty, AnimationHandler>();

  register(property: AnimProperty, handler: AnimationHandler) {
    this.handlers.set(property, handler);
  }

  getHandler(property: AnimProperty): AnimationHandler | undefined {
    return this.handlers.get(property);
  }
}

export const AnimationRegistry = new EngineRegistry();

// --- Built-in Handlers ---

const applyTweenOrKeyframes = (
  tl: gsap.core.Timeline,
  target: Element | string,
  config: AnimationConfig,
  propKey: string,
  multiplier: number,
  isFilter = false
) => {
  // Advanced Keyframes Mode
  if (config.keyframes && config.keyframes.length > 0) {
    const kfs = [...config.keyframes].sort((a, b) => a.progress - b.progress);
    if (kfs.length < 2) return; // Need at least 2 keyframes to tween
    
    // Set initial state based on the first keyframe
    const firstKf = kfs[0];
    const initialPos = firstKf.progress * multiplier;
    
    // Convert value format
    const formatVal = (v: any) => isFilter ? `blur(${v}px)` : v;
    
    tl.set(target, { [propKey]: formatVal(firstKf.values[propKey]) } as gsap.TweenVars, initialPos);
    
    // Chain remaining keyframes
    let currentPos = initialPos;
    for (let i = 1; i < kfs.length; i++) {
      const kf = kfs[i];
      const nextPos = kf.progress * multiplier;
      const duration = nextPos - currentPos;
      
      tl.to(target, { 
        [propKey]: formatVal(kf.values[propKey]), 
        duration, 
        ease: kf.ease || "none" 
      } as gsap.TweenVars, currentPos);
      
      currentPos = nextPos;
    }
  } 
  // Legacy 2-Point Mode
  else if (config.startProgress !== undefined && config.endProgress !== undefined && config.from && config.to) {
    const duration = (config.endProgress - config.startProgress) * multiplier;
    const position = (config.startProgress + (config.delay || 0)) * multiplier;
    
    const formatVal = (v: any) => isFilter ? `blur(${v}px)` : v;
    
    tl.fromTo(target, 
      { [propKey]: formatVal(config.from[propKey] ?? config.from.value) } as gsap.TweenVars, 
      { [propKey]: formatVal(config.to[propKey] ?? config.to.value), duration, ease: config.ease || "none" } as gsap.TweenVars, 
      position
    );
  }
};

// Fade (Opacity) Handler
AnimationRegistry.register('opacity', {
  apply(tl, target, config, multiplier) {
    applyTweenOrKeyframes(tl, target, config, 'opacity', multiplier);
  }
});

// Transform Handlers
const buildTransformHandler = (propKey: string): AnimationHandler => ({
  apply(tl, target, config, multiplier) {
    applyTweenOrKeyframes(tl, target, config, propKey, multiplier);
  }
});

AnimationRegistry.register('translateX', buildTransformHandler('x'));
AnimationRegistry.register('translateY', buildTransformHandler('y'));
AnimationRegistry.register('scale', buildTransformHandler('scale'));
AnimationRegistry.register('rotate', buildTransformHandler('rotation'));
AnimationRegistry.register('skew', buildTransformHandler('skew'));

AnimationRegistry.register('translate', {
  apply(tl, target, config, multiplier) {
    applyTweenOrKeyframes(tl, target, config, 'x', multiplier);
    applyTweenOrKeyframes(tl, target, config, 'y', multiplier);
  }
});

// Filter Handlers
AnimationRegistry.register('blur', {
  apply(tl, target, config, multiplier) {
    applyTweenOrKeyframes(tl, target, config, 'filter', multiplier, true);
  }
});

// Semantic Handlers
AnimationRegistry.register('camera_zoom', {
  apply(tl, target, config, multiplier) {
    applyTweenOrKeyframes(tl, target, config, 'scale', multiplier);
  }
});

AnimationRegistry.register('parallax', {
  apply(tl, target, config, multiplier) {
    applyTweenOrKeyframes(tl, target, config, 'y', multiplier);
  }
});
