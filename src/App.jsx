// /src/App.jsx
// Purpose: Main React container for the Mother's Day Carousel app, manages global state, API calls, and layout

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Carousel from './components/Carousel';
import Footer from './components/Footer';

// Tailwind styles are assumed to be imported globally

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

  // Responsive container styles
  const containerClass =
    "min-h-screen flex flex-col items-center justify-between bg-[#f7eac9] text-purple-800 px-2 sm:px-4";

  return (
    <div className={containerClass}>
      <Header />
      <main className="flex-1 w-full flex flex-col items-center justify-center">
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
      </main>
      <Footer />
    </div>
  );
};

export default App;
