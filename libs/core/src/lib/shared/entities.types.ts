import type {
  MovementType,
  AlertType,
  InventoryRole,
  SaleStatus,
  PaymentMethod,
  SupplierStatus,
} from './enums.types'
import type { InventoryPermissions } from './permissions.types'

/**
 * Business entities - Core domain objects that represent business concepts.
 */

/**
 * Represents a user in the system.
 */
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  roles: string[]
  createdAt?: string
}

/**
 * Represents an application notification.
 */
export interface AppNotification {
  id: number
  title: string
  message: string
  time: string
  read: boolean
  type: 'info' | 'warning' | 'success' | 'error'
}

/**
 * Represents a tenant in the system.
 */
export interface Tenant {
  id: string
  name: string
  code: string
  domain?: string
  logo?: string
  createdAt: string
  updatedAt: string
}

/**
 * Represents a piece/item in inventory.
 */
export interface Piece {
  id: string
  tenantId: string
  description: string
  serialNumber: string
  location: string
  category: string
  currentStock: number
  minStock: number
  maxStock?: number
  unitPrice?: number
  purchasePrice?: number
  tags: string[]
  batch?: string
  expirationDate?: string
  supplier?: string
  createdAt: string
  updatedAt: string
}

/**
 * Represents a stock movement.
 */
export interface Movement {
  id: string
  tenantId: string
  pieceId: string
  type: MovementType
  quantity: number
  previousStock: number
  newStock: number
  date: string
  responsible: string
  notes?: string
  reference?: string
  fromLocation?: string
  toLocation?: string
  createdAt: string
}

/**
 * Represents an inventory alert.
 */
export interface InventoryAlert {
  id: string
  tenantId: string
  pieceId: string
  type: AlertType
  message: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  isActive: boolean
  createdAt: string
  resolvedAt?: string
}

/**
 * User with inventory-specific properties.
 */
export interface InventoryUser extends User {
  inventoryRole: InventoryRole
  permissions: InventoryPermissions
  department?: string
}

/**
 * Represents a customer in the system.
 */
export interface Customer {
  id: string
  tenantId: string
  name: string
  email: string
  phone?: string
  address?: string
  taxId?: string
  type: 'individual' | 'company'
  status: 'active' | 'inactive' | 'suspended'
  creditLimit?: number
  currentDebt?: number
  tags: string[]
  notes?: string
  createdAt: string
  updatedAt: string
}

/**
 * Represents a sale item in a sale.
 */
export interface SaleItem {
  id: string
  pieceId: string
  pieceDescription: string
  pieceSerialNumber: string
  quantity: number
  unitPrice: number
  discount?: number
  total: number
}

/**
 * Represents a sale in the system.
 */
export interface Sale {
  id: string
  tenantId: string
  customerId: string
  customerName: string
  customerEmail: string
  items: SaleItem[]
  subtotal: number
  tax: number
  discount: number
  total: number
  status: SaleStatus
  paymentMethod?: PaymentMethod
  paymentDate?: string
  notes?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

/**
 * Represents a supplier in the system.
 */
export interface Supplier {
  id: string
  tenantId: string
  name: string
  email: string
  phone?: string
  address?: string
  taxId?: string
  contactPerson?: string
  website?: string
  paymentTerms?: string
  status: SupplierStatus
  tags: string[]
  notes?: string
  createdAt: string
  updatedAt: string
}

/**
 * Represents a product in the system.
 */
export interface Product {
  id: string
  tenantId: string
  name: string
  description?: string
  sku: string
  category: string
  unitPrice: number
  purchasePrice?: number
  currentStock: number
  minStock: number
  maxStock?: number
  supplierId?: string
  supplierName?: string
  tags: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}
