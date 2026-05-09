import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Character set
    const textStr = "Happy birthday Rosemaire!   ";
    const characters = textStr.split('');

    const fontSize = 18;
    const columns = Math.floor(canvas.width / fontSize);

    // Start all drops at 0 to make them go down uniformly
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      // Dark background with slight opacity for trailing effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = 'bold ' + fontSize + 'px "Inter", monospace';

      for (let i = 0; i < drops.length; i++) {
        // Find the character for this column to spell the phrase horizontally
        const charIndex = i % characters.length;
        const text = characters[charIndex];

        // "Happy birthday " has 15 characters (index 0 to 14)
        // "Rosemaire!" has 10 characters (index 15 to 24)
        const isRed = charIndex >= 15 && charIndex <= 24;
        
        ctx.fillStyle = isRed ? '#8a0303' : '#4b5320';

        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to 0 randomly to create the continuous falling effect
        // Since we want them to go down "equal", they all hit the bottom at the same time and reset
        if (drops[i] * fontSize > canvas.height) {
            drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }
    };

    // Make it very slow by increasing the interval duration
    const interval = setInterval(draw, 100);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-theme-dark"
    />
  );
};

export default MatrixBackground;
