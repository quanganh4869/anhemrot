import { storySlides } from './frontend/src/data/slidesData.ts';
import fs from 'fs';
fs.writeFileSync('scratch/slides_21_22.json', JSON.stringify(storySlides.slice(20, 22), null, 2));
console.log('Saved');
