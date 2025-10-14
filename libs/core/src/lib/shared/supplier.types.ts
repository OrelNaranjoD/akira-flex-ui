/**
 * Filters for supplier queries.
 */
export interface SuppliersFilters {
  status?: 'active' | 'inactive' | 'suspended'
  tags?: string[]
  search?: string
}

/**
 * Sort options for suppliers.
 */
export interface SuppliersSort {
  field: 'name' | 'email' | 'createdAt'
  direction: 'asc' | 'desc'
}

/**
 * Request structure for creating a supplier.
 */
export interface CreateSupplierRequest {
  name: string
  email: string
  phone?: string
  address?: string
  taxId?: string
  contactPerson?: string
  website?: string
  paymentTerms?: string
  tags: string[]
  notes?: string
}

/**
 * Request structure for updating a supplier.
 */
export interface UpdateSupplierRequest {
  name?: string
  email?: string
  phone?: string
  address?: string
  taxId?: string
  contactPerson?: string
  website?: string
  paymentTerms?: string
  status?: 'active' | 'inactive' | 'suspended'
  tags?: string[]
  notes?: string
}
