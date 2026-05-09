/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          red: '#8a0303',       // Blood red
          redGlow: '#ff1a1a',   // Brighter red for glow
          green: '#4b5320',     // Army green
          greenGlow: '#7da026', // Brighter army green for glow
          dark: '#0a0a0a',      // Very dark background
          black: '#000000',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        matrix: ['"Inter"', 'sans-serif'], // Keep clean for this theme
      },
      boxShadow: {
        'glow-green': '0 0 15px rgba(125, 160, 38, 0.6), 0 0 30px rgba(125, 160, 38, 0.4)',
        'glow-red': '0 0 15px rgba(255, 26, 26, 0.6), 0 0 30px rgba(255, 26, 26, 0.4)',
      }
    },
  },
  plugins: [],
}
