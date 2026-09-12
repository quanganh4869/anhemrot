export * from './engine/schema';

// We export the *Input* types as the main config interfaces 
// so that mock data and component props don't require every single optional field to be explicitly defined.
import { SceneConfigInput, LayerConfigInput } from './engine/schema';

export type SceneConfig = SceneConfigInput;
export type LayerConfig = LayerConfigInput;

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
