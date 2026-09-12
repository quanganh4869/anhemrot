import React from "react";
import { LayerConfig } from "@/features/reader/engine/schema";
import { Eye, Image as ImageIcon, MessageSquare, Type, Ghost, Move } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayerTreeProps {
  layers: LayerConfig[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const getLayerIcon = (type: LayerConfig['type']) => {
  switch(type) {
    case 'background': return ImageIcon;
    case 'character': return Ghost;
    case 'dialogue': return MessageSquare;
    case 'narration': return Type;
    default: return Move;
  }
};

export default function LayerTree({ layers, selectedId, onSelect }: LayerTreeProps) {
  // Sort layers by zIndex descending for tree view (top layer first)
  const sortedLayers = [...layers].sort((a, b) => b.zIndex - a.zIndex);

  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-1">
      {sortedLayers.map((layer) => {
        const Icon = getLayerIcon(layer.type);
        const isSelected = selectedId === layer.id;
        
        return (
          <button
            key={layer.id}
            onClick={() => onSelect(layer.id)}
            className={cn(
              "w-full flex items-center justify-between px-2 py-2 rounded text-left transition-colors",
              isSelected ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            )}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-4 h-4" />
              <span className="truncate w-32">{layer.id}</span>
            </div>
            <Eye className="w-4 h-4 text-zinc-500 hover:text-white" />
          </button>
        );
      })}
    </div>
  );
}
