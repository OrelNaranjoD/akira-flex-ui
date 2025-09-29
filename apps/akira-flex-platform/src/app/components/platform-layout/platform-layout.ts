import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core'
import { PlatformFooter } from '../platform-footer/platform-footer'
import { PlatformHeader } from '../platform-header/platform-header'
import { PlatformMenu } from '../platform-menu/platform-menu'
import { RouterOutlet } from '@angular/router'
import { PageTitleService } from '@shared'

/**
 * Platform Layout Component.
 */
@Component({
  selector: 'app-platform-layout',
  imports: [RouterOutlet, PlatformHeader, PlatformMenu, PlatformFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col min-h-screen">
      <!-- Header -->
      <app-platform-header></app-platform-header>
      <!-- Menu y contenido -->
      <div class="flex flex-1 flex-row">
        <aside>
          <app-platform-menu></app-platform-menu>
        </aside>
        <main class="flex-1">
          <router-outlet></router-outlet>
        </main>
      </div>
      <!-- Footer -->
      <app-platform-footer></app-platform-footer>
    </div>
  `,
})
export class PlatformLayout implements OnInit {
  private readonly pageTitleService = inject(PageTitleService)

  /**
   * Sets the platform page title on component initialization.
   */
  ngOnInit() {
    this.pageTitleService.setPlatformTitle()
  }
}
