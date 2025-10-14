import { Component, signal } from '@angular/core'
import { MenuItem } from 'primeng/api'
import { PanelMenu } from 'primeng/panelmenu'

/**
 * Tenant Menu Component - Business workflow-oriented navigation.
 * Organized by daily operations for SME users.
 */
@Component({
  selector: 'tenant-menu',
  imports: [PanelMenu],
  template: `<p-panelmenu class="w-full md:w-60 ps-4 space-y-1.5" [model]="items()" />`,
})
export class Menu {
  readonly items = signal<MenuItem[]>([
    {
      label: $localize`:@@mainPanel:Main panel`,
      icon: 'pi pi-home',
      routerLink: 'home',
    },
    {
      label: $localize`:@@finance:Finance`,
      icon: 'pi pi-wallet',
      items: [
        {
          label: $localize`:@@cashAndBanks:Cash and banks`,
          icon: 'pi pi-wallet',
          routerLink: 'cash',
        },
        {
          label: $localize`:@@receivables:Receivables`,
          icon: 'pi pi-arrow-down-left',
          routerLink: 'receivables',
        },
        {
          label: $localize`:@@payables:Payables`,
          icon: 'pi pi-arrow-up-right',
          routerLink: 'payables',
        },
      ],
    },
    {
      label: $localize`:@@sales:Sales`,
      icon: 'pi pi-shopping-cart',
      items: [
        {
          label: $localize`:@@newSale:New sale`,
          icon: 'pi pi-plus-circle',
          routerLink: 'sales/new',
        },
        {
          label: $localize`:@@salesHistory:Sales history`,
          icon: 'pi pi-shopping-cart',
          routerLink: 'sales',
        },
        {
          label: $localize`:@@customers:Customers`,
          icon: 'pi pi-users',
          routerLink: 'customers',
        },
      ],
    },
    {
      label: $localize`:@@inventory:Inventory`,
      icon: 'pi pi-box',
      items: [
        {
          label: $localize`:@@products:Products`,
          icon: 'pi pi-box',
          routerLink: 'products',
        },
        {
          label: $localize`:@@stock:Stock`,
          icon: 'pi pi-warehouse',
          routerLink: 'inventory',
        },
        {
          label: $localize`:@@suppliers:Suppliers`,
          icon: 'pi pi-truck',
          routerLink: 'suppliers',
        },
      ],
    },
    {
      label: $localize`:@@reports:Reports`,
      icon: 'pi pi-chart-bar',
      items: [
        {
          label: $localize`:@@salesReports:Sales reports`,
          icon: 'pi pi-chart-line',
          routerLink: 'reports/sales',
        },
        {
          label: $localize`:@@generalReports:General reports`,
          icon: 'pi pi-chart-bar',
          routerLink: 'reports',
        },
      ],
    },
    {
      label: $localize`:@@settings:Settings`,
      icon: 'pi pi-cog',
      routerLink: 'settings',
    },
  ])
}
