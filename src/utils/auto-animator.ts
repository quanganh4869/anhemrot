import { Scene, AnimationPresetConfig } from "@/types/story-anim";

const BACKGROUND_PRESETS = [
  'kenBurns', 
  'panLeft', 
  'panRight', 
  'panUp', 
  'panDown',
  'zoomIn',
  'zoomOut'
];

export function autoGenerateSceneConfig(id: string, imageUrl: string, index: number): Scene {
  // Logic: Alternate through presets logically
  const presetIndex = index % BACKGROUND_PRESETS.length;
  const presetName = BACKGROUND_PRESETS[presetIndex];
  
  // Base duration between 5-7 seconds
  const duration = 6; 

  const backgroundAnim: AnimationPresetConfig = {
    preset: presetName as import("@/types/story-anim").AnimationPresetType,
    duration: duration,
    easing: 'ease-in-out'
  };

  // Add specific values if we want finer control, otherwise let the engine handle it based on preset name
  if (presetName === 'kenBurns') {
    backgroundAnim.from = { scale: 1 };
    backgroundAnim.to = { scale: 1.08 };
  }

  return {
    id,
    order: index,
    duration,
    status: 'ready',
    background: {
      url: imageUrl,
      animation: backgroundAnim
    },
    layers: [],
    transition: {
      type: 'fade',
      duration: 1.0 // 1 second crossfade
    }
  };
}

export function generateScenesFromImages(imageUrls: string[]): Scene[] {
  return imageUrls.map((url, i) => autoGenerateSceneConfig(`scene_${Date.now()}_${i}`, url, i));
}
