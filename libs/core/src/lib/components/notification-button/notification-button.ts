import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnChanges,
  OnInit,
  output,
  signal,
} from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { BadgeModule } from 'primeng/badge'
import { AppNotification } from '../../shared'

/**
 * Notification button component with dropdown.
 */
@Component({
  selector: 'app-notification-button',
  imports: [ButtonModule, BadgeModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative">
      <!-- Notification button -->
      <p-button
        class="p-2 rounded-md bg-[var(--color-muted)] hover:bg-[var(--color-card)] transition-colors duration-200 group relative"
        [styleClass]="isOpen() ? 'bg-[var(--color-card)]' : ''"
        [text]="true"
        [rounded]="true"
        (click)="toggleDropdown()"
        icon="pi pi-bell"
        title="Notifications"
        aria-label="Notifications"
      >
        <!-- Badge counter -->
        @if (unreadCount() > 0) {
          <p-badge
            class="absolute -top-1 -right-1"
            [value]="unreadCount().toString()"
            severity="danger"
          ></p-badge>
        }
      </p-button>

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
                        <i class="pi pi-info-circle text-blue-500"></i>
                      }
                      @case ('warning') {
                        <i class="pi pi-exclamation-triangle text-yellow-500"></i>
                      }
                      @case ('success') {
                        <i class="pi pi-check-circle text-green-500"></i>
                      }
                      @case ('error') {
                        <i class="pi pi-times-circle text-red-500"></i>
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
                <i class="pi pi-bell-slash text-2xl mb-2"></i>
                <p>No notifications</p>
              </div>
            }
          </div>

          <!-- Footer -->
          <div class="p-3 border-t border-[var(--color-border)]">
            <p-button
              class="w-full text-sm text-[var(--color-primary)] hover:underline"
              [text]="true"
              [link]="true"
              (click)="markAllAsRead()"
              label="Mark all as read"
            ></p-button>
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
