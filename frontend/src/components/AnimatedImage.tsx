import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

export interface AnimatedImageProps {
  src: string;
  alt?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'float';
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  objectFit?: 'cover' | 'contain' | 'fill';
  objectPosition?: string;
}

export const AnimatedImage: React.FC<AnimatedImageProps> = ({
  src,
  alt = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 0.8,
  className = '',
  style = {},
  objectFit = 'cover',
  objectPosition = 'center',
}) => {
  const getVariants = (): Variants => {
    const transition = {
      duration,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      delay,
    };

    switch (animation) {
      case 'slideUp':
        return {
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition },
        };
      case 'slideLeft':
        return {
          hidden: { opacity: 0, x: -60 },
          visible: { opacity: 1, x: 0, transition },
        };
      case 'slideRight':
        return {
          hidden: { opacity: 0, x: 60 },
          visible: { opacity: 1, x: 0, transition },
        };
      case 'scaleIn':
        return {
          hidden: { opacity: 0, scale: 0.85 },
          visible: { opacity: 1, scale: 1, transition },
        };
      case 'float':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: [0, -10, 0],
            transition: {
              opacity: { duration, delay },
              y: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: delay + duration,
              },
            },
          },
        };
      case 'fadeIn':
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition },
        };
    }
  };

  const variants = getVariants();
  const imgSrc = src.startsWith('/') ? `/images${src}` : `/images/${src}`;

  return (
    <motion.img
      src={imgSrc}
      alt={alt}
      className={className}
      loading="lazy"
      style={{
        objectFit,
        objectPosition,
        ...style,
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
    />
  );
};

export default AnimatedImage;
