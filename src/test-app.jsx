// /src/test-app.jsx
// Purpose: Simple test script to manually verify frontend component functionality

import React, { useState } from 'react';
import Header from './components/Header';
import Carousel from './components/Carousel';
import Card from './components/Card';
import Footer from './components/Footer';

// Mock data for testing
const mockThemes = [
  "preschool teacher", "author", "illustrator", "cake designer", "children's picture books",
  "student", "artist", "mother", "traveler", "foodie", "mentor", "early childhood educator"
];

const mockCards = [
  {
    theme: "preschool teacher",
    prompt: "A beautiful Mother's Day card celebrating preschool teachers",
    imageUrl: null,
    imageDownloadUrl: null
  },
  {
    theme: "author",
    prompt: "A creative Mother's Day card for an author mom",
    imageUrl: "https://via.placeholder.com/400x300/800080/FFFFFF?text=Author+Card",
    imageDownloadUrl: "https://via.placeholder.com/400x300/800080/FFFFFF?text=Author+Card"
  },
  {
    theme: "illustrator",
    prompt: "A vibrant Mother's Day card for an illustrator",
    imageUrl: "https://via.placeholder.com/400x300/6A0DAD/FFFFFF?text=Illustrator+Card",
    imageDownloadUrl: "https://via.placeholder.com/400x300/6A0DAD/FFFFFF?text=Illustrator+Card" 
  }
];

export function TestApp() {
  const [testIndex, setTestIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock handlers
  const handleNext = () => {
    if (testIndex < mockCards.length - 1) {
      setTestIndex(testIndex + 1);
    }
  };

  const handlePrev = () => {
    if (testIndex > 0) {
      setTestIndex(testIndex - 1);
    }
  };

  const handleGenerate = () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleDownload = () => {
    alert(`Downloading image for ${mockCards[testIndex].theme}`);
  };

  const handleSetError = () => {
    setError("This is a test error message");
    setTimeout(() => setError(null), 3000);
  };

  // Test container
  const containerClass = 
    "min-h-screen flex flex-col items-center justify-between bg-[#f7eac9] text-purple-800 px-2 sm:px-4";

  return (
    <div className={containerClass}>
      <div className="fixed top-0 left-0 bg-purple-800 text-white p-2 z-50">
        <h2 className="text-lg font-bold">Test Controls</h2>
        <button 
          onClick={() => setLoading(!loading)} 
          className="bg-purple-600 px-2 py-1 rounded mr-2">
          Toggle Loading
        </button>
        <button 
          onClick={handleSetError} 
          className="bg-red-600 px-2 py-1 rounded">
          Trigger Error
        </button>
      </div>

      <Header />
      
      <main className="flex-1 w-full flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4">Testing Carousel Component</h2>
        <Carousel
          cards={mockCards}
          index={testIndex}
          onNext={handleNext}
          onPrev={handlePrev}
          onGenerate={handleGenerate}
          onDownload={handleDownload}
          loading={loading}
          error={error}
          theme={mockCards[testIndex]?.theme}
        />

        <h2 className="text-xl font-bold my-8">Testing Individual Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Empty card */}
          <div className="w-72 h-96">
            <Card
              card={{}}
              loading={false}
              error={null}
              theme="empty card"
            />
          </div>

          {/* Card with image */}
          <div className="w-72 h-96">
            <Card
              card={mockCards[1]}
              loading={false}
              error={null}
              theme={mockCards[1].theme}
            />
          </div>

          {/* Loading card */}
          <div className="w-72 h-96">
            <Card
              card={mockCards[2]}
              loading={true}
              error={null}
              theme={mockCards[2].theme}
            />
          </div>

          {/* Error card */}
          <div className="w-72 h-96">
            <Card
              card={mockCards[0]}
              loading={false}
              error="Error loading card"
              theme={mockCards[0].theme}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default TestApp;