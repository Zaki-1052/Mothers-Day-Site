# Mother's Day Carousel - Backend

This is the backend server for the Mother's Day Carousel application. It provides API endpoints for generating AI-powered Mother's Day cards using OpenAI's GPT-4 and image generation APIs.

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **AI Integration**: OpenAI API (GPT-4.1 and GPT-Image-1 with DALL·E 3 fallback)
- **Configuration**: dotenv
- **HTTP Client**: axios
- **Image Handling**: sharp

## Project Structure

```
server/
├── images/                  # Directory for storing generated images
├── utils/                   
│   └── imageSaver.js        # Utility for saving images to disk
├── .env                     # Environment variables
├── index.js                 # Main Express application
└── package.json             # Dependencies and scripts
```

## Development

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables in `.env` file (see below)

3. Start the server:
   ```
   npm start
   ```

   Or with live-reload during development:
   ```
   npm run dev
   ```

## API Endpoints

- **GET `/api/themes`**  
  Returns the list of available Mother's Day card themes.
  
- **POST `/api/generate-prompt`**  
  Creates a creative prompt for a given theme.
  
  Request body:
  ```json
  { "theme": "preschool teacher" }
  ```
  
  Response:
  ```json
  { "prompt": "A creative prompt for the theme..." }
  ```

- **POST `/api/generate-image`**  
  Generates an image based on a prompt using GPT-Image-1 or DALL·E 3.
  
  Request body:
  ```json
  { "prompt": "A detailed prompt..." }
  ```
  
  Response:
  ```json
  {
    "imageUrl": "/images/filename.png",
    "imageDownloadUrl": "/images/filename.png",
    "model": "gpt-image-1"
  }
  ```

- **GET `/images/:filename`**  
  Serves static images with download headers.

## Environment Variables

Create a `.env` file in the root directory with:

```
# OpenAI API Key (required)
OPENAI_API_KEY=your_openai_api_key

# Port for Express server (default: 3001)
PORT=3001

# Directory to save generated images (relative to server root)
IMAGE_SAVE_PATH=./images

# Base URL path for serving images (should match Express static route)
BASE_IMAGE_URL=/images
```

## Features

- **AI Prompt Generation**: Creates descriptive prompts based on themes
- **Dual Image Generation**: Uses GPT-Image-1 with DALL·E 3 fallback
- **Permanent Image Storage**: All generated images saved to disk
- **Error Handling**: Graceful error handling and fallbacks
- **Custom Image Filenames**: Timestamped and randomized filenames