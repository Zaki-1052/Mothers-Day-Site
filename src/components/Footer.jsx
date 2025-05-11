// /src/components/Footer.jsx
// Purpose: Prominent, always-visible "LOVE, ZAKI!" footer in blue, accessible and responsive

import React from 'react';
import { motion } from 'framer-motion';

// Animation variants for the footer text
const footerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2
    }
  }
};

// Animation for the decorative hearts
const heartVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: index => ({
    scale: 1, 
    opacity: [0, 1, 0.8],
    y: [0, -10, 0],
    transition: {
      duration: 2,
      delay: 0.3 + (index * 0.2),
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    }
  })
};

const Footer = () => (
  <footer
    className="w-full flex flex-col items-center justify-center py-6 mt-2 mb-4 select-none sticky bottom-0"
    aria-label="Footer: Love, Zaki"
  >
    {/* Decorative elements */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-blue-200"
        style={{ 
          left: `${25 + (i * 25)}%`,
          bottom: `${70 + (i % 2) * 20}%`,
          fontSize: `${16 + (i * 4)}px`
        }}
        variants={heartVariants}
        initial="initial"
        animate="animate"
        custom={i}
        aria-hidden="true"
      >
        ❤
      </motion.div>
    ))}
    
    <motion.div
      className="flex flex-col items-center"
      variants={footerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-600 drop-shadow-lg tracking-wide"
        style={{
          letterSpacing: "0.06em",
          textShadow: "0 2px 12px #bae6fd, 0 1px 0 #fff",
          lineHeight: 1.1,
        }}
        tabIndex={0}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        LOVE, <motion.span 
          className="text-blue-700"
          whileHover={{ 
            scale: 1.1,
            color: "#1d4ed8",
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
        >ZAKI!</motion.span>
      </motion.div>
      
      <motion.div 
        className="mt-2 text-xs text-blue-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.8 }}
      >
        Made with ❤️ for Mother's Day
      </motion.div>
    </motion.div>
  </footer>
);

export default Footer;