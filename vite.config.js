import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: ['es2015', 'safari13', 'ios13'],
    cssTarget: ['chrome61', 'safari13', 'ios13']
  },
  server: {
    port: 3000,
    open: false,
    host: true
  }
});
