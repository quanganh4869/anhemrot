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
      style={{ backgroundColor: scene.backgroundColor || '#000000' }}
      className={cn(
        "relative overflow-hidden flex items-center justify-center select-none w-full",
        isFocusMode 
          ? "h-screen" 
          : "h-[calc(100vh-72px)] min-h-[500px]"
      )}
    >
      {/* True 16:9 Artwork Canvas: Perfectly centered, never cropped, zero black gaps */}
      <div className="relative w-full max-w-6xl aspect-[16/9] max-h-full overflow-hidden flex items-center justify-center">
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
