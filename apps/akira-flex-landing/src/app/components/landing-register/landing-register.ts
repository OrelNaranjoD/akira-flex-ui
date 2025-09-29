import { CommonModule } from '@angular/common'
import { Component, ChangeDetectionStrategy, output, input, inject, signal } from '@angular/core'
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
import { LandingRegisterService } from './landing-register.service'
import { passwordsMatchValidator } from '@flex-shared-lib'
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LandingRegisterService, MessageService],
  template: `
    <div class="p-4">
      @if (!registrationCompleted()) {
        <form
          class="flex flex-col gap-3"
          [formGroup]="form"
          (ngSubmit)="registerSubmit(); $event.preventDefault()"
        >
          <div class="grid grid-cols-2 gap-2">
            <div class="flex flex-col gap-1">
              <label class="font-medium" for="register-firstname">Nombre</label>
              <p-iconfield>
                <p-inputIcon class="pi pi-user" />
                <input
                  id="register-firstname"
                  formControlName="firstName"
                  pInputText
                  autocomplete="given-name"
                  placeholder="Nombre"
                  required
                  fluid
                />
              </p-iconfield>
              @if (
                form.get('firstName')?.invalid &&
                (form.get('firstName')?.dirty || form.get('firstName')?.touched)
              ) {
                <div class="text-xs">
                  @if (form.get('firstName')?.hasError('required')) {
                    <p-message severity="error" variant="simple" size="small"
                      >El nombre es requerido.</p-message
                    >
                  }
                </div>
              }
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-medium" for="register-lastname">Apellido</label>
              <p-iconfield>
                <p-inputIcon class="pi pi-user" />
                <input
                  id="register-lastname"
                  formControlName="lastName"
                  pInputText
                  autocomplete="family-name"
                  placeholder="Apellido"
                  required
                  fluid
                />
              </p-iconfield>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <label class="font-medium" for="register-email">Email</label>
            <p-iconfield>
              <p-inputIcon class="pi pi-envelope" />
              <input
                id="register-email"
                formControlName="email"
                type="email"
                pInputText
                autocomplete="email"
                placeholder="email@dominio.com"
                required
                fluid
              />
            </p-iconfield>
            @if (
              form.get('email')?.invalid && (form.get('email')?.dirty || form.get('email')?.touched)
            ) {
              <div class="text-xs">
                @if (form.get('email')?.hasError('required')) {
                  <p-message severity="error" variant="simple" size="small"
                    >El email es requerido.</p-message
                  >
                }
                @if (form.get('email')?.hasError('email')) {
                  <p-message severity="error" variant="simple" size="small"
                    >Por favor, introduce un email válido.</p-message
                  >
                }
              </div>
            }
          </div>

          <div class="flex flex-col gap-1">
            <label class="font-medium" for="register-phone">Teléfono (opcional)</label>
            <p-iconfield>
              <p-inputIcon class="pi pi-phone" />
              <input
                id="register-phone"
                formControlName="phone"
                type="tel"
                pInputText
                autocomplete="tel"
                placeholder="Teléfono"
                fluid
              />
            </p-iconfield>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div class="flex flex-col gap-1">
              <label class="font-medium" for="register-password">Contraseña</label>
              <p-password
                [toggleMask]="true"
                [feedback]="false"
                inputId="register-password"
                formControlName="password"
                autocomplete="new-password"
                placeholder="********"
                required
                fluid
              />
              @if (
                form.get('password')?.invalid &&
                (form.get('password')?.dirty || form.get('password')?.touched)
              ) {
                <div class="text-xs">
                  @if (form.get('password')?.hasError('required')) {
                    <p-message severity="error" variant="simple" size="small"
                      >La contraseña es requerida.</p-message
                    >
                  }
                  @if (form.get('password')?.hasError('minlength')) {
                    <p-message severity="error" variant="simple" size="small"
                      >La contraseña debe tener al menos 6 caracteres.</p-message
                    >
                  }
                </div>
              }
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-medium" for="register-confirm">Confirmar contraseña</label>
              <p-password
                [toggleMask]="true"
                [feedback]="false"
                inputId="register-confirm"
                formControlName="confirmPassword"
                autocomplete="new-password"
                placeholder="********"
                required
                fluid
              />
            </div>
          </div>

          @if (
            form.hasError('passwordsMismatch') &&
            (form.get('confirmPassword')?.dirty || form.get('confirmPassword')?.touched)
          ) {
            <p-message severity="error" variant="simple" size="small">
              Las contraseñas no coinciden.
            </p-message>
          }

          @if (serverError()) {
            <p-message styleClass="w-full" severity="error" variant="simple" size="small">
              {{ serverError() }}
            </p-message>
          }

          <p-button
            [rounded]="true"
            [raised]="true"
            [disabled]="form.invalid || isLoading()"
            [label]="!isLoading() ? 'Crear cuenta' : 'Creando...'"
            styleClass="w-full my-2"
            type="submit"
            aria-label="Crear cuenta"
          />

          <div class="pt-4 border-t text-center">
            <p class="text-sm">
              ¿Tienes cuenta?
              <p-button
                (onClick)="openDropdown(false)"
                label="Iniciar sesión"
                styleClass="p-button-link text-sm hover:underline"
                type="button"
                aria-label="Iniciar sesión"
              />
            </p>
          </div>
        </form>
      }
    </div>
  `,
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
