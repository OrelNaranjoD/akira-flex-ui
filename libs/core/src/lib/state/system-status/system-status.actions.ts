import { createActionGroup, emptyProps, props } from '@ngrx/store'
import type { SystemStatusState } from '../state.types'

/**
 * Defines the action group for system status operations.
 */
export const SystemStatusActions = createActionGroup({
  source: 'System Status',
  events: {
    'Load System Status': emptyProps(),
    'Load System Status Success': props<{ status: Omit<SystemStatusState, 'loading' | 'error'> }>(),
    'Load System Status Failure': props<{ error: string }>(),
  },
})
