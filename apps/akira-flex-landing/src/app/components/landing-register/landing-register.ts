import { CommonModule } from '@angular/common'
import { Component, output, input, inject, signal } from '@angular/core'
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
import { LandingRegisterService } from './landing-register.service'
import { Message } from 'primeng/message'
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog'
import { InputText } from 'primeng/inputtext'
import { IconField } from 'primeng/iconfield'
import { InputIcon } from 'primeng/inputicon'
import { Button } from 'primeng/button'
import { Password } from 'primeng/password'
import { LandingEmailVerification } from '../landing-email-verification'

/**
 * Component for the registration form in the landing page header.
 */
@Component({
  selector: 'app-landing-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Message,
    InputText,
    IconField,
    InputIcon,
    Button,
    Password,
  ],
  providers: [LandingRegisterService],
  templateUrl: './landing-register.html',
})
export class LandingRegister {
  isDropdownOpen = input(false)
  isRegisterOpen = input(false)
  requestSwitch = output<boolean>()

  isLoading = signal(false)
  serverError = signal<string | null>(null)

  private readonly formBuilder = inject(FormBuilder)
  private readonly registerService = inject(LandingRegisterService)
  private readonly dialogService = inject(DialogService)
  private readonly ref = inject(DynamicDialogRef)

  form = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', []],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  })

  /**
   * Handles form submission. If valid, it calls the registration service.
   * On success, it opens the email verification modal.
   */
  async registerSubmit(): Promise<void> {
    this.form.markAllAsTouched()
    if (this.form.invalid || this.isLoading()) return

    // Validar que las contraseñas coincidan
    const passwordValue = this.form.get('password')?.value
    const confirmPasswordValue = this.form.get('confirmPassword')?.value
    if (passwordValue !== confirmPasswordValue) {
      this.serverError.set('Las contraseñas no coinciden')
      return
    }

    this.serverError.set(null)
    this.isLoading.set(true)
    const firstName = this.form.get('firstName')!.value as string
    const lastName = this.form.get('lastName')!.value as string
    const email = this.form.get('email')!.value as string
    const phone = this.form.get('phone')!.value as string | undefined
    const password = passwordValue as string

    const payload = { firstName, lastName, email, phone, password }

    this.registerService.register(payload).subscribe({
      next: async () => {
        this.isLoading.set(false)

        // Abrir modal de verificación de email
        const ref = this.dialogService.open(LandingEmailVerification, {
          data: { email },
          header: 'Verificar Email',
          width: '400px',
          closable: false,
          modal: true,
        })

        // Esperar a que se complete la verificación
        ref.onClose.subscribe((result) => {
          if (result === 'verified') {
            // Verificación exitosa, cerrar el modal de registro
            this.ref.close(payload)
          }
        })
      },
      error: (err) => {
        this.isLoading.set(false)
        this.serverError.set(err?.message ?? 'Error en el registro')
      },
    })
  }

  /**
   * Requests a switch to the login or register panel.
   * @param toRegister Boolean indicating whether to open the register panel.
   */
  openDropdown(toRegister: boolean): void {
    if (!toRegister) {
      this.ref.close('login')
    }
    this.requestSwitch.emit(toRegister)
  }
}
