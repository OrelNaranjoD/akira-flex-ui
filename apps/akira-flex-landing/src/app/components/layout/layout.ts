import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Footer } from './footer/footer'
import { Header } from './header/header'
import { PageTitleService } from '@core'

/**
 * Landing layout component.
 */
@Component({
  selector: 'landing-layout',
  imports: [RouterOutlet, Header, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen flex flex-col">
      <!-- Header -->
      <landing-header class="flex-shrink-0" />

      <!-- Main Content Area -->
      <main class="flex-1 w-full pt-15">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <landing-footer class="flex-shrink-0" />
    </div>
  `,
})
export class Layout implements OnInit {
  private readonly pageTitleService = inject(PageTitleService)

  /**
   * Sets the landing page title on component initialization.
   */
  ngOnInit() {
    this.pageTitleService.setLandingTitle()
  }
}
