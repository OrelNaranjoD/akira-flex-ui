import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core'
import { provideRouter } from '@angular/router'
import { PLATFORM_ROUTES } from './platform.routes'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { provideClientHydration, withEventReplay } from '@angular/platform-browser'
import { providePrimeNG } from 'primeng/config'
import { PlatformTheme } from './themes/platform-theme.preset'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideRouter(PLATFORM_ROUTES),
    provideHttpClient(withFetch()),
    providePrimeNG({
      theme: {
        preset: PlatformTheme,
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
