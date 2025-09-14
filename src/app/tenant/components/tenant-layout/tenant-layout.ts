import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ThemeService } from '../../../core/services/theme.service'
import { PageTitleService } from '../../../core/services/page-title.service'
import { TenantHeader } from './tenant-header/tenant-header'
import { TenantMenu } from './tenant-menu/tenant-menu'
import { TenantFooter } from './tenant-footer/tenant-footer'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FontAwesomeService } from '../../../core/services/font-awesome.service'

/**
 * Tenant Layout Component - Main layout for tenant operations.
 * Optimized for PyME users with intuitive navigation and simple interface.
 */
@Component({
  selector: 'app-tenant-layout',
  imports: [RouterOutlet, TenantHeader, TenantMenu, TenantFooter, FontAwesomeModule],
  template: `
    <div
      class="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-300"
    >
      <!-- Header: Company branding and quick actions -->
      <app-tenant-header></app-tenant-header>

      <!-- Main: sidebar + content area -->
      <div class="flex flex-1 overflow-hidden">
        <!-- Sidebar: Business-oriented navigation -->
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
                class="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--color-muted)] hover:bg-[var(--color-accent)] transition-all duration-200 focus:outline-none group"
                [attr.title]="isCollapsed ? 'Expandir menú' : 'Contraer menú'"
                (click)="toggleSidebar()"
                aria-label="Toggle navigation menu"
              >
                <fa-icon
                  class="text-[var(--color-muted-foreground)] group-hover:text-white transition-colors duration-200"
                  [icon]="['fas', isCollapsed ? 'chevron-right' : 'chevron-left']"
                >
                </fa-icon>
              </button>
            </div>

            <!-- Menu content: business workflow oriented -->
            <div class="flex-1 overflow-auto px-4 pb-4">
              <app-tenant-menu [isCollapsed]="isCollapsed"></app-tenant-menu>
            </div>
          </div>
        </aside>

        <!-- Content area: main business operations -->
        <main class="flex-1 overflow-auto p-6 bg-[var(--color-background)]">
          <router-outlet></router-outlet>
        </main>
      </div>

      <!-- Footer: operational status and branch info -->
      <app-tenant-footer></app-tenant-footer>
    </div>
  `,
})
export class TenantLayout {
  private readonly fontAwesome = inject(FontAwesomeService)
  private readonly themeService = inject(ThemeService)
  private readonly pageTitleService = inject(PageTitleService)

  /**
   * Control whether the sidebar is collapsed to icons-only.
   * Starts expanded for better usability for non-technical users.
   */
  isCollapsed = false

  /** Toggle the sidebar collapsed state. */
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed
  }

  // Hardcoded company data for AkiraFlex example
  private readonly companyData = {
    logo: '/logotype.svg',
    name: 'AkiraFlex',
    slogan: 'Innovación y flexibilidad para tu PyME',
    branch: 'Sucursal Principal',
    rut: '12.345.678-9',
    address: 'Av. Principal 1234, Santiago',
  }

  constructor() {
    // Set tenant domain theme
    this.themeService.setDomain('tenant')
    // Hardcoded company data for AkiraFlex example
    this.pageTitleService.setTenantTitle(this.companyData.name, this.companyData.slogan)
  }
}
