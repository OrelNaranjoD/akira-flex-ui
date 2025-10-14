import { CommonModule } from '@angular/common'
import {
  Component,
  output,
  input,
  inject,
  signal,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core'
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
import { DialogModule } from 'primeng/dialog'
import { SignUpService } from './sign-up.service'
import { Message } from 'primeng/message'
import { InputText } from 'primeng/inputtext'
import { IconField } from 'primeng/iconfield'
import { InputIcon } from 'primeng/inputicon'
import { Button } from 'primeng/button'
import { Password } from 'primeng/password'
import { passwordMatchValidator } from '@core/utils'

/**
 * Component for the registration form in the landing page header.
 */
@Component({
  selector: 'landing-sign-up',
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    Message,
    InputText,
    IconField,
    InputIcon,
    Button,
    Password,
  ],
  providers: [SignUpService],
  templateUrl: './sign-up.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUp {
  visible = false
  isDropdownOpen = input(false)
  isRegisterOpen = input(false)
  requestSwitch = output<boolean>()

  isLoading = signal(false)
  serverError = signal<string | null>(null)

  private readonly formBuilder = inject(FormBuilder)
  private readonly registerService = inject(SignUpService)
  private readonly cdr = inject(ChangeDetectorRef)

  form = this.formBuilder.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator }
  )

  /**
   * Handles form submission. If valid, it calls the registration service.
   * On success, it closes the modal.
   */
  async registerSubmit(): Promise<void> {
    this.form.markAllAsTouched()
    if (this.form.invalid || this.isLoading()) return

    this.serverError.set(null)
    this.isLoading.set(true)
    const { firstName, lastName, email, phone, password } = this.form.getRawValue()

    const payload = {
      firstName: firstName!,
      lastName: lastName!,
      email: email!,
      phone: phone || undefined,
      password: password!,
    }

    this.registerService.register(payload).subscribe({
      next: async () => {
        this.isLoading.set(false)
        // TODO: Implementar verificación de email
        this.visible = false
      },
      error: (err: unknown) => {
        this.isLoading.set(false)
        this.serverError.set((err as Error)?.message ?? 'Registration error')
      },
    })
  }

  /**
   * Switches to the sign-in form.
   */
  switchToSignIn(): void {
    this.visible = false
    this.requestSwitch.emit(true)
    this.cdr.detectChanges()
  }

  /**
   * Shows the sign-up modal.
   */
  show(): void {
    this.visible = true
    this.cdr.detectChanges()
  }

  /**
   * Hides the sign-up modal.
   */
  hide(): void {
    this.visible = false
    this.cdr.detectChanges()
  }
}
