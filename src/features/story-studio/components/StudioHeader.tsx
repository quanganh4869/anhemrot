"use client";

import React from "react";
import { ArrowLeft, Play, Undo2, Redo2, Check, Loader2 } from "lucide-react";
import { useEditor } from "../EditorProvider";

interface StudioHeaderProps {
  onPreview: () => void;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
}

export default function StudioHeader({ onPreview, saveStatus }: StudioHeaderProps) {
  const { state, dispatch } = useEditor();

  const canUndo = state.historyIndex > 0;
  const canRedo = state.historyIndex < state.history.length - 1;

  const handlePublish = async () => {
    // Validate
    const hasEmptyScenes = state.config.scenes.some(s => !s.background.url && s.layers.length === 0);
    if (hasEmptyScenes) {
      alert("Cannot publish: Some scenes are empty.");
      return;
    }
    
    // Mock Publish
    alert("Story Published successfully!");
    dispatch({ type: "SET_CONFIG", payload: { ...state.config, status: 'published' } });
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-zinc-800 rounded-md transition-colors" title="Back">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="font-semibold text-sm">Story Animation Studio</h1>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>{state.config.status === "draft" ? "Draft" : "Published"}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
            <span>{state.config.scenes.length} Scenes</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => dispatch({ type: "UNDO" })}
          disabled={!canUndo}
          className="p-2 hover:bg-zinc-800 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Undo"
        >
          <Undo2 size={16} />
        </button>
        <button
          onClick={() => dispatch({ type: "REDO" })}
          disabled={!canRedo}
          className="p-2 hover:bg-zinc-800 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Redo"
        >
          <Redo2 size={16} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-zinc-400">
          {saveStatus === 'saving' && <><Loader2 size={14} className="animate-spin text-zinc-500" /> Saving...</>}
          {saveStatus === 'saved' && <><Check size={14} className="text-green-500" /> Saved</>}
          {saveStatus === 'error' && <span className="text-red-400">Save failed</span>}
        </div>
        
        <button
          onClick={onPreview}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-colors"
        >
          <Play size={16} />
          Preview
        </button>
        <button
          onClick={handlePublish}
          className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors shadow-sm"
        >
          <Check size={16} />
          Publish
        </button>
      </div>
    </>
  );
}
