import { inject } from '@angular/core'
import { HttpInterceptorFn } from '@angular/common/http'
import { AuthService } from '../services/auth'

/**
 * HTTP interceptor function that adds authorization headers to outgoing requests.
 * @param req The outgoing HTTP request.
 * @param next The next interceptor in the chain.
 * @returns Observable of HTTP events.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)

  if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
    return next(req)
  }

  if (authService.isAuthenticated()) {
    const authReq = req.clone({
      headers: authService.getAuthHeaders(),
    })
    return next(authReq)
  }

  return next(req)
}
