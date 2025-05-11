// /server/utils/imageSaver.js
// Purpose: Utility for saving base64-encoded or binary image data to disk with unique filenames, for permanent storage and download

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Save an image to disk from base64 or binary data.
 * @param {string|Buffer} data - Base64 string (no data URI prefix) or Buffer.
 * @param {string} ext - File extension, e.g., 'png', 'jpg'.
 * @param {string} saveDir - Directory to save the image in.
 * @returns {Promise<string>} - The saved filename (not full path).
 * @throws {Error} - If saving fails.
 */
async function saveImage(data, ext = 'png', saveDir = './images') {
  // Ensure saveDir exists
  if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir, { recursive: true });
  }

  // Generate unique filename: YYYYMMDD-HHMMSS-<random>.ext
  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  const randomHex = crypto.randomBytes(6).toString('hex');
  const safeExt = ext.replace(/[^a-z0-9]/gi, '').toLowerCase() || 'png';
  const filename = `img-${timestamp}-${randomHex}.${safeExt}`;
  const filePath = path.join(saveDir, filename);

  // Decode base64 if needed
  let buffer;
  if (Buffer.isBuffer(data)) {
    buffer = data;
  } else if (typeof data === 'string') {
    // Remove any data URI prefix if present
    const base64 = data.replace(/^data:image\/\w+;base64,/, '');
    buffer = Buffer.from(base64, 'base64');
  } else {
    throw new Error('Invalid image data type');
  }

  // Write file to disk
  await fs.promises.writeFile(filePath, buffer);

  return filename;
}

module.exports = { saveImage };
