import { Component, ChangeDetectionStrategy } from '@angular/core'
import { CurrencyPipe } from '@angular/common'
import { Card } from 'primeng/card'

/**
 * Tenant Home Page - Main dashboard for PyME business operations.
 */
@Component({
  selector: 'tenant-home',
  imports: [CurrencyPipe, Card],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
})
export class TenantHome {
  constructor() {
    console.log('TenantHomeComponent initialized')
  }
  // Hardcoded user data for RepUSA
  userData = {
    name: 'Orel Naranjo',
    role: 'Administrador',
    branch: 'Sucursal Principal',
  }

  // Cash register status
  cashRegister = {
    isOpen: true,
    lastMovement: '14:30',
    availableCash: 250000,
    openedBy: 'Orel Naranjo',
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
      'in-progress': 'text-primary',
      pending: 'text-yellow-500',
      quote: 'text-accent',
    }
    return colors[status as keyof typeof colors] || 'text-muted-color'
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
      quote: 'file-edit',
    }
    return icons[status as keyof typeof icons] || 'question'
  }
}
