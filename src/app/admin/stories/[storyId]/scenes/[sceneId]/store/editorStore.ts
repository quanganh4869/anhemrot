import { create } from 'zustand';
import { SceneConfig } from '@/features/reader/engine/schema';

interface EditorState {
  scene: SceneConfig | null;
  history: SceneConfig[];
  future: SceneConfig[];
  selectedLayerId: string | null;
  
  // Actions
  initScene: (scene: SceneConfig) => void;
  updateScene: (newScene: SceneConfig) => void;
  updateLayerPosition: (layerId: string, x: number | string, y: number | string) => void;
  updateLayerSize: (layerId: string, width: number | string, height: number | string) => void;
  selectLayer: (layerId: string | null) => void;
  undo: () => void;
  redo: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  scene: null,
  history: [],
  future: [],
  selectedLayerId: null,

  initScene: (scene) => set({ scene, history: [], future: [], selectedLayerId: null }),
  
  updateScene: (newScene) => {
    const current = get().scene;
    if (!current) return;
    
    set((state) => ({
      scene: newScene,
      history: [...state.history, current],
      future: [] // clear future on new action
    }));
  },

  updateLayerPosition: (layerId, x, y) => {
    const { scene, updateScene } = get();
    if (!scene) return;

    const newScene = {
      ...scene,
      layers: scene.layers.map(l => l.id === layerId ? { ...l, x, y } : l)
    };
    updateScene(newScene);
  },

  updateLayerSize: (layerId, width, height) => {
    const { scene, updateScene } = get();
    if (!scene) return;

    const newScene = {
      ...scene,
      layers: scene.layers.map(l => l.id === layerId ? { ...l, width, height } : l)
    };
    updateScene(newScene);
  },

  selectLayer: (layerId) => set({ selectedLayerId: layerId }),

  undo: () => {
    const { history, scene, future } = get();
    if (history.length === 0 || !scene) return;

    const previous = history[history.length - 1];
    set({
      scene: previous,
      history: history.slice(0, -1),
      future: [scene, ...future]
    });
  },

  redo: () => {
    const { history, scene, future } = get();
    if (future.length === 0 || !scene) return;

    const next = future[0];
    set({
      scene: next,
      history: [...history, scene],
      future: future.slice(1)
    });
  }
}));
