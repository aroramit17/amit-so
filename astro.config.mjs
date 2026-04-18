import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://amit.so',
  output: 'static',
  integrations: [react()],
  build: {
    format: 'file',
  },
});
