import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  isDevMode,
} from '@angular/core'
import { provideRouter } from '@angular/router'
import { TENANT_ROUTES } from './tenant.routes'
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'
import { provideAppInitializer } from '@angular/core'
import { provideClientHydration, withEventReplay } from '@angular/platform-browser'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { providePrimeNG } from 'primeng/config'
import { provideStore } from '@ngrx/store'
import { provideEffects } from '@ngrx/effects'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { authInterceptor, errorInterceptor, initializeApp, authReducer, AuthEffects } from '@core'
import { API_ENDPOINTS } from './config/api-endpoints'
import TealSlateTheme from './themes/custom-theme.preset'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    ...(isDevMode() ? [] : [provideClientHydration(withEventReplay())]),
    provideRouter(TENANT_ROUTES),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, errorInterceptor])),
    provideAppInitializer(() => initializeApp(API_ENDPOINTS)),
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: TealSlateTheme,
        options: {
          darkModeSelector: '.dark',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),
    provideStore({
      auth: authReducer,
    }),
    provideEffects(AuthEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
}
