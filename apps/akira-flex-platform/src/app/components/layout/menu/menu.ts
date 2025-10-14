import { Component, input } from '@angular/core'
import { PanelMenu } from 'primeng/panelmenu'

/**
 * Platform Menu Component - Dashboard navigation with collapsible support.
 */
@Component({
  selector: 'platform-menu',
  imports: [PanelMenu],
  templateUrl: './menu.html',
})
export class Menu {
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
