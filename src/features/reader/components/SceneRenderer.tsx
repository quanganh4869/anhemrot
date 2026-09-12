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

    // Attach to scroll via separated controller
    ScrollController.attach(tl, containerRef.current, parsedScene);

  }, { scope: containerRef, dependencies: [scene] });

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[16/9] min-h-[460px] max-h-[75vh] overflow-hidden bg-black flex items-center justify-center"
    >
      <div className="relative w-full h-full overflow-hidden">
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
