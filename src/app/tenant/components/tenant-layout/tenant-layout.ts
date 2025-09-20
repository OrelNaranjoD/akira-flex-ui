import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ThemeService } from '../../../core/services/theme.service'
import { PageTitleService } from '../../../core/services/page-title.service'
import { TenantMenu } from '../tenant-menu/tenant-menu'
import { TenantFooter } from '../tenant-footer/tenant-footer'
import { TenantHeader } from '../tenant-header/tenant-header'
import { NgClass } from '@angular/common'

/**
 * Tenant Layout Component - Main layout for tenant operations.
 * Optimized for PyME users with intuitive navigation and simple interface.
 */
@Component({
  selector: 'app-tenant-layout',
  imports: [RouterOutlet, TenantHeader, TenantMenu, TenantFooter, NgClass],
  template: `
    <div class="min-h-screen flex flex-col p-surface text-color transition-colors duration-300">
      <!-- Header -->
      <app-tenant-header
        class="p-surface-card border-bottom-1 p-shadow-1 w-full"
      ></app-tenant-header>

      <!-- Main: Sidebar + Content -->
      <div class="flex flex-1 min-h-0 overflow-hidden">
        <!-- Sidebar -->
        <aside
          class="flex-shrink-0 p-surface-card border-right-1 p-shadow-2 transition-all duration-300 flex flex-col"
          [ngClass]="{ 'w-18rem': !isCollapsed, 'w-5rem': isCollapsed }"
          aria-label="Sidebar"
        >
          <!-- Collapse control -->
          <div class="flex align-items-center justify-content-end p-3">
            <button
              class="p-button p-button-rounded p-button-text p-button-secondary"
              [attr.title]="isCollapsed ? 'Expandir menú' : 'Contraer menú'"
              (click)="toggleSidebar()"
              type="button"
              aria-label="Toggle navigation menu"
            >
              <i
                class="pi"
                [ngClass]="isCollapsed ? 'pi-chevron-right' : 'pi-chevron-left'"
                style="font-size: 1.2rem; color: var(--text-color, #6b7280);"
              ></i>
            </button>
          </div>
          <!-- Menu -->
          <div class="flex-1 overflow-auto px-2 pb-3">
            <app-tenant-menu [isCollapsed]="isCollapsed"></app-tenant-menu>
          </div>
        </aside>

        <!-- Content -->
        <main class="flex-1 min-w-0 overflow-auto p-5 p-surface-ground">
          <router-outlet></router-outlet>
        </main>
      </div>

      <!-- Footer -->
      <app-tenant-footer class="p-surface-card border-top-1 p-shadow-1"></app-tenant-footer>
    </div>
  `,
})
export class TenantLayout {
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
