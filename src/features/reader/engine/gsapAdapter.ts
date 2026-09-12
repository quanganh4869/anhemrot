import gsap from "gsap";
import { GSAPAnimationConfig } from "../types";

/**
 * Maps our high-level animation properties to GSAP properties.
 * E.g. 'fade' means animating opacity from 0 to 1 or vice versa.
 */
export const applyAnimationToTimeline = (
  tl: gsap.core.Timeline,
  target: Element | string,
  config: GSAPAnimationConfig,
  sceneDurationMultiplier: number = 1 // 1 means the timeline duration is 1 unit.
) => {
  const duration = (config.endProgress - config.startProgress) * sceneDurationMultiplier;
  const position = config.startProgress * sceneDurationMultiplier;

  let gsapFrom = { ...config.from };
  let gsapTo = { ...config.to, duration, ease: config.ease || "none" };

  // Special handling for our abstractions
  switch (config.property) {
    case 'fade':
      gsapFrom = { opacity: config.from.opacity ?? 0, ...gsapFrom };
      gsapTo = { opacity: config.to.opacity ?? 1, ...gsapTo };
      break;
    case 'translate':
      // x, y
      break;
    case 'scale':
      // scale
      break;
    case 'rotate':
      // rotation
      break;
    case 'blur':
      // using css filter
      gsapFrom = { filter: `blur(${config.from.amount || 0}px)`, ...gsapFrom };
      gsapTo = { filter: `blur(${config.to.amount || 0}px)`, ...gsapTo };
      break;
    case 'parallax':
      // usually just a slow translation on y axis mapped to scroll
      break;
    case 'zoom':
      // scale wrapper
      break;
  }

  // Add the tween to the timeline at the specific normalized position
  tl.fromTo(target, gsapFrom, gsapTo, position);
};
