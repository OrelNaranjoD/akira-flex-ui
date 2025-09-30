import { inject } from '@angular/core'
import { GlobalConfigService } from '../services/global-config.service'
import type { ApiEndpoints } from '../shared'

/**
 * Initialize the application by configuring global settings.
 * @param apiEndpoints The API endpoints configuration for the application.
 */
export function initializeApp(apiEndpoints: ApiEndpoints): void {
  const globalConfig = inject(GlobalConfigService)
  globalConfig.configureApiEndpoints(apiEndpoints)
}
