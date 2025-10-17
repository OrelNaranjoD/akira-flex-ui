import { inject } from '@angular/core'
import { Router, type CanActivateFn } from '@angular/router'
import { AuthService } from '@core'

/**
 * Guard to protect routes that require system administrator authentication.
 * Redirects to sign-in page if user is not authenticated or not an admin.
 *
 * @returns True if user is authenticated and has admin role, false otherwise.
 */
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)

  const isAuthenticated = authService.isAuthenticated()
  const currentUser = authService.currentUser()

  if (!isAuthenticated || !currentUser) {
    router.navigate(['/auth/sign-in'])
    return false
  }

  if (!currentUser.roles.includes('admin')) {
    router.navigate(['/auth/sign-in'])
    return false
  }

  return true
}
