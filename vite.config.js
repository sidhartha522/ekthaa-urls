import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          appwrite: ['appwrite'],
          framer: ['framer-motion'],
          maps: ['leaflet', 'react-leaflet'],
        }
      }
    },
    chunkSizeWarningLimit: 500,
    sourcemap: false,
    minify: 'esbuild',
  },
  server: {
    proxy: {
      // Business backend for analytics and business operations (WORKING)
      '/api': {
        target: 'https://ekthaabusiness-955272392528.europe-west1.run.app',
        changeOrigin: true,
        secure: true,
      }
    }
  },
  // Environment variables for production
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify('https://ekthaabusiness-955272392528.europe-west1.run.app/api'),
  }
})

