import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PillButton from '../components/PillButton';

const Ifykyk = () => {
  const navigate = useNavigate();



  const doors = [
    { title: 'August 18 2018' },
    { title: 'December 24 2024' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center py-16 p-8 relative z-10"
    >
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-6xl text-theme-greenGlow font-matrix mb-16 drop-shadow-[0_0_15px_rgba(125,160,38,0.6)]"
      >
        IFYKYK
      </motion.h1>

      <div className="flex flex-col items-center gap-12 max-w-4xl w-full mb-16">
        {doors.map((door, index) => (
          <motion.div 
            key={door.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.3 + 0.3, duration: 0.8 }}
            className="w-full p-8 rounded-2xl bg-theme-greenGlow/5 border-2 border-theme-greenGlow/20 backdrop-blur-sm relative overflow-hidden group hover:border-theme-greenGlow/40 transition-all cursor-default"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-theme-greenGlow/20 group-hover:bg-theme-greenGlow/40 transition-colors" />
            <h3 className="text-2xl md:text-4xl text-theme-greenGlow font-matrix drop-shadow-[0_0_8px_rgba(125,160,38,0.4)]">
              {door.title}
            </h3>
            <div className="mt-4 w-24 h-1 bg-theme-greenGlow/20 group-hover:w-full transition-all duration-700" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="flex flex-col sm:flex-row gap-6"
      >
        <PillButton color="green" onClick={() => navigate('/the-firsts')}>
          Back to The Firsts
        </PillButton>
        <PillButton color="red" onClick={() => navigate('/')}>
          Return Home
        </PillButton>
      </motion.div>
    </motion.div>
  );
};

export default Ifykyk;
