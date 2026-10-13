import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';

// Files in public/ aren't part of the Rollup bundle, so list the ones the
// offline app needs explicitly.
const PUBLIC_FILES = ['./manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/icon.svg'];

/** Emits sw.js with this build's file list baked in, so each deploy ships a new worker. */
const serviceWorker = (): Plugin => ({
  name: 'generate-service-worker',
  apply: 'build',
  enforce: 'post',
  generateBundle(_options, bundle) {
    const built = Object.keys(bundle).filter(f => !f.endsWith('.map')).map(f => `./${f}`);
    const source = readFileSync(new URL('./src/pwa/sw.js', import.meta.url), 'utf8')
      .replace('__BUILD_VERSION__', Date.now().toString(36))
      .replace('__PRECACHE_MANIFEST__', JSON.stringify([...built, ...PUBLIC_FILES]));
    this.emitFile({ type: 'asset', fileName: 'sw.js', source });
  },
});

export default defineConfig({
  plugins: [react(), serviceWorker()],
  build: {
    // MapLibre v5 alone is ~1 MB minified. It gets its own chunk (loaded only
    // with the Map tab, and cached across deploys since it rarely changes).
    chunkSizeWarningLimit: 1100,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          maplibre: ['maplibre-gl'],
        },
      },
    },
  },
});
