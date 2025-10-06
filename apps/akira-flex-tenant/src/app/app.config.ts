import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core'
import { provideRouter } from '@angular/router'
import { TENANT_ROUTES } from './tenant.routes'
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'
import { provideAppInitializer } from '@angular/core'
import { provideClientHydration, withEventReplay } from '@angular/platform-browser'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { providePrimeNG } from 'primeng/config'
import { TenantTheme } from './themes/tenant-theme.preset'
import { provideStore } from '@ngrx/store'
import { provideEffects } from '@ngrx/effects'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { isDevMode } from '@angular/core'
import { authInterceptor, errorInterceptor, initializeApp, authReducer, AuthEffects } from '@shared'
import { API_ENDPOINTS } from './config/api-endpoints'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideRouter(TENANT_ROUTES),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, errorInterceptor])),
    provideAppInitializer(() => initializeApp(API_ENDPOINTS)),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: TenantTheme,
        options: {
          darkModeSelector: '.dark',
          prefix: 'p',
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities',
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
