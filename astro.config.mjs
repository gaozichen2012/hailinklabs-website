import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hailinklabs.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'never' },
});
