import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'

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
 * Configuration for API endpoints used throughout the application.
 */
export interface ApiEndpoints {
  auth: {
    login: string
    register: string
    platformRegister: string
    verifyEmail: string
    resendVerification: string
    forgotPassword: string
    resetPassword: string
    refreshToken: string
    logout: string
    me: string
  }
}

/**
 * Payload for login requests.
 */
export interface LoginPayload {
  email: string
  password: string
  remember: boolean
}

/**
 * Payload for user registration.
 */
export interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  phone: string
}

/**
 * Request data for user registration API call.
 */
export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  phone?: string
  password: string
}

/**
 * Response data from user registration API call.
 */
export interface RegisterResponse {
  id: string
  email: string
  status: string
  token: string
}

/**
 * Request data for email verification.
 */
export interface VerifyEmailRequest {
  email: string
  pin: string
}

/**
 * Request data for resending email verification.
 */
export interface ResendVerificationRequest {
  email: string
}

/**
 * Response containing authentication token information.
 */
export interface AuthTokenResponse {
  accessToken: string
  expiresIn: number
  tokenType: string
}

/**
 * Request data for login API call.
 */
export interface LoginRequest {
  email: string
  password: string
  remember: boolean
}

/**
 * Response data from login API call.
 */
export interface LoginResponse {
  accessToken: string
  user: User
}

/**
 * Validator ensuring password and confirmPassword match on a FormGroup.
 * @param group The AbstractControl (FormGroup) to validate.
 * @returns ValidationErrors object if passwords do not match, otherwise null.
 */
export const passwordsMatchValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const pw = group.get('password')?.value
  const confirm = group.get('confirmPassword')?.value
  return pw === confirm ? null : { passwordsMismatch: true }
}

export type ThemeMode = 'light' | 'dark' | 'system'

export const THEME_COOKIES = {
  MODE: 'akira-theme-mode',
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
 * Represents an inventory piece/component.
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
 * Types of inventory movements.
 */
export type MovementType = 'entry' | 'exit' | 'transfer' | 'adjustment'

/**
 * Represents an inventory movement.
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
  reference?: string // Order number, transfer ID, etc.
  fromLocation?: string // For transfers
  toLocation?: string // For transfers
  createdAt: string
}

/**
 * Inventory alert types.
 */
export type AlertType = 'low_stock' | 'out_of_stock' | 'expired' | 'expiring_soon'

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
 * Inventory statistics for dashboard.
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
 * Filters for inventory listing.
 */
export interface InventoryFilters {
  location?: string
  category?: string
  tags?: string[]
  stockStatus?: 'all' | 'low_stock' | 'out_of_stock' | 'normal'
  search?: string
}

/**
 * Sort options for inventory listing.
 */
export interface InventorySort {
  field: 'description' | 'serialNumber' | 'currentStock' | 'createdAt' | 'updatedAt'
  direction: 'asc' | 'desc'
}

/**
 * Request payload for creating a new piece.
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
 * Request payload for updating a piece.
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
 * Request payload for creating a movement.
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

/**
 * User roles for inventory management.
 */
export type InventoryRole = 'admin' | 'manager' | 'auditor' | 'viewer'

/**
 * Permissions for inventory operations.
 */
export interface InventoryPermissions {
  canCreatePieces: boolean
  canEditPieces: boolean
  canDeletePieces: boolean
  canViewPieces: boolean
  canCreateMovements: boolean
  canViewMovements: boolean
  canViewAlerts: boolean
  canResolveAlerts: boolean
  canViewReports: boolean
}

/**
 * Extended user interface with inventory-specific data.
 */
export interface InventoryUser extends User {
  inventoryRole: InventoryRole
  permissions: InventoryPermissions
  department?: string
}
