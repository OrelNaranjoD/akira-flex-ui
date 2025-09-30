import { HttpErrorResponse } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable, catchError, throwError } from 'rxjs'
import { LoginRequest, AuthTokenResponse } from '@shared'
import { AuthService } from '@shared'

/**
 * Service for handling user login via the landing page.
 */
@Injectable()
export class LandingLoginService {
  private readonly authService = inject(AuthService)

  /**
   * Send login request to API and normalize errors.
   *
   * @param payload Login payload to send to the API.
   * @returns Observable that emits AuthTokenResponse on success or throws a normalized error.
   */
  login(payload: LoginRequest): Observable<AuthTokenResponse> {
    return this.authService.login(payload).pipe(
      catchError((err: HttpErrorResponse) => {
        let message = 'Error al iniciar sesión.'

        if (err.status === 401) {
          message = 'Credenciales incorrectas. Por favor, revise su email y contraseña.'
        } else if (err.error?.message === 'EMAIL_NOT_VERIFIED') {
          message = 'Email no verificado. Por favor, revise su bandeja de entrada.'
        } else if (err.error?.message) {
          message = err.error.message
        }

        const normalizedError = {
          status: err.status,
          message: message,
        }
        return throwError(() => normalizedError)
      })
    )
  }
}
