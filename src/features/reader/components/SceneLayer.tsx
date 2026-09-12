import React, { forwardRef, useState } from "react";
import { LayerConfig } from "../types";
import { cn } from "@/lib/utils";

interface SceneLayerProps {
  layer: LayerConfig;
}

const SceneLayer = forwardRef<HTMLDivElement, SceneLayerProps>(({ layer }, ref) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Base styling ensuring performance
  const style: React.CSSProperties = {
    position: "absolute",
    left: typeof layer.x === 'number' ? `${layer.x}%` : layer.x,
    top: typeof layer.y === 'number' ? `${layer.y}%` : layer.y,
    width: layer.width || "auto",
    height: layer.height || "auto",
    zIndex: layer.zIndex,
    transformOrigin: layer.transformOrigin || "center center",
    // We don't set opacity or transform here because GSAP will control it from the `from` config
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
                <div className="absolute inset-0 bg-zinc-900/50 animate-pulse rounded-md blur-sm backdrop-blur-xl" />
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={layer.assetUrl} 
                alt={layer.type} 
                onLoad={() => setIsLoaded(true)}
                className={cn("w-full h-full object-cover transition-opacity duration-700", isLoaded ? "opacity-100" : "opacity-0")}
              />
            </div>
          );
        }
        return null;
      case 'dialogue':
      case 'narration':
        return (
          <div className={cn("text-2xl md:text-4xl font-semibold text-white drop-shadow-md p-4 bg-black/40 rounded-xl backdrop-blur-sm", layer.className)}>
            {layer.content}
          </div>
        );
      case 'ui':
        return (
          <div className={cn(layer.className)}>
            {layer.content}
          </div>
        );
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
    >  {renderContent()}
    </div>
  );
});

SceneLayer.displayName = "SceneLayer";

export default SceneLayer;
