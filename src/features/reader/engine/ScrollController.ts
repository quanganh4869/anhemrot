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
      start: "top top", // Full viewport, pin exactly at the top
      end: `+=${sceneConfig.scrollDuration || '200vh'}`, 
      pin: sceneConfig.pin,
      pinSpacing: true,
      scrub: typeof sceneConfig.scrub === 'number' ? sceneConfig.scrub : 1,
      invalidateOnRefresh: true,
    });
  }
}
