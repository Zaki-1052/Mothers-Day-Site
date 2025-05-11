// /src/components/Header.jsx
// Purpose: Animated, playful, and accessible "Happy Mother's Day!" header for the carousel app

import React from 'react';
import { motion } from 'framer-motion';

// Animation variants for entrance and looping effect with persistence
const headerVariants = {
  initial: { scale: 0.8, opacity: 0, y: -40 },
  animate: {
    scale: [1, 1.05, 1.05, 1.05, 1.05, 1.05, 1],
    opacity: [0, 1, 1, 1, 1, 1, 1],
    y: 0,
    color: [
      "#a78bfa", // light purple
      "#7c3aed", // deep purple
      "#7c3aed", // stay at deep purple
      "#7c3aed", // stay at deep purple
      "#7c3aed", // stay at deep purple
      "#c4b5fd", // pastel purple
      "#a78bfa"
    ],
    transition: {
      duration: 8, // Longer duration to accommodate the persistence
      times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1], // Control timing of keyframes to maintain stable state
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
      color: { duration: 8, times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1], repeat: Infinity, repeatType: "loop" }
    }
  }
};

// Animation for decorative elements
const decorationVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      delay: 0.5,
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const Header = () => (
  <header className="w-full flex flex-col items-center mt-4 sm:mt-6 md:mt-8 mb-2 sm:mb-4 select-none relative">
    {/* Decorative elements */}
    <motion.div 
      className="absolute -left-4 top-2 md:left-1/4 md:-top-4"
      variants={decorationVariants}
      initial="initial"
      animate="animate"
      aria-hidden="true"
    >
      <div className="text-purple-300 text-4xl transform rotate-12">✿</div>
    </motion.div>
    
    <motion.div 
      className="absolute -right-2 top-4 md:right-1/4 md:-top-2"
      variants={decorationVariants}
      initial="initial"
      animate="animate"
      custom={1}
      aria-hidden="true"
    >
      <div className="text-purple-400 text-3xl transform -rotate-6">❀</div>
    </motion.div>
    
    <motion.h1
      className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center font-sans"
      variants={headerVariants}
      initial="initial"
      animate="animate"
      aria-label="Happy Mother's Day!"
      tabIndex={0}
      style={{
        textShadow: "0 2px 12px #e9d5ff, 0 1px 0 #fff",
        letterSpacing: "0.04em",
        lineHeight: 1.1,
      }}
    >
      Happy Mother's Day!
    </motion.h1>
    
    {/* Additional decorative elements */}
    <motion.div 
      className="w-32 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full mt-4"
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 128, opacity: 0.6 }}
      transition={{ delay: 0.8, duration: 1 }}
      aria-hidden="true"
    />
  </header>
);

export default Header;