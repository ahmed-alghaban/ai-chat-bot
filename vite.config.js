// https://vitejs.dev/config/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['path', 'fs', 'url']
  },
  build: {
    sourcemap: false,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  css: {
    devSourcemap: false
  },
  ssr: {
    noExternal: ['autoprefixer', 'source-map-js']
  },
  resolve: {
    alias: {
      'source-map-js': 'source-map'
    }
  }
})
