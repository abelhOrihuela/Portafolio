import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://abelhorihuela.github.io',
  base: '/Portafolio',
  build: {
    assets: 'assets',
  },
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
