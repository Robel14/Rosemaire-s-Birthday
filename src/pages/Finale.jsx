import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import PillButton from '../components/PillButton';

const Finale = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Brighter, more intense celebration
    const duration = 30 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      // Fire multiple bursts at once for more intensity
      const particleCount = 100 * (timeLeft / duration);
      
      // Vibrant color palette
      const colors = ['#7DA026', '#FF1A1A', '#FFD700', '#00FF00', '#FF00FF', '#00FFFF'];

      confetti({
        particleCount,
        spread: 70,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: colors,
        startVelocity: 45,
        gravity: 0.8,
        ticks: 200,
        scale: 1.2,
      });

      confetti({
        particleCount,
        spread: 70,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: colors,
        startVelocity: 45,
        gravity: 0.8,
        ticks: 200,
        scale: 1.2,
      });

      // Central burst
      if (Math.random() > 0.7) {
        confetti({
          particleCount: 150,
          spread: 160,
          origin: { x: 0.5, y: 0.5 },
          colors: colors,
          startVelocity: 60,
          gravity: 0.5,
        });
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-8 relative z-10 bg-black overflow-hidden"
    >
      {/* Matrix code falling in background subtly */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {/* We can reuse MatrixBackground here if we want, but keeping it clean for focus */}
      </div>

      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 1
        }}
        className="relative"
      >
        <motion.h1 
          animate={{ 
            textShadow: [
              "0 0 20px rgba(125,160,38,0.8)",
              "0 0 40px rgba(125,160,38,1)",
              "0 0 20px rgba(125,160,38,0.8)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl md:text-9xl text-theme-greenGlow font-matrix text-center drop-shadow-[0_0_30px_rgba(125,160,38,0.9)]"
        >
          Happy Birthday Rosemaire!
        </motion.h1>
        
        {/* Glow effect behind text */}
        <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-theme-greenGlow rounded-full scale-150"></div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="mt-8 text-xl md:text-2xl text-theme-greenGlow/60 font-matrix text-center"
      >
        A Celebration worthy of the Mother of Dragons!
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5 }}
        className="mt-16 flex flex-col sm:flex-row gap-8"
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
};

export default Finale;
