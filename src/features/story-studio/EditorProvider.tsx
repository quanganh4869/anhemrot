"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Scene, Layer, ChapterAnimConfig, ProcessingJob } from "@/types/story-anim";

interface EditorState {
  config: ChapterAnimConfig;
  selectedSceneId: string | null;
  selectedLayerId: string | null;
  isPlaying: boolean;
  history: ChapterAnimConfig[];
  historyIndex: number;
  job: ProcessingJob | null;
}

type EditorAction =
  | { type: "SET_CONFIG"; payload: ChapterAnimConfig }
  | { type: "ADD_SCENE"; payload: Scene }
  | { type: "UPDATE_SCENE"; payload: { sceneId: string; updates: Partial<Scene> } }
  | { type: "DELETE_SCENE"; payload: string }
  | { type: "REORDER_SCENES"; payload: Scene[] }
  | { type: "SELECT_SCENE"; payload: string | null }
  | { type: "ADD_LAYER"; payload: { sceneId: string; layer: Layer } }
  | { type: "UPDATE_LAYER"; payload: { sceneId: string; layerId: string; updates: Partial<Layer> } }
  | { type: "DELETE_LAYER"; payload: { sceneId: string; layerId: string } }
  | { type: "SELECT_LAYER"; payload: string | null }
  | { type: "SET_PLAYING"; payload: boolean }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "SET_JOB"; payload: ProcessingJob | null };

const initialState: EditorState = {
  config: {
    storyId: "",
    chapterId: "",
    scenes: [],
    status: "draft",
    updatedAt: new Date().toISOString()
  },
  selectedSceneId: null,
  selectedLayerId: null,
  isPlaying: false,
  history: [],
  historyIndex: -1,
  job: null,
};

function cloneConfig(config: ChapterAnimConfig): ChapterAnimConfig {
  return JSON.parse(JSON.stringify(config));
}

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  const newState = { ...state };
  let saveHistory = false;

  switch (action.type) {
    case "SET_JOB":
      newState.job = action.payload;
      break;

    case "SET_CONFIG":
      newState.config = action.payload;
      newState.history = [cloneConfig(action.payload)];
      newState.historyIndex = 0;
      if (action.payload.scenes.length > 0) {
        newState.selectedSceneId = action.payload.scenes[0].id;
      }
      break;

    case "ADD_SCENE":
      newState.config.scenes = [...newState.config.scenes, action.payload];
      newState.selectedSceneId = action.payload.id;
      saveHistory = true;
      break;

    case "UPDATE_SCENE":
      newState.config.scenes = newState.config.scenes.map((s) =>
        s.id === action.payload.sceneId ? { ...s, ...action.payload.updates } : s
      );
      saveHistory = true;
      break;

    case "DELETE_SCENE":
      newState.config.scenes = newState.config.scenes.filter((s) => s.id !== action.payload);
      if (newState.selectedSceneId === action.payload) {
        newState.selectedSceneId = newState.config.scenes[0]?.id || null;
      }
      saveHistory = true;
      break;

    case "REORDER_SCENES":
      newState.config.scenes = action.payload.map((s, i) => ({ ...s, order: i }));
      saveHistory = true;
      break;

    case "SELECT_SCENE":
      newState.selectedSceneId = action.payload;
      newState.selectedLayerId = null;
      newState.isPlaying = false;
      break;

    case "ADD_LAYER":
      newState.config.scenes = newState.config.scenes.map((s) =>
        s.id === action.payload.sceneId
          ? { ...s, layers: [...s.layers, action.payload.layer] }
          : s
      );
      newState.selectedLayerId = action.payload.layer.id;
      saveHistory = true;
      break;

    case "UPDATE_LAYER":
      newState.config.scenes = newState.config.scenes.map((s) => {
        if (s.id !== action.payload.sceneId) return s;
        return {
          ...s,
          layers: s.layers.map((l) =>
            l.id === action.payload.layerId ? { ...l, ...action.payload.updates } : l
          ),
        };
      });
      saveHistory = true;
      break;

    case "DELETE_LAYER":
      newState.config.scenes = newState.config.scenes.map((s) => {
        if (s.id !== action.payload.sceneId) return s;
        return {
          ...s,
          layers: s.layers.filter((l) => l.id !== action.payload.layerId),
        };
      });
      if (newState.selectedLayerId === action.payload.layerId) {
        newState.selectedLayerId = null;
      }
      saveHistory = true;
      break;

    case "SELECT_LAYER":
      newState.selectedLayerId = action.payload;
      break;

    case "SET_PLAYING":
      newState.isPlaying = action.payload;
      break;

    case "UNDO":
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1;
        newState.config = cloneConfig(state.history[newIndex]);
        newState.historyIndex = newIndex;
      }
      break;

    case "REDO":
      if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1;
        newState.config = cloneConfig(state.history[newIndex]);
        newState.historyIndex = newIndex;
      }
      break;
  }

  if (saveHistory) {
    newState.config.updatedAt = new Date().toISOString();
    const currentHistory = newState.history.slice(0, newState.historyIndex + 1);
    const newHistory = [...currentHistory, cloneConfig(newState.config)];
    
    // Limit to 20 steps
    if (newHistory.length > 20) {
      newHistory.shift();
    }
    
    newState.history = newHistory;
    newState.historyIndex = newState.history.length - 1;
  }

  return newState;
}

const EditorContext = createContext<{
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
} | null>(null);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
}
