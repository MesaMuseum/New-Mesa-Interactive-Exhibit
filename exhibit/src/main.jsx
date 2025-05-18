// Polyfills for older browsers
import 'core-js/stable'; // Polyfill for modern JavaScript features
import 'regenerator-runtime/runtime'; // Polyfill for async/await
import './styles/fonts.css';
import './styles/global.css';
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
