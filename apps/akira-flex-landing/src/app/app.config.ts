import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core'
import { provideRouter } from '@angular/router'
import { LANDING_ROUTES } from './landing.routes'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { provideClientHydration, withEventReplay } from '@angular/platform-browser'
import { providePrimeNG } from 'primeng/config'
import { LandingTheme } from './themes/landing-theme.preset'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideStore } from '@ngrx/store'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideRouter(LANDING_ROUTES),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: LandingTheme,
        options: {
          darkModeSelector: '.dark',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
      ripple: true,
    }),
    provideStore(),
  ],
}
