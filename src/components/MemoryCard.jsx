import React from 'react';
import { motion } from 'framer-motion';

const MemoryCard = ({ imageSrc, quote, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="bg-theme-dark border border-theme-green/30 p-4 rounded-xl shadow-[0_4px_20px_rgba(75,83,32,0.3)] hover:shadow-[0_4px_30px_rgba(75,83,32,0.5)] transition-shadow duration-300 group"
    >
      <div className="relative overflow-hidden rounded-lg mb-4 aspect-square bg-black/50">
        {imageSrc ? (
          <img 
            src={imageSrc} 
            alt="Memory" 
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-theme-green/40 border-2 border-dashed border-theme-green/20">
            Memory Image
          </div>
        )}
        <div className="absolute inset-0 bg-theme-green mix-blend-overlay opacity-10 group-hover:opacity-0 transition-opacity duration-500"></div>
      </div>
      <p className="text-theme-greenGlow text-center font-medium italic tracking-wide">
        "{quote}"
      </p>
    </motion.div>
  );
};

export default MemoryCard;
