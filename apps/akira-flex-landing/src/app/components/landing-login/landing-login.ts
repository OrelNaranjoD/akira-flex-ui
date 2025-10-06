import { Component, inject, output, signal, AfterViewInit } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { LoginRequest, LoginResponse } from '@shared'
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog'
import { InputTextModule } from 'primeng/inputtext'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { CheckboxModule } from 'primeng/checkbox'
import { ButtonModule } from 'primeng/button'
import { MessageModule } from 'primeng/message'
import { PasswordModule } from 'primeng/password'
import { LandingLoginService } from './landing-login.service'

/**
 * Component for the login form in the landing page header.
 */
@Component({
  selector: 'app-landing-login',
  imports: [
    CheckboxModule,
    InputTextModule,
    ReactiveFormsModule,
    IconFieldModule,
    InputIconModule,
    MessageModule,
    ButtonModule,
    PasswordModule,
  ],
  providers: [LandingLoginService],
  template: `
    <div class="p-6">
      <form
        class="flex flex-col gap-4"
        [formGroup]="loginForm"
        (ngSubmit)="loginSubmit(); $event.preventDefault()"
      >
        <!-- Email Input -->
        <div class="flex flex-col gap-2">
          <label class="font-medium" for="email-input">Email</label>
          <p-iconfield>
            <p-inputIcon class="pi pi-envelope" />
            <input
              id="email-input"
              formControlName="email"
              type="email"
              pInputText
              autocomplete="username"
              placeholder="email@dominio.com"
              required
              fluid
              autofocus
            />
          </p-iconfield>
          @if (
            loginForm.get('email')?.invalid &&
            (loginForm.get('email')?.dirty || loginForm.get('email')?.touched)
          ) {
            <div class="text-xs mt-1">
              @if (loginForm.get('email')?.hasError('required')) {
                <p-message severity="error" variant="simple" size="small"
                  >El email es requerido.</p-message
                >
              }
              @if (loginForm.get('email')?.hasError('email')) {
                <p-message severity="error" variant="simple" size="small"
                  >Por favor, introduce un email válido.</p-message
                >
              }
            </div>
          }
        </div>

        <!-- Password Input -->
        <div class="flex flex-col gap-2">
          <label class="font-medium" for="password-input">Contraseña</label>
          <p-iconfield>
            <p-inputIcon class="pi pi-lock" />
            <p-password
              [toggleMask]="true"
              [feedback]="false"
              inputId="password-input"
              fluid
              formControlName="password"
              autocomplete="current-password"
              required
              placeholder="********"
            />
          </p-iconfield>
          @if (
            loginForm.get('password')?.invalid &&
            (loginForm.get('password')?.dirty || loginForm.get('password')?.touched)
          ) {
            <div class="text-xs mt-1">
              @if (loginForm.get('password')?.hasError('required')) {
                <p-message severity="error" variant="simple" size="small"
                  >La contraseña es requerida.</p-message
                >
              }
              @if (loginForm.get('password')?.hasError('minlength')) {
                <p-message severity="error" variant="simple" size="small"
                  >La contraseña debe tener al menos 6 caracteres.</p-message
                >
              }
            </div>
          }
        </div>

        <!-- Remember Me & Forgot Password -->
        <div class="flex items-center justify-between mt-2">
          <div class="flex items-center gap-2">
            <p-checkbox [binary]="true" formControlName="remember" inputId="remember" />
            <label class="text-sm cursor-pointer" for="remember">Recordarme</label>
          </div>

          <p-button
            (onClick)="forgotPassword()"
            label="Olvidé mi contraseña"
            styleClass="p-button-link text-sm hover:underline"
            aria-label="Olvidé mi contraseña"
            type="button"
          />
        </div>

        <!-- Server Error Message -->
        @if (serverError()) {
          <div class="mt-2">
            <p-message styleClass="w-full" severity="error" variant="simple" size="small">
              {{ serverError() }}
            </p-message>
          </div>
        }

        <!-- Submit Button -->
        <p-button
          [rounded]="true"
          [raised]="true"
          [disabled]="loginForm.invalid"
          [label]="'Iniciar Sesión'"
          styleClass="w-full mt-4"
          type="submit"
          aria-label="Iniciar Sesión"
        />

        <!-- Register Link -->
        <div class="pt-4 border-t text-center mt-4">
          <p class="text-sm">
            ¿No tienes cuenta?
            <p-button
              (click)="onRequestRegister()"
              label="Crear cuenta"
              styleClass="p-button-link text-sm hover:underline"
              aria-label="Crear cuenta"
              type="button"
            />
          </p>
        </div>
      </form>
    </div>
  `,
})
export class LandingLogin implements AfterViewInit {
  loginSuccess = output<LoginResponse>()
  requestRegister = output<void>()
  forgot = output<void>()

  serverError = signal<string | null>(null)
  private fb = inject(FormBuilder)
  public ref = inject(DynamicDialogRef)
  public config = inject(DynamicDialogConfig)
  private loginService = inject(LandingLoginService)

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false],
  })

  /**
   * Handles the login form submission.
   */
  loginSubmit(): void {
    this.loginForm.markAllAsTouched()
    if (this.loginForm.invalid) return

    this.serverError.set(null)

    const payload = this.loginForm.value as LoginRequest

    this.loginService.login(payload).subscribe({
      next: (response: LoginResponse) => {
        this.loginSuccess.emit(response)
        this.loginForm.reset()
        this.ref.close(response)
      },
      error: (err: unknown) => {
        this.serverError.set(err instanceof Error ? err.message : 'Error al iniciar sesión.')
      },
    })
  }

  /**
   * Handles the request to open the registration form.
   */
  onRequestRegister(): void {
    this.requestRegister.emit()
    this.ref.close('register')
  }

  /**
   * Handles the forgot password action.
   */
  forgotPassword(): void {
    this.forgot.emit()
  }

  /**
   * Lifecycle hook that runs after the view has been initialized.
   * Ensures the email input gets focus after modal opens.
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      const emailInput = document.getElementById('email-input') as HTMLInputElement
      if (emailInput) {
        emailInput.focus()
      }
    }, 100)
  }
}
