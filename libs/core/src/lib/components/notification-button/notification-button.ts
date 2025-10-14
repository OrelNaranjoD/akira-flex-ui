import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { BadgeModule } from 'primeng/badge'
import { PopoverModule } from 'primeng/popover'
import { AppNotification } from '../../shared'

/**
 * Notification button component with badge and popover for notifications.
 */
@Component({
  selector: 'app-notification-button',
  imports: [ButtonModule, BadgeModule, PopoverModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './notification-button.html',
})
export class NotificationButton {
  notifications = input.required<AppNotification[]>()
  notificationRead = output<number>()
  markAllRead = output<void>()

  unreadCount = computed(() => this.notifications().filter((n) => !n.read).length)

  /**
   * Marks a notification as read and emits the notificationRead event.
   * @param notification The notification to mark as read.
   */
  markAsRead(notification: AppNotification): void {
    if (!notification.read) {
      this.notificationRead.emit(notification.id)
    }
  }

  /**
   * Marks all notifications as read and emits the markAllRead event.
   */
  markAllAsRead(): void {
    this.markAllRead.emit()
  }
}
