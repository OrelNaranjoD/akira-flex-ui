import { Component } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

/**
 * Tenant Footer Component - Operational information and status.
 * Displays branch info, system status, and business hours for PyME operations.
 */
@Component({
  selector: 'app-tenant-footer',
  imports: [FontAwesomeModule],
  template: `
    <footer
      class="px-6 py-3 bg-[var(--color-card)] text-[var(--color-muted-foreground)] border-t border-[var(--color-border)]"
    >
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 text-sm">
        <!-- Left Section: Branch Information -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-4">
          <!-- Active Branch -->
          <div class="flex items-center gap-2">
            <fa-icon
              class="text-[var(--color-primary)] text-sm"
              [icon]="['fas', 'map-marker-alt']"
            ></fa-icon>
            <span class="font-medium text-[var(--color-foreground)]">{{ branchInfo.name }}</span>
            <span class="text-[var(--color-muted-foreground)]">•</span>
            <span>{{ branchInfo.address }}</span>
          </div>

          <!-- Business Hours -->
          <div class="flex items-center gap-2">
            <fa-icon
              class="text-[var(--color-secondary)] text-sm"
              [icon]="['fas', 'clock']"
            ></fa-icon>
            <span [class]="isWithinBusinessHours ? 'text-green-500' : 'text-yellow-500'">
              {{ currentHoursStatus }}
            </span>
            <span class="text-[var(--color-muted-foreground)]">•</span>
            <span>{{ businessHours }}</span>
          </div>
        </div>

        <!-- Center Section: System Status -->
        <div class="flex items-center gap-4">
          <!-- Connection Status -->
          <div class="flex items-center gap-2">
            <div [class]="connectionStatus.color + ' w-2 h-2 rounded-full animate-pulse'"></div>
            <span class="text-xs">{{ connectionStatus.text }}</span>
          </div>

          <!-- Last Sync -->
          <div class="flex items-center gap-2">
            <fa-icon
              class="text-[var(--color-muted-foreground)] text-xs"
              [icon]="['fas', 'sync-alt']"
            ></fa-icon>
            <span class="text-xs">Sync: {{ lastSyncTime }}</span>
          </div>
        </div>

        <!-- Right Section: User Session & Version -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-4">
          <!-- Current User Session -->
          <div class="flex items-center gap-2">
            <fa-icon
              class="text-[var(--color-accent)] text-sm"
              [icon]="['fas', 'user-circle']"
            ></fa-icon>
            <span class="font-medium text-[var(--color-foreground)]">{{ currentUser.name }}</span>
            <span class="text-[var(--color-muted-foreground)]">•</span>
            <span class="text-xs">{{ currentUser.role }}</span>
          </div>

          <!-- Version & Company -->
          <div class="flex items-center gap-2">
            <span class="text-xs">{{ companyInfo.name }}</span>
            <span class="text-[var(--color-muted-foreground)]">•</span>
            <span class="text-xs">v{{ appVersion }}</span>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class TenantFooter {
  // Hardcoded data for RepUSA example
  branchInfo = {
    name: 'Sucursal Principal',
    address: 'Av. Principal 1234, Santiago',
    phone: '+56 2 2345 6789',
  }

  companyInfo = {
    name: 'RepUSA',
    rut: '12.345.678-9',
  }

  currentUser = {
    name: 'Carlos Mendoza',
    role: 'Administrador',
    email: 'carlos@repusa.cl',
  }

  appVersion = '1.2.3'
  businessHours = '08:00 - 18:00'
  lastSyncTime = '10:45'

  // Dynamic status calculations
  /**
   * Checks if the current time is within business hours (08:00 - 18:00).
   * @returns True if within business hours, false otherwise.
   */
  get isWithinBusinessHours(): boolean {
    const now = new Date()
    const currentHour = now.getHours()
    return currentHour >= 8 && currentHour < 18
  }

  /**
   * Gets the current business hours status based on current time.
   * @returns 'Abierto' if within business hours, 'Cerrado' otherwise.
   */
  get currentHoursStatus(): string {
    return this.isWithinBusinessHours ? 'Abierto' : 'Cerrado'
  }

  /**
   * Gets the current connection status with color and text indicators.
   * @returns Object containing color class and status text.
   */
  get connectionStatus() {
    // Simulate connection status - could be based on real API calls
    return {
      color: 'bg-green-500',
      text: 'Online',
    }
  }
}
