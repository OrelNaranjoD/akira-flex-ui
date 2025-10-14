import { Component, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { Card } from 'primeng/card'
import { InputText } from 'primeng/inputtext'
import { Password } from 'primeng/password'
import { Button } from 'primeng/button'
import { Message } from 'primeng/message'
import { AuthService } from '@core'
import { MOCK_COMPANY_DATA } from '@mocks'
import { Logotype } from '@core/components/logotype/logotype'
import { emailValidator } from '@core/utils'

/**
 * Sign-in page component for tenant authentication.
 * Provides a full-screen sign-in form for tenant creators and users.
 */
@Component({
  selector: 'tenant-sign-in',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Card,
    InputText,
    Password,
    Button,
    Message,
    Logotype,
    RouterLink,
  ],
  templateUrl: './sign-in.html',
})
export class SignIn {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  // Company data from shared mocks
  companyData = MOCK_COMPANY_DATA

  readonly isLoading = signal(false)
  readonly errorMessage = signal<string | null>(null)
  readonly isAccountLocked = signal(false)
  readonly lockoutTimeRemaining = signal(0)

  readonly signInForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, emailValidator]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  constructor() {
    this.checkAccountLockStatus()
  }

  /**
   * Check if the account is currently locked and update UI accordingly.
   */
  private checkAccountLockStatus(): void {
    const email = this.signInForm.get('email')?.value
    if (!email) return

    const lockData = this.getLockData(email)
    if (lockData && lockData.attempts >= 5) {
      const timeRemaining = this.getLockoutTimeRemaining(lockData.lockTime)
      if (timeRemaining > 0) {
        this.isAccountLocked.set(true)
        this.lockoutTimeRemaining.set(timeRemaining)
        this.errorMessage.set(
          $localize`:@@accountLocked:Account locked. Try again in ${Math.ceil(
            timeRemaining / 60
          )} minutes.`
        )
      } else {
        this.clearLockData(email)
        this.isAccountLocked.set(false)
        this.errorMessage.set(null)
      }
    }
  }

  /**
   * Handle form submission with account lock logic.
   */
  onSubmit(): void {
    if (this.signInForm.invalid) {
      this.markFormGroupTouched()
      return
    }

    const email = this.signInForm.value.email

    // Check if account is locked
    if (this.isAccountLocked()) {
      this.errorMessage.set(
        $localize`:@@accountLockedTemporarily:Account temporarily locked. Try again later.`
      )
      return
    }

    this.isLoading.set(true)
    this.errorMessage.set(null)

    const { password } = this.signInForm.value

    this.authService.loginHardcoded({ email, password, remember: true }).subscribe({
      next: () => {
        this.isLoading.set(false)
        this.clearLockData(email)
        this.router.navigate(['/'])
      },
      error: (error) => {
        this.isLoading.set(false)
        this.handleSignInError(error, email)
      },
    })
  }

  /**
   * Handle sign-in errors and implement lockout logic.
   * @param error The error object from the sign-in attempt.
   * @param email The email address being used for sign-in.
   */
  private handleSignInError(error: unknown, email: string): void {
    if (error && typeof error === 'object' && 'status' in error) {
      const httpError = error as { status: number }
      if (httpError.status === 401) {
        const attempts = this.incrementFailedAttempts(email)

        if (attempts >= 5) {
          this.lockAccount(email)
          this.errorMessage.set(
            $localize`:@@accountLockedMultipleAttempts:Account locked due to multiple failed attempts. Try again in 15 minutes.`
          )
        } else {
          const remainingAttempts = 5 - attempts
          this.errorMessage.set(
            $localize`:@@incorrectCredentials:Incorrect credentials. You have ${remainingAttempts} attempt${remainingAttempts === 1 ? '' : 's'} remaining.`
          )
        }
      } else if (httpError.status === 429) {
        this.errorMessage.set($localize`:@@tooManyAttempts:Too many attempts. Try again later.`)
      } else {
        this.errorMessage.set($localize`:@@errorSigningIn:Error signing in. Try again.`)
      }
    } else {
      this.errorMessage.set($localize`:@@errorSigningIn:Error signing in. Try again.`)
    }
  }

  /**
   * Get failed attempts data for an email.
   * @param email The email address to check.
   * @returns The lock data or null if not found.
   */
  private getLockData(email: string): { attempts: number; lockTime: number } | null {
    const key = `login_attempts_${btoa(email)}`
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  }

  /**
   * Increment failed attempts counter.
   * @param email The email address for which to increment attempts.
   * @returns The new number of failed attempts.
   */
  private incrementFailedAttempts(email: string): number {
    const key = `login_attempts_${btoa(email)}`
    const currentData = this.getLockData(email) || { attempts: 0, lockTime: 0 }
    currentData.attempts += 1
    localStorage.setItem(key, JSON.stringify(currentData))
    return currentData.attempts
  }

  /**
   * Lock account for 15 minutes.
   * @param email The email address to lock.
   */
  private lockAccount(email: string): void {
    const key = `login_attempts_${btoa(email)}`
    const lockData = {
      attempts: 5,
      lockTime: Date.now() + 15 * 60 * 1000, // 15 minutes
    }
    localStorage.setItem(key, JSON.stringify(lockData))
    this.isAccountLocked.set(true)
    this.lockoutTimeRemaining.set(15 * 60)
  }

  /**
   * Clear lock data for successful sign-in.
   * @param email The email address to clear data for.
   */
  private clearLockData(email: string): void {
    const key = `login_attempts_${btoa(email)}`
    localStorage.removeItem(key)
    this.isAccountLocked.set(false)
    this.lockoutTimeRemaining.set(0)
  }

  /**
   * Get remaining lockout time in seconds.
   * @param lockTime The timestamp when the lock expires.
   * @returns The remaining time in seconds.
   */
  private getLockoutTimeRemaining(lockTime: number): number {
    const remaining = Math.max(0, lockTime - Date.now())
    return Math.floor(remaining / 1000)
  }

  /**
   * Mark all form controls as touched to show validation errors.
   */
  private markFormGroupTouched(): void {
    Object.keys(this.signInForm.controls).forEach((key) => {
      const control = this.signInForm.get(key)
      control?.markAsTouched()
    })
  }
}
