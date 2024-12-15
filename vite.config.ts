import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/babysittlingcal/', // Replace 'your-repo-name' with your GitHub repository name
  build: {
    outDir: 'dist', // Optional: Customize the output directory
  },
})
