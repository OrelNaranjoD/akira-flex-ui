import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'
import { MenubarModule } from 'primeng/menubar'
import { MenuItem } from 'primeng/api'

/**
 * Landing Menu Component.
 */
@Component({
  selector: 'app-landing-menu',
  imports: [MenubarModule],
  template: ` <p-menubar class="font-roboto text-sm" [model]="items"></p-menubar> `,
  styles: [
    `
      :host ::ng-deep .p-menubar {
        background: transparent;
        border: none;
      }

      :host ::ng-deep .p-menubar-root-list {
        gap: 0;
      }

      :host ::ng-deep .p-menubar-item-link:hover {
        color: var(--p-primary-color);
        background: transparent;
      }

      :host ::ng-deep .p-menubar-item-focus-color {
        background: transparent;
      }

      :host ::ng-deep .p-menubar-item-link:hover .pi {
        color: var(--p-primary-color);
      }

      :host ::ng-deep .p-menubar-item-content:hover {
        background: transparent;
      }
    `,
  ],
})
export class LandingMenu {
  items: MenuItem[] = [
    {
      label: '¿Por qué AkiraFlex?',
      icon: 'pi pi-building-columns',
      command: () => this.scrollTo('features'),
    },
    { label: 'Módulos', icon: 'pi pi-th-large', command: () => this.scrollTo('modules') },
    { label: 'Sectores', icon: 'pi pi-briefcase', command: () => this.scrollTo('sectors') },
    { label: 'Tecnología', icon: 'pi pi-desktop', command: () => this.scrollTo('technology') },
    { label: 'Precios', icon: 'pi pi-tag', command: () => this.scrollTo('pricing') },
    { label: 'Testimonios', icon: 'pi pi-comments', command: () => this.scrollTo('testimonials') },
  ]

  private readonly router: Router = inject(Router)

  /**
   * Scroll to a specific fragment on the page.
   * @param fragment The fragment identifier to scroll to.
   */
  private readonly scrollTo = (fragment: string) => {
    this.router.navigate([], { fragment })
  }
}
