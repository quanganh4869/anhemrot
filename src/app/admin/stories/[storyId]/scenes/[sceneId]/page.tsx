"use client";
import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Play, Layers, Settings, MonitorPlay, Undo2, Redo2 } from "lucide-react";
import { SceneConfigSchema } from "@/features/reader/engine/schema";
import { mockStoryData } from "@/features/reader/data/mockStory";
import { useEditorStore } from "./store/editorStore";

// Placeholder for sub-components
import LayerTree from "./components/LayerTree";
import SceneCanvas from "./components/SceneCanvas";
import PropertiesPanel from "./components/PropertiesPanel";
import TimelinePanel from "./components/TimelinePanel";
import SceneRenderer from "@/features/reader/components/SceneRenderer";

export default function VisualSceneEditorPage(props: { params: Promise<{ storyId: string, sceneId: string }> }) {
  const params = use(props.params);
  // Load mock data for the scene and parse it to populate defaults (strict type)
  const initialScene = SceneConfigSchema.parse(mockStoryData.chapters[0].scenes[0]);
  
  const { scene, initScene, selectedLayerId, selectLayer, undo, redo, history, future } = useEditorStore();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Initialize store on mount
  useEffect(() => {
    initScene(initialScene);
  }, [initScene, initialScene]);

  if (!scene) return null; // loading state

  const selectedLayer = scene.layers.find(l => l.id === selectedLayerId);

  const handleSaveDraft = () => {
    setSaveState('saving');
    setTimeout(() => setSaveState('saved'), 1000); // Mock API call
    setTimeout(() => setSaveState('idle'), 3000);
  };

  if (isPreviewMode) {
    return (
      <div className="w-full h-screen bg-black flex flex-col">
        <div className="h-12 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 z-50">
          <span className="text-sm font-medium">Preview Mode</span>
          <button 
            onClick={() => setIsPreviewMode(false)}
            className="bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 text-sm transition"
          >
            Exit Preview
          </button>
        </div>
        <div className="flex-1 overflow-auto bg-zinc-950">
          <div className="w-full relative" style={{ height: scene.scrollDuration || '300vh' }}>
             <SceneRenderer scene={scene} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-zinc-950 text-white flex flex-col overflow-hidden text-sm">
      {/* Top Navbar */}
      <header className="h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/admin/stories" className="text-zinc-400 hover:text-white transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-semibold">Scene Editor</h1>
            <p className="text-xs text-zinc-500">Story: {params.storyId} / Scene: {params.sceneId}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 border-r border-zinc-700 pr-3 mr-1">
            <button 
              onClick={undo} 
              disabled={history.length === 0}
              className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              title="Undo"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button 
              onClick={redo} 
              disabled={future.length === 0}
              className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              title="Redo"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>
          
          <span className="text-xs text-zinc-500 w-16 text-right">
            {saveState === 'saving' ? 'Saving...' : saveState === 'saved' ? 'Saved.' : ''}
          </span>
          <button 
            onClick={() => setIsPreviewMode(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 transition"
          >
            <MonitorPlay className="w-4 h-4" />
            Preview
          </button>
          <button 
            onClick={handleSaveDraft}
            className="flex items-center gap-2 px-3 py-1.5 bg-white text-black hover:bg-zinc-200 font-medium transition"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Panel: Layer Tree */}
        <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col shrink-0">
          <div className="h-10 border-b border-zinc-800 flex items-center px-4 font-medium gap-2 text-zinc-300">
            <Layers className="w-4 h-4" />
            Layers
          </div>
          <LayerTree 
            layers={scene.layers} 
            selectedId={selectedLayerId} 
            onSelect={selectLayer} 
          />
        </aside>

        {/* Center Panel: Canvas */}
        <main className="flex-1 bg-zinc-950 relative overflow-hidden flex flex-col">
          <div className="flex-1 p-8 flex items-center justify-center">
             <SceneCanvas scene={scene} selectedLayerId={selectedLayerId} />
          </div>
        </main>

        {/* Right Panel: Properties */}
        <aside className="w-80 bg-zinc-900 border-l border-zinc-800 flex flex-col shrink-0 overflow-y-auto">
          <div className="h-10 border-b border-zinc-800 flex items-center px-4 font-medium gap-2 text-zinc-300 sticky top-0 bg-zinc-900 z-10">
            <Settings className="w-4 h-4" />
            Properties
          </div>
          {selectedLayer ? (
            <PropertiesPanel layer={selectedLayer} />
          ) : (
            <div className="p-8 text-center text-zinc-500">Select a layer to edit properties</div>
          )}
        </aside>
      </div>

      {/* Bottom Panel: Timeline */}
      <footer className="h-48 bg-zinc-900 border-t border-zinc-800 shrink-0 flex flex-col">
        <div className="h-10 border-b border-zinc-800 flex items-center px-4 gap-4 font-medium text-zinc-300">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            Timeline (Scroll Progress)
          </div>
        </div>
        <TimelinePanel scene={scene} selectedLayerId={selectedLayerId} />
      </footer>
    </div>
  );
}
