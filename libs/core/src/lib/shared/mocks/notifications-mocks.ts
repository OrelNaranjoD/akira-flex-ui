import { AppNotification } from '../entities.types'

/**
 * Mock data for tenant header notifications.
 */
export const TENANT_NOTIFICATIONS: AppNotification[] = [
  {
    id: 1,
    title: 'new sale registered',
    message: 'a sale of $125.000 has been registered',
    time: '10 minutes ago',
    read: false,
    type: 'success',
  },
  {
    id: 2,
    title: 'low stock',
    message: 'product "Widget A" has only 5 units left',
    time: '30 minutes ago',
    read: false,
    type: 'warning',
  },
  {
    id: 3,
    title: 'payment received',
    message: 'client Juan Pérez has paid invoice #1234',
    time: '2 hours ago',
    read: true,
    type: 'info',
  },
]
