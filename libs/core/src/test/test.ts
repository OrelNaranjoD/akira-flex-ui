/// <reference types="vitest/globals" />
import '@analogjs/vitest-angular/setup-zone'
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing'
import { getTestBed } from '@angular/core/testing'

/**
 * Global test setup for Vitest with Angular.
 * Configures the Angular testing environment with zoneless change detection.
 */
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
})
