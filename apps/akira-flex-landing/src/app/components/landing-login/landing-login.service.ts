import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { LoginRequest, LoginResponse } from '@shared'
import { AuthStoreService } from '@shared'

/**
 * Service for handling user login via the landing page.
 */
@Injectable()
export class LandingLoginService {
  private readonly authStore = inject(AuthStoreService)

  /**
   * Send login request to API and normalize errors.
   *
   * @param payload Login payload to send to the API.
   * @returns Observable that emits LoginResponse on success or throws a normalized error.
   */
  login(payload: LoginRequest): Observable<LoginResponse> {
    // Dispatch login action
    this.authStore.login(payload)

    // Return observable that waits for the result
    return new Observable<LoginResponse>((observer) => {
      const subscription = this.authStore.isLoading$.subscribe((isLoading) => {
        if (!isLoading) {
          if (this.authStore.isAuthenticated) {
            const user = this.authStore.user
            const token = this.authStore.token
            if (user && token) {
              const response: LoginResponse = {
                user,
                accessToken: token,
              }
              observer.next(response)
              observer.complete()
            } else {
              observer.error(new Error('Login failed - missing user or token'))
            }
          } else {
            let errorMessage = ''
            this.authStore.error$
              .subscribe((error) => {
                errorMessage = error || 'Login failed'
              })
              .unsubscribe()

            if (errorMessage) {
              // Normalize error messages
              let message = 'Error al iniciar sesión.'
              if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
                message = 'Credenciales incorrectas. Por favor, revise su email y contraseña.'
              } else if (errorMessage.includes('EMAIL_NOT_VERIFIED')) {
                message = 'Email no verificado. Por favor, revise su bandeja de entrada.'
              }
              observer.error(new Error(message))
            } else {
              observer.error(new Error('Login failed'))
            }
          }
          subscription.unsubscribe()
        }
      })
    })
  }
}
