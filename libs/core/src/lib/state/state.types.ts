import type {
  CompanyInfo,
  BranchInfo,
  BusinessHours,
  ConnectionStatus,
} from '../shared/common.types'
import type { User } from '../shared'

/**
 * Authentication feature state.
 */
export interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
  initialized: boolean
}

/**
 * System status feature state.
 */
export interface SystemStatusState {
  companyInfo: CompanyInfo | null
  branchInfo: BranchInfo | null
  appVersion: string | null
  businessHours: BusinessHours | null
  lastSyncTime: string | null
  connectionStatus: ConnectionStatus | null
  loading: boolean
  error: string | null
}
