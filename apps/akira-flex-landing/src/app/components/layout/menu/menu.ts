import {
  Component,
  ChangeDetectionStrategy,
  inject,
  ElementRef,
  ViewChild,
  PLATFORM_ID,
} from '@angular/core'
import { Router } from '@angular/router'
import { Menubar } from 'primeng/menubar'
import { MenuItem } from 'primeng/api'

/**
 * Landing Menu Component.
 */
@Component({
  selector: 'landing-menu',
  imports: [Menubar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-menubar class="font-roboto text-sm no-wrap" #menubar [model]="items"></p-menubar>
  `,
})
export class Menu {
  @ViewChild('menubar', { static: true }) menubar!: ElementRef

  items: MenuItem[] = [
    {
      label: $localize`:@@benefits:Benefits`,
      icon: 'pi pi-building-columns',
      command: () => this.scrollTo('features'),
    },
    {
      label: $localize`:@@features:Features`,
      icon: 'pi pi-th-large',
      command: () => this.scrollTo('modules'),
    },
    {
      label: $localize`:@@industries:Industries`,
      icon: 'pi pi-briefcase',
      command: () => this.scrollTo('sectors'),
    },
    {
      label: $localize`:@@technology:Technology`,
      icon: 'pi pi-desktop',
      command: () => this.scrollTo('technology'),
    },
    {
      label: $localize`:@@plans:Pricing`,
      icon: 'pi pi-tag',
      command: () => this.scrollTo('pricing'),
    },
  ]

  private readonly router: Router = inject(Router)
  private readonly platformId = inject(PLATFORM_ID)

  /**
   * Scroll to a specific fragment on the page.
   * @param fragment The fragment identifier to scroll to.
   */
  private readonly scrollTo = (fragment: string) => {
    this.router.navigate([], { fragment })
  }
}
