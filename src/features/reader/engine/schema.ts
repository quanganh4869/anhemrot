import { z } from "zod";

// --- Enums & Literals ---
export const LayerTypeSchema = z.enum(['background', 'character', 'object', 'foreground', 'effect', 'ui', 'dialogue', 'narration']);
export type LayerType = z.infer<typeof LayerTypeSchema>;

export const AnimPropertySchema = z.enum([
  'opacity', 'translateX', 'translateY', 'translate', 'scale', 
  'rotate', 'skew', 'blur', 'brightness', 'parallax', 'reveal', 'camera_zoom'
]);
export type AnimProperty = z.infer<typeof AnimPropertySchema>;

const TweenValueSchema = z.union([z.string(), z.number()]);

// --- Animation Config ---
export const KeyframeSchema = z.object({
  progress: z.number().min(0).max(1),
  values: z.record(z.string(), TweenValueSchema),
  ease: z.string().optional(),
});
export type KeyframeConfig = z.infer<typeof KeyframeSchema>;

export const AnimationConfigSchema = z.object({
  id: z.string(),
  property: AnimPropertySchema,
  
  // Legacy 2-point setup (will be migrated/deprecated in future)
  startProgress: z.number().min(0).max(1).optional(),
  endProgress: z.number().min(0).max(1).optional(),
  from: z.record(z.string(), TweenValueSchema).optional(),
  to: z.record(z.string(), TweenValueSchema).optional(),
  ease: z.string().optional(),
  delay: z.number().optional(), 
  
  // Advanced Keyframes (New)
  keyframes: z.array(KeyframeSchema).optional(),
});
// Using input to allow omitting optional properties in mock data
export type AnimationConfigInput = z.input<typeof AnimationConfigSchema>;
export type AnimationConfig = z.infer<typeof AnimationConfigSchema>;

// --- Layer Config ---
export const LayerConfigSchema = z.object({
  id: z.string(),
  type: LayerTypeSchema,
  content: z.string().optional(),
  assetUrl: z.string().optional(),
  zIndex: z.number().optional().default(10),
  x: z.union([z.string(), z.number()]).optional().default(0),
  y: z.union([z.string(), z.number()]).optional().default(0),
  width: z.union([z.string(), z.number()]).optional(),
  height: z.union([z.string(), z.number()]).optional(),
  transformOrigin: z.string().optional().default("center center"),
  className: z.string().optional(),
  animations: z.array(AnimationConfigSchema).optional().default([]),
});
export type LayerConfigInput = z.input<typeof LayerConfigSchema>;
export type LayerConfig = z.infer<typeof LayerConfigSchema>;

// --- Scene Config ---
export const SceneConfigSchema = z.object({
  version: z.string().optional().default("1.0"),
  id: z.string(),
  order: z.number(),
  scrollDuration: z.string().optional().default("100vh"),
  pin: z.boolean().optional().default(true),
  scrub: z.union([z.boolean(), z.number()]).optional().default(true),
  layers: z.array(LayerConfigSchema),
});
export type SceneConfigInput = z.input<typeof SceneConfigSchema>;
export type SceneConfig = z.infer<typeof SceneConfigSchema>;
