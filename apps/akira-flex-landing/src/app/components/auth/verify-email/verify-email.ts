import { CommonModule } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog'
import { InputText } from 'primeng/inputtext'
import { Button } from 'primeng/button'
import { Message } from 'primeng/message'

/**
 * Component for email verification modal in the landing page.
 */
@Component({
  selector: 'landing-verify-email',
  imports: [CommonModule, ReactiveFormsModule, InputText, Button, Message],
  templateUrl: './verify-email.html',
})
export class VerifyEmail {
  isLoading = signal(false)
  serverError = signal<string | null>(null)
  emailSent = signal(false)
  resendDisabled = signal(false)
  countdown = signal(0)

  private readonly formBuilder = inject(FormBuilder)
  private readonly ref = inject(DynamicDialogRef)
  private readonly config = inject(DynamicDialogConfig)

  email = this.config.data?.email || ''

  form = this.formBuilder.group({
    verificationCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  })

  /**
   * Handles verification code submission.
   */
  async verifyCode(): Promise<void> {
    this.form.markAllAsTouched()
    if (this.form.invalid || this.isLoading()) return

    this.serverError.set(null)
    this.isLoading.set(true)

    const code = this.form.get('verificationCode')!.value as string

    // Simular verificación (en producción esto iría a un servicio)
    setTimeout(() => {
      this.isLoading.set(false)

      // Simular verificación exitosa
      if (code === '123456') {
        this.ref.close('verified')
      } else {
        this.serverError.set('Código de verificación incorrecto')
      }
    }, 1000)
  }

  /**
   * Resends the verification code to the user's email.
   */
  resendCode(): void {
    if (this.resendDisabled()) return

    this.resendDisabled.set(true)
    this.countdown.set(30)

    // Simular envío de email
    this.emailSent.set(true)

    const interval = setInterval(() => {
      this.countdown.update((count) => {
        if (count <= 1) {
          clearInterval(interval)
          this.resendDisabled.set(false)
          return 0
        }
        return count - 1
      })
    }, 1000)
  }

  /**
   * Closes the verification modal.
   */
  cancel(): void {
    this.ref.close()
  }
}
