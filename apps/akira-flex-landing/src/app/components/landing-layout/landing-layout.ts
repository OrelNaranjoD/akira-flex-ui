import { Component, inject } from '@angular/core'
import { LandingFooter } from '../landing-footer/landing-footer'
import { LandingHeader } from '../landing-header/landing-header'
import { LandingHome } from '../../pages/landing-home/landing-home'
import { PageTitleService } from '@shared'

/**
 * Landing layout component.
 */
@Component({
  selector: 'app-landing-layout',
  imports: [LandingHeader, LandingFooter, LandingHome],
  template: `
    <div class="min-h-screen flex flex-col">
      <!-- Header -->
      <app-landing-header class="flex-shrink-0"></app-landing-header>

      <!-- Main Content Area -->
      <main class="flex-1 w-full">
        <app-landing-home></app-landing-home>
      </main>

      <!-- Footer -->
      <app-landing-footer></app-landing-footer>
    </div>
  `,
})
export class LandingLayout {
  private readonly pageTitleService = inject(PageTitleService)

  constructor() {
    this.pageTitleService.setLandingTitle()
  }
}
