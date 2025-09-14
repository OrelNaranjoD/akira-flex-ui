import { Component, inject } from '@angular/core'
import { PlatformFooter } from './platform-footer/platform-footer'
import { PlatformHeader } from './platform-header/platform-header'
import { PlatformMenu } from './platform-menu/platform-menu'
import { RouterOutlet } from '@angular/router'
import { ThemeService } from '../../../core/services/theme.service'
import { PageTitleService } from '../../../core/services/page-title.service'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FontAwesomeService } from '../../../core/services/font-awesome.service'

/**
 * Platform Layout Component.
 */
@Component({
  selector: 'app-platform-layout',
  imports: [RouterOutlet, PlatformHeader, PlatformMenu, PlatformFooter, FontAwesomeModule],
  template: `
    <div
      class="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-300"
    >
      <!-- Header: height automatic according to content -->
      <app-platform-header></app-platform-header>

      <!-- Main: left menu + content, fills remaining height -->
      <div class="flex flex-1 overflow-hidden">
        <!-- Sidebar: collapsable to icons only -->
        <aside
          class="flex-shrink-0 bg-[var(--color-card)] border-r border-[var(--color-border)] shadow-sm transition-all duration-300 ease-in-out"
          [class.w-64]="!isCollapsed"
          [class.w-18]="isCollapsed"
          aria-label="Sidebar"
        >
          <div class="h-full flex flex-col">
            <!-- Collapse control -->
            <div class="flex items-center justify-end p-4">
              <button
                class="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--color-muted)] hover:bg-[var(--color-card)] transition-all duration-200 focus:outline-none group"
                (click)="toggleSidebar()"
                aria-label="Toggle sidebar"
              >
                <fa-icon
                  class="text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)] transition-colors duration-200"
                  [icon]="['fas', isCollapsed ? 'chevron-right' : 'chevron-left']"
                >
                </fa-icon>
              </button>
            </div>

            <!-- Menu content: the actual menu component handles collapsed presentation -->
            <div class="flex-1 overflow-auto px-4">
              <app-platform-menu [isCollapsed]="isCollapsed"></app-platform-menu>
            </div>
          </div>
        </aside>

        <!-- Content area: automatically adjusts to available height -->
        <main class="flex-1 overflow-auto p-6 bg-[var(--color-background)]">
          <router-outlet></router-outlet>
        </main>
      </div>

      <!-- Footer: automatic height, stick to bottom -->
      <footer class="w-full bg-[var(--color-card)] border-t border-[var(--color-border)]">
        <app-platform-footer></app-platform-footer>
      </footer>
    </div>
  `,
})
export class PlatformLayout {
  private readonly fontAwesome = inject(FontAwesomeService)
  private readonly themeService = inject(ThemeService)
  private readonly pageTitleService = inject(PageTitleService)

  /**
   * Control whether the left sidebar is collapsed to icons-only.
   */
  isCollapsed = false

  /** Toggle the sidebar collapsed state. */
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed
  }

  constructor() {
    this.themeService.setDomain('platform')
    this.pageTitleService.setPlatformTitle()
  }
}
