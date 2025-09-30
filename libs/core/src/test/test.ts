/// <reference types="jasmine" />
// Global test setup for Jasmine/Karma
import { getTestBed } from '@angular/core/testing'
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing'
import {
  provideZonelessChangeDetection,
  provideCheckNoChangesConfig,
  NgModule,
} from '@angular/core'

/**
 * Test Environment Module - Sets up the Angular testing environment with zoneless change detection.
 */
@NgModule({
  imports: [BrowserTestingModule],
  providers: [
    provideZonelessChangeDetection(),
    provideCheckNoChangesConfig({ exhaustive: true, interval: 1000 }),
  ],
})
class TestEnvironmentModule {}

getTestBed().initTestEnvironment(TestEnvironmentModule, platformBrowserTesting(), {
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
})
