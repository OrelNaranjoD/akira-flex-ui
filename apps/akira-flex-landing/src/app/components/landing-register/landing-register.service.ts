import { Injectable, inject } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'
import { RegisterRequest, RegisterResponse } from '@shared'
import { AuthService } from '@shared'

/**
 * Service for handling user registration via the landing page.
 */
@Injectable()
export class LandingRegisterService {
  private readonly authService = inject(AuthService)

  /**
   * Send register request to API and normalize errors.
   *
   * @param payload Registration payload to send to the API.
   * @returns Observable that emits RegisterResponse on success or throws a normalized error.
   */
  register(payload: RegisterRequest): Observable<RegisterResponse> {
    return this.authService.register(payload).pipe(
      catchError((err: HttpErrorResponse) => {
        let message = err.error?.message ?? err.message
        if (err.status === 409) {
          message = 'Este correo electrónico ya está registrado.'
        }
        const normalized = {
          status: err.status,
          message: message,
          fields: err.error?.fields ?? null,
        }
        return throwError(() => normalized)
      })
    )
  }
}
