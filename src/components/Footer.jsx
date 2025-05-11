// /src/components/Footer.jsx
// Purpose: Prominent, always-visible "LOVE, ZAKI!" footer in blue, accessible and responsive

import React from 'react';

const Footer = () => (
  <footer
    className="w-full flex flex-col items-center justify-center py-6 mt-8 select-none"
    aria-label="Footer: Love, Zaki"
  >
    <div
      className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-600 drop-shadow-lg tracking-wide"
      style={{
        letterSpacing: "0.06em",
        textShadow: "0 2px 12px #bae6fd, 0 1px 0 #fff",
        lineHeight: 1.1,
      }}
      tabIndex={0}
    >
      LOVE, <span className="text-blue-700">ZAKI!</span>
    </div>
  </footer>
);

export default Footer;
