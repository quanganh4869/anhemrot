import React, { forwardRef, useState } from "react";
import Image from "next/image";
import { LayerConfig } from "../types";
import { cn } from "@/lib/utils";

interface SceneLayerProps {
  layer: LayerConfig;
}

const SceneLayer = forwardRef<HTMLDivElement, SceneLayerProps>(
  ({ layer }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);

    // Base styling ensuring performance
    const style: React.CSSProperties = {
      zIndex: layer.zIndex,
      left: layer.x,
      top: layer.y,
      width: layer.width || '100%',
      height: layer.height || '100%',
      transformOrigin: layer.transformOrigin || "center center",
    };

    const renderContent = () => {
      switch (layer.type) {
        case 'background':
        case 'character':
        case 'object':
        case 'foreground':
        case 'effect':
          if (layer.assetUrl) {
            return (
              <div className="w-full h-full relative">
                {!isLoaded && (
                  <div className="absolute inset-0 bg-zinc-900/50 animate-pulse rounded-md blur-sm backdrop-blur-xl z-[-1]" />
                )}
                <Image
                  src={layer.assetUrl} 
                  alt={layer.type}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  style={{ objectFit: 'cover' }}
                  onLoad={() => setIsLoaded(true)}
                  className={cn("transition-opacity duration-700", isLoaded ? "opacity-100" : "opacity-0")}
                  priority={layer.type === 'background'} // Only preload backgrounds of first scenes if we could, but type='background' is a good heuristic
                />
              </div>
            );
          }
          return null;
        case 'dialogue':
        case 'narration':
          if (layer.content) {
            return (
              <div className="text-xl md:text-3xl font-serif text-white p-6 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl inline-block max-w-[80vw]">
                {layer.content}
              </div>
            );
          }
          return null;
        default:
          return null;
      }
    };

    return (
      <div 
        ref={ref} 
        style={style} 
        className={cn(
          "absolute will-change-transform pointer-events-none",
          layer.className
        )}
      >
        {renderContent()}
      </div>
    );
  }
);

SceneLayer.displayName = "SceneLayer";

export default SceneLayer;
