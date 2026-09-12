export * from './engine/schema';

// Additional higher-level interfaces not validated by Zod directly (or can be)
import { SceneConfig } from './engine/schema';

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
