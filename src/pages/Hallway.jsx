import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Door from '../components/Door';
import PillButton from '../components/PillButton';

const Hallway = () => {
  const navigate = useNavigate();

  const handleDoorClick = (id) => {
    const urlId = id.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
    if (urlId === 'the-firsts') {
      navigate('/the-firsts');
    } else {
      navigate(`/memory/${urlId}`);
    }
  };

  const doors = [
    { title: 'The Firsts' },
    { title: 'ALOHA' },
    { title: 'TikToker era' },
    { title: 'The ex\'s' },
    { title: 'Rule 23' },
    { title: 'oldie but goldie' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center py-16 p-8 relative z-10"
    >
      <div className="flex flex-wrap justify-center gap-12 max-w-6xl w-full mb-16">
        {doors.map((door, index) => (
          <motion.div 
            key={door.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
          >
            <Door id={door.title} onClick={handleDoorClick} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="flex flex-col sm:flex-row gap-6"
      >
        <PillButton color="green" onClick={() => navigate('/finale')}>
          Exit Hallway
        </PillButton>
        <PillButton color="red" onClick={() => navigate('/')}>
          Return Home
        </PillButton>
      </motion.div>
    </motion.div>
  );
};

export default Hallway;


