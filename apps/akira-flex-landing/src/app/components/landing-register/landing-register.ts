import { CommonModule } from '@angular/common'
import { ChangeDetectorRef, Component, output, input, inject } from '@angular/core'
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
import { LandingRegisterService } from './landing-register.service'
import { passwordsMatchValidator } from '@flex-shared-lib'

/**
 * Component for the registration form in the landing page header.
 */
@Component({
  selector: 'app-landing-register',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [LandingRegisterService],
  template: `
    @if (isDropdownOpen() && isRegisterOpen()) {
      <div
        class="absolute right-0 top-full mt-4 w-80 bg-[var(--color-background)] border border-[var(--border)] rounded-lg shadow-lg z-50"
        [animate.enter]="'flip-in'"
        [animate.leave]="'flip-out'"
      >
        <div class="p-4 max-h-[calc(100vh-120px)] overflow-auto">
          @if (!registrationCompleted) {
            <form
              class="space-y-4"
              [formGroup]="form"
              (ngSubmit)="registerSubmit()"
              role="presentation"
            >
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label
                    class="block text-sm font-medium text-[var(--color-foreground)] mb-1"
                    for="register-firstname"
                  >
                    Nombre
                  </label>
                  <div class="relative">
                    <i
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-muted-foreground)]"
                      icon="pi pi-user"
                    ></i>
                    <input
                      class="w-full px-3 py-2 pl-10 border border-[var(--border)] rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:outline-none"
                      id="register-firstname"
                      name="firstName"
                      formControlName="firstName"
                      autocomplete="given-name"
                      required
                    />
                  </div>
                  @if (
                    form.get('firstName')?.invalid &&
                    (form.get('firstName')?.dirty || form.get('firstName')?.touched)
                  ) {
                    <div class="text-red-500 text-xs mt-1">
                      @if (form.get('firstName')?.hasError('required')) {
                        <p>El nombre es requerido.</p>
                      }
                    </div>
                  }
                </div>

                <div>
                  <label
                    class="block text-sm font-medium text-[var(--color-foreground)] mb-1"
                    for="register-lastname"
                  >
                    Apellido
                  </label>
                  <div class="relative">
                    <input
                      class="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:outline-none"
                      id="register-lastname"
                      name="lastName"
                      formControlName="lastName"
                      autocomplete="family-name"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-[var(--color-foreground)] mb-1"
                  for="register-email"
                >
                  Email
                </label>
                <div class="relative">
                  <i
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-muted-foreground)]"
                    icon="pi pi-envelope"
                  ></i>
                  <input
                    class="w-full px-3 py-2 pl-10 border border-[var(--border)] rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:outline-none"
                    id="register-email"
                    formControlName="email"
                    type="email"
                    autocomplete="email"
                    required
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
                  for="register-phone"
                >
                  Teléfono
                </label>
                <div class="relative">
                  <i
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-muted-foreground)]"
                    icon="pi pi-phone"
                  ></i>
                  <input
                    class="w-full px-3 py-2 pl-10 border border-[var(--border)] rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:outline-none"
                    id="register-phone"
                    name="phone"
                    formControlName="phone"
                    type="tel"
                    autocomplete="tel"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-[var(--color-foreground)] mb-1"
                  for="register-password"
                >
                  Contraseña
                </label>
                <div class="relative">
                  <i
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-muted-foreground)]"
                    icon="pi pi-lock"
                  ></i>
                  <input
                    class="w-full px-3 py-2 pl-10 border border-[var(--border)] rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:outline-none"
                    id="register-password"
                    [type]="showPassword ? 'text' : 'password'"
                    name="password"
                    formControlName="password"
                    autocomplete="new-password"
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

              <div>
                <label
                  class="block text-sm font-medium text-[var(--color-foreground)] mb-1"
                  for="register-confirm"
                >
                  Confirmar contraseña
                </label>
                <div class="relative">
                  <i
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-muted-foreground)]"
                    icon="pi pi-lock"
                  ></i>
                  <input
                    class="w-full px-3 py-2 pl-10 border border-[var(--border)] rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:outline-none"
                    id="register-confirm"
                    [type]="showPassword ? 'text' : 'password'"
                    name="confirmPassword"
                    formControlName="confirmPassword"
                    autocomplete="new-password"
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
              </div>

              @if (
                form.hasError('passwordsMismatch') &&
                (form.get('confirmPassword')?.dirty || form.get('confirmPassword')?.touched)
              ) {
                <div class="text-red-500 text-xs -mt-2 mb-2">
                  <p>Las contraseñas no coinciden.</p>
                </div>
              }

              @if (serverError) {
                <div class="text-red-500 text-xs -mt-2 mb-2 text-center">
                  <p>{{ serverError }}</p>
                </div>
              }

              <button
                class="w-full bg-[var(--color-primary)] text-[var(--color-foreground)] py-2 px-4 rounded-lg font-medium hover:bg-[var(--color-primary)]/90 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                [disabled]="form.invalid || isLoading"
                type="submit"
              >
                <i class="mr-2" icon="pi pi-check-circle"></i>
                <span>
                  @if (!isLoading) {
                    Crear cuenta
                  } @else {
                    Creando...
                  }
                </span>
              </button>

              <div class="pt-4 border-t border-[var(--border)] text-center">
                <p class="text-sm text-[var(--color-foreground)]">
                  ¿Tienes cuenta?
                  <button
                    class="text-[var(--color-primary)] hover:underline ml-1"
                    (click)="openDropdown(false)"
                    type="button"
                  >
                    Iniciar sesión
                  </button>
                </p>
              </div>
            </form>
          } @else {
            <div class="text-center p-4">
              <i class="text-green-500 text-4xl mb-4" icon="pi pi-check-circle"></i>
              <h3 class="text-lg font-medium text-[var(--color-foreground)]">
                ¡Registro exitoso!
              </h3>
              <p class="text-sm text-[var(--color-muted-foreground)] mt-2">
                Hemos enviado un correo de verificación a
                <strong class="text-[var(--color-foreground)]">{{ emailForSuccessMessage }}</strong
                >.
              </p>
              <p class="text-sm text-[var(--color-muted-foreground)] mt-1">
                Por favor, revise su bandeja de entrada para activar su cuenta.
              </p>
              <p class="text-xs text-[var(--color-muted-foreground)] mt-4">
                (Será redirigido al inicio de sesión en 5 segundos)
              </p>
            </div>
          }
        </div>
      </div>
    }
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

  isLoading = false
  serverError: string | null = null
  registrationCompleted = false
  emailForSuccessMessage = ''
  showPassword = false

  private readonly formBuilder = inject(FormBuilder)
  private readonly cdr = inject(ChangeDetectorRef)
  private readonly registerService = inject(LandingRegisterService)

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
   * Toggles the visibility of the password in the confirm password field.
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword
    this.cdr.detectChanges()
  }

  /**
   * Checks if the registration form is valid.
   * @returns {boolean} True if the form is valid.
   */
  isRegisterFormValid(): boolean {
    return this.form.valid
  }

  /**
   * Handles form submission. If valid, it calls the registration service.
   * On success, it displays a confirmation message and then switches
   * to the login view after a delay.
   */
  registerSubmit(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid || this.isLoading) return

    this.serverError = null
    this.isLoading = true
    const firstName = this.form.get('firstName')!.value as string
    const lastName = this.form.get('lastName')!.value as string
    const email = this.form.get('email')!.value as string
    const phone = this.form.get('phone')!.value as string | undefined
    const password = this.form.get('password')!.value as string

    const payload = { firstName, lastName, email, phone, password }

    this.registerService.register(payload).subscribe({
      next: () => {
        this.isLoading = false
        this.registrationCompleted = true
        this.emailForSuccessMessage = email
        this.submitRegister.emit({
          firstName,
          lastName,
          email,
          phone: phone ?? '',
          password,
        })
        this.form.reset()

        setTimeout(() => {
          this.openDropdown(false)
          // Reset state after a short delay to avoid flicker when re-opening
          setTimeout(() => (this.registrationCompleted = false), 500)
        }, 5000) // 5-second delay before switching to login
      },
      error: (err) => {
        this.isLoading = false
        this.serverError = err?.message ?? 'Error en el registro'
        this.cdr.detectChanges()
      },
    })
  }

  /**
   * Requests a switch to the login or register panel.
   * @param toRegister Boolean indicating whether to open the register panel.
   */
  openDropdown(toRegister: boolean): void {
    this.requestSwitch.emit(toRegister)
  }
}
