import React from "react";
import { SceneConfig } from "@/features/reader/engine/schema";
import { cn } from "@/lib/utils";

interface TimelinePanelProps {
  scene: SceneConfig;
  selectedLayerId: string | null;
}

export default function TimelinePanel({ scene, selectedLayerId }: TimelinePanelProps) {
  // Sort layers similarly to the tree, or just map them.
  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950 p-4">
       <div className="relative w-full h-full">
          {/* Progress Markers */}
          <div className="absolute top-0 left-48 right-4 h-6 border-b border-zinc-800 flex justify-between text-[10px] text-zinc-500">
             <span>0%</span>
             <span>25%</span>
             <span>50%</span>
             <span>75%</span>
             <span>100%</span>
          </div>

          <div className="pt-8 space-y-2">
            {scene.layers.map(layer => (
              <div 
                key={layer.id} 
                className={cn(
                  "flex items-center h-8 relative rounded",
                  selectedLayerId === layer.id ? "bg-white/5" : "hover:bg-white/5"
                )}
              >
                 {/* Layer Label */}
                 <div className="w-48 px-2 text-xs text-zinc-400 truncate shrink-0 font-medium">
                    {layer.id}
                 </div>
                 
                 {/* Timeline Track */}
                 <div className="flex-1 relative h-full border-l border-zinc-800">
                    {layer.animations.map(anim => {
                      const left = `${anim.startProgress * 100}%`;
                      const width = `${(anim.endProgress - anim.startProgress) * 100}%`;
                      return (
                        <div 
                          key={anim.id}
                          className="absolute top-2 h-4 bg-emerald-500/80 rounded border border-emerald-400 text-[9px] text-white flex items-center px-1 overflow-hidden"
                          style={{ left, width }}
                          title={`${anim.property} (${anim.startProgress} - ${anim.endProgress})`}
                        >
                          {anim.property}
                        </div>
                      );
                    })}
                 </div>
              </div>
            ))}
          </div>
       </div>
    </div>
  );
}
