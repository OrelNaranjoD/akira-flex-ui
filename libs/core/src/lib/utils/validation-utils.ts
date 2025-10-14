import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

/**
 * Custom email validator with stricter validation than Angular's built-in email validator.
 * @param control The form control to validate.
 * @returns Validation errors or null if valid.
 */
export function emailValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const isValid = emailRegex.test(control.value)

  return isValid ? null : { invalidEmail: true }
}

/**
 * Validator to check if password and confirmPassword fields match.
 * Should be applied to a FormGroup containing both controls.
 * @param control The form group containing password and confirmPassword controls.
 * @returns Validation errors or null if they match.
 */
export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')
  const confirmPassword = control.get('confirmPassword')

  if (!password || !confirmPassword || password.value === confirmPassword.value) {
    return null
  }

  confirmPassword.setErrors({ passwordMismatch: true })

  return { passwordMismatch: true }
}
