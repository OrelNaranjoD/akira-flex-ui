import { Component, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { Card } from 'primeng/card'
import { InputText } from 'primeng/inputtext'
import { Button } from 'primeng/button'
import { Message } from 'primeng/message'
import { AuthService } from '@core'
import { MOCK_COMPANY_DATA } from '@mocks'
import { Logotype } from '@core/components/logotype/logotype'
import { emailValidator } from '@core/utils'

/**
 * Password recovery page component.
 * Allows users to request a new password from the tenant administrator.
 */
@Component({
  selector: 'tenant-password-recovery',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Card,
    InputText,
    Button,
    Message,
    Logotype,
    RouterLink,
  ],
  templateUrl: './password-recovery.html',
})
export class PasswordRecovery {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  // Company data from shared mocks
  companyData = MOCK_COMPANY_DATA

  readonly isLoading = signal(false)
  readonly errorMessage = signal<string | null>(null)
  readonly successMessage = signal<string | null>(null)

  readonly recoveryForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, emailValidator]],
  })

  /**
   * Handle form submission.
   */
  onSubmit(): void {
    if (this.recoveryForm.invalid) {
      this.markFormGroupTouched()
      return
    }

    this.isLoading.set(true)
    this.errorMessage.set(null)
    this.successMessage.set(null)

    const { email } = this.recoveryForm.value

    // Simulate API call to request password recovery
    setTimeout(() => {
      // In a real app, this would call an API to send recovery email
      console.log(`Password recovery requested for: ${email}`)
      this.isLoading.set(false)
      this.successMessage.set(
        'A request has been sent to your company administrator. You will receive a new password shortly.'
      )
      this.recoveryForm.reset()
    }, 2000)
  }

  /**
   * Mark all form controls as touched to show validation errors.
   */
  private markFormGroupTouched(): void {
    Object.keys(this.recoveryForm.controls).forEach((key) => {
      const control = this.recoveryForm.get(key)
      control?.markAsTouched()
    })
  }
}
