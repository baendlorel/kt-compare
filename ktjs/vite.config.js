import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'kt.js',
  },
  server: {
    port: 3001,
    open: true,
  },
  build: {
    target: 'esnext',
    minify: false, // Keep unminified for better performance analysis
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
