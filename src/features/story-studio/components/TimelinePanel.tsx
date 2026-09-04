"use client";

import React, { useEffect, useState, useRef } from "react";
import { useEditor } from "../EditorProvider";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

export default function TimelinePanel() {
  const { state, dispatch } = useEditor();
  const scene = state.config.scenes.find((s) => s.id === state.selectedSceneId);
  const [currentTime, setCurrentTime] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Local state for scrubbing to prevent massive re-renders
  const [isScrubbing, setIsScrubbing] = useState(false);

  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      if (state.isPlaying && scene) {
        const delta = (time - lastTime) / 1000;
        setCurrentTime((prev) => {
          let next = prev + delta;
          if (next >= scene.duration) {
            next = 0; // loop for preview
          }
          return next;
        });
      }
      lastTime = time;
      animationFrame = requestAnimationFrame(loop);
    };

    if (state.isPlaying && !isScrubbing) {
      lastTime = performance.now();
      animationFrame = requestAnimationFrame(loop);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [state.isPlaying, scene, isScrubbing]);

  if (!scene) {
    return <div className="h-full flex items-center justify-center text-sm text-zinc-500">Timeline</div>;
  }

  const togglePlay = () => dispatch({ type: "SET_PLAYING", payload: !state.isPlaying });
  
  const handleTimelinePointerDown = (e: React.PointerEvent) => {
    if (!timelineRef.current) return;
    setIsScrubbing(true);
    dispatch({ type: "SET_PLAYING", payload: false });
    updateTimeFromPointer(e);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  
  const handleTimelinePointerMove = (e: React.PointerEvent) => {
    if (isScrubbing) updateTimeFromPointer(e);
  };
  
  const handleTimelinePointerUp = (e: React.PointerEvent) => {
    if (isScrubbing) {
      setIsScrubbing(false);
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }
  };

  const updateTimeFromPointer = (e: React.PointerEvent) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = x / rect.width;
    setCurrentTime(percent * scene.duration);
  };

  return (
    <div className="flex flex-col h-full select-none">
      <div className="h-10 border-b border-zinc-800 flex items-center px-4 gap-4 bg-zinc-900/80 shrink-0">
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentTime(0)} className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors">
            <SkipBack size={16} />
          </button>
          <button onClick={togglePlay} className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors">
            {state.isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors">
            <SkipForward size={16} />
          </button>
        </div>
        <div className="text-xs font-mono text-zinc-400 w-20">
          {currentTime.toFixed(2)}s / {scene.duration.toFixed(2)}s
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-zinc-950 flex flex-col relative">
        
        {/* Time Ruler Area */}
        <div 
          className="h-6 border-b border-zinc-800 shrink-0 relative bg-zinc-900/50 cursor-ew-resize ml-24"
          ref={timelineRef}
          onPointerDown={handleTimelinePointerDown}
          onPointerMove={handleTimelinePointerMove}
          onPointerUp={handleTimelinePointerUp}
          onPointerCancel={handleTimelinePointerUp}
        >
          {/* Playhead */}
          <div 
            className="absolute top-0 bottom-[-500px] w-0.5 bg-red-500 z-50 pointer-events-none"
            style={{ left: `${(currentTime / scene.duration) * 100}%` }}
          >
            <div className="absolute -top-1 -translate-x-1/2 border-[5px] border-transparent border-t-red-500" />
          </div>
        </div>

        <div className="flex-1 p-2 space-y-2 relative">
          
          {/* Background Track */}
          <div className="flex items-center gap-2 text-xs">
            <div className="w-20 shrink-0 text-zinc-400 text-right pr-2">Background</div>
            <div className="flex-1 h-8 bg-zinc-900 rounded border border-zinc-800 relative overflow-hidden">
              <div className="absolute top-0 bottom-0 left-0 bg-blue-600/30 border border-blue-500/50 rounded-sm w-full">
                <div className="px-2 py-1.5 truncate pointer-events-none">
                  {scene.background.animation?.preset || "Static"}
                </div>
              </div>
            </div>
          </div>

          {/* Layer Tracks */}
          {scene.layers.map((layer) => (
            <div key={layer.id} className="flex items-center gap-2 text-xs">
              <div 
                className="w-20 shrink-0 truncate pr-2 text-right cursor-pointer hover:text-white transition-colors"
                title={layer.type}
                onClick={() => dispatch({ type: "SELECT_LAYER", payload: layer.id })}
                style={{ color: state.selectedLayerId === layer.id ? '#fff' : '#a1a1aa' }}
              >
                {layer.type === 'text' ? 'T ' : ''} {layer.content || layer.id.split('_')[0]}
              </div>
              <div className="flex-1 h-8 bg-zinc-900 rounded border border-zinc-800 relative">
                <div 
                  className={`absolute top-0 bottom-0 rounded-sm cursor-grab active:cursor-grabbing border ${state.selectedLayerId === layer.id ? 'bg-purple-500/50 border-purple-400' : 'bg-purple-600/30 border-purple-500/50'}`}
                  style={{ 
                    left: `${((layer.animation?.delay || 0) / scene.duration) * 100}%`,
                    width: `${((layer.animation?.duration || scene.duration) / scene.duration) * 100}%` 
                  }}
                  onClick={() => dispatch({ type: "SELECT_LAYER", payload: layer.id })}
                >
                  <div className="px-2 py-1.5 truncate pointer-events-none drop-shadow-md">
                    {layer.animation?.preset}
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
