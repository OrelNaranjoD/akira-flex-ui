/// <reference types="vitest" />
import { defineConfig } from 'vite'
import angular from '@analogjs/vite-plugin-angular'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'

/**
 * Base Vitest configuration for all applications in the Nx workspace.
 * Each app can extend this configuration with specific settings.
 */
export const createVitestConfig = (appName: string) =>
  defineConfig({
    cacheDir: `../../node_modules/.vite/${appName}`,
    plugins: [angular(), nxViteTsPaths()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test/test.ts'],
      include: ['src/**/*.spec.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html', 'lcov'],
        reportsDirectory: `../../coverage/${appName}`,
        exclude: [
          'node_modules/',
          'src/test/',
          '**/*.spec.ts',
          '**/*.config.ts',
          '**/*.routes.ts',
          '**/environments/',
        ],
      },
    },
  })
