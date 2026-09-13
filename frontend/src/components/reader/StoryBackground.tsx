import { motion, MotionValue, useTransform, transform } from 'framer-motion';
import type { StoryScene } from '../../data/stories';

interface Props {
  scenes: StoryScene[];
  progress: MotionValue<number>;
}

export default function StoryBackground({ scenes, progress }: Props) {
  const numScenes = scenes.length;
  
  // Create an array of input points for each scene, from 0 to 1
  const inputPoints = scenes.map((_, i) => i / (Math.max(1, numScenes - 1)));
  
  // Extract background colors
  const outputColors = scenes.map(s => s.visual.backgroundTone);
  
  // Use 'transform' to create a pure JS interpolator function, bypassing WAAPI
  const colorInterpolator = transform(inputPoints, outputColors);
  
  // Create the color transform by passing the JS interpolator function
  const backgroundColor = useTransform(progress, colorInterpolator);

  return (
    <motion.div 
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ backgroundColor }}
    />
  );
}
