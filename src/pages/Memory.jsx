import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PillButton from '../components/PillButton';
import { Plus, X, Video, FileText, Download } from 'lucide-react';

const Memory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [localUploads, setLocalUploads] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`uploads_${id}`);
    if (saved) {
      try {
        setLocalUploads(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved uploads", e);
      }
    }
  }, [id]);

  // Save to localStorage when localUploads change
  useEffect(() => {
    if (localUploads.length > 0) {
      localStorage.setItem(`uploads_${id}`, JSON.stringify(localUploads));
    }
  }, [localUploads, id]);

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

  // Define memory content and images
  const memoryTitle = id.replace(/-/g, ' ');
  
  const memoryData = {
    "aloha": {
        "path": "/memories/aloha/",
        "files": [
            "photo_1_2026-05-09_23-40-03.jpg",
            "photo_2_2026-05-09_23-40-03.jpg"
        ]
    },
    "august-18-2018": {
        "path": "/memories/august-18-2018/",
        "files": []
    },
    "december-24-2024": {
        "path": "/memories/december-24-2024/",
        "files": []
    },
    "fictions": {
        "path": "/memories/fictions/",
        "files": [
            "1.jpg.jpg"
        ]
    },
    "hair-color": {
        "path": "/memories/hair-color/",
        "files": [
            "1.jpg.jpg",
            "2.jpg.jpg"
        ]
    },
    "house-visits": {
        "path": "/memories/house-visits/",
        "files": [
            "1.jpg",
            "2.jpg",
            "3.jpg",
            "4.jpg"
        ]
    },
    "nights-out": {
        "path": "/memories/nights-out/",
        "files": []
    },
    "oldie-but-goldie": {
        "path": "/memories/oldie-but-goldie/",
        "files": [
            "photo_10_2026-05-09_23-43-54.jpg",
            "photo_11_2026-05-09_23-43-54.jpg",
            "photo_12_2026-05-09_23-43-54.jpg",
            "photo_13_2026-05-09_23-43-54.jpg",
            "photo_14_2026-05-09_23-43-54.jpg",
            "photo_15_2026-05-09_23-43-54.jpg",
            "photo_16_2026-05-09_23-43-54.jpg",
            "photo_17_2026-05-09_23-43-54.jpg",
            "photo_18_2026-05-09_23-43-54.jpg",
            "photo_3_2026-05-09_23-43-54.jpg",
            "photo_4_2026-05-09_23-43-54.jpg",
            "photo_5_2026-05-09_23-43-54.jpg",
            "photo_6_2026-05-09_23-43-54.jpg",
            "photo_7_2026-05-09_23-43-54.jpg",
            "photo_8_2026-05-09_23-43-54.jpg",
            "photo_9_2026-05-09_23-43-54.jpg"
        ]
    },
    "rule-23": {
        "path": "/memories/rule-23/",
        "files": [
            "photo_1_2026-05-09_23-43-54.jpg",
            "photo_2_2026-05-09_23-43-54.jpg"
        ]
    },
    "tiktoker-era": {
        "path": "/memories/tiktoker-era/",
        "files": [
            "1.mp4",
            "2.mp4",
            "3.mp4"
        ]
    }
};

  const currentMemory = memoryData[id];
  let staticImages = [];
  if (currentMemory) {
    if (currentMemory.files) {
      staticImages = currentMemory.files.map(file => `${currentMemory.path}${file}`);
    } else {
      staticImages = Array.from({ length: currentMemory.count || 0 }, (_, i) => `${currentMemory.path}${i + 1}.jpg`);
    }
  }

  const allImages = [...staticImages, ...localUploads];

  const goToNext = (e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % allImages.length);
  };

  const goToPrev = (e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'Escape') setSelectedIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, allImages.length]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalUploads(prev => [...prev, {
          data: reader.result,
          type: file.type,
          name: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const getFileType = (item) => {
    if (typeof item === 'string') {
      const lower = item.toLowerCase();
      if (lower.match(/\.(jpg|jpeg|png|gif|webp)$/) || item.startsWith('data:image/')) return 'image';
      if (lower.match(/\.(mp4|webm|ogg)$/) || item.startsWith('data:video/')) return 'video';
      return 'image'; // Default for static paths
    }
    if (item.type?.startsWith('image/')) return 'image';
    if (item.type?.startsWith('video/')) return 'video';
    return 'file';
  };

  const getFileUrl = (item) => typeof item === 'string' ? item : item.data;
  const getFileName = (item) => typeof item === 'string' ? item.split('/').pop() : item.name;


  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center py-16 px-4 relative z-10"
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*,video/*,.pdf,.doc,.docx,.txt" 
        multiple
        onChange={handleFileUpload}
      />

      <motion.h2 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-5xl text-theme-greenGlow font-bold mb-12 drop-shadow-[0_0_10px_rgba(125,160,38,0.8)] capitalize text-center"
      >
        {memoryTitle}
      </motion.h2>

      <div className="w-full max-w-6xl">
        <div className="flex justify-center mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerUpload}
            className="flex items-center gap-3 px-8 py-4 bg-theme-greenGlow/10 border-2 border-theme-greenGlow/30 text-theme-greenGlow rounded-full font-matrix hover:bg-theme-greenGlow/20 transition-all group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            Add File
          </motion.button>
        </div>

        {allImages.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 mb-16">
            {allImages.map((item, index) => {
              const type = getFileType(item);
              const url = getFileUrl(item);
              const name = getFileName(item);
              
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  onClick={() => setSelectedIndex(index)}
                  className="relative group overflow-hidden rounded-2xl border-2 border-theme-greenGlow/30 break-inside-avoid cursor-pointer bg-black/20"
                >
                  {type === 'image' ? (
                    <img 
                      src={url} 
                      alt={name} 
                      className="w-full h-auto object-contain transition-all duration-500 group-hover:scale-105"
                    />
                  ) : type === 'video' ? (
                    <div className="relative">
                      <video 
                        src={url} 
                        className="w-full h-auto object-contain"
                        muted
                        loop
                        playsInline
                        onMouseOver={(e) => e.target.play()}
                        onMouseOut={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                      />
                      <div className="absolute top-4 right-4 bg-black/60 p-2 rounded-full border border-theme-greenGlow/30">
                        <Video className="w-5 h-5 text-theme-greenGlow" />
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 flex flex-col items-center justify-center gap-4 min-h-[200px]">
                      <FileText className="w-16 h-16 text-theme-greenGlow/40" />
                      <span className="text-theme-greenGlow/60 font-matrix text-center text-sm truncate w-full px-4">
                        {name}
                      </span>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-theme-greenGlow/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-theme-greenGlow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-theme-greenGlow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-4xl mx-auto w-full aspect-video bg-theme-greenGlow/5 border-2 border-theme-greenGlow/30 rounded-2xl flex items-center justify-center relative overflow-hidden group mb-16"
          >
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
        )}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedIndex(null)}
              className="absolute top-8 right-8 text-theme-greenGlow/60 hover:text-theme-greenGlow transition-colors p-2 z-50"
            >
              <X className="w-10 h-10" />
            </motion.button>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-theme-greenGlow/40 hover:text-theme-greenGlow transition-colors p-4 z-50"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-theme-greenGlow/40 hover:text-theme-greenGlow transition-colors p-4 z-50"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {selectedIndex !== null && (() => {
              const item = allImages[selectedIndex];
              const type = getFileType(item);
              const url = getFileUrl(item);
              const name = getFileName(item);

              return (
                <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                  {type === 'image' ? (
                    <motion.img
                      key={`img-${selectedIndex}`}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      src={url}
                      alt={name}
                      className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-[0_0_50px_rgba(125,160,38,0.3)]"
                    />
                  ) : type === 'video' ? (
                    <motion.video
                      key={`vid-${selectedIndex}`}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      src={url}
                      controls
                      autoPlay
                      className="max-w-full max-h-[80vh] rounded-lg shadow-[0_0_50px_rgba(125,160,38,0.3)]"
                    />
                  ) : (
                    <motion.div
                      key={`file-${selectedIndex}`}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-theme-greenGlow/5 border-2 border-theme-greenGlow/20 p-12 rounded-3xl backdrop-blur-xl flex flex-col items-center gap-8 max-w-lg w-full"
                    >
                      <FileText className="w-32 h-32 text-theme-greenGlow/40" />
                      <div className="text-center">
                        <h3 className="text-2xl text-theme-greenGlow font-matrix mb-2">{name}</h3>
                        <p className="text-theme-greenGlow/40 text-sm mb-8">File storage in browser limited to this session</p>
                        <a 
                          href={url} 
                          download={name}
                          className="inline-flex items-center gap-3 px-8 py-4 bg-theme-greenGlow text-black rounded-full font-bold hover:bg-theme-greenGlow/80 transition-all"
                        >
                          <Download className="w-5 h-5" />
                          Download File
                        </a>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
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


