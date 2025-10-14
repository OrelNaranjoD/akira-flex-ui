import { createFeature, createReducer, on } from '@ngrx/store'
import { SystemStatusState } from '../state.types'
import { SystemStatusActions } from './system-status.actions'

/**
 * The initial state for the System Status feature.
 */
export const initialSystemStatusState: SystemStatusState = {
  companyInfo: null,
  branchInfo: null,
  appVersion: null,
  businessHours: null,
  lastSyncTime: null,
  connectionStatus: null,
  loading: false,
  error: null,
}

/**
 * The system status feature reducer for handling system status actions.
 */
export const systemStatusFeature = createFeature({
  name: 'systemStatus',
  reducer: createReducer(
    initialSystemStatusState,
    on(SystemStatusActions.loadSystemStatus, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(SystemStatusActions.loadSystemStatusSuccess, (state, { status }) => ({
      ...state,
      ...status,
      loading: false,
    })),
    on(SystemStatusActions.loadSystemStatusFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }))
  ),
})
