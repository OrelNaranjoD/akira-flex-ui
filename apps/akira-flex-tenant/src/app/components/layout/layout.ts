import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { PageTitleService } from '@core'
import { Menu } from './menu/menu'
import { Footer } from './footer/footer'
import { Header } from './header/header'
import { MOCK_COMPANY_DATA } from '@mocks'

/**
 * Tenant Layout Component - Main layout for tenant operations.
 * Optimized for PyME users with intuitive navigation and simple interface.
 */
@Component({
  selector: 'tenant-layout',
  imports: [RouterOutlet, Header, Menu, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './layout.html',
})
export class Layout implements OnInit {
  private readonly pageTitleService = inject(PageTitleService)
  companyData = MOCK_COMPANY_DATA

  /**
   * Sets the tenant page title on component initialization.
   */
  ngOnInit() {
    this.pageTitleService.setTenantTitle(this.companyData.name, this.companyData.slogan)
  }
}
