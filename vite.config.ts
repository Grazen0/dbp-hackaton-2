import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/dbp-hackaton-2',
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      ignored: ['**/Session.vim'],
    },
  },
});
