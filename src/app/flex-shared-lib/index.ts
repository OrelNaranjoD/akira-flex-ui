import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'

export interface AppNotification {
  id: number
  title: string
  message: string
  time: string
  read: boolean
  type: 'info' | 'warning' | 'success' | 'error'
}

export interface LoginPayload {
  email: string
  password: string
  remember: boolean
}
export interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  phone?: string
  password: string
}

export interface RegisterResponse {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  createdAt?: string
}

export interface LoginRequest {
  email: string
  password: string
  remember: boolean
}

export interface LoginResponse {
  accessToken: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    phone?: string
    roles: string[]
    createdAt?: string
  }
}

/**
 * Validator ensuring password and confirmPassword match on a FormGroup.
 * @param group The AbstractControl (FormGroup) to validate.
 * @returns ValidationErrors object if passwords do not match, otherwise null.
 */
export const passwordsMatchValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const pw = group.get('password')?.value
  const confirm = group.get('confirmPassword')?.value
  return pw === confirm ? null : { passwordsMismatch: true }
}
