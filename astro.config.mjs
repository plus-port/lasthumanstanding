// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// Server-rendered app: managers query live readiness, so every page renders on request.
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
});
