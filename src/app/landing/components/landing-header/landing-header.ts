import { Component, HostListener } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LandingMenu } from '../landing-menu/landing-menu'
import { LandingAuth } from '../landing-auth/landing-auth'
import { Logotype } from '../../../core/components/logotype/logotype'
import { Profile } from '../../../core/components/profile/profile'
import { ThemeSwitch } from '../../../core/components/theme-switch/theme-switch'

/**
 * Landing header component.
 */
@Component({
  selector: 'app-landing-header',
  imports: [CommonModule, LandingMenu, LandingAuth, Logotype, Profile, ThemeSwitch],
  template: `
    <header
      class="fixed top-0 left-0 right-0 z-5 text-color px-4 w-full shadow-1 transition-all duration-300"
      [ngStyle]="headerStyles"
    >
      <div class="flex align-items-center justify-content-between w-full h-full min-h-6rem">
        <div
          class="flex-shrink-0 transition-all duration-300"
          [ngClass]="{ 'opacity-0 invisible': isScrolled }"
        >
          <app-logotype></app-logotype>
        </div>

        <div class="flex-1 flex justify-content-center mx-8">
          <app-landing-menu></app-landing-menu>
        </div>

        <div
          class="flex align-items-center gap-2 sm:gap-3 relative"
          [ngClass]="{ 'opacity-0 invisible': isScrolled }"
        >
          <app-theme-switch></app-theme-switch>
          <ng-container *ngIf="!isLoggedIn; else logged">
            <app-landing-auth (loginSuccess)="onLogin()"></app-landing-auth>
          </ng-container>
          <ng-template #logged>
            <app-profile></app-profile>
          </ng-template>
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
