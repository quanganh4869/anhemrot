import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SceneConfig, SceneConfigSchema } from "../types";
import SceneLayer from "./SceneLayer";
import { AnimationController } from "../engine/AnimationController";
import { ScrollController } from "../engine/ScrollController";

interface SceneRendererProps {
  scene: SceneConfig;
}

export default function SceneRenderer({ scene }: SceneRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Check accessibility preference
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Parse config to populate defaults
    const parsedScene = SceneConfigSchema.parse(scene);

    // Build timeline via separated controller
    const tl = AnimationController.createTimeline(parsedScene, layersRef.current, isReducedMotion);
    
    // Add scene-level fade out (crossfade transition) at the very end (90% to 100%)
    // Since SCENE_DURATION_MULTIPLIER = 1, we can add it to the timeline
    tl.to(containerRef.current, { opacity: 0, duration: 0.1 }, 0.9);

    // Attach to scroll via separated controller
    ScrollController.attach(tl, containerRef.current, parsedScene);

  }, { scope: containerRef, dependencies: [scene] });

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"
    >
      <div className="relative w-full h-full max-w-[calc(100vh*16/9)] max-h-[calc(100vw*9/16)] bg-zinc-900 overflow-hidden shadow-2xl">
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
