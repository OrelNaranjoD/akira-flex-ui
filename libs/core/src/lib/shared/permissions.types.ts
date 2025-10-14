/**
 * Inventory permissions structure.
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
