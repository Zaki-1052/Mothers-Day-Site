// /src/components/Carousel.jsx
// Purpose: Carousel UI for themed Mother's Day cards, navigation, generate/download, and responsive layout

import React from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import Card from './Card';

// Carousel navigation and action button styles
const buttonClass =
  "rounded-full bg-purple-200 hover:bg-purple-300 text-purple-800 font-bold px-4 py-2 m-2 shadow transition disabled:opacity-50 disabled:cursor-not-allowed";

// Responsive flex container for carousel
const containerClass =
  "flex flex-col sm:flex-row items-center justify-center w-full max-w-2xl py-4";

// Card animation variants for framer-motion
const cardVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    position: 'absolute',
  }),
  center: {
    x: 0,
    opacity: 1,
    position: 'relative',
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
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
      {/* Left Arrow */}
      <button
        className={buttonClass}
        onClick={handlePrev}
        disabled={index === 0 || loading}
        aria-label="Previous card"
        tabIndex={0}
      >
        &#8592;
      </button>

      {/* Card with animation */}
      <div className="relative w-full sm:w-96 h-[420px] flex items-center justify-center mx-2">
        <AnimatePresence initial={false} custom={direction}>
          <Motion.div
            key={index}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full h-full"
          >
            <Card
              card={card}
              loading={loading}
              error={error}
              theme={theme}
            />
          </Motion.div>
        </AnimatePresence>
      </div>

      {/* Right Arrow */}
      <button
        className={buttonClass}
        onClick={handleNext}
        disabled={index === cards.length - 1 || loading}
        aria-label="Next card"
        tabIndex={0}
      >
        &#8594;
      </button>

      {/* Action Buttons */}
      <div className="flex flex-row sm:flex-col items-center justify-center mt-4 sm:mt-0 sm:ml-4">
        <button
          className={buttonClass + " bg-purple-500 text-white hover:bg-purple-600"}
          onClick={onGenerate}
          disabled={loading}
          aria-label="Generate card"
          tabIndex={0}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
        <button
          className={buttonClass + " bg-blue-500 text-white hover:bg-blue-600"}
          onClick={onDownload}
          disabled={loading || !card.imageDownloadUrl}
          aria-label="Download card image"
          tabIndex={0}
        >
          Download
        </button>
      </div>
    </section>
  );
};

export default Carousel;
