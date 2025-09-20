// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import icon from 'astro-icon';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), icon()],
  adapter: vercel(),
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@layouts': '/src/layouts', 
        '@pages': '/src/pages',
        '@styles': '/src/styles',
        '@assets': '/src/assets',
        '@icons': '/src/icons',
        '@public': '/public'
      }
    }
  }
});