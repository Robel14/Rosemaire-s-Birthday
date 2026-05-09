import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PillButton from '../components/PillButton';

const Watcher = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl text-center"
      >
        <h2 className="text-3xl md:text-5xl text-theme-redGlow font-matrix mb-12 leading-relaxed drop-shadow-[0_0_10px_rgba(255,26,26,0.8)] animate-pulse">
          "I know you are a player… go back and choose player!"
        </h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <PillButton color="green" onClick={() => navigate('/')}>
            Return Home
          </PillButton>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Watcher;
