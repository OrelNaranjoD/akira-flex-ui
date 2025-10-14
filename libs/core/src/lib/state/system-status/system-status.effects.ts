import { Injectable, inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import { SystemStatusActions } from './system-status.actions'
import { MOCK_SYSTEM_DATA } from '../../shared/mocks/company-mocks'

/**
 * Handles side effects for system status actions, such as fetching data from an API.
 */
@Injectable()
export class SystemStatusEffects {
  private readonly actions$ = inject(Actions)

  /**
   * Handles loading system status data.
   * Uses switchMap to ensure only the latest request is processed.
   */
  public readonly loadSystemStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SystemStatusActions.loadSystemStatus),
      switchMap(() =>
        of(MOCK_SYSTEM_DATA).pipe(
          map((data) => SystemStatusActions.loadSystemStatusSuccess({ status: data })),
          catchError((error) =>
            of(SystemStatusActions.loadSystemStatusFailure({ error: error.message }))
          )
        )
      )
    )
  )
}
