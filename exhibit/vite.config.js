import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Include all image types and case variations
  assetsInclude: ['**/*.JPG', '**/*.jpg', '**/*.png', '**/*.jpeg', '**/*.JPEG', '**/*.PNG', '**/*.mp4', '**/*.MP4', '**/*.glb', '**/*.gltf'],
  
  // Ensure proper MIME types are used for files
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [
        // Add autoprefixer for better browser compatibility
        autoprefixer({
          overrideBrowserslist: ['> 0.5%', 'last 2 versions', 'Chrome >= 60', 'Android >= 7']
        })
      ]
    }
  },
    // SPA History mode fallback for client-side routing
  server: {
    historyApiFallback: true,
    host: true // Listen on all addresses
  },
  
  // Also use history fallback in preview mode
  preview: {
    historyApiFallback: true
  },
  
  // Critical for proper routing with SPA
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei']
        }
      }
    }
  }
});