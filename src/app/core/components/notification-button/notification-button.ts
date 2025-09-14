import { Component, input, output, signal, OnInit, OnChanges } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AppNotification } from '@flex-shared-lib'

/**
 * Notification button component with dropdown.
 */
@Component({
  selector: 'app-notification-button',
  imports: [FontAwesomeModule],
  template: `
    <div class="relative">
      <!-- Notification button -->
      <button
        class="p-2 rounded-md bg-[var(--color-muted)] hover:bg-[var(--color-card)] transition-colors duration-200 group relative"
        [class.bg-[var(--color-card)]]="isOpen()"
        (click)="toggleDropdown()"
        title="Notifications"
        aria-label="Notifications"
      >
        <fa-icon
          class="text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)] text-sm"
          [icon]="['fas', 'bell']"
        ></fa-icon>

        <!-- Badge counter -->
        @if (unreadCount() > 0) {
          <span
            class="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center shadow"
          >
            {{ unreadCount() }}
          </span>
        }
      </button>

      <!-- Notifications dropdown -->
      @if (isOpen()) {
        <div
          class="absolute right-0 top-12 w-80 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg shadow-lg z-50"
        >
          <!-- Header -->
          <div class="p-4 border-b border-[var(--color-border)]">
            <h3 class="font-semibold">Notifications</h3>
          </div>

          <!-- Notification list -->
          <div class="max-h-96 overflow-y-auto">
            @for (notification of notifications(); track notification.id) {
              <div
                class="p-4 border-b border-[var(--color-border)] hover:bg-[var(--color-muted)] cursor-pointer"
                [class.bg-[var(--color-muted)]]="!notification.read"
                (click)="markAsRead(notification)"
              >
                <div class="flex items-start gap-3">
                  <!-- Icon by type -->
                  <div class="flex-shrink-0">
                    @switch (notification.type) {
                      @case ('info') {
                        <fa-icon class="text-blue-500" [icon]="['fas', 'info-circle']"></fa-icon>
                      }
                      @case ('warning') {
                        <fa-icon
                          class="text-yellow-500"
                          [icon]="['fas', 'exclamation-triangle']"
                        ></fa-icon>
                      }
                      @case ('success') {
                        <fa-icon class="text-green-500" [icon]="['fas', 'check-circle']"></fa-icon>
                      }
                      @case ('error') {
                        <fa-icon class="text-red-500" [icon]="['fas', 'times-circle']"></fa-icon>
                      }
                    }
                  </div>

                  <!-- Content -->
                  <div class="flex-1">
                    <h4 class="font-medium text-sm">{{ notification.title }}</h4>
                    <p class="text-xs text-[var(--color-muted-foreground)] mt-1">{{
                      notification.message
                    }}</p>
                    <span class="text-xs text-[var(--color-muted-foreground)] mt-2 block">{{
                      notification.time
                    }}</span>
                  </div>

                  <!-- Unread indicator -->
                  @if (!notification.read) {
                    <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  }
                </div>
              </div>
            } @empty {
              <div class="p-8 text-center text-[var(--color-muted-foreground)]">
                <fa-icon class="text-2xl mb-2" [icon]="['fas', 'bell-slash']"></fa-icon>
                <p>No notifications</p>
              </div>
            }
          </div>

          <!-- Footer -->
          <div class="p-3 border-t border-[var(--color-border)]">
            <button
              class="w-full text-sm text-[var(--color-primary)] hover:underline"
              (click)="markAllAsRead()"
            >
              Mark all as read
            </button>
          </div>
        </div>
      }
    </div>
  `,
})
export class NotificationButton implements OnInit, OnChanges {
  notifications = input<AppNotification[]>([])
  notificationRead = output<number>()
  markAllRead = output<void>()
  isOpen = signal<boolean>(false)
  unreadCount = signal<number>(0)

  /**
   * Initializes the component by calculating the unread notifications count.
   */
  ngOnInit() {
    this.calculateUnreadCount()
  }

  /**
   * Dropdown toggle.
   */
  toggleDropdown() {
    this.isOpen.update((open) => !open)
  }

  /**
   * Mark notification as read.
   * @param notification The notification to mark as read.
   */
  markAsRead(notification: AppNotification) {
    if (!notification.read) {
      this.notificationRead.emit(notification.id)
      this.calculateUnreadCount()
    }
  }

  /**
   * Mark all as read.
   */
  markAllAsRead() {
    this.markAllRead.emit()
    this.unreadCount.set(0)
  }

  /**
   * Calculate unread count.
   */
  calculateUnreadCount() {
    const count = this.notifications().filter((n) => !n.read).length
    this.unreadCount.set(count)
  }

  /**
   * Update when notifications change.
   */
  ngOnChanges() {
    this.calculateUnreadCount()
  }
}
