/// <reference types="jasmine" />
// Global test setup for Jasmine/Karma
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import {
  provideZonelessChangeDetection,
  provideCheckNoChangesConfig,
  NgModule,
} from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faTachometerAlt, faUserCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [BrowserTestingModule, FontAwesomeModule],
  providers: [
    provideZonelessChangeDetection(),
    provideCheckNoChangesConfig({ exhaustive: true, interval: 1000 }),
  ],
})
class TestEnvironmentModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faGithub, faTwitter, faTachometerAlt, faUserCircle, faQuestionCircle);
  }
}

getTestBed().initTestEnvironment(TestEnvironmentModule, platformBrowserTesting(), {
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});
