// /src/components/Header.jsx
// Purpose: Animated, playful, and accessible "Happy Mother’s Day!" header for the carousel app

import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

// Animation variants for entrance and looping effect
const headerVariants = {
  initial: { scale: 0.8, opacity: 0, y: -40 },
  animate: {
    scale: [1, 1.08, 1],
    opacity: 1,
    y: 0,
    color: [
      "#a78bfa", // light purple
      "#7c3aed", // deep purple
      "#c4b5fd", // pastel purple
      "#a78bfa"
    ],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
      color: { duration: 2.5, repeat: Infinity, repeatType: "loop" }
    }
  }
};

const Header = () => (
  <header className="w-full flex flex-col items-center mt-8 mb-4 select-none">
    <motion.h1
      className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center font-sans"
      variants={headerVariants}
      initial="initial"
      animate="animate"
      aria-label="Happy Mother’s Day!"
      tabIndex={0}
      style={{
        textShadow: "0 2px 12px #e9d5ff, 0 1px 0 #fff",
        letterSpacing: "0.04em",
        lineHeight: 1.1,
      }}
    >
      Happy Mother’s Day!
    </motion.h1>
  </header>
);

export default Header;
