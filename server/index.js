// /server/index.js
// Purpose: Main Express backend for Mother’s Day Carousel app, handles OpenAI integration, image generation, saving, and download

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { OpenAI } = require('openai');
const axios = require('axios');
const bodyParser = require('body-parser');
const { saveImage } = require('./utils/imageSaver');

const app = express();
const PORT = process.env.PORT || 3001;
const IMAGE_SAVE_PATH = process.env.IMAGE_SAVE_PATH || path.join(__dirname, 'images');
const BASE_IMAGE_URL = process.env.BASE_IMAGE_URL || '/images';

app.use(cors());
app.use(bodyParser.json({ limit: '2mb' }));

// Ensure image save directory exists
if (!fs.existsSync(IMAGE_SAVE_PATH)) {
  fs.mkdirSync(IMAGE_SAVE_PATH, { recursive: true });
}

// --- THEME DICTIONARY (to be filled in with real themes) ---
const THEME_DICTIONARY = [
  "preschool teacher", "author", "illustrator", "cake designer", "children’s picture books",
  "student", "artist", "mother", "traveler", "foodie", "mentor", "early childhood educator"
];

// --- OpenAI Client Setup ---
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// --- Endpoint: GET /api/themes ---
app.get('/api/themes', (req, res) => {
  res.json({ themes: THEME_DICTIONARY });
});

// --- Endpoint: POST /api/generate-prompt ---
// Input: { theme: string }
app.post('/api/generate-prompt', async (req, res) => {
  const { theme } = req.body;
  if (!theme || !THEME_DICTIONARY.includes(theme)) {
    return res.status(400).json({ error: 'Invalid or missing theme.' });
  }
  try {
    const systemPrompt = `You are a creative assistant. Write a warm, visually descriptive prompt for a Mother’s Day card themed as a "${theme}". The prompt should inspire a beautiful, animated, illustrated image with a purple color palette, and should include the phrase "Happy Mother’s Day!" in a style inspired by the creative, nurturing, and artistic themes of Naz Alibhai's work.`;
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Mother's Day card for a "${theme}".` }
      ],
      max_tokens: 120,
      temperature: 0.9,
    });
    const prompt = completion.choices[0]?.message?.content?.trim();
    if (!prompt) throw new Error('No prompt generated.');
    res.json({ prompt });
  } catch (err) {
    console.error('Prompt generation error:', err);
    res.status(500).json({ error: 'Failed to generate prompt.' });
  }
});

// --- Endpoint: POST /api/generate-image ---
// Input: { prompt: string }
app.post('/api/generate-image', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid prompt.' });
  }

  // Helper to save and return image info
  async function handleImage(base64Data, ext = 'png') {
    const filename = await saveImage(base64Data, ext, IMAGE_SAVE_PATH);
    const imageUrl = `${BASE_IMAGE_URL}/${filename}`;
    const imageDownloadUrl = imageUrl; // For now, same as imageUrl
    return { imageUrl, imageDownloadUrl };
  }

  // Try gpt-image-1 first, fallback to DALL·E 3 if timeout/error
  let imageData = null;
  let usedModel = 'gpt-image-1';
  try {
    // Timeout logic: Promise.race between OpenAI call and timeout
    const gptImagePromise = openai.images.generate({
      model: "gpt-image-1",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "high",
    });
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('gpt-image-1 timeout')), 60000)
    );
    const result = await Promise.race([gptImagePromise, timeoutPromise]);
    const b64 = result.data[0].b64_json;
    imageData = await handleImage(b64, 'png');
  } catch (err) {
    console.warn('gpt-image-1 failed, falling back to DALL·E 3:', err.message);
    usedModel = 'dall-e-3';
    try {
      // DALL·E 3 returns a URL, so we need to fetch and save the image
      const dalleResult = await openai.images.generate({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
        response_format: "url",
      });
      const imageUrl = dalleResult.data[0].url;
      // Download image and save as PNG
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const b64 = Buffer.from(response.data, 'binary').toString('base64');
      imageData = await handleImage(b64, 'png');
    } catch (fallbackErr) {
      console.error('DALL·E 3 fallback failed:', fallbackErr);
      return res.status(500).json({ error: 'Image generation failed.' });
    }
  }
  res.json({ ...imageData, model: usedModel });
});

// --- Serve static images for download ---
app.use(BASE_IMAGE_URL, express.static(IMAGE_SAVE_PATH, {
  setHeaders: (res, filePath) => {
    res.setHeader('Content-Disposition', `attachment; filename="${path.basename(filePath)}"`);
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  }
}));

// --- Error Handling Middleware ---
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Images served from: ${IMAGE_SAVE_PATH}`);
});

