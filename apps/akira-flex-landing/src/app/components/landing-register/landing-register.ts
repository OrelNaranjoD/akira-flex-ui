import { CommonModule } from '@angular/common'
import { Component, output, input, inject, signal } from '@angular/core'
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
import { LandingRegisterService } from './landing-register.service'
import { passwordsMatchValidator } from '@shared'
import { delay } from '@shared/utils/delay-utils'
import { MessageService } from 'primeng/api'
import { Message } from 'primeng/message'
import { DynamicDialogRef } from 'primeng/dynamicdialog'
import { InputText } from 'primeng/inputtext'
import { IconField } from 'primeng/iconfield'
import { InputIcon } from 'primeng/inputicon'
import { Button } from 'primeng/button'
import { Password } from 'primeng/password'

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
  providers: [LandingRegisterService, MessageService],
  templateUrl: './landing-register.html',
})
export class LandingRegister {
  isDropdownOpen = input(false)
  isRegisterOpen = input(false)
  submitRegister = output<{
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
  }>()
  requestSwitch = output<boolean>()

  isLoading = signal(false)
  serverError = signal<string | null>(null)
  registrationCompleted = signal(false)
  emailForSuccessMessage = signal('')

  private readonly formBuilder = inject(FormBuilder)
  private readonly registerService = inject(LandingRegisterService)
  private readonly messageService = inject(MessageService)
  private readonly ref = inject(DynamicDialogRef)

  form = this.formBuilder.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', []],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [passwordsMatchValidator],
    }
  )

  /**
   * Handles form submission. If valid, it calls the registration service.
   * On success, it displays a confirmation message and then switches
   * to the login view after a delay.
   */
  async registerSubmit(): Promise<void> {
    this.form.markAllAsTouched()
    if (this.form.invalid || this.isLoading()) return

    this.serverError.set(null)
    this.isLoading.set(true)
    const firstName = this.form.get('firstName')!.value as string
    const lastName = this.form.get('lastName')!.value as string
    const email = this.form.get('email')!.value as string
    const phone = this.form.get('phone')!.value as string | undefined
    const password = this.form.get('password')!.value as string

    const payload = { firstName, lastName, email, phone, password }

    this.registerService.register(payload).subscribe({
      next: async () => {
        this.isLoading.set(false)
        this.registrationCompleted.set(true)
        this.emailForSuccessMessage.set(email)
        this.submitRegister.emit({
          firstName,
          lastName,
          email,
          phone: phone ?? '',
          password,
        })
        this.form.reset()

        await delay(5000)
        this.ref.close(payload)
        await delay(500)
        this.registrationCompleted.set(false)
      },
      error: (err) => {
        this.isLoading.set(false)
        this.serverError.set(err?.message ?? 'Error en el registro')
      },
    })
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Form is submitted',
      life: 3000,
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
