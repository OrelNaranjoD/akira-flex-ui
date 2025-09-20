import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core'
import { provideRouter } from '@angular/router'
import { APP_ROUTES } from './app.routes'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { provideClientHydration, withEventReplay } from '@angular/platform-browser'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { providePrimeNG } from 'primeng/config'
import { getPresetForDomain } from './core/utils/theme-initializer'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideRouter(APP_ROUTES),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: getPresetForDomain(),
        options: {
          darkModeSelector: '.dark-mode',
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
