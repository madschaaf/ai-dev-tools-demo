import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // IMPORTANT: Use base path only for production builds (GitHub Pages)
  base: process.env.NODE_ENV === 'production' ? '/ai-dev-tools-demo/' : '/',

  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  },

  build: {
    outDir: 'dist',   // default, explicit for clarity
    emptyOutDir: true
  }
})
