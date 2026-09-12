import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SceneConfig } from "../types";
import SceneLayer from "./SceneLayer";
import { applyAnimationToTimeline } from "../engine/gsapAdapter";

gsap.registerPlugin(ScrollTrigger);

interface SceneRendererProps {
  scene: SceneConfig;
}

export default function SceneRenderer({ scene }: SceneRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Create a scrubbable timeline pinned to this scene container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", // When top of container hits top of viewport
        end: `+=${scene.scrollDuration}`, // How long to pin (e.g. "+=2000px" or "+=200vh")
        pin: true,
        scrub: 1, // Smooth scrub
        // markers: process.env.NODE_ENV === 'development', // Useful for debugging
      },
    });

    // We define the timeline's total duration as 1.
    // This makes it easy to map startProgress (0 to 1) and endProgress (0 to 1)
    
    scene.layers.forEach((layer, index) => {
      const layerEl = layersRef.current[index];
      if (!layerEl) return;

      layer.animations.forEach((anim) => {
        applyAnimationToTimeline(tl, layerEl, anim, 1);
      });
    });

  }, { scope: containerRef, dependencies: [scene] });

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"
    >
      {/* 
        This internal wrapper forces the 16:9 cinematic aspect ratio 
        while scaling down safely if the screen is too narrow or short.
      */}
      <div 
        className="relative w-full h-full max-w-[calc(100vh*16/9)] max-h-[calc(100vw*9/16)]"
      >
        {scene.layers.map((layer, i) => (
          <SceneLayer 
            key={layer.id} 
            layer={layer} 
            ref={(el) => {
              layersRef.current[i] = el;
            }} 
          />
        ))}
      </div>
    </div>
  );
}
