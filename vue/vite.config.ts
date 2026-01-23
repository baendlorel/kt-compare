import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteSingleFile()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    target: 'esnext',
    minify: false, // Keep unminified for better performance analysis
    cssCodeSplit: false,
    assetsInlineLimit: 100000000, // Inline all assets
    rollupOptions: {
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true,
      },
    },
  },
});
