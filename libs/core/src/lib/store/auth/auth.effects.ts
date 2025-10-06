import { Injectable, inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { AuthService } from '../../services/auth.service'
import * as AuthActions from './auth.actions'

/**
 * Effects for handling authentication-related side effects.
 */
@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions)
  private authService = inject(AuthService)

  /**
   * Effect that handles user login by calling the AuthService and dispatching success or failure actions.
   */
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(() => AuthActions.loginSuccess()),
          catchError((error) =>
            of(
              AuthActions.loginFailure({
                error: error.message || 'Login failed',
              })
            )
          )
        )
      )
    )
  )

  /**
   * Effect that handles user registration by calling the AuthService and dispatching success or failure actions.
   */
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ userData }) =>
        this.authService.register(userData).pipe(
          map((response) => AuthActions.registerSuccess({ response })),
          catchError((error) =>
            of(AuthActions.registerFailure({ error: error.message || 'Registration failed' }))
          )
        )
      )
    )
  )

  /**
   * Effect that handles email verification by calling the AuthService and dispatching success or failure actions.
   */
  verifyEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.verifyEmail),
      mergeMap(({ verificationData }) =>
        this.authService.verifyEmail(verificationData).pipe(
          map((response) => AuthActions.verifyEmailSuccess({ response })),
          catchError((error) =>
            of(
              AuthActions.verifyEmailFailure({
                error: error.message || 'Email verification failed',
              })
            )
          )
        )
      )
    )
  )

  /**
   * Effect that handles resend verification by calling the AuthService and dispatching success or failure actions.
   */
  resendVerification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resendVerification),
      mergeMap(({ requestData }) =>
        this.authService.resendVerification(requestData).pipe(
          map(() => AuthActions.resendVerificationSuccess()),
          catchError((error) =>
            of(
              AuthActions.resendVerificationFailure({
                error: error.message || 'Failed to resend verification',
              })
            )
          )
        )
      )
    )
  )

  /**
   * Effect that handles user profile loading by calling the AuthService and dispatching success or failure actions.
   */
  loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUserProfile),
      mergeMap(() =>
        this.authService.getUserProfile().pipe(
          map((user) => AuthActions.loadUserProfileSuccess({ user })),
          catchError((error) =>
            of(
              AuthActions.loadUserProfileFailure({
                error: error.message || 'Failed to load user profile',
              })
            )
          )
        )
      )
    )
  )

  /**
   * Effect that handles user logout by calling the AuthService and dispatching success action.
   */
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      map(() => {
        this.authService.logout()
        return AuthActions.logoutSuccess()
      })
    )
  )

  /**
   * Effect that handles authentication initialization by calling the AuthService and dispatching success or failure actions.
   */
  initializeAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initializeAuth),
      mergeMap(() =>
        this.authService.initializeAuth().pipe(
          map((result) => {
            if (result) {
              return AuthActions.initializeAuthSuccess({ user: result.user, token: result.token })
            } else {
              return AuthActions.initializeAuthFailure()
            }
          }),
          catchError(() => of(AuthActions.initializeAuthFailure()))
        )
      )
    )
  )
}
