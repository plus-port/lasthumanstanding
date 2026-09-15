import { defineConfig } from 'vitest/config';

// Domain tests are pure TypeScript; they need no Astro runtime.
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
  },
});
