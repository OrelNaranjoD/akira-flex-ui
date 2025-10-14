/**
 * Enums - Enumeration types used across the application.
 */

/**
 * Movement type enumeration.
 */
export type MovementType = 'entry' | 'exit' | 'transfer' | 'adjustment'

/**
 * Alert type enumeration.
 */
export type AlertType = 'low_stock' | 'out_of_stock' | 'expired' | 'expiring_soon'

/**
 * Inventory role enumeration.
 */
export type InventoryRole = 'admin' | 'manager' | 'auditor' | 'viewer'

/**
 * Sale status enumeration.
 */
export type SaleStatus = 'draft' | 'confirmed' | 'paid' | 'shipped' | 'delivered' | 'cancelled'

/**
 * Payment method enumeration.
 */
export type PaymentMethod =
  | 'cash'
  | 'credit_card'
  | 'debit_card'
  | 'bank_transfer'
  | 'check'
  | 'other'

/**
 * Supplier status enumeration.
 */
export type SupplierStatus = 'active' | 'inactive' | 'suspended'

/**
 * Theme mode options.
 */
export type ThemeMode = 'light' | 'dark' | 'system'

/**
 * Common sort direction options.
 */
export type SortDirection = 'asc' | 'desc'

/**
 * Common status values used across different entities.
 */
export type EntityStatus = 'active' | 'inactive' | 'suspended'
