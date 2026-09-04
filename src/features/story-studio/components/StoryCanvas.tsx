"use client";

import React, { useRef, useState, useEffect } from "react";
import { useEditor } from "../EditorProvider";
import SceneRenderer from "./SceneRenderer";

export default function StoryCanvas() {
  const { state, dispatch } = useEditor();
  const scene = state.config.scenes.find((s) => s.id === state.selectedSceneId);
  const selectedLayer = scene?.layers.find(l => l.id === state.selectedLayerId);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });

  if (!scene) {
    return (
      <div className="flex items-center justify-center h-full text-zinc-500 flex-col gap-2">
        <p>No scene selected</p>
      </div>
    );
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!selectedLayer || !canvasRef.current) return;
    
    // Check if clicking on the handles overlay or inside the canvas
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialPos({ x: selectedLayer.x, y: selectedLayer.y });
    
    // Capture pointer
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !selectedLayer || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    
    // Convert pixel delta to percentage
    const percentX = (dx / rect.width) * 100;
    const percentY = (dy / rect.height) * 100;
    
    const newX = Math.max(0, Math.min(100, initialPos.x + percentX));
    const newY = Math.max(0, Math.min(100, initialPos.y + percentY));
    
    // Dispatch update continuously for smooth preview, but it might be heavy.
    // In a real pro app, we use local state while dragging, then dispatch on end.
    // Let's do local dispatch for now, it's fast enough for simple scenes.
    dispatch({
      type: "UPDATE_LAYER",
      payload: {
        sceneId: scene.id,
        layerId: selectedLayer.id,
        updates: { x: newX, y: newY }
      }
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }
  };

  // Build the overlay for the selected layer
  const overlay = selectedLayer && (
    <div 
      className="absolute border-2 border-blue-500 z-50 pointer-events-auto cursor-move touch-none"
      style={{
        left: `${selectedLayer.x}%`,
        top: `${selectedLayer.y}%`,
        transform: `translate(-50%, -50%) rotate(${selectedLayer.rotation || 0}deg)`,
        width: selectedLayer.width ? `${selectedLayer.width}%` : 'auto',
        height: selectedLayer.height ? `${selectedLayer.height}%` : 'auto',
        minWidth: '50px',
        minHeight: '50px'
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Resize Handle (bottom-right) */}
      <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-blue-500 rounded-full cursor-nwse-resize" />
    </div>
  );

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-zinc-950 p-4">
      {/* Logical Aspect Ratio Container */}
      <div 
        ref={canvasRef}
        className="relative w-full max-w-[400px] aspect-[9/16] bg-black rounded-lg overflow-hidden shadow-2xl ring-1 ring-zinc-800 touch-none"
      >
        <SceneRenderer 
          scene={scene} 
          isPlaying={state.isPlaying} 
          isEditor={true}
          selectedLayerId={state.selectedLayerId}
          onLayerClick={(id) => dispatch({ type: "SELECT_LAYER", payload: id })}
          overlay={overlay}
        />
      </div>
    </div>
  );
}
