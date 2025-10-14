/**
 * Filters for product queries.
 */
export interface ProductsFilters {
  category?: string
  supplierId?: string
  tags?: string[]
  stockStatus?: 'all' | 'low_stock' | 'out_of_stock' | 'normal'
  isActive?: boolean
  search?: string
}

/**
 * Sort options for products.
 */
export interface ProductsSort {
  field: 'name' | 'sku' | 'unitPrice' | 'currentStock' | 'createdAt'
  direction: 'asc' | 'desc'
}

/**
 * Request structure for creating a product.
 */
export interface CreateProductRequest {
  name: string
  description?: string
  sku: string
  category: string
  unitPrice: number
  purchasePrice?: number
  initialStock: number
  minStock: number
  maxStock?: number
  supplierId?: string
  tags: string[]
}

/**
 * Request structure for updating a product.
 */
export interface UpdateProductRequest {
  name?: string
  description?: string
  sku?: string
  category?: string
  unitPrice?: number
  purchasePrice?: number
  currentStock?: number
  minStock?: number
  maxStock?: number
  supplierId?: string
  tags?: string[]
  isActive?: boolean
}
