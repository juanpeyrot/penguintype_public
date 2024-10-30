import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/firebase': {
        target: 'https://firestore.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/firebase/, '')
      }
    }
  }
})
