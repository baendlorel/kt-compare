import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteSingleFile()],
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
