import React from 'react';
import { motion } from 'framer-motion';
import type { SceneConfig } from '../data/scenes';
import { TextBubble } from './TextBubble';
import { AnimatedImage } from './AnimatedImage';

interface SceneRendererProps {
  scene: SceneConfig;
  index: number;
}

export const SceneRenderer: React.FC<SceneRendererProps> = ({ scene }) => {
  const getTransitionVariants = () => {
    switch (scene.sceneTransition) {
      case 'slideUp':
        return {
          initial: { opacity: 0, y: 50 },
          whileInView: { opacity: 1, y: 0 },
        };
      case 'crossfade':
        return {
          initial: { opacity: 0.2 },
          whileInView: { opacity: 1 },
        };
      case 'fadeIn':
      default:
        return {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
        };
    }
  };

  const variants = getTransitionVariants();

  return (
    <motion.section
      id={scene.id}
      initial={variants.initial}
      whileInView={variants.whileInView}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden select-none"
      style={{
        backgroundColor: scene.backgroundColor,
        minHeight: scene.minHeight || '100vh',
      }}
    >
      {/* 16:9 / Fullscreen Stage Container */}
      <div className="relative w-full h-full min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12">
        {/* Main Background Image if available */}
        {scene.backgroundImage && (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
            <img
              src={`/images/${scene.backgroundImage}`}
              alt=""
              loading="lazy"
              className={`w-full h-full max-w-full max-h-full ${
                scene.backgroundSize === 'contain' ? 'object-contain' : 'object-cover'
              }`}
              style={{
                objectPosition: scene.backgroundPosition || 'center',
              }}
            />
          </div>
        )}

        {/* Dynamic Overlaid Graphic Layers */}
        {scene.layers && scene.layers.map((layer, idx) => (
          <div
            key={idx}
            className="absolute pointer-events-none"
            style={{
              left: layer.position.x,
              top: layer.position.y,
              width: layer.size.width,
              height: layer.size.height,
              zIndex: layer.zIndex,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <AnimatedImage
              src={layer.image}
              animation={layer.animation}
              delay={layer.delay}
              className="w-full h-full object-contain"
            />
          </div>
        ))}

        {/* Narrative Text Bubble */}
        {scene.textBubble && (
          <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col pointer-events-auto">
            <TextBubble
              variant={scene.textBubble.variant}
              position={scene.textBubble.position}
              texts={scene.textBubble.texts}
              textColor={scene.textBubble.textColor}
              fontSize={scene.textBubble.fontSize}
            />
          </div>
        )}
      </div>
    </motion.section>
  );
};
