import React from "react";
import { Rnd } from "react-rnd";
import { SceneConfig } from "@/features/reader/engine/schema";
import { useEditorStore } from "../store/editorStore";
import { cn } from "@/lib/utils";

interface SceneCanvasProps {
  scene: SceneConfig;
  selectedLayerId: string | null;
}

export default function SceneCanvas({ scene, selectedLayerId }: SceneCanvasProps) {
  const { selectLayer, updateLayerPosition, updateLayerSize } = useEditorStore();

  return (
    <div className="w-[800px] h-[450px] bg-zinc-900 shadow-2xl relative overflow-hidden border border-zinc-800 rounded-lg">
       {scene.layers.map((layer) => {
         const isSelected = layer.id === selectedLayerId;
         
         // Parse percentages or px to raw numbers for RND if needed,
         // but Rnd supports string percentages too.
         // For a robust editor, we normally convert all coordinates to standard formats.
         
         return (
           <Rnd
             key={layer.id}
             bounds="parent"
             position={{
               x: typeof layer.x === 'number' ? layer.x : parseFloat(layer.x as string) || 0,
               y: typeof layer.y === 'number' ? layer.y : parseFloat(layer.y as string) || 0,
             }}
             size={{
               width: layer.width || "auto",
               height: layer.height || "auto",
             }}
             onDragStart={() => selectLayer(layer.id)}
             onDragStop={(e, d) => {
               // Update global store
               updateLayerPosition(layer.id, d.x, d.y);
             }}
             onResizeStop={(e, direction, ref, delta, position) => {
               updateLayerSize(layer.id, ref.style.width, ref.style.height);
               updateLayerPosition(layer.id, position.x, position.y);
             }}
             style={{
                zIndex: layer.zIndex,
                transformOrigin: layer.transformOrigin || "center center",
             }}
             className={cn(
               isSelected && "ring-2 ring-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] z-[9999]"
             )}
             enableResizing={isSelected}
             disableDragging={!isSelected}
             onClick={() => selectLayer(layer.id)}
           >
             <div className={cn("w-full h-full pointer-events-none", layer.className)}>
               {layer.assetUrl && (
                 // eslint-disable-next-line @next/next/no-img-element
                 <img src={layer.assetUrl} alt={layer.type} className="w-full h-full object-cover" />
               )}
               {layer.content && (
                 <div className="text-xl font-semibold text-white p-2 bg-black/40 rounded-lg">
                   {layer.content}
                 </div>
               )}
             </div>
           </Rnd>
         );
       })}
    </div>
  );
}
