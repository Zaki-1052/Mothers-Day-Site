# Mother's Day Carousel – Interactive AI Card Generator

A full-stack web application for generating and sharing animated, themed "Happy Mother's Day!" cards using OpenAI's GPT-4 and image generation APIs. The app features a responsive, animated React carousel, custom theming, and persistent image storage, with a focus on delightful user experience and robust engineering.

---

## Features

- **Interactive Carousel:** Flip through up to 12 themed, animated Mother's Day cards with smooth transitions.
- **AI-Generated Content:** Each card is created using OpenAI's GPT-4.1 for prompt generation and GPT-Image-1 (with DALL·E 3 fallback) for image creation.
- **Custom Themes:** Themes inspired by creative and nurturing roles (e.g., teacher, author, artist, cake designer, etc.).
- **Permanent Image Storage:** All generated images are saved to disk and can be downloaded.
- **Responsive Design:** Mobile-first, accessible, and visually engaging UI with Tailwind CSS and Framer Motion animations.
- **Personal Touch:** Prominent "LOVE, ZAKI!" branding and animated header with decorative elements.

---

## Tech Stack

- **Frontend:** React 19 (Vite), Tailwind CSS, Framer Motion, Axios
- **Backend:** Node.js, Express, OpenAI SDK, dotenv, axios, fs, path, crypto
- **Image Storage:** Local disk (configurable)
- **Testing:** Custom test scripts for both frontend and backend
- **Deployment:** Easily deployable to any Node.js-compatible server and static frontend host

---

## Directory Structure

```
project-root/
├── PROJECT_SUMMARY.md         # Overview of project implementation and features
├── server/
│   ├── index.js               # Express backend: API, OpenAI, image saving
│   ├── utils/
│   │   └── imageSaver.js      # Helper for saving images to disk
│   ├── test-api.js            # Backend API testing script
│   ├── README.md              # Backend-specific documentation
│   ├── images/                # Directory for generated images (auto-created)
│   └── .env                   # Backend environment variables
├── src/
│   ├── App.jsx                # Main React app container
│   ├── components/
│   │   ├── Header.jsx         # Animated header component
│   │   ├── Carousel.jsx       # Carousel with navigation and transitions
│   │   ├── Card.jsx           # Card display with loading/error states
│   │   └── Footer.jsx         # Animated footer component
│   ├── test-app.jsx           # Component testing framework
│   ├── test-main.jsx          # Entry point for test UI
│   ├── TESTING.md             # Testing documentation
│   ├── index.css              # Global styles
│   ├── main.jsx               # Main application entry point
│   └── .env                   # Frontend environment variables
└── README.md                  # This file
```

---

## Prerequisites

- **Node.js** v18 or v20 (recommended)
- **npm** v8 or v10
- **OpenAI API Key** (for GPT-4.1 and image generation)
- (Optional) [nvm](https://github.com/nvm-sh/nvm) for managing Node versions

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Zaki-1052/Mothers-Day-Site.git
cd mothers-day-carousel
```

### 2. Quick Start (Recommended)

We've included startup scripts to get both the backend and frontend running with a single command:

**On macOS/Linux:**
```bash
./start.sh
```

**On Windows:**
```bash
start.bat
```

These scripts will:
- Check if dependencies are installed, and install them if needed
- Start the backend server on port 3001
- Start the frontend development server on port 5173
- Open the necessary terminals/command prompts

### 3. Manual Setup

If you prefer to set up each part individually:

#### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory with your OpenAI API key and settings:

```
# Required OpenAI API key for GPT-4.1 and image generation
OPENAI_API_KEY=sk-...

# Port for Express server (default: 3001)
PORT=3001

# Directory to save generated images (relative to server root)
IMAGE_SAVE_PATH=./images

# Base URL path for serving images
BASE_IMAGE_URL=/images
```

Start the backend server:

```bash
npm start
```

#### Frontend Setup

```bash
cd ../src
npm install
```

Create a `.env` file in the src directory for frontend environment settings:

```
# API Base URL - leave empty for same-origin requests
VITE_API_BASE=

# Debug mode (optional)
VITE_DEBUG=false
```

Start the React dev server:

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) (or the port Vite shows).

---

## Usage

- **Browse Themes:** Navigate through themes using the carousel arrows.
- **Generate Cards:** Click the "Generate" button to create a new card for the current theme.
- **Download Images:** Save any generated card using the "Download" button.
- **Keyboard Navigation:** Use arrow keys for carousel navigation, Enter to generate.
- **Mobile Experience:** Fully responsive design works on all device sizes.

---

## Testing

### Backend Testing

The project includes a backend testing script that verifies API functionality:

```bash
cd server
node test-api.js
```

This tests:
- Theme retrieval
- Prompt generation
- Error handling

### Frontend Testing

A dedicated UI testing environment is available:

```bash
cd src
npm run test-ui
```

This provides:
- Component rendering tests
- Animation previews
- Responsive design testing
- State management verification

---

## Deployment

- **Frontend:**  
  Build for production:

  ```bash
  cd src
  npm run build
  ```

  Deploy the `dist/` directory to your static hosting provider.

- **Backend:**  
  Deploy the `server/` directory to your Node.js server or VM.  
  Ensure the `images/` directory is writable and persistent.

- **Proxy Configuration:**  
  The frontend includes proxy configuration in `vite.config.js` for local development.
  For production, configure Nginx to proxy `/api` and `/images` to the backend.

---

## Project Enhancements

The following improvements have been made to the original codebase:

1. **Project Structure:**
   - Organized code into logical directories
   - Fixed duplicate src folder issue
   - Added proper README files for each component

2. **Frontend Improvements:**
   - Enhanced animations with Framer Motion
   - Improved responsive design for all screen sizes
   - Added better loading and error states
   - Enhanced accessibility features

3. **Backend Enhancements:**
   - Added testing capabilities
   - Improved error handling
   - Added detailed documentation

4. **Developer Experience:**
   - Added testing tools
   - Improved environment configuration
   - Enhanced documentation
   - Added development proxies

---

## Troubleshooting & FAQ

- **Tailwind classes not working?**  
  The `tailwind.config.js` has been updated to include all relevant paths. Make sure `index.css` is imported in your entry point.

- **Image generation fails or times out?**  
  The backend automatically falls back to DALL·E 3 if GPT-Image-1 times out after 60 seconds.

- **API errors?**  
  The frontend has proxy configuration in `vite.config.js` for development. Check the console for specific error messages.

- **Images not saving?**  
  The `/server/images/` directory is created automatically if it doesn't exist.

- **Components not rendering correctly?**  
  Try the test UI (`npm run test-ui`) to isolate component issues.

---

## License

MIT License.  
See [LICENSE](LICENSE) for details.

---

## Credits

- Built by Zaki Alibhai, with inspiration from creative educators, artists, and the open-source community.
- Powered by [OpenAI](https://openai.com/) and modern web technologies.
- Enhanced and improved with Claude Code assistance.

---

**For questions, issues, or contributions, please open an issue or pull request on GitHub.**
