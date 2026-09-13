const fs = require('fs');
const content = fs.readFileSync('frontend/src/data/stories.ts', 'utf8');
const interfaces = `export interface StoryScene {
  id: string;
  type: 'cover' | 'scene' | 'transition' | 'ending';
  text: string[];
  visual: {
    backgroundTone: string;
    illustrationType: string;
    colorHint: string;
    mainImage?: string;
    dropCap?: string;
  };
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  author: string;
  illustrator: string;
  shortDescription: string;
  type: string;
  readingTime: string;
  ageRange: string;
  scenes: StoryScene[];
}

`;
const newContent = interfaces + content.replace("import { Story } from '../types';", '');
fs.writeFileSync('frontend/src/data/stories.ts', newContent);
