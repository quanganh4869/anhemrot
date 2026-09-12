import { z } from "zod";

// --- Enums & Literals ---
export const LayerTypeSchema = z.enum(['background', 'character', 'object', 'foreground', 'effect', 'ui', 'dialogue', 'narration']);
export type LayerType = z.infer<typeof LayerTypeSchema>;

export const AnimPropertySchema = z.enum([
  'opacity', 'translateX', 'translateY', 'translate', 'scale', 
  'rotate', 'skew', 'blur', 'brightness', 'parallax', 'reveal', 'camera_zoom'
]);
export type AnimProperty = z.infer<typeof AnimPropertySchema>;

// --- Animation Config ---
export const AnimationConfigSchema = z.object({
  id: z.string(),
  property: AnimPropertySchema,
  startProgress: z.number().min(0).max(1),
  endProgress: z.number().min(0).max(1),
  from: z.record(z.any()).optional().default({}),
  to: z.record(z.any()),
  ease: z.string().optional().default("none"),
  delay: z.number().optional().default(0), // optional delay in progress scale
});
export type AnimationConfig = z.infer<typeof AnimationConfigSchema>;

// --- Layer Config ---
export const LayerConfigSchema = z.object({
  id: z.string(),
  type: LayerTypeSchema,
  content: z.string().optional(),
  assetUrl: z.string().optional(),
  zIndex: z.number().default(10),
  x: z.union([z.string(), z.number()]).default(0),
  y: z.union([z.string(), z.number()]).default(0),
  width: z.union([z.string(), z.number()]).optional(),
  height: z.union([z.string(), z.number()]).optional(),
  transformOrigin: z.string().optional().default("center center"),
  className: z.string().optional(),
  animations: z.array(AnimationConfigSchema).default([]),
});
export type LayerConfig = z.infer<typeof LayerConfigSchema>;

// --- Scene Config ---
export const SceneConfigSchema = z.object({
  id: z.string(),
  order: z.number(),
  scrollDuration: z.string().default("100vh"),
  pin: z.boolean().default(true),
  scrub: z.union([z.boolean(), z.number()]).default(true),
  layers: z.array(LayerConfigSchema),
});
export type SceneConfig = z.infer<typeof SceneConfigSchema>;
