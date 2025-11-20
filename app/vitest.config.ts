import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    exclude: ['node_modules', 'tests/**', '.next/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', '.next/', 'coverage/', '**/*.config.*', '**/*.d.ts', 'tests/'],
      thresholds: {
        statements: 75,
        branches: 59,
        functions: 85,
        lines: 75,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
