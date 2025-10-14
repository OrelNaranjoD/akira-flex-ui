/// <reference types="vitest/globals" />
import '@analogjs/vitest-angular/setup-zone'
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing'
import { getTestBed } from '@angular/core/testing'

/**
 * Global test setup for Vitest with Angular.
 * Configures the Angular testing environment for akira-flex-platform.
 */
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
})
