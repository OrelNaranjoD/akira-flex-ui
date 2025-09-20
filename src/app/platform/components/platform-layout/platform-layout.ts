import { Component, inject, signal } from '@angular/core'
import { PlatformFooter } from '../platform-footer/platform-footer'
import { PlatformHeader } from '../platform-header/platform-header'
import { PlatformMenu } from '../platform-menu/platform-menu'
import { RouterOutlet } from '@angular/router'
import { ThemeService } from '../../../core/services/theme.service'
import { PageTitleService } from '../../../core/services/page-title.service'
import { NgClass } from '@angular/common'

/**
 * Platform Layout Component.
 */
@Component({
  selector: 'app-platform-layout',
  imports: [RouterOutlet, PlatformHeader, PlatformMenu, PlatformFooter, NgClass],
  template: `
    <div class="flex flex-col min-h-screen">
      <!-- Header -->
      <app-platform-header></app-platform-header>
      <!-- Menu y contenido -->
      <div class="flex flex-1 flex-row">
        <aside>
          <app-platform-menu></app-platform-menu>
        </aside>
        <main class="flex-1">
          <router-outlet></router-outlet>
        </main>
      </div>
      <!-- Footer -->
      <app-platform-footer></app-platform-footer>
    </div>
  `,
})
export class PlatformLayout {
  private readonly themeService = inject(ThemeService)
  private readonly pageTitleService = inject(PageTitleService)

  /**
   * Control whether the left sidebar is collapsed to icons-only.
   */
  isCollapsed = signal(false)

  /** Toggle the sidebar collapsed state. */
  toggleSidebar() {
    this.isCollapsed.update((v) => !v)
  }

  constructor() {
    this.themeService.setDomain('platform')
    this.pageTitleService.setPlatformTitle()
  }
}
