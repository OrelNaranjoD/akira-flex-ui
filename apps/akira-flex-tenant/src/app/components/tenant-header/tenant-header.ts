import { Component, signal, OnInit } from '@angular/core'
import { ThemeSwitch, Profile, SearchBox, NotificationButton, AppNotification } from '@shared'
import { CompanyIdentity } from '../company-identity/company-identity'

/**
 * Tenant Header Component - Business-focused header with company branding and operational tools.
 * Designed for PyME users with quick access to daily operations.
 */
@Component({
  selector: 'app-tenant-header',
  imports: [ThemeSwitch, NotificationButton, Profile, SearchBox, CompanyIdentity],
  template: `
    <header class="flex items-center px-5 py-3 p-surface-card border-bottom-1 p-shadow-1 w-full">
      <!-- Logo/Identidad a la izquierda -->
      <div class="flex items-center gap-3">
        <app-tenant-company-identity
          [logo]="companyData.logo"
          [name]="companyData.name"
          [slogan]="companyData.slogan"
          size="large"
        ></app-tenant-company-identity>
      </div>
      <!-- Espaciador flexible -->
      <div class="flex-1"></div>
      <!-- Elementos a la derecha -->
      <div class="flex items-center gap-3">
        <app-search-box
          (searchQuery)="onSearch($event)"
          (enterPressed)="onSearchEnter($event)"
          placeholder="Buscar..."
          width="100%"
        ></app-search-box>
        <button class="p-button p-button-icon-only p-button-text p-button-secondary" title="Ayuda">
          <i class="pi pi-question-circle"></i>
        </button>
        <app-notification-button
          [notifications]="notifications()"
          (notificationRead)="markAsRead($event)"
          (markAllRead)="markAllAsRead()"
        ></app-notification-button>
        <app-theme-switch></app-theme-switch>
        <app-profile></app-profile>
      </div>
    </header>
  `,
})
export class TenantHeader implements OnInit {
  // Hardcoded company data for AkiraFlex example
  companyData = {
    logo: '/logotype.svg',
    name: 'AkiraFlex',
    slogan: 'Innovación y flexibilidad para tu PyME',
    branch: 'Sucursal Principal',
    rut: '12.345.678-9',
    address: 'Av. Principal 1234, Santiago',
  }

  notifications = signal<AppNotification[]>([])

  /**
   * Initialization logic to set default notifications for tenant.
   */
  ngOnInit(): void {
    this.notifications.set([
      {
        id: 1,
        title: 'Nueva venta registrada',
        message: 'Se ha registrado una venta por $125.000',
        time: 'Hace 10 minutos',
        read: false,
        type: 'success',
      },
      {
        id: 2,
        title: 'Stock bajo',
        message: 'El producto "Widget A" tiene solo 5 unidades',
        time: 'Hace 30 minutos',
        read: false,
        type: 'warning',
      },
      {
        id: 3,
        title: 'Pago recibido',
        message: 'Cliente Juan Pérez ha pagado factura #1234',
        time: 'Hace 2 horas',
        read: true,
        type: 'info',
      },
    ])
  }

  /**
   * Handle search query.
   * @param query - The search query string.
   */
  onSearch(query: string) {
    if (query.trim()) {
      console.log('Searching for:', query)
    }
  }

  /**
   * Handle search enter key press.
   * @param query - The search query string.
   */
  onSearchEnter(query: string) {
    if (query.trim()) {
      console.log('Quick search for:', query)
    }
  }

  /**
   * Mark notification as read.
   * @param notificationId ID of the notification to mark as read.
   */
  markAsRead(notificationId: number) {
    this.notifications.update((notifications) =>
      notifications.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification
      )
    )
  }

  /**
   * Mark all notifications as read.
   */
  markAllAsRead() {
    this.notifications.update((notifications) =>
      notifications.map((notification) => ({ ...notification, read: true }))
    )
  }

  /** Quick action to create a new sale. */
  quickNewSale() {
    console.log('Opening new sale form...')
  }

  /** Quick action to view reports. */
  quickReports() {
    console.log('Opening quick reports...')
  }
}
