import type { SaleStatus, PaymentMethod } from './enums.types'
import type { Sale, SaleItem } from './entities.types'

/**
 * Sales statistics.
 */
export interface SalesStats {
  totalSales: number
  totalRevenue: number
  averageSaleValue: number
  pendingPayments: number
  recentSales: Sale[]
  topCustomers: { customerName: string; totalSpent: number }[]
  salesByStatus: { status: SaleStatus; count: number }[]
}

/**
 * Filters for sales queries.
 */
export interface SalesFilters {
  customerId?: string
  status?: SaleStatus
  paymentMethod?: PaymentMethod
  dateFrom?: string
  dateTo?: string
  minAmount?: number
  maxAmount?: number
  search?: string
}

/**
 * Sort options for sales.
 */
export interface SalesSort {
  field: 'createdAt' | 'total' | 'customerName' | 'status'
  direction: 'asc' | 'desc'
}

/**
 * Request structure for creating a sale.
 */
export interface CreateSaleRequest {
  customerId: string
  items: Omit<SaleItem, 'id' | 'pieceDescription' | 'pieceSerialNumber' | 'total'>[]
  discount?: number
  paymentMethod?: PaymentMethod
  notes?: string
}

/**
 * Request structure for updating a sale.
 */
export interface UpdateSaleRequest {
  customerId?: string
  items?: SaleItem[]
  discount?: number
  status?: SaleStatus
  paymentMethod?: PaymentMethod
  paymentDate?: string
  notes?: string
}
