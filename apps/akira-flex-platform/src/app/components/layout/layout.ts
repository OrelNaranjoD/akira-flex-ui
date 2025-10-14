import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core'
import { Footer } from './footer/footer'
import { Header } from './header/header'
import { Menu } from './menu/menu'
import { RouterOutlet } from '@angular/router'
import { PageTitleService } from '@core'

/**
 * Platform Layout Component.
 */
@Component({
  selector: 'platform-layout',
  imports: [RouterOutlet, Header, Menu, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './layout.html',
})
export class Layout implements OnInit {
  private readonly pageTitleService = inject(PageTitleService)

  /**
   * Sets the platform page title on component initialization.
   */
  ngOnInit() {
    this.pageTitleService.setPlatformTitle()
  }
}
