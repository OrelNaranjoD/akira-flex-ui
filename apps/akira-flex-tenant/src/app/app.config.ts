import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  isDevMode,
} from '@angular/core'
import { provideRouter } from '@angular/router'
import { ROUTES } from './app.routes'
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'
import { provideClientHydration, withEventReplay } from '@angular/platform-browser'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { providePrimeNG } from 'primeng/config'
import { provideState, provideStore } from '@ngrx/store'
import { provideEffects } from '@ngrx/effects'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { authInterceptor, errorInterceptor, systemStatusFeature, SystemStatusEffects } from '@core'
import TealSlateTheme from './themes/custom-theme.preset'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    ...(isDevMode() ? [] : [provideClientHydration(withEventReplay())]),
    provideRouter(ROUTES),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, errorInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: TealSlateTheme,
        options: {
          darkModeSelector: '.dark',
        },
      },
    }),
    provideStore(),
    provideState(systemStatusFeature),
    provideEffects(SystemStatusEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
}
