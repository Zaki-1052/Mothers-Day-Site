// /src/components/Carousel.jsx
// Purpose: Carousel UI for themed Mother's Day cards, navigation, generate/download, and responsive layout

import React from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import Card from './Card';

// Carousel navigation and action button styles with enhanced interactions
const buttonClass =
  "rounded-full bg-purple-200 hover:bg-purple-300 text-purple-800 font-bold px-4 py-2 m-2 shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 hover:shadow-md";

// Enhanced responsive flex container for carousel
const containerClass =
  "flex flex-col sm:flex-row items-center justify-center w-full max-w-2xl py-4 px-2 sm:px-4 md:px-0";

// Card animation variants for framer-motion with enhanced transitions
const cardVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
    rotateY: direction > 0 ? 30 : -30,
    position: 'absolute',
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    position: 'relative',
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.5 },
      scale: { type: "spring", stiffness: 300, damping: 30 },
      rotateY: { type: "spring", stiffness: 300, damping: 30 }
    }
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
    rotateY: direction < 0 ? 30 : -30,
    position: 'absolute',
  }),
};

const Carousel = ({
  cards,
  index,
  onNext,
  onPrev,
  onGenerate,
  onDownload,
  loading,
  error,
  theme,
}) => {
  // Track direction for animation (optional, could be improved)
  const [direction, setDirection] = React.useState(0);

  // Update direction on navigation
  const handlePrev = () => {
    setDirection(-1);
    onPrev();
  };
  const handleNext = () => {
    setDirection(1);
    onNext();
  };

  // Keyboard navigation: left/right arrows, Enter for generate
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (loading) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Enter') onGenerate();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line
  }, [loading, index]);

  // Current card data
  const card = cards[index] || {};

  return (
    <section className={containerClass} aria-label="Mother's Day Card Carousel">
      {/* Left Arrow - more touch-friendly on mobile */}
      <Motion.button
        className={`${buttonClass} min-w-[44px] min-h-[44px] flex items-center justify-center`}
        onClick={handlePrev}
        disabled={index === 0 || loading}
        aria-label="Previous card"
        tabIndex={0}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-lg sm:text-xl">&#8592;</span>
      </Motion.button>

      {/* Card with enhanced animation */}
      <div className="relative w-full max-w-xs sm:max-w-sm md:w-96 h-[380px] sm:h-[420px] flex items-center justify-center mx-2 perspective-1000">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <Motion.div
            key={index}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.5
            }}
            className="w-full h-full transform-style-3d"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px"
            }}
          >
            <Card
              card={card}
              loading={loading}
              error={error}
              theme={theme}
            />
          </Motion.div>
        </AnimatePresence>

        {/* Theme indicator */}
        {theme && (
          <Motion.div
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-purple-100 px-3 py-1 rounded-full text-sm text-purple-600 font-medium shadow-sm hidden sm:block"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            key={`theme-${index}`}
          >
            {theme}
          </Motion.div>
        )}
      </div>

      {/* Right Arrow - more touch-friendly on mobile */}
      <Motion.button
        className={`${buttonClass} min-w-[44px] min-h-[44px] flex items-center justify-center`}
        onClick={handleNext}
        disabled={index === cards.length - 1 || loading}
        aria-label="Next card"
        tabIndex={0}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-lg sm:text-xl">&#8594;</span>
      </Motion.button>

      {/* Action Buttons with enhanced interactions */}
      <div className="flex flex-row sm:flex-col items-center justify-center mt-4 sm:mt-0 sm:ml-4">
        <Motion.button
          className={buttonClass + " bg-purple-500 text-white hover:bg-purple-600"}
          onClick={onGenerate}
          disabled={loading}
          aria-label="Generate card"
          tabIndex={0}
          whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(124, 58, 237, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {loading ? (
            <span className="flex items-center">
              <Motion.svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </Motion.svg>
              Generating...
            </span>
          ) : (
            <>✨ Generate</>
          )}
        </Motion.button>
        <Motion.button
          className={buttonClass + " bg-blue-500 text-white hover:bg-blue-600"}
          onClick={onDownload}
          disabled={loading || !card.imageDownloadUrl}
          aria-label="Download card image"
          tabIndex={0}
          whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(37, 99, 235, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          💾 Download
        </Motion.button>
      </div>
    </section>
  );
};

export default Carousel;
