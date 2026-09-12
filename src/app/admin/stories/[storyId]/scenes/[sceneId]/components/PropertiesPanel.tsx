import React from "react";
import { LayerConfig } from "@/features/reader/engine/schema";
import { Copy, Trash2, Plus } from "lucide-react";

interface PropertiesPanelProps {
  layer: LayerConfig;
}

export default function PropertiesPanel({ layer }: PropertiesPanelProps) {
  return (
    <div className="p-4 space-y-6">
      
      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 flex justify-center items-center gap-2 bg-zinc-800 hover:bg-zinc-700 py-1.5 rounded transition">
          <Copy className="w-4 h-4" /> Clone
        </button>
        <button className="flex-1 flex justify-center items-center gap-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 py-1.5 rounded transition">
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>

      {/* Geometry */}
      <div>
        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Geometry & Transform</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">X Position</label>
            <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-sm outline-none focus:border-white" defaultValue={layer.x} />
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Y Position</label>
            <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-sm outline-none focus:border-white" defaultValue={layer.y} />
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Width</label>
            <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-sm outline-none focus:border-white" defaultValue={layer.width || 'auto'} />
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Height</label>
            <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-sm outline-none focus:border-white" defaultValue={layer.height || 'auto'} />
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Z-Index</label>
            <input type="number" className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-sm outline-none focus:border-white" defaultValue={layer.zIndex} />
          </div>
        </div>
      </div>

      {/* Animations Config */}
      <div>
        <div className="flex justify-between items-center mb-3">
           <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Animations ({layer.animations.length})</h3>
           <button className="text-xs flex items-center gap-1 text-emerald-400 hover:text-emerald-300">
             <Plus className="w-3 h-3" /> Add
           </button>
        </div>
        
        <div className="space-y-3">
          {layer.animations.map((anim) => (
            <div key={anim.id} className="bg-zinc-950 border border-zinc-800 rounded p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-zinc-200 capitalize">{anim.property}</span>
                <span className="text-xs text-zinc-500">{anim.startProgress} → {anim.endProgress}</span>
              </div>
              <div className="text-xs text-zinc-400 space-y-1">
                 <p>From: {JSON.stringify(anim.from)}</p>
                 <p>To: {JSON.stringify(anim.to)}</p>
                 <p>Ease: {anim.ease}</p>
              </div>
            </div>
          ))}
          {layer.animations.length === 0 && (
            <p className="text-xs text-zinc-500">No animations configured.</p>
          )}
        </div>
      </div>
    </div>
  );
}
