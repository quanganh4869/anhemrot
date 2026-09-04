"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { EditorProvider, useEditor } from "@/features/story-studio/EditorProvider";
import StudioLayout from "@/features/story-studio/components/StudioLayout";
import StudioHeader from "@/features/story-studio/components/StudioHeader";
import SceneListSidebar from "@/features/story-studio/components/SceneListSidebar";
import PropertiesPanel from "@/features/story-studio/components/PropertiesPanel";
import TimelinePanel from "@/features/story-studio/components/TimelinePanel";
import StoryCanvas from "@/features/story-studio/components/StoryCanvas";
import StoryUploader from "@/features/story-studio/components/StoryUploader";
import StoryReader from "@/features/story-studio/components/StoryReader";
import { mockStorage } from "@/services/mockStorage";
import { Loader2 } from "lucide-react";

function EditorContent() {
  const { state, dispatch } = useEditor();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const params = useParams();

  const storyId = params.storyId as string;
  const chapterId = params.chapterId as string;

  // Initial Load
  useEffect(() => {
    const loadConfig = async () => {
      const existing = await mockStorage.getChapterConfig(storyId, chapterId);
      if (existing) {
        dispatch({ type: "SET_CONFIG", payload: existing });
      } else {
        dispatch({ 
          type: "SET_CONFIG", 
          payload: {
            storyId,
            chapterId,
            scenes: [],
            status: 'draft',
            updatedAt: new Date().toISOString()
          }
        });
      }
      setIsInitializing(false);
    };
    loadConfig();
  }, [storyId, chapterId, dispatch]);

  // Debounced Autosave
  useEffect(() => {
    if (isInitializing) return;

    const handler = setTimeout(async () => {
      setSaveStatus('saving');
      try {
        await mockStorage.saveChapterConfig(state.config);
        setSaveStatus('saved');
        
        // Reset back to idle after a few seconds
        setTimeout(() => setSaveStatus('idle'), 2000);
      } catch (error) {
        console.error("Save failed:", error);
        setSaveStatus('error');
      }
    }, 1000); // 1000ms debounce

    return () => clearTimeout(handler);
  }, [state.config, isInitializing]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        dispatch({ type: "SET_PLAYING", payload: !state.isPlaying });
      } else if (e.code === 'Delete' || e.code === 'Backspace') {
        if (state.selectedLayerId) {
          e.preventDefault();
          dispatch({ 
            type: "DELETE_LAYER", 
            payload: { sceneId: state.selectedSceneId!, layerId: state.selectedLayerId } 
          });
        }
      } else if (e.key === 'z' && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
        e.preventDefault();
        dispatch({ type: "UNDO" });
      } else if (e.key === 'z' && (e.ctrlKey || e.metaKey) && e.shiftKey) {
        e.preventDefault();
        dispatch({ type: "REDO" });
      } else if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        // Autosave handles saving, we just show an alert or let it pass
        setSaveStatus('saving');
        mockStorage.saveChapterConfig(state.config).then(() => {
          setSaveStatus('saved');
          setTimeout(() => setSaveStatus('idle'), 2000);
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isPlaying, state.selectedLayerId, state.selectedSceneId, state.config, dispatch]);

  if (isInitializing) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-400">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p>Loading Studio...</p>
      </div>
    );
  }

  return (
    <>
      <StudioLayout 
        header={<StudioHeader onPreview={() => setIsPreviewMode(true)} saveStatus={saveStatus} />}
        sidebarLeft={<SceneListSidebar />}
        sidebarRight={<PropertiesPanel />}
        timeline={<TimelinePanel />}
        canvas={
          state.config.scenes.length === 0 
            ? <StoryUploader /> 
            : <StoryCanvas />
        }
      />
      
      {isPreviewMode && (
        <StoryReader 
          config={state.config} 
          onClose={() => setIsPreviewMode(false)} 
        />
      )}
    </>
  );
}

export default function AnimationStoryStudioPage() {
  return (
    <EditorProvider>
      <EditorContent />
    </EditorProvider>
  );
}
