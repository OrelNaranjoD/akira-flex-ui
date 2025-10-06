import { createAction, props } from '@ngrx/store'
import {
  User,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  VerifyEmailRequest,
  ResendVerificationRequest,
  AuthTokenResponse,
} from '../../shared'

/**
 * Login Actions.
 */

/**
 * Action dispatched to initiate user login.
 */
export const login = createAction('[Auth] Login', props<{ credentials: LoginRequest }>())

/**
 * Action dispatched when login is successful.
 */
export const loginSuccess = createAction('[Auth] Login Success')

/**
 * Action dispatched when login fails.
 */
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>())

/**
 * Action dispatched to initiate user registration.
 */
export const register = createAction('[Auth] Register', props<{ userData: RegisterRequest }>())

/**
 * Action dispatched when registration is successful.
 */
export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ response: RegisterResponse }>()
)

/**
 * Action dispatched when registration fails.
 */
export const registerFailure = createAction('[Auth] Register Failure', props<{ error: string }>())

/**
 * Action dispatched to initiate email verification.
 */
export const verifyEmail = createAction(
  '[Auth] Verify Email',
  props<{ verificationData: VerifyEmailRequest }>()
)

/**
 * Action dispatched when email verification is successful.
 */
export const verifyEmailSuccess = createAction(
  '[Auth] Verify Email Success',
  props<{ response: AuthTokenResponse }>()
)

/**
 * Action dispatched when email verification fails.
 */
export const verifyEmailFailure = createAction(
  '[Auth] Verify Email Failure',
  props<{ error: string }>()
)

/**
 * Action dispatched to resend email verification.
 */
export const resendVerification = createAction(
  '[Auth] Resend Verification',
  props<{ requestData: ResendVerificationRequest }>()
)

/**
 * Action dispatched when resend verification is successful.
 */
export const resendVerificationSuccess = createAction('[Auth] Resend Verification Success')

/**
 * Action dispatched when resend verification fails.
 */
export const resendVerificationFailure = createAction(
  '[Auth] Resend Verification Failure',
  props<{ error: string }>()
)

/**
 * Action dispatched to set authentication data from JWT.
 */
export const setAuthFromJwt = createAction(
  '[Auth] Set Auth From JWT',
  props<{ token: string; user: User }>()
)

/**
 * Action dispatched to load user profile.
 */
export const loadUserProfile = createAction('[Auth] Load User Profile')

/**
 * Action dispatched when user profile loading is successful.
 */
export const loadUserProfileSuccess = createAction(
  '[Auth] Load User Profile Success',
  props<{ user: User }>()
)

/**
 * Action dispatched when user profile loading fails.
 */
export const loadUserProfileFailure = createAction(
  '[Auth] Load User Profile Failure',
  props<{ error: string }>()
)

/**
 * Action dispatched to initiate user logout.
 */
export const logout = createAction('[Auth] Logout')

/**
 * Action dispatched when logout is successful.
 */
export const logoutSuccess = createAction('[Auth] Logout Success')

/**
 * Action dispatched to initialize authentication state.
 */
export const initializeAuth = createAction('[Auth] Initialize Auth')

/**
 * Action dispatched when authentication initialization is successful.
 */
export const initializeAuthSuccess = createAction(
  '[Auth] Initialize Auth Success',
  props<{ user: User; token: string }>()
)

/**
 * Action dispatched when authentication initialization fails.
 */
export const initializeAuthFailure = createAction('[Auth] Initialize Auth Failure')
