import { Component, input } from '@angular/core'
import { PanelMenuModule } from 'primeng/panelmenu'

/**
 * Platform Menu Component - Dashboard navigation with collapsible support.
 */
@Component({
  selector: 'app-platform-menu',
  imports: [PanelMenuModule],
  template: `
    <div class="p-4">
      <p-panelmenu class="w-full md:w-60" [model]="items" [multiple]="true">
        <a class="flex items-center px-4 py-2 cursor-pointer group" pRipple>
          <ng-template #item let-item>
            <i [class]="item.icon + ' text-primary group-hover:text-inherit'"></i>
            <span class="ml-2">{{ item.label }}</span>
          </ng-template>
        </a>
      </p-panelmenu>
    </div>
  `,
})
export class PlatformMenu {
  isCollapsed = input(false)
  items = [
    {
      label: 'Dashboard',
      icon: 'pi pi-chart-line',
      routerLink: '/platform/dashboard',
    },
    {
      label: 'Analytics',
      icon: 'pi pi-chart-bar',
      routerLink: '/platform/analytics',
    },
    {
      label: 'Users',
      icon: 'pi pi-users',
      routerLink: '/platform/users',
    },
    {
      label: 'Tenants',
      icon: 'pi pi-building',
      routerLink: '/platform/tenants',
    },
    {
      label: 'Roles',
      icon: 'pi pi-users',
      routerLink: '/platform/roles',
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      routerLink: '/platform/settings',
    },
    {
      label: 'Audit',
      icon: 'pi pi-clipboard',
      routerLink: '/platform/audit',
    },
  ]
}
