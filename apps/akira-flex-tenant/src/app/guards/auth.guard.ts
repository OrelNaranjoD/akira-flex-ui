import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '@core'

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)

  const isAuth = authService.isAuthenticated()

  if (!isAuth) {
    router.navigate(['auth', 'sign-in'])
    return false
  }

  return isAuth
}
