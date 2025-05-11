// /src/App.jsx
// Purpose: Main React container for the Mother's Day Carousel app, manages global state, API calls, and layout

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Carousel from './components/Carousel';
import Footer from './components/Footer';

// Maximum number of cards in the carousel
const MAX_CARDS = 12;

// Backend API base (adjust if needed)
const API_BASE = import.meta.env.VITE_API_BASE || '';

const App = () => {
  // State for available themes
  const [themes, setThemes] = useState([]);
  // State for carousel cards: { theme, prompt, imageUrl, imageDownloadUrl }
  const [cards, setCards] = useState(Array(MAX_CARDS).fill({}));
  // Current carousel index
  const [carouselIndex, setCarouselIndex] = useState(0);
  // Loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch themes on mount
  useEffect(() => {
    async function fetchThemes() {
      try {
        const res = await axios.get(`${API_BASE}/api/themes`);
        setThemes(res.data.themes.slice(0, MAX_CARDS));
        // Initialize cards with empty objects for each theme
        setCards(res.data.themes.slice(0, MAX_CARDS).map(() => ({})));
      } catch (err) {
        console.error('Failed to load themes:', err);
        setError('Failed to load themes.');
      }
    }
    fetchThemes();
  }, []);

  // Handler: go to next card
  const handleNext = () => {
    if (carouselIndex < themes.length - 1) {
      setCarouselIndex(carouselIndex + 1);
    }
  };

  // Handler: go to previous card
  const handlePrev = () => {
    if (carouselIndex > 0) {
      setCarouselIndex(carouselIndex - 1);
    }
  };

  // Handler: generate prompt and image for current card
  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    const theme = themes[carouselIndex];
    try {
      // 1. Generate prompt
      const promptRes = await axios.post(`${API_BASE}/api/generate-prompt`, { theme });
      const prompt = promptRes.data.prompt;
      // 2. Generate image
      const imageRes = await axios.post(`${API_BASE}/api/generate-image`, { prompt });
      const { imageUrl, imageDownloadUrl } = imageRes.data;
      // 3. Update cards array
      const newCards = [...cards];
      newCards[carouselIndex] = { theme, prompt, imageUrl, imageDownloadUrl };
      setCards(newCards);
    } catch (err) {
      console.error('Image generation failed:', err);
      setError('Failed to generate image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handler: download image for current card
  const handleDownload = () => {
    const card = cards[carouselIndex];
    if (!card || !card.imageDownloadUrl) return;
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = card.imageDownloadUrl;
    link.download = `mothers-day-card-${card.theme || 'image'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Enhanced responsive container styles
  const containerClass =
    "min-h-screen flex flex-col items-center justify-between bg-[#f7eac9] text-purple-800 px-4 sm:px-6 md:px-8 overflow-x-hidden";

  return (
    <div className={containerClass}>
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto flex flex-col items-center justify-center py-6 sm:py-8 md:py-12">
        {/* Error message for API issues */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 w-full max-w-lg rounded shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm leading-5 text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <Carousel
          cards={cards}
          index={carouselIndex}
          onNext={handleNext}
          onPrev={handlePrev}
          onGenerate={handleGenerate}
          onDownload={handleDownload}
          loading={loading}
          error={error}
          theme={themes[carouselIndex]}
        />

        {/* Theme indicator for small screens */}
        {themes[carouselIndex] && (
          <div className="mt-4 text-sm text-purple-700 font-medium sm:hidden">
            Theme: <span className="font-bold">{themes[carouselIndex]}</span>
            <span className="text-xs"> ({carouselIndex + 1}/{themes.length})</span>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;