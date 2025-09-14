import { Component, HostListener } from '@angular/core'
import { LandingMenu } from '../../landing-menu/landing-menu'
import { LandingLogin } from '../../landing-login/landing-login'
import { Logotype } from '../../../../core/components/logotype/logotype'
import { Profile } from '../../../../core/components/profile/profile'
import { ThemeSwitch } from '../../../../core/components/theme-switch/theme-switch'

/**
 * Landing header component.
 */
@Component({
  selector: 'app-landing-header',
  imports: [LandingMenu, LandingLogin, Logotype, Profile, ThemeSwitch],
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
            <app-landing-login></app-landing-login>
          } @else {
            <app-profile></app-profile>
          }
          <button
            class="relative py-2 px-4 text-sm text-white rounded-full hover:shadow-lg bg-linear-to-br from-[var(--color-primary)] to-[var(--color-accent)] border-white border hover:from-[var(--color-primary)]/70 hover:to-[var(--color-accent)]/70 hover:!text-white"
            (click)="requestDemo()"
          >
            Solicitar Demo
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [],
})
export class LandingHeader {
  isLoggedIn = true
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
   * Handles demo request action.
   * Currently shows an alert for demonstration purposes.
   */
  requestDemo(): void {
    alert('Demo request functionality will be implemented here')
  }
}
