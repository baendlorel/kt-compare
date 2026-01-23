import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
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
