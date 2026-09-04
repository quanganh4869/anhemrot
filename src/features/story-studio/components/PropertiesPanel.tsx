"use client";

import React from "react";
import { useEditor } from "../EditorProvider";
import { AnimationPresetType, Scene, TransitionConfig } from "@/types/story-anim";

const ANIMATION_PRESETS: { value: AnimationPresetType; label: string }[] = [
  { value: "none", label: "None" },
  { value: "kenBurns", label: "Ken Burns (Zoom & Pan)" },
  { value: "panLeft", label: "Pan Left" },
  { value: "panRight", label: "Pan Right" },
  { value: "panUp", label: "Pan Up" },
  { value: "panDown", label: "Pan Down" },
  { value: "zoomIn", label: "Zoom In" },
  { value: "zoomOut", label: "Zoom Out" },
  { value: "fade", label: "Fade" },
  { value: "fadeUp", label: "Fade Up" },
];

export default function PropertiesPanel() {
  const { state, dispatch } = useEditor();
  const scene = state.config.scenes.find((s) => s.id === state.selectedSceneId);
  
  if (!scene) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-zinc-500">
        No scene selected
      </div>
    );
  }

  const handleSceneUpdate = (updates: Partial<Scene>) => {
    dispatch({
      type: "UPDATE_SCENE",
      payload: { sceneId: scene.id, updates },
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-zinc-800">
        <h2 className="text-sm font-semibold">Properties</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Scene Settings */}
        <section className="space-y-4">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Scene Settings</h3>
          
          <div className="space-y-2">
            <label className="text-xs text-zinc-300">Duration (seconds)</label>
            <input 
              type="number" 
              value={scene.duration}
              onChange={(e) => handleSceneUpdate({ duration: Number(e.target.value) })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-sm focus:outline-none focus:border-zinc-600"
              min={1} max={30} step={0.5}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-zinc-300">Transition</label>
            <div className="flex gap-2">
              <select 
                value={scene.transition.type}
                onChange={(e) => handleSceneUpdate({ transition: { ...scene.transition, type: e.target.value as TransitionConfig["type"] } })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-zinc-600"
              >
                <option value="none">None</option>
                <option value="fade">Fade</option>
                <option value="slide">Slide</option>
              </select>
            </div>
          </div>
        </section>

        {/* Background Animation */}
        <section className="space-y-4">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Background Animation</h3>
          
          <div className="space-y-2">
            <label className="text-xs text-zinc-300">Preset</label>
            <select 
              value={scene.background.animation?.preset || "none"}
              onChange={(e) => handleSceneUpdate({ 
                background: { 
                  ...scene.background, 
                  animation: { ...scene.background.animation, preset: e.target.value as AnimationPresetType } 
                } 
              })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-zinc-600"
            >
              {ANIMATION_PRESETS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
        </section>

        {/* We can add layer properties here later if a layer is selected */}
        
      </div>
    </div>
  );
}
