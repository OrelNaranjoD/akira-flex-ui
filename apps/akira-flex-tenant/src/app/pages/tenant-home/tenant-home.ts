import { Component } from '@angular/core'
import { CurrencyPipe, NgClass } from '@angular/common'
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'

/**
 * Tenant Home Page - Main dashboard for PyME business operations.
 */
@Component({
  selector: 'app-tenant-home',
  imports: [CurrencyPipe, CardModule, ButtonModule, NgClass],
  template: `
    <div class="space-y-6 p-surface-ground">
      <!-- Page Header -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-[var(--color-foreground)]">Panel Principal</h1>
          <p class="text-[var(--color-muted-foreground)]">
            Bienvenido, {{ userData.name }} • {{ currentDate }}
          </p>
        </div>

        <!-- Cash Register Status Card -->
        <p-card class="p-mb-3 p-shadow-2 p-surface-card rounded-lg">
          <ng-template pTemplate="content">
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 rounded-full flex items-center justify-center"
                [class]="cashRegister.isOpen ? 'bg-green-500/10' : 'bg-red-500/10'"
              >
                <i
                  class="pi pi-box flex items-center justify-center text-xl"
                  [ngClass]="cashRegister.isOpen ? 'text-green-500' : 'text-red-500'"
                ></i>
              </div>
              <div>
                <p class="font-semibold text-[var(--color-foreground)]">
                  {{ cashRegister.isOpen ? 'Caja Abierta' : 'Caja Cerrada' }}
                </p>
                <p class="text-sm text-[var(--color-muted-foreground)]">
                  Último movimiento: {{ cashRegister.lastMovement }}
                </p>
                <p class="text-sm font-medium text-[var(--color-foreground)]">
                  Efectivo disponible:
                  {{ cashRegister.availableCash | currency: 'CLP' : 'symbol' : '1.0-0' }}
                </p>
              </div>
              @if (!cashRegister.isOpen) {
                <button
                  class="ml-auto px-4 py-2 p-button p-button-primary"
                  (click)="openCashRegister()"
                >
                  Abrir Caja
                </button>
              }
            </div>
          </ng-template>
        </p-card>
      </div>

      <!-- Key Performance Indicators -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Daily Sales -->
        <p-card class="p-shadow-1 p-surface-card rounded-xl">
          <ng-template pTemplate="content">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-[var(--color-muted-foreground)] text-sm font-medium"
                  >Ventas del Día</p
                >
                <p class="text-2xl font-bold text-[var(--color-foreground)] mt-1">
                  {{ dailyKPIs.sales.amount | currency: 'CLP' : 'symbol' : '1.0-0' }}
                </p>
                <div class="flex items-center mt-2 text-sm">
                  <i
                    class="pi"
                    [ngClass]="
                      dailyKPIs.sales.trend === 'up'
                        ? 'pi-arrow-up text-green-500 mr-1'
                        : 'pi-arrow-down text-red-500 mr-1'
                    "
                  ></i>
                  <span
                    [class]="dailyKPIs.sales.trend === 'up' ? 'text-green-500' : 'text-red-500'"
                  >
                    {{ dailyKPIs.sales.change }}
                  </span>
                  <span class="text-[var(--color-muted-foreground)] ml-1">vs ayer</span>
                </div>
              </div>
              <div class="w-12 h-12 p-surface-card rounded-lg flex items-center justify-center">
                <i class="pi pi-cash-register text-white"></i>
              </div>
            </div>
          </ng-template>
        </p-card>

        <!-- Work Orders -->
        <p-card class="p-shadow-1 p-surface-card rounded-xl">
          <ng-template pTemplate="content">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-[var(--color-muted-foreground)] text-sm font-medium"
                  >Órdenes Activas</p
                >
                <p class="text-2xl font-bold text-[var(--color-foreground)] mt-1">{{
                  dailyKPIs.workOrders.active
                }}</p>
                <div class="flex items-center mt-2 text-sm">
                  <span class="text-yellow-500">{{ dailyKPIs.workOrders.pending }} pendientes</span>
                  <span class="text-[var(--color-muted-foreground)] ml-1"
                    >• {{ dailyKPIs.workOrders.inProgress }} en proceso</span
                  >
                </div>
              </div>
              <div class="w-12 h-12 p-surface-card rounded-lg flex items-center justify-center">
                <i class="pi pi-wrench text-white"></i>
              </div>
            </div>
          </ng-template>
        </p-card>

        <!-- Parts Inventory -->
        <p-card class="p-shadow-1 p-surface-card rounded-xl">
          <ng-template pTemplate="content">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-[var(--color-muted-foreground)] text-sm font-medium"
                  >Stock Crítico</p
                >
                <p class="text-2xl font-bold text-yellow-500 mt-1">{{
                  dailyKPIs.inventory.criticalItems
                }}</p>
                <div class="flex items-center mt-2 text-sm">
                  <i class="pi pi-exclamation-triangle text-red-500 mr-1"></i>
                  <span class="text-red-500">{{ dailyKPIs.inventory.outOfStock }} agotados</span>
                </div>
              </div>
              <div class="w-12 h-12 p-surface-card rounded-lg flex items-center justify-center">
                <i class="pi pi-box text-white"></i>
              </div>
            </div>
          </ng-template>
        </p-card>

        <!-- Accounts Receivable -->
        <p-card class="p-shadow-1 p-surface-card rounded-xl">
          <ng-template pTemplate="content">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-[var(--color-muted-foreground)] text-sm font-medium">Por Cobrar</p>
                <p class="text-2xl font-bold text-[var(--color-foreground)] mt-1">
                  {{ dailyKPIs.receivables.amount | currency: 'CLP' : 'symbol' : '1.0-0' }}
                </p>
                <div class="flex items-center mt-2 text-sm">
                  <span class="text-red-500">{{ dailyKPIs.receivables.overdue }} vencidas</span>
                  <span class="text-[var(--color-muted-foreground)] ml-1"
                    >• {{ dailyKPIs.receivables.dueToday }} vencen hoy</span
                  >
                </div>
              </div>
              <div class="w-12 h-12 p-surface-card rounded-lg flex items-center justify-center">
                <i class="pi pi-dollar text-white"></i>
              </div>
            </div>
          </ng-template>
        </p-card>
      </div>

      <!-- Quick Actions -->
      <div class="p-card p-component p-6 p-shadow-1 p-surface-card rounded-xl">
        <h3 class="text-lg font-semibold text-[var(--color-foreground)] mb-4">Acciones Rápidas</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <button
            class="flex flex-col items-center gap-3 p-4 rounded-lg p-surface-card hover:p-surface hover:text-color transition-all duration-200 group"
            (click)="quickAction('new-sale')"
          >
            <i
              class="pi pi-plus-circle text-2xl text-[var(--color-primary)] group-hover:text-white transition-colors"
            ></i>
            <span class="text-sm font-medium">Nueva Venta</span>
          </button>

          <button
            class="flex flex-col items-center gap-3 p-4 rounded-lg p-surface-card hover:p-surface hover:text-color transition-all duration-200 group"
            (click)="quickAction('new-work-order')"
          >
            <i
              class="pi pi-file-edit text-2xl text-[var(--color-secondary)] group-hover:text-white transition-colors"
            ></i>
            <span class="text-sm font-medium">Nueva O.T.</span>
          </button>

          <button
            class="flex flex-col items-center gap-3 p-4 rounded-lg p-surface-card hover:p-surface hover:text-color transition-all duration-200 group"
            (click)="quickAction('cash-count')"
          >
            <i
              class="pi pi-calculator text-2xl text-[var(--color-accent)] group-hover:text-white transition-colors"
            ></i>
            <span class="text-sm font-medium">Arqueo Caja</span>
          </button>

          <button
            class="flex flex-col items-center gap-3 p-4 rounded-lg p-surface-card hover:p-surface hover:text-color transition-all duration-200 group"
            (click)="quickAction('inventory-check')"
          >
            <i
              class="pi pi-box text-2xl text-green-600 group-hover:text-white transition-colors"
            ></i>
            <span class="text-sm font-medium">Revisar Stock</span>
          </button>

          <button
            class="flex flex-col items-center gap-3 p-4 rounded-lg p-surface-card hover:p-surface hover:text-color transition-all duration-200 group"
            (click)="quickAction('customer-search')"
          >
            <i
              class="pi pi-search text-2xl text-blue-600 group-hover:text-white transition-colors"
            ></i>
            <span class="text-sm font-medium">Buscar Cliente</span>
          </button>

          <button
            class="flex flex-col items-center gap-3 p-4 rounded-lg p-surface-card hover:p-surface hover:text-color transition-all duration-200 group"
            (click)="quickAction('reports')"
          >
            <i
              class="pi pi-chart-bar text-2xl text-purple-600 group-hover:text-white transition-colors"
            ></i>
            <span class="text-sm font-medium">Reportes</span>
          </button>
        </div>
      </div>

      <!-- Recent Activity & Notifications -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Work Orders -->
        <div class="p-card p-component p-6 p-shadow-1 p-surface-card rounded-xl">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-[var(--color-foreground)]">Órdenes Recientes</h3>
            <button
              class="text-[var(--color-primary)] hover:text-[var(--color-accent)] text-sm font-medium"
            >
              Ver Todas
            </button>
          </div>
          <div class="space-y-4">
            @for (order of recentWorkOrders; track order.id) {
              <div class="flex items-center justify-between p-3 rounded-lg p-surface">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-full flex items-center justify-center"
                    [class]="getStatusColor(order.status) + '/10'"
                  >
                    <i
                      class="pi text-sm"
                      [ngClass]="
                        'pi-' + getStatusIcon(order.status) + ' ' + getStatusColor(order.status)
                      "
                    ></i>
                  </div>
                  <div>
                    <p class="font-medium text-[var(--color-foreground)]">{{ order.vehicle }}</p>
                    <p class="text-sm text-[var(--color-muted-foreground)]"
                      >{{ order.client }} • OT #{{ order.number }}</p
                    >
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium" [class]="getStatusColor(order.status)">{{
                    order.statusText
                  }}</p>
                  <p class="text-xs text-[var(--color-muted-foreground)]">{{ order.date }}</p>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Daily Summary -->
        <div class="p-card p-component p-6 p-shadow-1 p-surface-card rounded-xl">
          <h3 class="text-lg font-semibold text-[var(--color-foreground)] mb-4">Resumen del Día</h3>
          <div class="space-y-4">
            <!-- Revenue Summary -->
            <div class="flex items-center justify-between p-3 rounded-lg p-surface border">
              <div class="flex items-center gap-3">
                <i class="pi pi-dollar text-green-500"></i>
                <div>
                  <p class="font-medium text-[var(--color-foreground)]">Ingresos del Día</p>
                  <p class="text-sm text-[var(--color-muted-foreground)]"
                    >{{ summary.completedOrders }} órdenes completadas</p
                  >
                </div>
              </div>
              <p class="text-lg font-bold text-green-500">
                {{ summary.dailyRevenue | currency: 'CLP' : 'symbol' : '1.0-0' }}
              </p>
            </div>

            <!-- Pending Tasks -->
            <div class="flex items-center justify-between p-3 rounded-lg p-surface border">
              <div class="flex items-center gap-3">
                <i class="pi pi-list text-yellow-500"></i>
                <div>
                  <p class="font-medium text-[var(--color-foreground)]">Tareas Pendientes</p>
                  <p class="text-sm text-[var(--color-muted-foreground)]">Requieren atención</p>
                </div>
              </div>
              <p class="text-lg font-bold text-yellow-500">{{ summary.pendingTasks }}</p>
            </div>

            <!-- Customer Satisfaction -->
            <div class="flex items-center justify-between p-3 rounded-lg p-surface border">
              <div class="flex items-center gap-3">
                <i class="pi pi-face-smile text-[var(--color-primary)]"></i>
                <div>
                  <p class="font-medium text-[var(--color-foreground)]">Satisfacción Clientes</p>
                  <p class="text-sm text-[var(--color-muted-foreground)]"
                    >{{ summary.reviewsCount }} evaluaciones</p
                  >
                </div>
              </div>
              <p class="text-lg font-bold text-[var(--color-primary)]"
                >{{ summary.satisfaction }}/5</p
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TenantHomePage {
  // Hardcoded user data for RepUSA
  userData = {
    name: 'Carlos Mendoza',
    role: 'Administrador',
    branch: 'Sucursal Principal',
  }

  // Cash register status
  cashRegister = {
    isOpen: true,
    lastMovement: '14:30',
    availableCash: 250000,
    openedBy: 'Carlos Mendoza',
    openedAt: '08:15',
  }

  // Daily KPIs with hardcoded RepUSA data
  dailyKPIs = {
    sales: {
      amount: 485000,
      trend: 'up' as 'up' | 'down',
      change: '+15.3%',
    },
    workOrders: {
      active: 12,
      pending: 4,
      inProgress: 8,
      completed: 3,
    },
    inventory: {
      criticalItems: 7,
      outOfStock: 2,
      lowStock: 15,
    },
    receivables: {
      amount: 1250000,
      overdue: 3,
      dueToday: 2,
      current: 15,
    },
  }

  // Recent work orders
  recentWorkOrders = [
    {
      id: 1,
      number: '2025-001',
      vehicle: 'Toyota Corolla 2018',
      client: 'María González',
      status: 'completed',
      statusText: 'Completada',
      date: '14:30',
    },
    {
      id: 2,
      number: '2025-002',
      vehicle: 'Ford Focus 2020',
      client: 'Juan Pérez',
      status: 'in-progress',
      statusText: 'En Proceso',
      date: '13:15',
    },
    {
      id: 3,
      number: '2025-003',
      vehicle: 'Chevrolet Sonic 2019',
      client: 'Ana Silva',
      status: 'pending',
      statusText: 'Pendiente',
      date: '12:00',
    },
    {
      id: 4,
      number: '2025-004',
      vehicle: 'Nissan Sentra 2021',
      client: 'Pedro Rodríguez',
      status: 'quote',
      statusText: 'Cotización',
      date: '11:30',
    },
  ]

  // Daily summary
  summary = {
    dailyRevenue: 485000,
    completedOrders: 3,
    pendingTasks: 8,
    satisfaction: 4.7,
    reviewsCount: 12,
  }

  /**
   * Gets the current date formatted in Spanish (Chilean) locale.
   * @returns Formatted date string with weekday, day, month, and year.
   */
  get currentDate(): string {
    return new Date().toLocaleDateString('es-CL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  /** Open cash register action. */
  openCashRegister() {
    console.log('Opening cash register...')
    this.cashRegister.isOpen = true
    this.cashRegister.openedAt = new Date().toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  /**
   * Handle quick actions.
   * @param action - The action to perform.
   */
  quickAction(action: string) {
    console.log('Quick action:', action)
    // Route to appropriate page based on action
  }

  /**
   * Get status color class for work orders.
   * @param status - The work order status.
   * @returns CSS color class.
   */
  getStatusColor(status: string): string {
    const colors = {
      completed: 'text-green-500',
      'in-progress': 'text-[var(--color-primary)]',
      pending: 'text-yellow-500',
      quote: 'text-[var(--color-secondary)]',
    }
    return colors[status as keyof typeof colors] || 'text-[var(--color-muted-foreground)]'
  }

  /**
   * Get status icon for work orders.
   * @param status - The work order status.
   * @returns FontAwesome icon name.
   */
  getStatusIcon(status: string): string {
    const icons = {
      completed: 'check-circle',
      'in-progress': 'wrench',
      pending: 'clock',
      quote: 'file-edit', // Cambiado a un PrimeIcon válido
    }
    return icons[status as keyof typeof icons] || 'question'
  }
}
