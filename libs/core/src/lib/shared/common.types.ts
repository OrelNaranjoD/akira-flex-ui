/**
 * Common types - Shared types used across different domains.
 */

/**
 * Common filter for text search.
 */
export interface SearchFilter {
  search?: string
}

/**
 * Common pagination parameters.
 */
export interface PaginationParams {
  page?: number
  limit?: number
}

/**
 * Common response structure for paginated results.
 */
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

/**
 * Common response structure for API responses.
 */
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  errors?: string[]
}

/**
 * Common error response structure.
 */
export interface ApiError {
  code: string
  message: string
  details?: unknown
}

/**
 * Interface for company information.
 */
export interface CompanyInfo {
  name: string
  rut: string
}

/**
 * Interface for branch information.
 */
export interface BranchInfo {
  name: string
  address: string
  phone?: string
}

/**
 * Interface for user information.
 */
export interface UserInfo {
  name: string
  role: string
  email: string
}

/**
 * Interface for the connection status.
 */
export interface ConnectionStatus {
  color: string
  text: string
}

/**
 * Interface for business hours.
 */
export interface BusinessHours {
  start: number // Hour of the day (0-23)
  end: number // Hour of the day (0-23)
}

/**
 * Interface for the system status feature state.
 */
// SystemStatusState moved to state/state.types.ts to centralize feature state types.
