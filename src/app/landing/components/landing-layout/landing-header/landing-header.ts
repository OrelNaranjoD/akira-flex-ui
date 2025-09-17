import { Component, HostListener } from '@angular/core'
import { LandingMenu } from '../../landing-menu/landing-menu'
import { LandingAuth } from '../../landing-auth/landing-auth'
import { Logotype } from '../../../../core/components/logotype/logotype'
import { Profile } from '../../../../core/components/profile/profile'
import { ThemeSwitch } from '../../../../core/components/theme-switch/theme-switch'

/**
 * Landing header component.
 */
@Component({
  selector: 'app-landing-header',
  imports: [LandingMenu, LandingAuth, Logotype, Profile, ThemeSwitch],
  template: `
    <header
      class="fixed top-0 left-0 right-0 z-50 text-[var(--color-foreground)] px-4 w-full shadow-sm transition-all duration-300"
      [style]="headerStyles"
    >
      <div class="flex items-center justify-between w-full h-full min-h-[64px]">
        <div
          class="flex-shrink-0 transition-all duration-300"
          [class.opacity-0]="isScrolled"
          [class.invisible]="isScrolled"
        >
          <app-logotype></app-logotype>
        </div>

        <div class="flex-1 flex justify-center mx-8">
          <app-landing-menu></app-landing-menu>
        </div>

        <div
          class="flex items-center gap-2 sm:gap-3 transition-all duration-300"
          [class.opacity-0]="isScrolled"
          [class.invisible]="isScrolled"
        >
          <app-theme-switch></app-theme-switch>

          @if (!isLoggedIn) {
            <app-landing-auth (loginSuccess)="onLogin()"></app-landing-auth>
          } @else {
            <app-profile></app-profile>
          }
        </div>
      </div>
    </header>
  `,
})
export class LandingHeader {
  isLoggedIn = false
  isScrolled = false

  /**
   * Dynamic CSS styles for the header based on scroll state.
   * @returns CSS styles object.
   */
  get headerStyles(): { [key: string]: string } {
    if (this.isScrolled) {
      return {
        'backdrop-filter': 'blur(2px)',
        'border-bottom': 'none',
        background: `var(--color-background)`,
        opacity: '0.8',
      }
    } else {
      return {
        'border-bottom': '1px solid rgba(var(--border-rgb, 228, 228, 231), 0.5)',
        'backdrop-filter': 'none',
        background: 'var(--color-background)',
      }
    }
  }

  /**
   * Listen to window scroll events to update header state.
   */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.pageYOffset > 10
  }

  /**
   * Sets the login state to true.
   */
  onLogin(): void {
    this.isLoggedIn = true
  }
}
