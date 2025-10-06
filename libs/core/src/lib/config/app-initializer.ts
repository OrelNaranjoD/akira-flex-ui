import { inject } from '@angular/core'
import { GlobalConfigService } from '../services/global-config.service'
import { AuthStoreService } from '../services/auth-store.service'
import type { ApiEndpoints } from '../shared'

/**
 * Initialize the application by configuring global settings and auth state.
 * @param apiEndpoints The API endpoints configuration for the application.
 */
export function initializeApp(apiEndpoints: ApiEndpoints): void {
  const globalConfig = inject(GlobalConfigService)
  const authStore = inject(AuthStoreService)

  // Configure API endpoints first
  globalConfig.configureApiEndpoints(apiEndpoints)

  // Initialize authentication state from stored cookies
  authStore.initializeAuth()
}
