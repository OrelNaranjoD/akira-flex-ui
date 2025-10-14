import { Injectable, signal, computed } from '@angular/core'

/**
 * Alert type for global notifications.
 */
export type GlobalAlertType = 'success' | 'info' | 'warning' | 'error'

/**
 * Represents a global alert notification.
 */
export interface GlobalAlert {
  /** Alert message to display. */
  message: string
  /** Alert type (severity). */
  type: GlobalAlertType
  /** Optional duration in ms (auto-close). */
  duration?: number
  /** Optional unique id for tracking. */
  id?: string
}
/**
 * Global alert service for showing notifications (toasts, banners, etc.) across the application. Uses signals for reactive state.
 *
 * Usage:
 * inject(AlertService).show({ message: 'Saved!', type: 'success' }).
 */

/**
 * Provides global alert management for the application.
 */
@Injectable({ providedIn: 'root' })
export class AlertService {
  /** Internal signal for the current alert (null if none). */
  private readonly _alert = signal<GlobalAlert | null>(null)

  /**
   * Computed signal for the current alert (readonly for consumers).
   */
  readonly alert = computed(() => this._alert())

  /**
   * Show a new alert. Replaces any existing alert.
   * @param alert Alert data (message, type, duration).
   */
  show(alert: GlobalAlert): void {
    this._alert.set(alert)
    if (alert.duration && alert.duration > 0) {
      setTimeout(() => {
        // Only close if still the same alert
        if (this._alert() === alert) this.close()
      }, alert.duration)
    }
  }

  /**
   * Close the current alert (if any).
   */
  close(): void {
    this._alert.set(null)
  }
}
// End of AlertService implementation
