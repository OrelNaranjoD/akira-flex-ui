import { createReducer, on } from '@ngrx/store'
import { User } from '../../shared'
import * as AuthActions from './auth.actions'

/**
 * Interface representing the authentication state in the NgRx store.
 */
export interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
  initialized: boolean
}

/**
 * Initial state for the authentication store.
 */
export const initialAuthState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  initialized: false,
}

/**
 * Reducer function for handling authentication state changes.
 */
export const authReducer = createReducer(
  initialAuthState,

  // Login
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Register
  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.registerSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Email Verification
  on(AuthActions.verifyEmail, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.verifyEmailSuccess, (state, { response }) => ({
    ...state,
    token: response.accessToken,
    loading: false,
    error: null,
  })),
  on(AuthActions.verifyEmailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Set Auth from JWT
  on(AuthActions.setAuthFromJwt, (state, { token, user }) => ({
    ...state,
    token,
    user,
    initialized: true,
    loading: false,
    error: null,
  })),

  // User Profile
  on(AuthActions.loadUserProfile, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loadUserProfileSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),
  on(AuthActions.loadUserProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Logout
  on(AuthActions.logout, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.logoutSuccess, () => initialAuthState),

  // Initialize Auth
  on(AuthActions.initializeAuth, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.initializeAuthSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    loading: false,
    initialized: true,
    error: null,
  })),
  on(AuthActions.initializeAuthFailure, (state) => ({
    ...state,
    loading: false,
    initialized: true,
  }))
)
