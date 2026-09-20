import React from 'react';
import { motion } from 'framer-motion';

export interface TextBubbleProps {
  variant: 'cloud-pink' | 'cloud-white' | 'cloud-dark' | 'caption' | 'caption-white';
  position: 'left' | 'right' | 'center' | 'bottom' | 'bottom-left';
  texts: string[];
  textColor?: string;
  fontSize?: string;
  className?: string;
}

export const TextBubble: React.FC<TextBubbleProps> = ({
  variant,
  position,
  texts,
  textColor,
  fontSize,
  className = '',
}) => {
  const isCaption = variant.startsWith('caption');
  
  let positionClasses = '';
  switch (position) {
    case 'left':
      positionClasses = 'self-start max-w-[45%] ml-[5%]';
      break;
    case 'right':
      positionClasses = 'self-end max-w-[45%] mr-[5%]';
      break;
    case 'center':
      positionClasses = 'self-center max-w-[70%]';
      break;
    case 'bottom':
      positionClasses = 'self-center max-w-[80%] mt-auto';
      break;
    case 'bottom-left':
      positionClasses = 'self-start max-w-[50%] ml-[3%] mt-auto';
      break;
  }

  let variantClasses = '';
  let styleClasses: React.CSSProperties = { fontFamily: "'Be Vietnam Pro', sans-serif" };
  
  if (variant === 'cloud-pink') {
    variantClasses = 'relative p-6 md:p-8 bg-gradient-to-br from-pink-100 to-pink-50 border-4 border-transparent bg-clip-padding rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-lg';
    styleClasses = { ...styleClasses, background: 'linear-gradient(135deg, #fce7f3, #fdf2f8) padding-box, linear-gradient(135deg, #ec4899, #db2777) border-box' };
  } else if (variant === 'cloud-white') {
    variantClasses = 'relative p-6 md:p-8 bg-white border-2 border-pink-100 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-md';
  } else if (variant === 'cloud-dark') {
    variantClasses = 'relative p-6 md:p-8 bg-[#0f1e3a] border-2 border-[#1e3a5f] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-md';
  } else if (variant === 'caption') {
    variantClasses = 'text-center p-4 bg-transparent';
  } else if (variant === 'caption-white') {
    variantClasses = 'text-center p-4 bg-transparent text-white';
  }

  const defaultFontSize = isCaption 
    ? 'text-2xl md:text-4xl' 
    : 'text-lg md:text-xl lg:text-2xl';

  const defaultTextColor = variant === 'cloud-dark' 
    ? 'text-gray-100' 
    : variant === 'caption-white' 
      ? 'text-white' 
      : 'text-gray-800';

  const finalTextColor = textColor || defaultTextColor;
  const finalFontSize = fontSize || defaultFontSize;

  return (
    <motion.div
      className={`flex flex-col ${positionClasses} ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
    >
      <div className={`${variantClasses} ${finalTextColor} ${finalFontSize}`} style={styleClasses}>
        {texts.map((text, i) => (
          <p key={i} className="mb-2 last:mb-0 leading-relaxed text-center">
            {text}
          </p>
        ))}
        {!isCaption && position === 'left' && (
          <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full" style={styleClasses} />
        )}
        {!isCaption && position === 'left' && (
          <div className="absolute -bottom-8 -left-8 w-4 h-4 rounded-full" style={styleClasses} />
        )}
        {!isCaption && position === 'right' && (
          <div className="absolute -bottom-4 -right-4 w-6 h-6 rounded-full" style={styleClasses} />
        )}
        {!isCaption && position === 'right' && (
          <div className="absolute -bottom-8 -right-8 w-4 h-4 rounded-full" style={styleClasses} />
        )}
      </div>
    </motion.div>
  );
};
