import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { PageTitleService } from '@shared'
import { TenantMenu } from '../tenant-menu'
import { TenantFooter } from '../tenant-footer/tenant-footer'
import { TenantHeader } from '../tenant-header/tenant-header'

/**
 * Tenant Layout Component - Main layout for tenant operations.
 * Optimized for PyME users with intuitive navigation and simple interface.
 */
@Component({
  selector: 'app-tenant-layout',
  imports: [RouterOutlet, TenantHeader, TenantMenu, TenantFooter],
  template: `
    <div class="min-h-screen flex flex-col">
      <!-- Header -->
      <app-tenant-header></app-tenant-header>
      <!-- Main Row: Menu + Content -->
      <div class="flex flex-1 min-h-0">
        <!-- Menu (sidebar) -->
        <div class="w-64 flex-shrink-0 bg-surface-0">
          <app-tenant-menu></app-tenant-menu>
        </div>
        <!-- Content -->
        <main class="flex-1 min-w-0 overflow-auto p-5 p-surface-ground">
          <router-outlet></router-outlet>
        </main>
      </div>
      <!-- Footer -->
      <app-tenant-footer></app-tenant-footer>
    </div>
  `,
})
export class TenantLayout {
  private readonly pageTitleService = inject(PageTitleService)

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
    this.pageTitleService.setTenantTitle(this.companyData.name, this.companyData.slogan)
  }
}
