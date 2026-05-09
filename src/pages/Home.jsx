import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PillButton from '../components/PillButton';

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10"
    >
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-theme-redGlow via-white to-theme-greenGlow drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          Choose Your Reality
        </h1>
        <p className="text-xl md:text-2xl text-theme-green tracking-widest uppercase">
          Happy Birthday Rosemaire!
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-center">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <PillButton color="red" onClick={() => navigate('/watcher')}>
            Watcher
          </PillButton>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <PillButton color="green" onClick={() => navigate('/hallway')}>
            Player
          </PillButton>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
