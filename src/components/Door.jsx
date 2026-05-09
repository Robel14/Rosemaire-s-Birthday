import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Door = ({ id, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
    // Wait for animation to finish before calling onClick to navigate
    setTimeout(() => {
      if (onClick) onClick(id);
    }, 800);
  };

  return (
    <div 
      className="relative w-48 h-80 perspective-[1000px] cursor-pointer"
      onClick={handleClick}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="w-full h-full border-4 border-theme-green bg-theme-dark relative flex items-center justify-center
                   shadow-[0_0_15px_rgba(125,160,38,0.5)] hover:shadow-[0_0_30px_rgba(125,160,38,0.8)]
                   transition-shadow duration-300 transform-gpu origin-left"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isOpen ? -95 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Door Knob */}
        <div className="absolute right-4 top-1/2 w-4 h-4 rounded-full bg-theme-greenGlow shadow-[0_0_5px_rgba(125,160,38,0.8)]" />
        
        {/* Door Design / Panels */}
        <div className="absolute inset-4 border border-theme-green/50 grid grid-rows-2 gap-4 p-4">
           <div className="border border-theme-green/30 w-full h-full"></div>
           <div className="border border-theme-green/30 w-full h-full"></div>
        </div>

        <span className="absolute top-8 text-theme-greenGlow font-bold text-xl drop-shadow-[0_0_5px_rgba(125,160,38,1)]">
          {id}
        </span>
      </motion.div>
      
      {/* Behind the door (Memory glow) */}
      <div className="absolute top-0 left-0 w-full h-full bg-theme-dark -z-10 flex items-center justify-center border-2 border-theme-green/20">
         <div className="w-1/2 h-1/2 bg-theme-greenGlow/20 blur-xl rounded-full animate-pulse" />
      </div>
    </div>
  );
};

export default Door;
