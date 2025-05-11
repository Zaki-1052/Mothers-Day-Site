# Testing Guide for Mother's Day Carousel

This guide outlines how to test both the frontend and backend functionality of the Mother's Day Carousel application.

## Backend Testing

The backend includes an API test script that verifies the core functionality:

1. Run the backend with Node.js:
   ```
   cd server
   npm start
   ```

2. In a separate terminal, run the test script:
   ```
   cd server
   node test-api.js
   ```

   Or to automatically start the server during testing:
   ```
   node test-api.js --with-server
   ```

The test script checks:
- Theme retrieval from `/api/themes`
- Prompt generation with `/api/generate-prompt`
- API error handling and response structure

## Frontend Testing

The frontend includes a test application that renders UI components with various states:

1. Run the test UI:
   ```
   cd src
   npm run test-ui
   ```

2. Open the displayed URL in your browser (typically http://localhost:5173/)

The test UI allows you to:
- Navigate the carousel
- Test loading states
- Trigger error messages
- View component rendering in different conditions
- Test responsive layouts

## End-to-End Testing

For complete end-to-end testing:

1. Start the backend:
   ```
   cd server
   npm start
   ```

2. In a separate terminal, start the frontend:
   ```
   cd src
   npm run dev
   ```

3. Open the frontend URL and test the complete application flow:
   - Navigate through themes
   - Generate prompts and images
   - Test image download functionality
   - Verify all UI components and responsive design

## Notes

- The OpenAI API key in the backend's `.env` file must be valid for image generation tests
- Frontend tests use mock data and do not require a running backend
- The test UI includes overlay controls for toggling component states