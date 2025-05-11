# Mother's Day Carousel – Interactive AI Card Generator

A full-stack web application for generating and sharing animated, themed "Happy Mother’s Day!" cards using OpenAI’s GPT-4 and image generation APIs. The app features a responsive, animated React carousel, custom theming, and persistent image storage, with a focus on delightful user experience and robust engineering.

---

## Features

- **Interactive Carousel:** Flip through up to 12 themed, animated Mother's Day cards.
- **AI-Generated Content:** Each card is created using OpenAI's GPT-4 for prompt generation and GPT-Image-1 (with DALL·E 3 fallback) for image creation.
- **Custom Themes:** Themes inspired by creative and nurturing roles (e.g., teacher, author, artist, cake designer, etc.).
- **Permanent Image Storage:** All generated images are saved to disk and can be downloaded.
- **Responsive Design:** Mobile-first, accessible, and visually engaging UI with Tailwind CSS.
- **Personal Touch:** Prominent "LOVE, ZAKI!" branding and animated header.

---

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Framer Motion, Axios
- **Backend:** Node.js, Express, OpenAI SDK, dotenv, axios, fs, path, crypto
- **Image Storage:** Local disk (configurable)
- **Deployment:** Easily deployable to any Node.js-compatible server and static frontend host

---

## Directory Structure

    project-root/
    ├── server/
    │   ├── index.js                # Express backend: API, OpenAI, image saving, static serving
    │   ├── utils/
    │   │   └── imageSaver.js       # Helper for saving images to disk
    │   ├── images/                 # Directory for generated images (auto-created)
    │   └── .env                    # Backend environment variables (never commit to git)
    ├── src/
    │   ├── App.jsx                 # Main React app container
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── Carousel.jsx
    │   │   ├── Card.jsx
    │   │   └── Footer.jsx
    │   ├── styles/
    │   │   └── tailwind.config.js
    │   ├── index.css
    │   ├── main.jsx
    │   └── index.html
    ├── package.json                # Project dependencies and scripts (frontend)
    ├── tailwind.config.js          # (if using root-level config for Tailwind)
    └── README.md                   # This file

---

## Prerequisites

- **Node.js** v18 or v20 (recommended)
- **npm** v8 or v10
- **OpenAI API Key** (for GPT-4 and image generation)
- (Optional) [nvm](https://github.com/nvm-sh/nvm) for managing Node versions

---

## Setup Instructions

### 1. Clone the Repository

    git clone <your-repo-url>
    cd mothers-day-carousel

### 2. Backend Setup

    cd server
    npm install
    cp .env.example .env   # Or create .env manually (see below)

Edit `.env` with your OpenAI API key and desired settings:

    OPENAI_API_KEY=sk-...
    PORT=3001
    IMAGE_SAVE_PATH=./images
    BASE_IMAGE_URL=/images

Start the backend server:

    node index.js
    # or, if you add a start script:
    npm start

### 3. Frontend Setup

    cd ../src
    npm install

#### Tailwind CSS Configuration

- Ensure `tailwind.config.js` and `postcss.config.js` exist in `src/`.
- In `src/index.css`, add at the very top:

        @tailwind base;
        @tailwind components;
        @tailwind utilities;

- Import `index.css` in your `main.jsx`:

        import './index.css';

#### Start the React Dev Server

    npm run dev

Visit [http://localhost:5173](http://localhost:5173) (or the port Vite shows).

---

## Usage

- Use the carousel arrows or "Generate" button to create themed Mother's Day cards.
- Download any generated card using the "Download" button.
- All images are saved in `/server/images/` and served via `/images/` endpoint.

---

## Deployment

- **Frontend:**  
  Build for production:

        npm run build

  Deploy the `dist/` directory to your static hosting provider.

- **Backend:**  
  Deploy the `server/` directory to your Node.js server or VM.  
  Ensure the `images/` directory is writable and persistent.

- **Nginx/Reverse Proxy (optional):**  
  Configure Nginx to proxy `/api` and `/images` to the backend, and serve the React build as static files.

---

## Troubleshooting & FAQ

- **Tailwind classes not working?**  
  Ensure your `tailwind.config.js` `content` array includes all relevant paths and that `index.css` is imported in your entry point.

- **Image generation fails or times out?**  
  Check your OpenAI API key and usage limits. The backend will fallback to DALL·E 3 if GPT-Image-1 times out.

- **Images not saving or downloading?**  
  Ensure the `/server/images/` directory exists and is writable by the backend process.

- **CORS or API errors?**  
  If running frontend and backend separately, set the React dev server `proxy` in `package.json`:

        "proxy": "http://localhost:3001"

- **Port conflicts?**  
  Change the `PORT` in `.env` or the frontend dev server port in `vite.config.js`.

---

## License

MIT License.  
See [LICENSE](LICENSE) for details.

---

## Credits

- Built by Zaki Alibhai, with inspiration from creative educators, artists, and the open-source community.
- Powered by [OpenAI](https://openai.com/) and modern web technologies.

---

**For questions, issues, or contributions, please open an issue or pull request on GitHub.**
