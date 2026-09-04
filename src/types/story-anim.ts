export type AnimationPresetType = 
  | 'none'
  | 'fade'
  | 'fadeUp'
  | 'fadeDown'
  | 'fadeLeft'
  | 'fadeRight'
  | 'slideLeft'
  | 'slideRight'
  | 'slideUp'
  | 'slideDown'
  | 'zoomIn'
  | 'zoomOut'
  | 'kenBurns'
  | 'panLeft'
  | 'panRight'
  | 'panUp'
  | 'panDown'
  | 'parallax'
  | 'blurReveal'
  | 'typewriter'
  | 'cinematic'
  | 'dramatic'
  | 'softStory'
  | 'pageTurn'
  | 'custom';

export interface AnimationKeyframe {
  scale?: number;
  x?: number; // percentage based on width
  y?: number; // percentage based on height
  rotation?: number;
  opacity?: number;
  blur?: number;
}

export interface AnimationPresetConfig {
  preset: AnimationPresetType;
  duration?: number;
  delay?: number;
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | string;
  // Custom keyframes
  from?: AnimationKeyframe;
  to?: AnimationKeyframe;
}

export interface TransitionConfig {
  type: 'none' | 'fade' | 'crossfade' | 'slide' | 'dissolve' | 'zoom' | 'blur' | 'pageTurn';
  duration: number;
}

export interface AudioConfig {
  url: string;
  volume: number;
  startTime?: number; // offset in timeline
  duration?: number;
  loop?: boolean;
  fadeIn?: number;
  fadeOut?: number;
}

export type LayerType = 'background' | 'image' | 'character' | 'object' | 'text' | 'audio' | 'effect';

export interface Layer {
  id: string;
  type: LayerType;
  asset?: string; // URL to the processed asset
  originalAsset?: string; // URL to original uploaded asset
  thumbnailAsset?: string;
  content?: string; // For text
  
  // Transform (Normalized 0-100% or absolute relative to logical canvas)
  x: number; 
  y: number; 
  width?: number; 
  height?: number; 
  scale: number;
  rotation: number;
  opacity: number;
  zIndex: number;
  depth?: number; // Parallax depth (0 = background, 1 = middle, 2 = foreground)
  
  visible: boolean;
  locked: boolean;
  
  animation?: AnimationPresetConfig;
  
  // Text specifics
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  fontFamily?: string;
  textShadow?: string;
  maxWidth?: number;
}

export interface Scene {
  id: string;
  order: number;
  duration: number; // seconds
  aspectRatio?: '16:9' | '9:16' | '1:1' | '4:3' | '3:4';
  background: {
    url?: string;
    color?: string; // fallback
    animation?: AnimationPresetConfig;
  };
  layers: Layer[];
  transition: TransitionConfig;
  audio?: AudioConfig;
  status: 'draft' | 'ready' | 'error';
}

export interface ChapterAnimConfig {
  storyId: string;
  chapterId: string;
  scenes: Scene[];
  status: 'draft' | 'processing' | 'ready' | 'published' | 'failed';
  updatedAt: string;
  version?: number;
  resolution?: { width: number; height: number }; // Logical resolution, e.g., 1080x1920
}

export interface ProcessingJob {
  id: string;
  status: 'UPLOADING' | 'PROCESSING_PDF' | 'ANALYZING' | 'GENERATING' | 'READY' | 'FAILED';
  progress: number; // 0-100
  message: string;
}
