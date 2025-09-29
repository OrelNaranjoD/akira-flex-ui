import { Component } from '@angular/core'

/**
 * Tenant Footer Component - Operational information and status.
 * Displays branch info, system status, and business hours for PyME operations.
 */
@Component({
  selector: 'app-tenant-footer',
  template: `
    <footer class="px-5 py-3 p-surface-card text-color-secondary border-top-1 p-shadow-1">
      <div class="flex flex-row justify-between items-center gap-6 text-sm w-full">
        <!-- Izquierda: Sucursal y horario -->
        <div class="flex flex-row items-center gap-6">
          <div class="flex items-center gap-2">
            <i class="pi pi-map-marker text-primary text-sm"></i>
            <span class="font-medium text-color">{{ branchInfo.name }}</span>
            <span class="text-color-secondary">•</span>
            <span>{{ branchInfo.address }}</span>
          </div>
          <div class="flex items-center gap-2">
            <i class="pi pi-clock text-secondary text-sm"></i>
            <span [class]="isWithinBusinessHours ? 'text-green-500' : 'text-yellow-500'">
              {{ currentHoursStatus }}
            </span>
            <span class="text-color-secondary">•</span>
            <span>{{ businessHours }}</span>
          </div>
        </div>
        <!-- Centro: Estado del sistema -->
        <div class="flex flex-row items-center gap-4 justify-center flex-1">
          <div class="flex items-center gap-2">
            <span [class]="connectionStatus.color + ' w-2 h-2 rounded-full animate-pulse'"></span>
            <span class="text-xs">{{ connectionStatus.text }}</span>
          </div>
          <div class="flex items-center gap-2">
            <i class="pi pi-sync-alt text-color-secondary text-xs"></i>
            <span class="text-xs">Sync: {{ lastSyncTime }}</span>
          </div>
        </div>
        <!-- Derecha: Usuario y tenant -->
        <div class="flex flex-row items-center gap-6">
          <div class="flex items-center gap-2">
            <i class="pi pi-user-circle text-accent text-sm"></i>
            <span class="font-medium text-color">{{ currentUser.name }}</span>
            <span class="text-color-secondary">•</span>
            <span class="text-xs">{{ currentUser.role }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs">{{ companyInfo.name }}</span>
            <span class="text-color-secondary">•</span>
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
