import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/payment-form/',
  plugins: [react()],
  server: {
    proxy: {
      '/validate': {
        target: 'https://matavi.eu',
        changeOrigin: true,
      },
    },
  },
})
