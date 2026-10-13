import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { applyTextSize, getStoredTextSize } from './lib/textSize';
import './index.css';

// Before first paint, so large-text users never see the small layout flash.
applyTextSize(getStoredTextSize());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (import.meta.env.DEV) {
  import('./data/validate').then(({ validateTripData }) => {
    const problems = validateTripData();
    if (problems.length) console.error('Trip data problems:\n' + problems.join('\n'));
  });
}

// Offline support: the service worker is generated at build time (see vite.config.ts).
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {
      /* offline mode is a bonus; the app works without it */
    });
  });
}
