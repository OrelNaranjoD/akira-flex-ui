import { CommonModule } from '@angular/common'
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  input,
  output,
  ViewChild,
} from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Checkbox } from '../../../core/components/checkbox/checkbox'
import { LandingLoginService } from './landing-login.service'
import { LoginRequest, LoginResponse } from '@flex-shared-lib'

/**
 * Component for the login form in the landing page header.
 */
@Component({
  selector: 'app-landing-login',
  imports: [CommonModule, ReactiveFormsModule, Checkbox],
  providers: [LandingLoginService],
  template: `
    @if (isDropdownOpen() && !isRegisterOpen()) {
      <div
        class="absolute right-0 top-full mt-4 w-80 bg-[var(--color-background)] border border-[var(--border)] rounded-lg shadow-lg z-50"
        [animate.enter]="'flip-in'"
        [animate.leave]="'flip-out'"
      >
        <div class="p-4 max-h-[calc(100vh-120px)] overflow-auto">
          <form class="space-y-4" [formGroup]="form" (ngSubmit)="loginSubmit()" novalidate>
            <div>
              <label
                class="block text-sm font-medium text-[var(--color-foreground)] mb-1"
                for="login-email"
              >
                Email
              </label>
              <div class="relative">
                <i
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-muted-foreground)] text-sm"
                  icon="pi pi-envelope"
                ></i>
                <input
                  class="w-full px-3 py-2 pl-10 border border-[var(--border)] rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent"
                  id="login-email"
                  formControlName="email"
                  type="email"
                  autocomplete="email"
                  required
                  placeholder="email@dominio.com"
                />
              </div>
              @if (
                form.get('email')?.invalid &&
                (form.get('email')?.dirty || form.get('email')?.touched)
              ) {
                <div class="text-red-500 text-xs mt-1">
                  @if (form.get('email')?.hasError('required')) {
                    <p>El email es requerido.</p>
                  }
                  @if (form.get('email')?.hasError('email')) {
                    <p>Por favor, introduce un email válido.</p>
                  }
                </div>
              }
            </div>

            <div>
              <label
                class="block text-sm font-medium text-[var(--color-foreground)] mb-1"
                for="login-password"
              >
                Contraseña
              </label>
              <div class="relative">
                <i
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-muted-foreground)] text-sm"
                  icon="pi pi-lock"
                ></i>
                <input
                  class="w-full px-3 py-2 pl-10 pr-10 border border-[var(--border)] rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent"
                  id="login-password"
                  #loginPassword
                  formControlName="password"
                  type="password"
                  autocomplete="current-password"
                  required
                />
                <button
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
                  (click)="togglePasswordVisibility()"
                  type="button"
                >
                  <i [ngClass]="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
                </button>
              </div>
              @if (
                form.get('password')?.invalid &&
                (form.get('password')?.dirty || form.get('password')?.touched)
              ) {
                <div class="text-red-500 text-xs mt-1">
                  @if (form.get('password')?.hasError('required')) {
                    <p>La contraseña es requerida.</p>
                  }
                  @if (form.get('password')?.hasError('minlength')) {
                    <p>La contraseña debe tener al menos 6 caracteres.</p>
                  }
                </div>
              }
            </div>

            <div class="flex items-center justify-between">
              <app-checkbox
                [checked]="form.get('remember')?.value ?? false"
                (checkedChange)="form.get('remember')?.setValue($event)"
                label="Recordarme"
              ></app-checkbox>
              <button
                class="text-sm text-[var(--color-primary)] hover:underline"
                (click)="forgotPassword()"
                type="button"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            @if (serverError) {
              <div class="text-red-500 text-xs -mt-2 mb-2 text-center">
                <p>{{ serverError }}</p>
              </div>
            }

            <button
              class="w-full bg-[var(--color-primary)] text-[var(--color-foreground)] py-2 px-4 rounded-lg font-medium hover:bg-[var(--color-primary)]/90 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              [disabled]="form.invalid || isLoading"
              type="submit"
            >
              @if (!isLoading) {
                <i class="mr-2" [ngClass]="['pi', 'pi-sign-in-alt']"></i>
                <span>Iniciar Sesión</span>
              } @else {
                <span>Conectando...</span>
              }
            </button>

            <div class="pt-4 border-t border-[var(--border)] text-center">
              <p class="text-sm text-[var(--color-foreground)]">
                ¿No tienes cuenta?
                <button
                  class="text-[var(--color-primary)] hover:underline ml-1"
                  (click)="openDropdown(true)"
                  type="button"
                >
                  Crear cuenta
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    }
  `,
})
export class LandingLogin {
  isDropdownOpen = input(false)
  isRegisterOpen = input(false)

  submitLogin = output<LoginResponse>()
  requestSwitch = output<boolean>()
  forgot = output<void>()

  @ViewChild('loginPassword', { static: false })
  loginPasswordRef?: ElementRef<HTMLInputElement>

  private readonly formBuilder = inject(FormBuilder)
  private readonly loginService = inject(LandingLoginService)
  private readonly cdr = inject(ChangeDetectorRef)

  showPassword = false
  isLoading = false
  serverError: string | null = null

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false],
  })

  /**
   * Toggle the password visibility using ViewChild/dom fallback.
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword
    if (this.loginPasswordRef?.nativeElement) {
      this.loginPasswordRef.nativeElement.type = this.showPassword ? 'text' : 'password'
    }
  }

  /**
   * Handles form submission, validation, and API calls for login.
   */
  loginSubmit(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid || this.isLoading) return

    this.isLoading = true
    this.serverError = null

    const payload = this.form.value as LoginRequest

    this.loginService.login(payload).subscribe({
      next: (response) => {
        this.isLoading = false
        this.submitLogin.emit(response)
        this.form.reset()
      },
      error: (err) => {
        this.isLoading = false
        this.serverError = err.message
        this.cdr.detectChanges()
      },
    })
  }

  /**
   * Emit request to switch panel (login/register).
   * @param showRegister Whether to open the register panel.
   */
  openDropdown(showRegister: boolean): void {
    this.requestSwitch.emit(showRegister)
  }

  /**
   * Emit forgot password action to parent.
   */
  forgotPassword(): void {
    this.forgot.emit()
  }
}
