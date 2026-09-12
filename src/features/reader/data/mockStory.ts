import { StoryConfig, SceneConfig } from "../types";

const createComplexDemoScene = (): SceneConfig => ({
  id: "demo-scene-1",
  order: 1,
  scrollDuration: "400vh", // Very long scroll to see all interactions
  pin: true,
  scrub: 1,
  layers: [
    // 1. Background
    {
      id: "demo-bg",
      type: "background",
      assetUrl: "/images/story/scene_03_deities.webp", // Using an existing high-res asset
      zIndex: 1,
      x: 0, y: 0, width: "100%", height: "100%",
      transformOrigin: "center center",
      animations: [
        // Camera Zoom: Slowly zoom out the background to create depth
        {
          id: "anim-bg-zoom", property: "scale",
          from: { scale: 1.3 }, to: { scale: 1 },
          startProgress: 0, endProgress: 1, ease: "power1.out"
        }
      ]
    },
    // 2. Character 1 (Left)
    {
      id: "demo-char-1",
      type: "character",
      assetUrl: "/images/hero_firefly.png",
      zIndex: 5,
      x: "10%", y: "40%", width: "30%", height: "auto",
      animations: [
        // Slide in from left
        {
          id: "anim-char1-slide", property: "translateX",
          from: { value: "-100%" }, to: { value: "0%" },
          startProgress: 0.1, endProgress: 0.3, ease: "power2.out"
        },
        // Parallax slightly up as user scrolls
        {
          id: "anim-char1-parallax", property: "translateY",
          from: { value: "0%" }, to: { value: "-10%" },
          startProgress: 0.3, endProgress: 1, ease: "none"
        }
      ]
    },
    // 3. Character 2 (Right)
    {
      id: "demo-char-2",
      type: "character",
      assetUrl: "/images/sad_firefly.png", // Just using existing assets
      zIndex: 5,
      x: "60%", y: "40%", width: "30%", height: "auto",
      className: "scale-x-[-1]", // flip horizontally
      animations: [
        // Fade in
        {
          id: "anim-char2-fade", property: "opacity",
          from: { value: 0 }, to: { value: 1 },
          startProgress: 0.25, endProgress: 0.4, ease: "power1.inOut"
        },
        // Rotate slightly
        {
          id: "anim-char2-rotate", property: "rotate",
          from: { value: 15 }, to: { value: 0 },
          startProgress: 0.25, endProgress: 0.4, ease: "back.out(1.5)"
        }
      ]
    },
    // 4. Foreground Object
    {
      id: "demo-fg-object",
      type: "object",
      content: "🌸", // Simple emoji as object
      className: "text-[200px] drop-shadow-2xl",
      zIndex: 20,
      x: "70%", y: "70%",
      animations: [
        // Extreme Parallax (moves up much faster than characters)
        {
          id: "anim-fg-parallax", property: "translateY",
          from: { value: "100%" }, to: { value: "-200%" },
          startProgress: 0, endProgress: 1, ease: "none"
        },
        // Spin slowly
        {
          id: "anim-fg-spin", property: "rotate",
          from: { value: 0 }, to: { value: 180 },
          startProgress: 0, endProgress: 1, ease: "none"
        },
        // Blur initially
        {
          id: "anim-fg-blur", property: "blur",
          from: { value: 10 }, to: { value: 0 },
          startProgress: 0.2, endProgress: 0.4, ease: "power1.out"
        }
      ]
    },
    // 5. Dialogue 1 (Appears early)
    {
      id: "demo-dialogue-1",
      type: "dialogue",
      content: "\"Trông cậu có vẻ buồn?\"",
      zIndex: 30,
      x: "15%", y: "30%",
      className: "max-w-[300px]",
      animations: [
        {
          id: "anim-d1-fade-in", property: "opacity",
          from: { value: 0 }, to: { value: 1 },
          startProgress: 0.35, endProgress: 0.45
        },
        {
          id: "anim-d1-fade-out", property: "opacity",
          from: { value: 1 }, to: { value: 0 },
          startProgress: 0.55, endProgress: 0.65
        }
      ]
    },
    // 6. Dialogue 2 (Appears later)
    {
      id: "demo-dialogue-2",
      type: "dialogue",
      content: "\"Tôi không biết cách tỏa sáng...\"",
      zIndex: 30,
      x: "55%", y: "30%",
      className: "max-w-[300px]",
      animations: [
        {
          id: "anim-d2-fade-in", property: "opacity",
          from: { value: 0 }, to: { value: 1 },
          startProgress: 0.6, endProgress: 0.7
        },
        // Slides up gently as it fades in
        {
          id: "anim-d2-slide-in", property: "translateY",
          from: { value: "20%" }, to: { value: "0%" },
          startProgress: 0.6, endProgress: 0.7, ease: "power2.out"
        }
      ]
    }
  ]
});

export const mockStoryData: StoryConfig = {
  id: "story-interactive-demo",
  title: "Interactive Engine Demo",
  chapters: [
    {
      id: "chap-demo",
      title: "Chương 1: Khởi nguồn của Ánh Sáng",
      scenes: [createComplexDemoScene()]
    }
  ]
};
