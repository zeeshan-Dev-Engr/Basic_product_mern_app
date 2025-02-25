import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: '/api',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  }
})
