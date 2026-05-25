import { defineConfig } from 'vite'

export default defineConfig({
  base: '/mesomatrix/',
  server: {
    allowedHosts: true,
  },
  preview: {
    allowedHosts: true,
  },
})
