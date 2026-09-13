import { motion, useTransform, type TargetAndTransition } from 'framer-motion';
import type { StoryScene } from '../../data/stories';

interface Props {
  scene: StoryScene;
  scrollYProgress: any;
  index: number;
}

export default function CinematicArtwork({ scene, scrollYProgress }: Props) {
  const mainImage = scene.visual.mainImage;
  if (!mainImage) return null;

  const imgSrc = `/images/${mainImage}`;
  
  // Base ambient animations (scale up, fade out)
  const ambientOpacity = useTransform(scrollYProgress, (v: number) => {
    if (v < 0.1) return 0;
    if (v >= 0.1 && v < 0.3) return (v - 0.1) / 0.2;
    if (v >= 0.3 && v < 0.7) return 1;
    if (v >= 0.7 && v < 0.9) return 1 - ((v - 0.7) / 0.2);
    return 0;
  });

  const generateLayerTransforms = (speedMult: number = 1) => {
    const y = useTransform(scrollYProgress, (v: number) => {
      const base = 80 * speedMult;
      if (v < 0.2) return base;
      if (v >= 0.2 && v < 0.5) return base - ((v - 0.2) / 0.3) * base;
      if (v >= 0.5 && v < 0.8) return 0 - ((v - 0.5) / 0.3) * base;
      return -base;
    });

    const scale = useTransform(scrollYProgress, (v: number) => {
      if (v < 0.2) return 0.95;
      if (v >= 0.2 && v < 0.5) return 0.95 + ((v - 0.2) / 0.3) * 0.05 * speedMult;
      if (v >= 0.5 && v < 0.8) return 1 + ((v - 0.5) / 0.3) * 0.05 * speedMult;
      return 1 + 0.05 * speedMult;
    });

    return { y, scale };
  };

  // Pre-calculate layers for parallax
  const bgTransform = generateLayerTransforms(0.3);
  const midTransform = generateLayerTransforms(1.0);
  const fgTransform = generateLayerTransforms(1.8);

  // Common floating idle animation
  const floatAnim: TargetAndTransition = {
    y: [0, -8, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
  };
  
  const floatAnimReverse: TargetAndTransition = {
    y: [0, 8, 0],
    transition: { duration: 7, repeat: Infinity, ease: "easeInOut" }
  };

  // Render specific layout based on page index
  const renderComposition = () => {
    switch (scene.id) {
      case 'page-01': // Cover (Hill at bottom, text at top)
        return (
          <>
            {/* Ambient blurred background */}
            <motion.div className="absolute inset-0 z-0 opacity-50 blur-2xl scale-110" style={bgTransform}>
              <img src={imgSrc} className="w-full h-full object-cover" />
            </motion.div>
            
            {/* Background (Sky/Top) */}
            <motion.div 
              className="absolute inset-0 z-10" 
              style={{ ...bgTransform, WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 70%)' }}
            >
              <img src={imgSrc} className="w-full h-full object-contain p-4 md:p-8" />
            </motion.div>
            
            {/* Foreground (Hill/Bottom) */}
            <motion.div 
              className="absolute inset-0 z-20" 
              style={{ ...fgTransform, WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 60%)' }}
              animate={floatAnim}
            >
              <img src={imgSrc} className="w-full h-full object-contain p-4 md:p-8" />
            </motion.div>
          </>
        );

      case 'page-02': // Cloud Sky
        return (
          <>
            <motion.div className="absolute inset-0 z-0 scale-110 blur-sm opacity-60" style={bgTransform}>
              <img src={imgSrc} className="w-full h-full object-cover" />
            </motion.div>
            <motion.div className="absolute inset-0 z-10" style={midTransform} animate={{ x: [0, 10, 0], transition: { duration: 10, repeat: Infinity } } as TargetAndTransition}>
              <img src={imgSrc} className="w-full h-full object-cover scale-105" style={{ WebkitMaskImage: 'linear-gradient(to right, black 50%, transparent 80%)' }} />
            </motion.div>
            <motion.div className="absolute inset-0 z-20" style={fgTransform} animate={{ x: [0, -15, 0], transition: { duration: 12, repeat: Infinity } } as TargetAndTransition}>
              <img src={imgSrc} className="w-full h-full object-cover scale-110" style={{ WebkitMaskImage: 'linear-gradient(to left, black 40%, transparent 70%)' }} />
            </motion.div>
          </>
        );

      case 'page-12': // Butterfly (Center)
      case 'page-13': // Central figure
      case 'page-16': // Purple shape
      case 'page-18': // Black creature
        return (
          <>
            <motion.div className="absolute inset-0 z-0 scale-125 opacity-30 blur-3xl" style={bgTransform}>
              <img src={imgSrc} className="w-full h-full object-contain" />
            </motion.div>
            
            {/* Outer environment */}
            <motion.div 
              className="absolute inset-0 z-10" 
              style={{ ...bgTransform, WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 30%, black 60%)' }}
            >
              <img src={imgSrc} className="w-full h-full object-contain p-4 md:p-8" />
            </motion.div>
            
            {/* Inner character/shape */}
            <motion.div 
              className="absolute inset-0 z-20 drop-shadow-2xl" 
              style={{ ...fgTransform, WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 65%)' }}
              animate={floatAnim}
            >
              <img src={imgSrc} className="w-full h-full object-contain p-4 md:p-8" />
            </motion.div>
          </>
        );

      case 'page-14': // Two figures
        return (
          <>
            <motion.div className="absolute inset-0 z-0 opacity-40 blur-xl scale-110" style={bgTransform}>
              <img src={imgSrc} className="w-full h-full object-contain" />
            </motion.div>
            {/* Left figure */}
            <motion.div 
              className="absolute inset-0 z-10 drop-shadow-xl" 
              style={{ ...fgTransform, WebkitMaskImage: 'linear-gradient(to right, black 40%, transparent 60%)' }}
              animate={floatAnim}
            >
              <img src={imgSrc} className="w-full h-full object-contain p-4 md:p-8" />
            </motion.div>
            {/* Right figure */}
            <motion.div 
              className="absolute inset-0 z-20 drop-shadow-xl" 
              style={{ ...midTransform, WebkitMaskImage: 'linear-gradient(to left, black 40%, transparent 60%)' }}
              animate={floatAnimReverse}
            >
              <img src={imgSrc} className="w-full h-full object-contain p-4 md:p-8" />
            </motion.div>
          </>
        );

      case 'page-19': // Silhouette Hand (Bottom right) + Stars (Top left)
        return (
          <>
            <motion.div className="absolute inset-0 z-0 opacity-20 blur-2xl scale-110" style={bgTransform}>
              <img src={imgSrc} className="w-full h-full object-contain" />
            </motion.div>
            <motion.div 
              className="absolute inset-0 z-10" 
              style={{ ...bgTransform, WebkitMaskImage: 'linear-gradient(135deg, black 40%, transparent 60%)' }}
              animate={{ opacity: [0.7, 1, 0.7], transition: { duration: 4, repeat: Infinity } } as TargetAndTransition}
            >
              {/* Stars pulsing */}
              <img src={imgSrc} className="w-full h-full object-contain p-4 md:p-8" />
            </motion.div>
            <motion.div 
              className="absolute inset-0 z-20 drop-shadow-2xl" 
              style={{ ...fgTransform, WebkitMaskImage: 'linear-gradient(315deg, black 50%, transparent 70%)' }}
              animate={floatAnim}
            >
              {/* Hand holding baby */}
              <img src={imgSrc} className="w-full h-full object-contain p-4 md:p-8" />
            </motion.div>
          </>
        );

      default: // Generic layered treatment for abstract organic shapes (Slide 04, 06, 10, 15, 17, 20)
        return (
          <>
            <motion.div className="absolute inset-0 z-0 opacity-50 blur-3xl scale-150" style={bgTransform}>
              <img src={imgSrc} className="w-full h-full object-contain" />
            </motion.div>
            
            <motion.div 
              className="absolute inset-0 z-10" 
              style={{ ...midTransform, WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 40%, black 70%)' }}
              animate={{ rotate: [0, 2, 0], transition: { duration: 15, repeat: Infinity } } as TargetAndTransition}
            >
              <img src={imgSrc} className="w-full h-full object-contain p-4 md:p-8" />
            </motion.div>
            
            <motion.div 
              className="absolute inset-0 z-20 drop-shadow-2xl" 
              style={{ ...fgTransform, WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 80%)' }}
              animate={{ scale: [1, 1.02, 1], transition: { duration: 8, repeat: Infinity } } as TargetAndTransition}
            >
              <img src={imgSrc} className="w-full h-full object-contain p-4 md:p-8" />
            </motion.div>
          </>
        );
    }
  };

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
      style={{ opacity: ambientOpacity }}
    >
      {renderComposition()}
    </motion.div>
  );
}
