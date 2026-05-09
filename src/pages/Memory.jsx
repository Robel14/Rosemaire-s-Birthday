import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PillButton from '../components/PillButton';

const Memory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Handle the special "the-ex's" route
  if (id === "the-ex's") {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10"
      >
        <motion.h2 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-3xl md:text-5xl text-theme-redGlow font-matrix mb-12 leading-relaxed drop-shadow-[0_0_10px_rgba(255,26,26,0.8)] text-center animate-pulse"
        >
          404 page not found cause we don't care about the past
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <PillButton color="green" onClick={() => navigate('/hallway')}>
            Return to Hallway
          </PillButton>
          <PillButton color="red" onClick={() => navigate('/')}>
            Return Home
          </PillButton>
        </motion.div>
      </motion.div>
    );
  }

  // Define the memory content
  const memoryTitle = id.replace(/-/g, ' ');
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center py-16 px-4 relative z-10"
    >
      <motion.h2 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-5xl text-theme-greenGlow font-bold mb-12 drop-shadow-[0_0_10px_rgba(125,160,38,0.8)] capitalize text-center"
      >
        {memoryTitle}
      </motion.h2>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="max-w-4xl w-full aspect-video bg-theme-greenGlow/5 border-2 border-theme-greenGlow/30 rounded-2xl flex items-center justify-center relative overflow-hidden group mb-16"
      >
        {/* 
          When images are provided, replace the div below with an <img> tag:
          <img src={`/memories/${id}.jpg`} alt={memoryTitle} className="w-full h-full object-cover" />
        */}
        <div className="text-theme-greenGlow/40 text-2xl font-matrix text-center p-8 border-2 border-dashed border-theme-greenGlow/20 rounded-xl">
          [ Image Placeholder for {memoryTitle} ]
          <br />
          <span className="text-sm mt-4 block">Waiting for Rosemaire's photos...</span>
        </div>
        
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-theme-greenGlow"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-theme-greenGlow"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-theme-greenGlow"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-theme-greenGlow"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="flex flex-col sm:flex-row gap-6"
      >
        <PillButton color="green" onClick={() => navigate(-1)}>
          Go Back
        </PillButton>

        <PillButton color="red" onClick={() => navigate('/')}>
          Return Home
        </PillButton>
      </motion.div>
    </motion.div>
  );
};

export default Memory;

