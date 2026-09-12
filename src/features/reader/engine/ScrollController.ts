import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SceneConfig } from "./schema";

gsap.registerPlugin(ScrollTrigger);

export class ScrollController {
  /**
   * Attaches a pre-built GSAP timeline to a scroll trigger on the DOM container.
   */
  static attach(
    tl: gsap.core.Timeline, 
    containerEl: Element, 
    sceneConfig: SceneConfig
  ): ScrollTrigger {
    
    return ScrollTrigger.create({
      animation: tl,
      trigger: containerEl,
      start: "top top", // When top of container hits top of viewport
      end: `+=${sceneConfig.scrollDuration}`, 
      pin: sceneConfig.pin,
      scrub: sceneConfig.scrub,
      // markers: process.env.NODE_ENV === 'development',
    });
  }
}
