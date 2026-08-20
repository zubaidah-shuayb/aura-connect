import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { nitro } from 'nitro/vite' // <-- Import nitro

export default defineConfig(({ command }) => ({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    nitro(), // <-- Add nitro plugin here
    // Only run the router plugin during build to bypass the dev HMR bug
    command === 'build' && tanstackRouter({
      routeFileIgnorePrefix: '-',
      autoCodeSplitting: false,
    }),
    tanstackStart(),
    react(),
  ].filter(Boolean),
}))