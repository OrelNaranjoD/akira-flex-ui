import { Injectable, inject } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { RegisterRequest, RegisterResponse, AuthService } from '@core'

/**
 * Service for handling user registration via the landing page.
 */
@Injectable()
export class SignUpService {
  private readonly authService = inject(AuthService)

  /**
   * Send register request to API and normalize errors.
   *
   * @param payload Registration payload to send to the API.
   * @returns Observable that emits RegisterResponse on success or throws a normalized error.
   */
  register(payload: RegisterRequest): Observable<RegisterResponse> {
    return this.authService.register(payload).pipe(
      // Normalize error messages
      catchError((error) => {
        let message = error.message || 'Error en el registro.'
        if (error.message?.includes('409') || error.message?.includes('Conflict')) {
          message = 'Este correo electrónico ya está registrado.'
        }
        return throwError(() => new Error(message))
      })
    )
  }
}
