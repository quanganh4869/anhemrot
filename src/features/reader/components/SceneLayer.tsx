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
        case 'narration':
          if (layer.content) {
            return (
              <div className="max-w-2xl px-6 py-4">
                <p className="font-serif text-xl sm:text-2xl md:text-3xl text-zinc-100 font-normal tracking-wide leading-relaxed drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
                  {layer.content}
                </p>
              </div>
            );
          }
          return null;
        case 'dialogue':
          if (layer.content) {
            return (
              <div className="max-w-xl px-6 py-3.5 bg-black/70 border-l-2 border-zinc-200 backdrop-blur-sm shadow-2xl">
                <p className="font-sans text-base sm:text-lg text-zinc-100 font-medium leading-relaxed tracking-normal">
                  {layer.content}
                </p>
              </div>
            );
          }
          return null;
        case 'ui':
          if (layer.content) {
            return (
              <div className="text-center px-6">
                <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-bold tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                  {layer.content}
                </h2>
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
