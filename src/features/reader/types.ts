export type LayerType = 'background' | 'character' | 'object' | 'foreground' | 'effect' | 'ui' | 'dialogue' | 'narration';

export type AnimProperty = 'fade' | 'translate' | 'scale' | 'rotate' | 'blur' | 'opacity' | 'parallax' | 'zoom' | 'reveal';

export interface GSAPAnimationConfig {
  id: string;
  property: AnimProperty;
  from: Record<string, string | number>;
  to: Record<string, string | number>;
  startProgress: number; // 0.0 to 1.0 (relative to scene's total scroll)
  endProgress: number;   // 0.0 to 1.0
  ease?: string;
}

export interface LayerConfig {
  id: string;
  type: LayerType;
  content?: string; // Text or Image URL
  assetUrl?: string;
  zIndex: number;
  // Base styling (percentage based for responsive)
  x: string | number; 
  y: string | number;
  width?: string | number;
  height?: string | number;
  transformOrigin?: string;
  className?: string;
  animations: GSAPAnimationConfig[];
}

export interface SceneConfig {
  id: string;
  order: number;
  scrollDuration: string; // e.g. "200vh" - how long the pin lasts
  layers: LayerConfig[];
}

export interface ChapterConfig {
  id: string;
  title: string;
  scenes: SceneConfig[];
}

export interface StoryConfig {
  id: string;
  title: string;
  chapters: ChapterConfig[];
}
