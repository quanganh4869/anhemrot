import React, { forwardRef } from "react";
import { LayerConfig } from "../types";
import { cn } from "@/lib/utils";

interface SceneLayerProps {
  layer: LayerConfig;
}

const SceneLayer = forwardRef<HTMLDivElement, SceneLayerProps>(
  ({ layer }, ref) => {
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
              <div className="w-full h-full relative flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={layer.assetUrl} 
                  alt={layer.type}
                  className={cn(
                    "w-full h-full pointer-events-none select-none",
                    layer.type === 'background' ? "object-cover" : "object-contain"
                  )}
                  loading="eager"
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
