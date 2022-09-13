import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  build: {
    sourcemap: command === 'serve',
  },
  resolve: {
    alias: {
      src: path.resolve('src/'),
    },
  }
}))
