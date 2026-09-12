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

const createTween = (config: AnimationConfig, sceneDurationMultiplier: number) => {
  const duration = (config.endProgress - config.startProgress) * sceneDurationMultiplier;
  const position = (config.startProgress + (config.delay || 0)) * sceneDurationMultiplier;
  return { duration, position };
};

// Fade (Opacity) Handler
AnimationRegistry.register('opacity', {
  apply(tl, target, config, multiplier) {
    const { duration, position } = createTween(config, multiplier);
    tl.fromTo(target, 
      { opacity: config.from.value ?? 0 } as gsap.TweenVars, 
      { opacity: config.to.value ?? 1, duration, ease: config.ease || "none" } as gsap.TweenVars, 
      position
    );
  }
});

// Transform Handlers
const buildTransformHandler = (propKey: string): AnimationHandler => ({
  apply(tl, target, config, multiplier) {
    const { duration, position } = createTween(config, multiplier);
    tl.fromTo(target, 
      { [propKey]: config.from.value ?? 0 } as gsap.TweenVars, 
      { [propKey]: config.to.value, duration, ease: config.ease || "none" } as gsap.TweenVars, 
      position
    );
  }
});

AnimationRegistry.register('translateX', buildTransformHandler('x'));
AnimationRegistry.register('translateY', buildTransformHandler('y'));
AnimationRegistry.register('scale', buildTransformHandler('scale'));
AnimationRegistry.register('rotate', buildTransformHandler('rotation'));
AnimationRegistry.register('skew', buildTransformHandler('skew'));

AnimationRegistry.register('translate', {
  apply(tl, target, config, multiplier) {
    const { duration, position } = createTween(config, multiplier);
    tl.fromTo(target,
      { x: config.from.x ?? 0, y: config.from.y ?? 0 } as gsap.TweenVars,
      { x: config.to.x, y: config.to.y, duration, ease: config.ease || "none" } as gsap.TweenVars,
      position
    );
  }
});

// Filter Handlers
AnimationRegistry.register('blur', {
  apply(tl, target, config, multiplier) {
    const { duration, position } = createTween(config, multiplier);
    tl.fromTo(target,
      { filter: `blur(${config.from.value ?? 0}px)` } as gsap.TweenVars,
      { filter: `blur(${config.to.value}px)`, duration, ease: config.ease || "none" } as gsap.TweenVars,
      position
    );
  }
});

// Semantic Handlers
AnimationRegistry.register('camera_zoom', {
  apply(tl, target, config, multiplier) {
    const { duration, position } = createTween(config, multiplier);
    tl.fromTo(target,
      { scale: config.from.scale ?? 1 } as gsap.TweenVars,
      { scale: config.to.scale, duration, ease: config.ease || "none" } as gsap.TweenVars,
      position
    );
  }
});

AnimationRegistry.register('parallax', {
  apply(tl, target, config, multiplier) {
    const { duration, position } = createTween(config, multiplier);
    // Simple vertical parallax
    tl.fromTo(target,
      { y: config.from.y ?? 0 } as gsap.TweenVars,
      { y: config.to.y, duration, ease: config.ease || "none" } as gsap.TweenVars,
      position
    );
  }
});
