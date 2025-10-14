/// <reference types="vitest" />
import { defineConfig } from 'vite'
import angular from '@analogjs/vite-plugin-angular'

/**
 * Vitest configuration for akira-flex-landing application.
 */
export default defineConfig({
  cacheDir: '../../node_modules/.vite/akira-flex-landing',
  plugins: [angular()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test/test.ts'],
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: '../../coverage/akira-flex-landing',
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.spec.ts',
        '**/*.config.ts',
        '**/*.routes.ts',
        '**/environments/',
      ],
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
      '@shared': '../../libs/core/src/lib',
    },
  },
})
