import React from 'react';
import { motion } from 'framer-motion';

const PillButton = ({ color = 'red', onClick, children, className = '' }) => {
  const isRed = color === 'red';
  
  const baseClasses = `
    relative overflow-hidden px-8 py-4 rounded-full font-bold text-xl tracking-wider
    transition-all duration-300 transform
    ${isRed ? 'text-theme-redGlow border-theme-red' : 'text-theme-greenGlow border-theme-green'}
    border-2
  `;

  // Glow shadow depending on the color
  const shadowClass = isRed ? 'shadow-[0_0_15px_rgba(255,26,26,0.6)] hover:shadow-[0_0_30px_rgba(255,26,26,0.8)]' : 'shadow-[0_0_15px_rgba(125,160,38,0.6)] hover:shadow-[0_0_30px_rgba(125,160,38,0.8)]';
  
  const bgHoverClass = isRed ? 'hover:bg-theme-red/10' : 'hover:bg-theme-green/10';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${shadowClass} ${bgHoverClass} ${className} bg-theme-dark/50 backdrop-blur-sm`}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default PillButton;
