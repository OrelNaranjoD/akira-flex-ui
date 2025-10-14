import { Injectable, inject } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { LoginRequest, LoginResponse } from '@core'
import { AuthService } from '@core'

/**
 * Service for handling user sign in.
 */
@Injectable()
export class SignInService {
  private readonly authService = inject(AuthService)

  /**
   * Send sign-in request to API and normalize errors.
   *
   * @param payload Sign-in payload to send to the API.
   * @returns Observable that emits LoginResponse on success or throws a normalized error.
   */
  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.authService.loginHardcoded(payload).pipe(
      map(() => {
        const user = this.authService.currentUser()
        const token = this.authService.getToken()
        if (user && token) {
          return {
            user,
            accessToken: token,
          } as LoginResponse
        }
        throw new Error('Sign-in failed - missing user or token')
      }),
      catchError((error) => {
        let message = 'Error al iniciar sesión.'
        if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
          message = 'Credenciales incorrectas. Por favor, revise su email y contraseña.'
        } else if (error.message?.includes('EMAIL_NOT_VERIFIED')) {
          message = 'Email no verificado. Por favor, revise su bandeja de entrada.'
        }
        return throwError(() => new Error(message))
      })
    )
  }
}
