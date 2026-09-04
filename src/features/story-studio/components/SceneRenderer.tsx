"use client";

import React, { useEffect, useRef } from "react";
import { Scene } from "@/types/story-anim";
import { getAnimationStyles, GLOBAL_ANIMATION_KEYFRAMES } from "@/utils/animation-presets";
import { cn } from "@/utils/cn";

interface SceneRendererProps {
  scene: Scene;
  isPlaying: boolean;
  className?: string;
  // If true, we hide overflow. If false, maybe show handles?
  isEditor?: boolean; 
  selectedLayerId?: string | null;
  onLayerClick?: (layerId: string) => void;
  overlay?: React.ReactNode;
  scrollProgress?: number; // 0 to 1
}

export default function SceneRenderer({ scene, isPlaying, className, isEditor, selectedLayerId, onLayerClick, overlay, scrollProgress }: SceneRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // We need to restart animations when `isPlaying` changes from false to true.
  // One way in React is to remount the nodes, but a cleaner way is just toggling the playState
  // which `getAnimationStyles` handles via `animationPlayState: 'running' | 'paused'`.
  // However, to reset to 0, we can force a key change or trick the DOM.
  // We'll use a small trick: changing a `key` on the background container when isPlaying becomes true from a stopped state,
  // but let's just stick to playState for now and see if it's enough. If we need a hard reset, we'll implement it.

  // To do a hard reset of CSS animation, we just increment a key when isPlaying flips to true
  const [playKey, setPlayKey] = React.useState(0);
  
  useEffect(() => {
    if (isPlaying) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPlayKey((k) => k + 1);
    }
  }, [isPlaying, scene.id]);

  const bgStyles = getAnimationStyles(scene.background.animation, isPlaying, scene.duration, scrollProgress);

  return (
    <div 
      className={cn(
        "relative w-full h-full overflow-hidden bg-black flex items-center justify-center",
        className
      )}
      ref={containerRef}
    >
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_ANIMATION_KEYFRAMES }} />

      {/* Background Layer */}
      <div 
        key={`bg-${playKey}`}
        className="absolute inset-0 w-full h-full origin-center"
        style={{
          ...bgStyles,
          backgroundImage: scene.background.url ? `url(${scene.background.url})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: scene.background.color || '#000'
        }}
      />

      {/* Layers */}
      {scene.layers.map((layer) => {
        const layerStyles = getAnimationStyles(layer.animation, isPlaying, scene.duration, scrollProgress);
        
        return (
          <div
            key={`${layer.id}-${playKey}`}
            onClick={(e) => {
              if (isEditor && onLayerClick) {
                e.stopPropagation();
                onLayerClick(layer.id);
              }
            }}
            className={cn(
              "absolute",
              isEditor && "cursor-pointer hover:ring-1 hover:ring-white/50"
            )}
            style={{
              left: `${layer.x}%`,
              top: `${layer.y}%`,
              transform: `translate(-50%, -50%) scale(${layer.scale || 1}) rotate(${layer.rotation || 0}deg)`,
              width: layer.width ? `${layer.width}%` : 'auto',
              height: layer.height ? `${layer.height}%` : 'auto',
              opacity: layer.opacity ?? 1,
              zIndex: layer.zIndex,
              // Apply parallax depth variable (base move * (depth + 1))
              '--move-x': `${2 + (layer.depth || 0) * 1.5}%`,
              '--move-y': `${2 + (layer.depth || 0) * 1.5}%`,
              ...layerStyles
            } as React.CSSProperties}
          >
            {layer.type === 'text' && (
              <div 
                style={{
                  fontSize: layer.fontSize ? `${layer.fontSize}px` : '1.5rem',
                  fontWeight: layer.fontWeight || 'normal',
                  color: layer.color || '#fff',
                  textAlign: layer.textAlign || 'center',
                  fontFamily: layer.fontFamily || 'inherit',
                  textShadow: layer.textShadow || '2px 2px 4px rgba(0,0,0,0.8)'
                }}
              >
                {layer.content}
              </div>
            )}
            {layer.type === 'image' && layer.asset && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={layer.asset} alt="layer" className="w-full h-full object-contain" />
            )}
          </div>
        );
      })}

      {overlay}
    </div>
  );
}
