import gsap from "gsap";
import { SceneConfig } from "./schema";
import { AnimationRegistry } from "./registry";

export class AnimationController {
  /**
   * Creates a paused GSAP timeline for a scene based on its JSON config.
   * Does NOT attach to scroll. Just builds the animation logic.
   */
  static createTimeline(
    scene: SceneConfig, 
    layerRefs: (Element | null)[], 
    isReducedMotion: boolean = false
  ): gsap.core.Timeline {
    
    // We create a timeline that is paused. ScrollController will hook it.
    const tl = gsap.timeline({ paused: true });

    // In a normalized timeline, we can assume total duration is 1.
    const SCENE_DURATION_MULTIPLIER = 1; 

    scene.layers.forEach((layer, index) => {
      const targetEl = layerRefs[index];
      if (!targetEl) return;

      layer.animations.forEach((animConfig) => {
        // Accessibility: Skip complex animations if reduced motion is preferred
        if (isReducedMotion && !['opacity', 'fade'].includes(animConfig.property)) {
          return; // Skip translates, scales, blurs, etc. to prevent motion sickness
        }

        const handler = AnimationRegistry.getHandler(animConfig.property);
        if (handler) {
          try {
            handler.apply(tl, targetEl, animConfig, SCENE_DURATION_MULTIPLIER);
          } catch (e) {
            console.warn(`[AnimationEngine] Failed to apply animation ${animConfig.id} to layer ${layer.id}`, e);
          }
        } else {
          console.warn(`[AnimationEngine] No handler registered for property: ${animConfig.property}`);
        }
      });
    });

    return tl;
  }
}
