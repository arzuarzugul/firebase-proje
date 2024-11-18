import { defineConfig } from 'vite';  // Burada defineConfig'i import ediyoruz.
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
