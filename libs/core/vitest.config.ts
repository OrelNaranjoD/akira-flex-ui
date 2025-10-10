/// <reference types="vitest" />
import { defineConfig } from 'vite'
import angular from '@analogjs/vite-plugin-angular'

/**
 * Vitest configuration for akira-flex-core library.
 */
export default defineConfig({
  cacheDir: '../../node_modules/.vite/akira-flex-core',
  plugins: [angular()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test/test.ts'],
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: '../../coverage/akira-flex-core',
      exclude: ['node_modules/', 'src/test/', '**/*.spec.ts', '**/*.config.ts', '**/index.ts'],
    },
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
  resolve: {
    alias: {
      '@shared': './src/lib',
    },
  },
})
