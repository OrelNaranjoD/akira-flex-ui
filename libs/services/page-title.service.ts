import { Injectable, inject } from '@angular/core'
import { Title } from '@angular/platform-browser'

/**
 * Service to manage the page title dynamically.
 * Only tenant domain has dynamic titles, platform and landing have fixed titles.
 */
@Injectable({ providedIn: 'root' })
export class PageTitleService {
  private readonly titleService = inject(Title)

  /**
   * Sets a custom page title for a tenant domain.
   * This allows each tenant to have their company name and slogan as the page title.
   * @param companyName The name of the tenant company.
   * @param slogan Optional company slogan or tagline.
   * @param pageSubtitle Optional specific page subtitle (e.g., "Dashboard", "Ventas").
   */
  setTenantTitle(companyName: string, slogan?: string, pageSubtitle?: string): void {
    let title = companyName

    if (slogan) {
      title += ` - ${slogan}`
    }

    if (pageSubtitle) {
      title = `${pageSubtitle} - ${title}`
    }

    this.titleService.setTitle(title)
  }

  /**
   * Sets the fixed title for the landing page.
   */
  setLandingTitle(): void {
    this.titleService.setTitle('AkiraFlex - Sistema de Gestión Empresarial')
  }

  /**
   * Sets the fixed title for the platform administration.
   */
  setPlatformTitle(): void {
    this.titleService.setTitle('AkiraFlex - Administración')
  }
}
