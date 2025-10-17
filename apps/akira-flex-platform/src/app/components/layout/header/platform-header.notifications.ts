import type { AppNotification } from '@core'

/**
 * Default notifications for the platform header.
 */
export const DEFAULT_PLATFORM_NOTIFICATIONS: AppNotification[] = [
  {
    id: 1,
    title: $localize`:@@newMessage:new message`,
    message: $localize`:@@newMessageFrom:you have a new message from ${'Juan Pérez'}`,
    time: $localize`:@@timeAgo:${5} ${'minutes'} ago`,
    read: false,
    type: 'info',
  },
  {
    id: 2,
    title: $localize`:@@taskCompleted:task completed`,
    message: $localize`:@@monthlyReportCompleted:the "Monthly Report" task has been completed`,
    time: $localize`:@@timeAgo:${1} ${'hour'} ago`,
    read: false,
    type: 'success',
  },
  {
    id: 3,
    title: $localize`:@@systemAlert:system alert`,
    message: $localize`:@@serverTemporaryIssues:the server experienced temporary issues`,
    time: $localize`:@@timeAgo:${2} ${'hours'} ago`,
    read: true,
    type: 'warning',
  },
]
