# Mother's Day Carousel - Frontend

This is the frontend for the Mother's Day Carousel application, a full-stack web application for generating and sharing animated, themed "Happy Mother's Day!" cards using OpenAI's GPT-4 and image generation APIs.

## Technology Stack

- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **API Communication**: Axios
- **Development**: ESLint, Autoprefixer, PostCSS

## Project Structure

```
src/
├── assets/                 # Static assets like SVGs, images
├── components/             # Reusable React components
│   ├── Card.jsx            # Card component for displaying generated images
│   ├── Carousel.jsx        # Main carousel with navigation
│   ├── Footer.jsx          # Footer with "LOVE, ZAKI!" branding
│   └── Header.jsx          # Animated header
├── styles/                 # CSS and styling related files
│   └── tailwind.config.js  # Tailwind configuration (alternative)
├── App.css                 # App-specific styles
├── App.jsx                 # Main application component
├── index.css               # Global styles and Tailwind imports
├── index.html              # HTML entry point
├── main.jsx                # React entry point
├── postcss.config.js       # PostCSS configuration for Tailwind
├── tailwind.config.js      # Main Tailwind configuration
└── vite.config.js          # Vite configuration with API proxy
```

## Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

## Frontend Features

- **Interactive Carousel**: Navigate through themed cards
- **AI Image Generation**: Generate AI images via backend API
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Animations**: Smooth transitions and effects
- **Accessibility**: Keyboard navigation, ARIA labels

## API Integration

The frontend communicates with the backend through these endpoints:

- `GET /api/themes`: Retrieves available themes
- `POST /api/generate-prompt`: Generates a text prompt for a theme
- `POST /api/generate-image`: Creates an image from a prompt
- `/images/:filename`: Serves generated images

## Environment Variables

Create a `.env` file in the root directory with:

```
# API Base URL (default is same origin due to proxy configuration)
VITE_API_BASE=

# Enable debugging (optional)
VITE_DEBUG=false
```