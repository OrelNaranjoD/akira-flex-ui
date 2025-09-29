import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LandingFooter } from '../landing-footer/landing-footer'
import { LandingHeader } from '../landing-header/landing-header'
import { PageTitleService } from '@shared'

/**
 * Landing layout component.
 */
@Component({
  selector: 'app-landing-layout',
  imports: [RouterOutlet, LandingHeader, LandingFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen flex flex-col">
      <!-- Header -->
      <app-landing-header class="flex-shrink-0"></app-landing-header>

      <!-- Main Content Area -->
      <main class="flex-1 w-full">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <app-landing-footer></app-landing-footer>
    </div>
  `,
})
export class LandingLayout implements OnInit {
  private readonly pageTitleService = inject(PageTitleService)

  /**
   * Sets the landing page title on component initialization.
   */
  ngOnInit() {
    this.pageTitleService.setLandingTitle()
  }
}
