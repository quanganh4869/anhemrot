"use client";

import React, { useState } from "react";
import { UploadCloud, FileType2, Loader2, Image as ImageIcon, Plus } from "lucide-react";
import { useEditor } from "../EditorProvider";
import { StoryPipeline } from "@/services/pipeline";
import { cn } from "@/utils/cn";

export default function StoryUploader() {
  const { state, dispatch } = useEditor();
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    const pipeline = new StoryPipeline((job) => dispatch({ type: "SET_JOB", payload: job }));
    
    try {
      const newScenes = await pipeline.processFiles(fileArray);
      if (newScenes.length > 0) {
        const updatedScenes = [...state.config.scenes, ...newScenes].map((s, i) => ({...s, order: i}));
        dispatch({
          type: "SET_CONFIG",
          payload: {
            ...state.config,
            scenes: updatedScenes,
            updatedAt: new Date().toISOString()
          }
        });
      }
    } catch (e) {
      console.error(e);
      alert("Failed to process files");
      dispatch({ type: "SET_JOB", payload: null });
    }
  };

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files) handleFiles(e.dataTransfer.files); };

  if (state.job) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-zinc-400">
        {state.job.status !== 'READY' ? (
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-4" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mb-4">✓</div>
        )}
        <p className="text-sm font-medium text-zinc-300">{state.job.message}</p>
        <div className="w-64 h-2 bg-zinc-800 rounded-full mt-4 overflow-hidden">
          <div className="h-full bg-blue-500 transition-all duration-200" style={{ width: `${state.job.progress}%` }}></div>
        </div>
      </div>
    );
  }

  const hasScenes = state.config.scenes.length > 0;

  if (hasScenes) {
    return (
      <div 
        onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
        className={cn(
          "m-4 border border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center transition-colors cursor-pointer",
          isDragging ? "border-blue-500 bg-blue-500/10 text-blue-400" : "border-zinc-700 hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300"
        )}
      >
        <input type="file" multiple accept="image/*,application/pdf" className="hidden" id="mini-upload" onChange={(e) => e.target.files && handleFiles(e.target.files)} />
        <label htmlFor="mini-upload" className="cursor-pointer flex flex-col items-center w-full">
          <Plus size={20} className="mb-2" />
          <span className="text-xs">Add more (PDF/Images)</span>
        </label>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full p-8">
      <div 
        onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
        className={cn(
          "w-full max-w-lg border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center transition-all",
          isDragging ? "border-blue-500 bg-blue-500/10" : "border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800/80 hover:border-zinc-500"
        )}
      >
        <input type="file" multiple accept="image/*,application/pdf" className="hidden" id="main-upload" onChange={(e) => e.target.files && handleFiles(e.target.files)} />
        <label htmlFor="main-upload" className="cursor-pointer flex flex-col items-center">
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-6 text-zinc-400">
            <UploadCloud size={32} />
          </div>
          <h3 className="text-lg font-semibold text-zinc-200 mb-2">Upload your story</h3>
          <p className="text-sm text-zinc-500 max-w-sm mb-6">Drag and drop a PDF file or multiple images (JPG, PNG) to automatically generate scenes.</p>
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <span className="flex items-center gap-1"><FileType2 size={14}/> PDF</span>
            <span className="flex items-center gap-1"><ImageIcon size={14}/> Images</span>
          </div>
        </label>
      </div>
    </div>
  );
}

