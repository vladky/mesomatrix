import { defineConfig } from 'vite'

export default defineConfig({
  base: '/mesomatrix/',
  publicDir: 'public',
  server: {
    allowedHosts: true,
  },
  preview: {
    allowedHosts: true,
  },
})
