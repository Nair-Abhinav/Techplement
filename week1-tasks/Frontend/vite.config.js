import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://techplement-74edu0on4-abhinav-nairs-projects.vercel.app',
        changeOrigin: true,
      }
    }
  }
})
