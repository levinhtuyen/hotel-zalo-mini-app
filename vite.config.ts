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
        "@components": path.resolve(__dirname, "src/components"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@static": path.resolve(__dirname, "src/static"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@utils": path.resolve(__dirname, "src/utils"),
      },
    },
}))
