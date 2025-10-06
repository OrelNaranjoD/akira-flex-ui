import { Component, HostListener } from '@angular/core'
import { NgStyle } from '@angular/common'
import { LandingMenu } from '../landing-menu/landing-menu'
import { LandingAuth } from '../landing-auth/landing-auth'
import { Logotype, Profile, ThemeSwitch } from '@shared'

/**
 * Landing header component.
 */
@Component({
  selector: 'app-landing-header',
  imports: [NgStyle, LandingMenu, LandingAuth, Logotype, Profile, ThemeSwitch],
  template: `
    <header class="fixed top-0 left-0 z-5 px-2 w-full h-15" [ngStyle]="headerStyles">
      <div class="flex flex-row items-center">
        <div class="flex-shrink-0">
          <app-logotype></app-logotype>
        </div>

        <div class="flex-1 flex justify-end">
          <app-landing-menu></app-landing-menu>
        </div>

        <div class="flex items-center gap-2 sm:gap-3">
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
        'border-bottom': '1px solid rgba(228, 228, 231, 0.8)',
        background: `color-mix(in srgb, #f59e0b 5%, transparent)`,
        transition: 'all 0.3s ease',
      }
    } else {
      return {
        'border-bottom': '1px solid rgba(228, 228, 231, 0.8)',
        background: 'var(--p-surface-color)',
        transition: 'all 0.3s ease',
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
