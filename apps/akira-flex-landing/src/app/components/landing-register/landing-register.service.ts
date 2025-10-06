import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { RegisterRequest, RegisterResponse } from '@shared'
import { AuthStoreService } from '@shared'

/**
 * Service for handling user registration via the landing page.
 */
@Injectable()
export class LandingRegisterService {
  private readonly authStore = inject(AuthStoreService)

  /**
   * Send register request to API and normalize errors.
   *
   * @param payload Registration payload to send to the API.
   * @returns Observable that emits RegisterResponse on success or throws a normalized error.
   */
  register(payload: RegisterRequest): Observable<RegisterResponse> {
    // Dispatch register action
    this.authStore.register(payload)

    // Return observable that waits for the result
    return new Observable<RegisterResponse>((observer) => {
      const subscription = this.authStore.isLoading$.subscribe((isLoading) => {
        if (!isLoading) {
          let errorMessage = ''
          this.authStore.error$
            .subscribe((error) => {
              errorMessage = error || ''
            })
            .unsubscribe()

          if (!errorMessage) {
            // Registration successful - create a mock response since we don't have the actual data
            const response: RegisterResponse = {
              id: '',
              email: payload.email,
              status: 'pending',
              token: '',
            }
            observer.next(response)
            observer.complete()
          } else {
            // Handle error
            // Normalize error messages
            let message = errorMessage
            if (errorMessage.includes('409') || errorMessage.includes('Conflict')) {
              message = 'Este correo electrónico ya está registrado.'
            }
            observer.error(new Error(message))
          }
          subscription.unsubscribe()
        }
      })
    })
  }
}
