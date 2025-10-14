import type { MovementType } from './enums.types'
import type { Movement } from './entities.types'

/**
 * Inventory statistics.
 */
export interface InventoryStats {
  totalPieces: number
  lowStockPieces: number
  outOfStockPieces: number
  totalValue: number
  recentMovements: Movement[]
  topCategories: { category: string; count: number }[]
}

/**
 * Filters for inventory queries.
 */
export interface InventoryFilters {
  location?: string
  category?: string
  tags?: string[]
  stockStatus?: 'all' | 'low_stock' | 'out_of_stock' | 'normal'
  search?: string
}

/**
 * Sort options for inventory.
 */
export interface InventorySort {
  field: 'description' | 'serialNumber' | 'currentStock' | 'createdAt' | 'updatedAt'
  direction: 'asc' | 'desc'
}

/**
 * Request structure for creating a piece.
 */
export interface CreatePieceRequest {
  description: string
  serialNumber: string
  location: string
  category: string
  initialStock: number
  minStock: number
  maxStock?: number
  unitPrice?: number
  purchasePrice?: number
  tags: string[]
  batch?: string
  expirationDate?: string
  supplier?: string
}

/**
 * Request structure for updating a piece.
 */
export interface UpdatePieceRequest {
  description?: string
  location?: string
  category?: string
  currentStock?: number
  minStock?: number
  maxStock?: number
  unitPrice?: number
  purchasePrice?: number
  tags?: string[]
  batch?: string
  expirationDate?: string
  supplier?: string
}

/**
 * Request structure for creating a movement.
 */
export interface CreateMovementRequest {
  pieceId: string
  type: MovementType
  quantity: number
  date: string
  responsible: string
  notes?: string
  reference?: string
  fromLocation?: string
  toLocation?: string
}
