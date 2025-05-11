// server/test-api.js
// Purpose: Test script for verifying API functionality without starting the full server

require('dotenv').config();
const axios = require('axios');

// API base URL
const API_BASE = 'http://localhost:3001';

// Test endpoint with retries
async function testEndpoint(name, fn, retries = 3) {
  console.log(`\n📡 Testing ${name}...`);
  
  for (let i = 0; i < retries; i++) {
    try {
      const result = await fn();
      console.log(`✅ ${name} successful:`, result);
      return result;
    } catch (err) {
      console.error(`❌ Attempt ${i + 1}/${retries} failed:`, err.message);
      if (i === retries - 1) {
        console.error(`🚫 ${name} failed after ${retries} attempts`);
        throw err;
      }
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

// Main test function
async function runTests() {
  console.log('🧪 Starting API tests...\n');
  
  try {
    // 1. Test themes endpoint
    const themes = await testEndpoint('GET /api/themes', async () => {
      const res = await axios.get(`${API_BASE}/api/themes`);
      return res.data.themes;
    });
    
    if (!themes || !themes.length) {
      throw new Error('No themes returned');
    }
    
    // Pick a random theme for testing
    const theme = themes[Math.floor(Math.random() * themes.length)];
    console.log(`\n🎯 Selected theme for testing: "${theme}"`);
    
    // 2. Test prompt generation
    const prompt = await testEndpoint('POST /api/generate-prompt', async () => {
      const res = await axios.post(`${API_BASE}/api/generate-prompt`, { theme });
      return res.data.prompt;
    });
    
    if (!prompt) {
      throw new Error('No prompt generated');
    }
    
    // 3. We'll skip the image generation test as it can be resource-intensive
    // But we'll show what the request would look like
    console.log(`\n🖼️ Image generation request would be:`, {
      url: `${API_BASE}/api/generate-image`,
      body: { prompt }
    });
    
    console.log('\n🎉 All tests completed successfully!');
    
  } catch (err) {
    console.error('\n💥 Test suite failed:', err.message);
    process.exit(1);
  }
}

// Check if we're starting a server or just running tests
const shouldStartServer = process.argv.includes('--with-server');

if (shouldStartServer) {
  // Start the server then run tests
  console.log('🚀 Starting server...');
  const server = require('./index.js');
  setTimeout(runTests, 2000);
} else {
  // Assume server is already running
  runTests();
}