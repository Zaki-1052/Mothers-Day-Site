// /src/styles/tailwind.config.js
// Purpose: Tailwind CSS configuration for custom theme, colors, fonts, and responsive design

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Custom purple shades
        purple: {
          50:  "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          DEFAULT: "#7c3aed"
        },
        // Custom blue for "LOVE, ZAKI!"
        blue: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          DEFAULT: "#2563eb"
        },
        // Cream background
        cream: {
          DEFAULT: "#f7eac9"
        }
      },
      fontFamily: {
        // Playful, rounded font stack
        sans: [
          'Quicksand',
          'Poppins',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif'
        ]
      }
    }
  },
  plugins: [],
};
