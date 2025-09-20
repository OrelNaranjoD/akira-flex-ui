import { Component, input } from '@angular/core'
import { PanelMenuModule } from 'primeng/panelmenu'
import { NgClass } from '@angular/common'

/**
 * Tenant Menu Component - Business workflow-oriented navigation.
 * Organized by daily operations for PyME users.
 */
@Component({
  selector: 'app-tenant-menu',
  imports: [PanelMenuModule, NgClass],
  template: `
    <p-panelmenu
      class="w-full md:w-60 p-0 border-0 shadow-none bg-transparent"
      [model]="items"
      [ngClass]="{ 'tenant-menu-collapsed': isCollapsed() }"
      [multiple]="true"
    ></p-panelmenu>
  `,
})
export class TenantMenu {
  isCollapsed = input(false)
  items = [
    {
      label: 'Panel Principal',
      icon: 'pi pi-home',
      routerLink: '/home',
    },
    {
      label: 'Finanzas',
      icon: 'pi pi-wallet',
      items: [
        {
          label: 'Caja y Bancos',
          icon: 'pi pi-wallet',
          routerLink: '/cash',
        },
        {
          label: 'Por Cobrar',
          icon: 'pi pi-arrow-down-left',
          routerLink: '/receivables',
        },
        {
          label: 'Por Pagar',
          icon: 'pi pi-arrow-up-right',
          routerLink: '/payables',
        },
      ],
    },
    {
      label: 'Ventas',
      icon: 'pi pi-shopping-cart',
      items: [
        {
          label: 'Nueva Venta',
          icon: 'pi pi-plus-circle',
          routerLink: '/sales/new',
        },
        {
          label: 'Historial de Ventas',
          icon: 'pi pi-shopping-cart',
          routerLink: '/sales',
        },
        {
          label: 'Clientes',
          icon: 'pi pi-users',
          routerLink: '/customers',
        },
      ],
    },
    {
      label: 'Inventario',
      icon: 'pi pi-box',
      items: [
        {
          label: 'Productos',
          icon: 'pi pi-box',
          routerLink: '/products',
        },
        {
          label: 'Stock',
          icon: 'pi pi-warehouse',
          routerLink: '/inventory',
        },
        {
          label: 'Proveedores',
          icon: 'pi pi-truck',
          routerLink: '/suppliers',
        },
      ],
    },
    {
      label: 'Reportes',
      icon: 'pi pi-chart-bar',
      routerLink: '/reports',
    },
    {
      label: 'Configuración',
      icon: 'pi pi-cog',
      routerLink: '/settings',
    },
  ]
}
