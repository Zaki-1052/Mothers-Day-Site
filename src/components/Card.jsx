// /src/components/Card.jsx
// Purpose: Display themed Mother's Day card image, prompt/caption, download button, and handle loading/error states

import React from 'react';

// Spinner for loading state
const Spinner = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <svg className="animate-spin h-10 w-10 text-purple-400 mb-2" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
    <span className="text-purple-500 font-semibold">Generating...</span>
  </div>
);

// Error message for error state
const ErrorMessage = ({ error }) => (
  <div className="flex flex-col items-center justify-center h-full">
    <span className="text-red-600 font-semibold">{error}</span>
  </div>
);

const Card = ({ card, loading, error, theme }) => {
  // Destructure card data
  const { imageUrl, prompt, imageDownloadUrl } = card || {};

  // Responsive card container
  const cardClass =
    "bg-white rounded-2xl shadow-lg flex flex-col items-center justify-between w-full h-full p-4 transition-all duration-300";

  // Image container for aspect ratio
  const imageContainerClass =
    "w-full h-64 flex items-center justify-center mb-2 overflow-hidden rounded-xl bg-purple-50";

  // Caption/prompt styling
  const captionClass =
    "mt-2 text-center text-base sm:text-lg font-medium text-purple-800 min-h-[48px]";

  // Download button styling
  const downloadButtonClass =
    "mt-4 px-4 py-2 rounded bg-blue-500 text-white font-bold shadow hover:bg-blue-600 transition disabled:opacity-50";

  // Render logic
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className={cardClass} tabIndex={0} aria-label={`Mother's Day card for ${theme || 'selected theme'}`}>
      <div className={imageContainerClass}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Happy Mother's Day card for ${theme || 'selected theme'}`}
            className="object-contain w-full h-full"
            draggable={false}
            loading="lazy"
          />
        ) : (
          <div className="text-purple-300 text-2xl font-bold">No image yet</div>
        )}
      </div>
      <div className={captionClass}>
        {prompt || <span className="text-purple-300">No prompt yet. Click "Generate"!</span>}
      </div>
      {imageDownloadUrl && (
        <a
          href={imageDownloadUrl}
          download={`mothers-day-card-${theme || 'image'}.png`}
          className={downloadButtonClass}
          aria-label="Download this Mother's Day card"
        >
          Download Image
        </a>
      )}
    </div>
  );
};

export default Card;
