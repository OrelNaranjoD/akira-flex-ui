/// <reference types="vitest/globals" />
import '@analogjs/vitest-angular/setup-zone'
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing'
import { getTestBed } from '@angular/core/testing'

if (typeof (globalThis as Record<string, unknown>)['$localize'] === 'undefined') {
  ;(globalThis as Record<string, unknown>)['$localize'] = Object.assign(
    (template: TemplateStringsArray, ...expressions: unknown[]) => {
      return template.reduce((acc, str, i) => acc + str + (expressions[i] || ''), '')
    },
    { locale: 'en-US' }
  )
}

// Mock CSS variables to prevent JSDOM CSS parsing errors
const mockCSSVariables = `
  :root {
    --p-button-primary-border-color: #007bff;
    --p-button-primary-background: #007bff;
    --p-button-primary-color: #ffffff;
    --p-surface-ground: #f8f9fa;
    --p-surface-section: #ffffff;
    --p-text-color: #212529;
    --p-text-muted-color: #6c757d;
  }
`

// Add mock CSS to document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = mockCSSVariables
  document.head.appendChild(style)
}

/**
 * Global test setup for Vitest with Angular.
 * Configures the Angular testing environment with zoneless change detection.
 */
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
})
