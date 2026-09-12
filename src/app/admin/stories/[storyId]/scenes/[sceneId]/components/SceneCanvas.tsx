import React from "react";
import { SceneConfig } from "@/features/reader/engine/schema";
import { cn } from "@/lib/utils";

interface SceneCanvasProps {
  scene: SceneConfig;
  selectedLayerId: string | null;
}

export default function SceneCanvas({ scene, selectedLayerId }: SceneCanvasProps) {
  // A scaled down interactive view of the 16:9 canvas
  return (
    <div className="w-[800px] h-[450px] bg-zinc-900 shadow-2xl relative overflow-hidden border border-zinc-800 rounded-lg">
       {scene.layers.map((layer) => {
         const isSelected = layer.id === selectedLayerId;
         
         return (
           <div 
             key={layer.id}
             style={{
                position: "absolute",
                left: typeof layer.x === 'number' ? `${layer.x}%` : layer.x,
                top: typeof layer.y === 'number' ? `${layer.y}%` : layer.y,
                width: layer.width || "auto",
                height: layer.height || "auto",
                zIndex: layer.zIndex,
                transformOrigin: layer.transformOrigin || "center center",
             }}
             className={cn(
               "transition-all",
               isSelected && "ring-2 ring-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] z-[9999]",
               layer.className
             )}
           >
             {layer.assetUrl && (
               // eslint-disable-next-line @next/next/no-img-element
               <img src={layer.assetUrl} alt={layer.type} className="w-full h-full object-cover" />
             )}
             {layer.content && (
               <div className="text-2xl font-semibold text-white p-4 bg-black/40 rounded-xl">
                 {layer.content}
               </div>
             )}
           </div>
         );
       })}
    </div>
  );
}
