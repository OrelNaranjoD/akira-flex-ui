import {
  Component,
  ChangeDetectionStrategy,
  inject,
  ElementRef,
  ViewChild,
  AfterViewInit,
  PLATFORM_ID,
} from '@angular/core'
import { Router } from '@angular/router'
import { isPlatformBrowser } from '@angular/common'
import { MenubarModule } from 'primeng/menubar'
import { MenuItem } from 'primeng/api'

/**
 * Landing Menu Component.
 */
@Component({
  selector: 'app-landing-menu',
  imports: [MenubarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-menubar
      class="font-roboto text-sm no-wrap"
      #menubar
      [model]="items"
      [breakpoint]="dynamicBreakpoint"
    ></p-menubar>
  `,
  styles: [
    `
      :host ::ng-deep .p-menubar {
        background: transparent;
        border: none;
      }

      :host ::ng-deep .p-menubar-root-list {
        gap: 0;
        flex-wrap: nowrap;
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

      :host ::ng-deep .p-menubar-item-label {
        white-space: nowrap;
      }
    `,
  ],
})
export class LandingMenu implements AfterViewInit {
  @ViewChild('menubar', { static: true }) menubar!: ElementRef

  dynamicBreakpoint = '1030px'

  items: MenuItem[] = [
    {
      label: 'Beneficios',
      icon: 'pi pi-building-columns',
      command: () => this.scrollTo('features'),
    },
    { label: 'Características', icon: 'pi pi-th-large', command: () => this.scrollTo('modules') },
    { label: 'Industrias', icon: 'pi pi-briefcase', command: () => this.scrollTo('sectors') },
    { label: 'Tecnología', icon: 'pi pi-desktop', command: () => this.scrollTo('technology') },
    { label: 'Planes', icon: 'pi pi-tag', command: () => this.scrollTo('pricing') },
  ]

  private readonly router: Router = inject(Router)
  private readonly platformId = inject(PLATFORM_ID)

  /**
   * Lifecycle hook that is called after Angular has fully initialized the component's view.
   */
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => {
        if (this.menubar?.nativeElement && this.menubar.nativeElement instanceof Element) {
          const observer = new ResizeObserver(() => {
            const list = this.menubar.nativeElement.querySelector('.p-menubar-root-list')
            if (list) {
              const containerWidth = this.menubar.nativeElement.clientWidth
              const listWidth = list.scrollWidth
              this.dynamicBreakpoint = listWidth > containerWidth ? '9999px' : '0px'
            }
          })
          observer.observe(this.menubar.nativeElement)
        }
      })
    }
  }

  /**
   * Scroll to a specific fragment on the page.
   * @param fragment The fragment identifier to scroll to.
   */
  private readonly scrollTo = (fragment: string) => {
    this.router.navigate([], { fragment })
  }
}
