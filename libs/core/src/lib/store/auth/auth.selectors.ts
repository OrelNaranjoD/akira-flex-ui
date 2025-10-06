import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AuthState } from './auth.reducer'

/**
 * Feature selector for the authentication state.
 */
export const selectAuthState = createFeatureSelector<AuthState>('auth')

/**
 * Selector for the current user.
 */
export const selectUser = createSelector(selectAuthState, (state) => state.user)

/**
 * Selector for the authentication token.
 */
export const selectToken = createSelector(selectAuthState, (state) => state.token)

/**
 * Selector for the authentication status (true if user and token exist and auth is initialized).
 */
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => !!state.user && !!state.token && state.initialized
)

/**
 * Selector for the loading state.
 */
export const selectIsLoading = createSelector(selectAuthState, (state) => state.loading)

/**
 * Selector for the error message.
 */
export const selectError = createSelector(selectAuthState, (state) => state.error)

/**
 * Selector for the initialization status.
 */
export const selectIsInitialized = createSelector(selectAuthState, (state) => state.initialized)
