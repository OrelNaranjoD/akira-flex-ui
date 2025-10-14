import { createSelector } from '@ngrx/store'
import { systemStatusFeature } from './system-status.feature'

/**
 * Auto-Generated Selectors
 * These selectors are automatically created by NgRx's `createFeature` function.
 * They provide direct access to specific slices of the system status state.
 */
export const selectSystemStatusState = systemStatusFeature.selectSystemStatusState
export const selectLoading = systemStatusFeature.selectLoading
export const selectError = systemStatusFeature.selectError
export const selectCompanyInfo = systemStatusFeature.selectCompanyInfo
export const selectBranchInfo = systemStatusFeature.selectBranchInfo
export const selectAppVersion = systemStatusFeature.selectAppVersion
export const selectBusinessHours = systemStatusFeature.selectBusinessHours
export const selectLastSyncTime = systemStatusFeature.selectLastSyncTime
export const selectConnectionStatus = systemStatusFeature.selectConnectionStatus

/**
 * Selects whether the system is online based on connection status text.
 */
export const selectIsSystemOnline = createSelector(
  selectConnectionStatus,
  (connectionStatus) => connectionStatus?.text?.toLowerCase() === 'online'
)

/**
 * Selects the connection status text (e.g., 'Online', 'Offline').
 */
export const selectConnectionStatusText = createSelector(
  selectConnectionStatus,
  (connectionStatus) => connectionStatus?.text || 'Unknown'
)

/**
 * Selects the connection status color for UI indicators.
 */
export const selectConnectionStatusColor = createSelector(
  selectConnectionStatus,
  (connectionStatus) => connectionStatus?.color || 'var(--p-surface-400)'
)

/**
 * Selects whether company and branch info are both loaded.
 */
export const selectIsCompanyDataLoaded = createSelector(
  selectCompanyInfo,
  selectBranchInfo,
  (companyInfo, branchInfo) => companyInfo !== null && branchInfo !== null
)
