export interface AppNotification {
  id: number
  title: string
  message: string
  time: string
  read: boolean
  type: 'info' | 'warning' | 'success' | 'error'
}
