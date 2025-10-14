/**
 * Filters for customer queries.
 */
export interface CustomersFilters {
  type?: 'individual' | 'company'
  status?: 'active' | 'inactive' | 'suspended'
  tags?: string[]
  search?: string
}

/**
 * Sort options for customers.
 */
export interface CustomersSort {
  field: 'name' | 'email' | 'createdAt' | 'currentDebt'
  direction: 'asc' | 'desc'
}

/**
 * Request structure for creating a customer.
 */
export interface CreateCustomerRequest {
  name: string
  email: string
  phone?: string
  address?: string
  taxId?: string
  type: 'individual' | 'company'
  creditLimit?: number
  tags: string[]
  notes?: string
}

/**
 * Request structure for updating a customer.
 */
export interface UpdateCustomerRequest {
  name?: string
  email?: string
  phone?: string
  address?: string
  taxId?: string
  type?: 'individual' | 'company'
  status?: 'active' | 'inactive' | 'suspended'
  creditLimit?: number
  tags?: string[]
  notes?: string
}
