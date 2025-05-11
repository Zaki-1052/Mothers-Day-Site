// /src/components/Card.jsx
// Purpose: Display themed Mother's Day card image, prompt/caption, download button, and handle loading/error states

import React from 'react';
import { motion } from 'framer-motion';

// Spinner for loading state with improved animation
const Spinner = () => (
  <div className="flex flex-col items-center justify-center h-full py-8">
    <motion.svg 
      className="w-16 h-16 text-purple-500" 
      viewBox="0 0 24 24"
      initial={{ opacity: 0.6 }}
      animate={{ 
        opacity: [0.6, 1, 0.6],
        rotate: 360,
        scale: [1, 1.1, 1]
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity,
        ease: "easeInOut" 
      }}
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <motion.path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8v8z" 
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </motion.svg>
    <motion.span 
      className="text-purple-500 font-semibold mt-4 text-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      Creating your card...
    </motion.span>
    <motion.div 
      className="text-purple-400 text-sm mt-2 text-center max-w-xs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      Generating an AI image just for you!
    </motion.div>
  </div>
);

// Error message for error state
const ErrorMessage = ({ error }) => (
  <motion.div 
    className="flex flex-col items-center justify-center h-full p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <svg className="w-12 h-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span className="text-red-600 font-semibold text-lg text-center">{error}</span>
    <p className="text-purple-500 mt-4 text-sm text-center">
      Please try again or select a different theme.
    </p>
  </motion.div>
);

// Empty state for cards not yet generated
const EmptyState = ({ theme }) => (
  <motion.div
    className="flex flex-col items-center justify-center h-full p-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-purple-300 text-6xl mb-4">✿</div>
    <div className="text-purple-400 font-medium text-center mb-2">
      {theme ? `"${theme}"` : "No card yet"}
    </div>
    <div className="text-purple-300 text-base text-center">
      Click "Generate" to create a beautiful card!
    </div>
  </motion.div>
);

const Card = ({ card, loading, error, theme }) => {
  // Destructure card data
  const { imageUrl, prompt, imageDownloadUrl } = card || {};

  // Responsive card container
  const cardClass =
    "bg-white rounded-2xl shadow-xl flex flex-col items-center justify-between w-full h-full p-6 transition-all duration-300 mx-auto max-w-md border border-purple-100";

  // Image container for aspect ratio
  const imageContainerClass =
    "w-full h-80 flex items-center justify-center mb-4 overflow-hidden rounded-xl bg-purple-50";

  // Caption/prompt styling
  const captionClass =
    "mt-2 text-center text-sm sm:text-base md:text-lg font-medium text-purple-800 max-h-[100px] sm:max-h-[120px] px-2 sm:px-4 py-2 overflow-y-auto";

  // Download button styling
  const downloadButtonClass =
    "mt-4 px-4 py-2 rounded bg-blue-500 text-white font-bold shadow hover:bg-blue-600 transition duration-200 disabled:opacity-50 transform hover:scale-105 active:scale-95";

  // Card animation
  const cardAnimationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  // Render logic
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <motion.div 
      className={cardClass} 
      tabIndex={0}
      aria-label={`Mother's Day card for ${theme || 'selected theme'}`}
      {...cardAnimationProps}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.1), 0 10px 10px -5px rgba(124, 58, 237, 0.04)" }}
    >
      <div className={imageContainerClass}>
        {imageUrl ? (
          <motion.img
            src={imageUrl}
            alt={`Happy Mother's Day card for ${theme || 'selected theme'}`}
            className="object-contain w-full h-full"
            draggable={false}
            loading="lazy"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <EmptyState theme={theme} />
        )}
      </div>
      <motion.div
        className={captionClass}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="bg-purple-50 p-3 rounded-lg border border-purple-200 shadow-sm">
          {prompt || <span className="text-purple-300">No prompt yet. Click "Generate"!</span>}
        </div>
      </motion.div>
      {imageDownloadUrl && (
        <motion.a
          href={imageDownloadUrl}
          download={`mothers-day-card-${theme || 'image'}.png`}
          className={downloadButtonClass}
          aria-label="Download this Mother's Day card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Download Image
        </motion.a>
      )}
    </motion.div>
  );
};

export default Card;