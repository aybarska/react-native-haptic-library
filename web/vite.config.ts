import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/react-native-haptic-library/',
  plugins: [react()],
  resolve: {
    alias: {
      '@library': resolve(__dirname, '../src'),
      '@web': resolve(__dirname, './src'),
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
    port: 5173,
  },
});
