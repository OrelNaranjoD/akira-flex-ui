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

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideRouter(LANDING_ROUTES),
    provideHttpClient(withFetch()),
    providePrimeNG({
      theme: {
        preset: LandingTheme,
        options: {
          ripple: true,
          darkModeSelector: '.dark',
          prefix: 'p',
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities',
          },
        },
      },
    }),
  ],
}
