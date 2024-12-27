import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  integrations: [tailwind()],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    port: 80,
    host: true  // This allows external connections
  },
  redirects: {
    '/dashboard': '/',
    '/login': '/auth/login',
    '/register': '/auth/register'
  }
});