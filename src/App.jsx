import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MatrixBackground from './components/MatrixBackground';
import Home from './pages/Home';
import Watcher from './pages/Watcher';
import Hallway from './pages/Hallway';
import TheFirsts from './pages/TheFirsts';
import Memory from './pages/Memory';
import Finale from './pages/Finale';
import './App.css'; // Keep standard vite styles if needed, though mostly using tailwind

// Wrapper component to handle Framer Motion AnimatePresence with Routes
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/watcher" element={<Watcher />} />
        <Route path="/hallway" element={<Hallway />} />
        <Route path="/the-firsts" element={<TheFirsts />} />
        <Route path="/memory/:id" element={<Memory />} />
        <Route path="/finale" element={<Finale />} />
      </Routes>
    </AnimatePresence>
  );
};



function App() {
  const audioRef = useRef(null);

  // Auto-play the audio when component mounts. Note that many browsers
  // require user interaction first, so we use a fallback if it fails.
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.5; // Set volume to 50%
        audioRef.current.play().catch(error => {
          console.log("Audio autoplay failed due to browser restrictions. User interaction required first.");
          // Add click listener to document to start playing after first interaction
          const handleFirstInteraction = () => {
            if (audioRef.current) {
              audioRef.current.play();
            }
            document.removeEventListener('click', handleFirstInteraction);
          };
          document.addEventListener('click', handleFirstInteraction);
        });
      }
    };
    
    playAudio();
  }, []);

  return (
    <Router>
      <MatrixBackground />
      {/* 
        Using a placeholder URL for OneRepublic - I Lived or a generic background track.
        Because direct hotlinking of copyrighted mp3s is usually not reliable, 
        you should replace this src with a local file in your public directory (e.g., '/ilived.mp3')
      */}
      <audio 
        ref={audioRef} 
        src="/ilived.mp3" 
        loop 
        autoPlay
      />
      <div className="relative min-h-screen text-white overflow-hidden">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
