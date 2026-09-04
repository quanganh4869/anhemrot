"use client";

import React, { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { useEditor } from "../EditorProvider";
import { cn } from "@/utils/cn";

export default function SceneListSidebar() {
  const { state, dispatch } = useEditor();
  const scenes = state.config.scenes;
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, idx: number) => {
    setDraggedIdx(idx);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx) return;

    const newScenes = [...scenes];
    const draggedScene = newScenes[draggedIdx];
    newScenes.splice(draggedIdx, 1);
    newScenes.splice(idx, 0, draggedScene);
    
    dispatch({ type: "REORDER_SCENES", payload: newScenes });
    setDraggedIdx(idx);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <h2 className="text-sm font-semibold">Scenes</h2>
        <button 
          className="p-1 hover:bg-zinc-800 rounded transition-colors text-zinc-400 hover:text-white"
          title="Add empty scene"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {scenes.map((scene, idx) => {
          const isSelected = state.selectedSceneId === scene.id;

          return (
            <div
              key={scene.id}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragEnd={handleDragEnd}
              onClick={() => dispatch({ type: "SELECT_SCENE", payload: scene.id })}
              className={cn(
                "group relative flex items-center gap-2 p-2 rounded-lg cursor-pointer border transition-colors",
                isSelected 
                  ? "bg-zinc-800/80 border-blue-500/50" 
                  : "bg-zinc-900/50 border-transparent hover:bg-zinc-800 hover:border-zinc-700"
              )}
            >
              <div className="cursor-grab active:cursor-grabbing text-zinc-600 group-hover:text-zinc-400">
                <GripVertical size={14} />
              </div>
              
              <div className="text-xs font-mono text-zinc-500 w-4">
                {idx + 1}
              </div>

              <div className="w-16 h-10 bg-zinc-950 rounded overflow-hidden relative shrink-0">
                {scene.background.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={scene.background.url} 
                    alt={`Scene ${idx + 1}`} 
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded"></div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs truncate font-medium">{scene.duration}s</p>
                <p className="text-[10px] text-zinc-500 truncate">
                  {scene.layers.length} layers
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: "DELETE_SCENE", payload: scene.id });
                }}
                className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-400 text-zinc-500 rounded transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}

        {scenes.length === 0 && (
          <div className="text-center py-8 text-sm text-zinc-500">
            No scenes yet. Upload files to start.
          </div>
        )}
      </div>
    </div>
  );
}
