import { Component, signal, effect, inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { Menu } from '../menu/menu'
import { Auth } from '../../auth/auth'
import { Logotype, Profile, ThemeSwitch, LanguageSwitcher } from '@core'

/**
 * Landing header component.
 */
@Component({
  selector: 'landing-header',
  imports: [Menu, Auth, Logotype, Profile, ThemeSwitch, LanguageSwitcher],
  host: {
    class: 'block',
  },
  templateUrl: './header.html',
})
export class Header {
  private readonly platformId = inject(PLATFORM_ID)
  isLoggedIn = false
  readonly isScrolled = signal(false)

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const onScroll = () => this.isScrolled.set(window.pageYOffset > 10)
      window.addEventListener('scroll', onScroll)
      effect((onCleanup) => {
        onCleanup(() => window.removeEventListener('scroll', onScroll))
      })
    }
  }

  /**
   * Update login state after successful authentication.
   */
  onLogin(): void {
    this.isLoggedIn = true
  }
}
