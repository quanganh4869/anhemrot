import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SceneConfig, SceneConfigSchema } from "../types";
import SceneLayer from "./SceneLayer";
import { AnimationController } from "../engine/AnimationController";
import { ScrollController } from "../engine/ScrollController";

import { cn } from "@/lib/utils";

interface SceneRendererProps {
  scene: SceneConfig;
  isFocusMode?: boolean;
}

export default function SceneRenderer({ scene, isFocusMode = false }: SceneRendererProps) {
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
    ScrollController.attach(tl, containerRef.current, parsedScene, isFocusMode ? 0 : 72);

  }, { scope: containerRef, dependencies: [scene, isFocusMode] });

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-black flex items-center justify-center select-none",
        isFocusMode 
          ? "w-full h-screen" 
          : "w-full aspect-[16/9] min-h-[440px] max-h-[80vh] rounded-sm"
      )}
    >
      <div className="relative w-full h-full">
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
