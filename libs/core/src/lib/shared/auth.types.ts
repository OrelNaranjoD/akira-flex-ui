import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'
import type { User } from './entities.types'

/**
 * API endpoints configuration for authentication.
 */
export interface ApiEndpoints {
  auth: {
    login: string
    register: string
    platformRegister: string
    verifyEmail: string
    resendVerification: string
    forgotPassword: string
    resetPassword: string
    refreshToken: string
    logout: string
    me: string
  }
}

/**
 * Payload for login requests.
 */
export interface LoginPayload {
  email: string
  password: string
  remember: boolean
}

/**
 * Payload for registration requests.
 */
export interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  phone: string
}

/**
 * Request structure for user registration.
 */
export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  phone?: string
  password: string
}

/**
 * Response structure for registration.
 */
export interface RegisterResponse {
  id: string
  email: string
  status: string
  token: string
}

/**
 * Request structure for email verification.
 */
export interface VerifyEmailRequest {
  email: string
  pin: string
}

/**
 * Request structure for resending verification email.
 */
export interface ResendVerificationRequest {
  email: string
}

/**
 * Response structure for authentication tokens.
 */
export interface AuthTokenResponse {
  accessToken: string
  expiresIn: number
  tokenType: string
}

/**
 * Request structure for login.
 */
export interface LoginRequest {
  email: string
  password: string
  remember: boolean
}

/**
 * Response structure for login.
 */
export interface LoginResponse {
  accessToken: string
  user: User
}

/**
 * Validator function to check if passwords match.
 * @param group The form group containing password fields.
 * @returns Validation errors if passwords don't match, null otherwise.
 */
export const passwordsMatchValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const pw = group.get('password')?.value
  const confirm = group.get('confirmPassword')?.value
  return pw === confirm ? null : { passwordsMismatch: true }
}
