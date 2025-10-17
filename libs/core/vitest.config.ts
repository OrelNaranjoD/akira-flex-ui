/// <reference types="vitest" />
import { createVitestConfig } from '../../vitest.workspace'
import { mergeConfig } from 'vite'

/**
 * Vitest configuration for akira-flex-core library.
 * Extends the base workspace configuration with library-specific settings.
 */
export default mergeConfig(createVitestConfig('akira-flex-core'), {
  test: {
    coverage: {
      exclude: ['node_modules/', 'src/test/', '**/*.spec.ts', '**/*.config.ts', '**/index.ts'],
    },
  },
})
