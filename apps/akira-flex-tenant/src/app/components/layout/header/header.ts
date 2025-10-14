import { Component, signal } from '@angular/core'
import {
  ThemeSwitch,
  Profile,
  SearchBox,
  NotificationButton,
  AppNotification,
  LanguageSwitcher,
} from '@core'
import { CompanyBrand } from '../../company-brand/company-brand'
import { MOCK_COMPANY_DATA, TENANT_NOTIFICATIONS } from '@mocks'

/**
 * Tenant Header Component - Business-focused header with company branding and operational tools.
 * Designed for PyME users with quick access to daily operations.
 */
@Component({
  selector: 'tenant-header',
  imports: [ThemeSwitch, NotificationButton, Profile, SearchBox, CompanyBrand, LanguageSwitcher],
  templateUrl: './header.html',
})
export class Header {
  companyData = MOCK_COMPANY_DATA
  notifications = signal<AppNotification[]>(TENANT_NOTIFICATIONS)

  /**
   * Handle search query.
   * @param query - The search query string.
   * @TODO Implement actual search functionality
   */
  onSearch(query: string) {
    if (query.trim()) {
      console.log('Searching for:', query)
    }
  }

  /**
   * Handle search enter key press.
   * @param query - The search query string.
   * @TODO Implement actual search functionality
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
}
