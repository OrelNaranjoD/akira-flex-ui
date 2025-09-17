import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable, map, catchError, throwError } from 'rxjs'
import { environment } from '../../../../environments/environment'
import { LoginRequest, LoginResponse } from '@flex-shared-lib'

/**
 * Service for handling user login via the landing page.
 */
@Injectable()
export class LandingLoginService {
  private readonly loginUrl = environment.apiBaseUrl + '/auth/login'
  private readonly http = inject(HttpClient)

  /**
   * Send login request to API and normalize errors.
   *
   * @param payload Login payload to send to the API.
   * @returns Observable that emits LoginResponse on success or throws a normalized error.
   */
  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, payload).pipe(
      map((res) => res),
      catchError((err: HttpErrorResponse) => {
        let message = 'Error al iniciar sesión.' // Default message

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
