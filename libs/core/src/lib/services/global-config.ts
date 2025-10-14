import { Injectable } from '@angular/core'
import { ApiEndpoints } from '../shared'

/**
 * Global configuration service for application-wide settings.
 */
@Injectable({
  providedIn: 'root',
})
export class GlobalConfigService {
  private _apiEndpoints: ApiEndpoints | null = null

  /**
   * Configure the global API endpoints for this application.
   * This should be called once during app initialization.
   * @param endpoints The API endpoints configuration.
   */
  configureApiEndpoints(endpoints: ApiEndpoints): void {
    if (this._apiEndpoints) {
      throw new Error('API endpoints already configured. Can only be configured once.')
    }
    this._apiEndpoints = endpoints
  }

  /**
   * Get the configured API endpoints.
   * Throws an error if not configured yet.
   * @returns The configured API endpoints.
   */
  get apiEndpoints(): ApiEndpoints {
    if (!this._apiEndpoints) {
      throw new Error('API endpoints not configured. Call configureApiEndpoints() first.')
    }
    return this._apiEndpoints
  }
}
