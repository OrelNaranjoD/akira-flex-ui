import { Component, signal } from '@angular/core'
import {
  Logotype,
  ThemeSwitch,
  Profile,
  SearchBox,
  NotificationButton,
  AppNotification,
  LanguageSwitcher,
} from '@core'
import { DEFAULT_PLATFORM_NOTIFICATIONS } from './platform-header.notifications'

/**
 * Platform Header Component - Dashboard navigation header.
 */
@Component({
  selector: 'platform-header',
  imports: [Logotype, ThemeSwitch, Profile, SearchBox, NotificationButton, LanguageSwitcher],
  templateUrl: './header.html',
})
export class Header {
  notifications = signal<AppNotification[]>(DEFAULT_PLATFORM_NOTIFICATIONS)

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
   * Mark all as read.
   */
  markAllAsRead() {
    this.notifications.update((notifications) =>
      notifications.map((notification) => ({ ...notification, read: true }))
    )
  }
}
