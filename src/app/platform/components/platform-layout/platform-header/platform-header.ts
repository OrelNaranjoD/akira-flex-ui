import { Component, signal, OnInit } from '@angular/core'
import { ThemeSwitch } from '../../../../core/components/theme-switch/theme-switch'
import { Logotype } from '../../../../core/components/logotype/logotype'
import { Profile } from '../../../../core/components/profile/profile'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { SearchBox } from '../../../../core/components/search-box/search-box'
import { NotificationButton } from '../../../../core/components/notification-button/notification-button'
import { AppNotification } from '@flex-shared-lib'

/**
 * Platform Header Component - Dashboard navigation header.
 */
@Component({
  selector: 'app-platform-header',
  imports: [ThemeSwitch, NotificationButton, Logotype, SearchBox, Profile, FontAwesomeModule],
  template: `
    <header
      class="flex items-center justify-between px-4 py-2 bg-[var(--color-card)] border-b border-[var(--color-border)]"
    >
      <!-- Left Section: Logo -->
      <div class="flex items-center gap-4">
        <app-logotype></app-logotype>
      </div>

      <!-- Right Section: Actions and User -->
      <div class="flex items-center gap-3">
        <!-- Search -->
        <app-search-box></app-search-box>

        <!-- Notifications -->
        <app-notification-button
          [notifications]="notifications()"
          (notificationRead)="markAsRead($event)"
          (markAllRead)="markAllAsRead()"
        ></app-notification-button>

        <!-- Theme Switch -->
        <app-theme-switch></app-theme-switch>

        <!-- User Profile -->
        <app-profile></app-profile>
      </div>
    </header>
  `,
})
export class PlatformHeader implements OnInit {
  notifications = signal<AppNotification[]>([])

  /**
   * Initialization logic to set a default notification count.
   */
  ngOnInit(): void {
    this.notifications.set([
      {
        id: 1,
        title: 'Nuevo mensaje',
        message: 'Tienes un nuevo mensaje de Juan Pérez',
        time: 'Hace 5 minutos',
        read: false,
        type: 'info',
      },
      {
        id: 2,
        title: 'Tarea completada',
        message: 'La tarea "Reporte mensual" ha sido completada',
        time: 'Hace 1 hora',
        read: false,
        type: 'success',
      },
      {
        id: 3,
        title: 'Alerta del sistema',
        message: 'El servidor experimentó problemas temporales',
        time: 'Hace 2 horas',
        read: true,
        type: 'warning',
      },
    ])
  }

  /**
   * Marcar notificación como leída.
   * @param notificationId ID de la notificación a marcar como leída.
   */
  markAsRead(notificationId: number) {
    this.notifications.update((notifications) =>
      notifications.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification
      )
    )
  }

  /**
   * Marcar todas como leídas.
   */
  markAllAsRead() {
    this.notifications.update((notifications) =>
      notifications.map((notification) => ({ ...notification, read: true }))
    )
  }
}
