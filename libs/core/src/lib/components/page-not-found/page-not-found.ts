import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { AuthService } from '../../services/auth'

/**
 * Page not found component that handles 404 errors intelligently.
 * Shows different content based on authentication status.
 */
@Component({
  selector: 'app-page-not-found',
  imports: [ButtonModule, CardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './page-not-found.html',
})
export class PageNotFound {
  private readonly router = inject(Router)
  private readonly authService = inject(AuthService)

  readonly isAuthenticated = computed(() => this.authService.isAuthenticated())

  /**
   * Navigate to the dashboard page.
   */
  goToDashboard(): void {
    this.router.navigate(['home'])
  }

  /**
   * Navigate to the sign-in page.
   */
  goToSignIn(): void {
    this.router.navigate(['auth', 'sign-in'])
  }

  /**
   * Navigate back in history or to appropriate fallback page.
   */
  goBack(): void {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      if (this.isAuthenticated()) {
        this.goToDashboard()
      } else {
        this.goToSignIn()
      }
    }
  }
}
