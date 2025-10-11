import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { PageTitleService } from '@core'
import { TenantMenu } from '../tenant-menu/tenant-menu'
import { TenantFooter } from '../tenant-footer/tenant-footer'
import { TenantHeader } from '../tenant-header/tenant-header'
import { MOCK_COMPANY_DATA } from '@mocks'

/**
 * Tenant Layout Component - Main layout for tenant operations.
 * Optimized for PyME users with intuitive navigation and simple interface.
 */
@Component({
  selector: 'app-tenant-layout',
  imports: [RouterOutlet, TenantHeader, TenantMenu, TenantFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen flex flex-col">
      <app-tenant-header></app-tenant-header>
      <div class="flex flex-1 min-h-0">
        <div class="w-64 flex-shrink-0">
          <app-tenant-menu></app-tenant-menu>
        </div>
        <main class="flex-1 min-w-0 overflow-auto p-5">
          <router-outlet></router-outlet>
        </main>
      </div>
      <app-tenant-footer></app-tenant-footer>
    </div>
  `,
})
export class TenantLayoutComponent implements OnInit {
  private readonly pageTitleService = inject(PageTitleService)
  companyData = MOCK_COMPANY_DATA

  /**
   * Sets the tenant page title on component initialization.
   */
  ngOnInit() {
    this.pageTitleService.setTenantTitle(this.companyData.name, this.companyData.slogan)
  }
}
