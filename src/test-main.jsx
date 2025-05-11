// /src/test-main.jsx
// Purpose: Entry point for testing frontend components

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TestApp from './test-app.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TestApp />
  </StrictMode>,
)