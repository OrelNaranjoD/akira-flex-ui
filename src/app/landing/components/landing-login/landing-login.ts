import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { Checkbox } from '../../../core/components/checkbox/checkbox'

/**
 * Landing login component.
 *
 * Provides a dropdown interface for user authentication options
 * including login and registration functionality.
 */
@Component({
  selector: 'app-landing-login',
  imports: [FormsModule, FontAwesomeModule, Checkbox],
  template: `
    <div class="relative">
      <button
        class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors rounded-lg"
        (click)="toggleDropdown()"
      >
        <span>Iniciar Sesión</span>
        <fa-icon
          class="text-xs text-[var(--color-muted-foreground)] transition-transform"
          [icon]="['fas', 'chevron-down']"
          [class.rotate-180]="isDropdownOpen"
        ></fa-icon>
      </button>

      @if (isDropdownOpen) {
        <div
          class="absolute right-0 top-full mt-2 w-80 bg-[var(--color-background)] border border-[var(--border)] rounded-lg shadow-lg z-50"
        >
          <div class="p-4">
            <form class="space-y-4" (ngSubmit)="login()">
              <div>
                <label class="block text-sm font-medium text-[var(--color-foreground)] mb-1">
                  Email
                </label>
                <div class="relative">
                  <input
                    class="w-full px-3 py-2 pl-10 border border-[var(--border)] rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent"
                    [(ngModel)]="loginForm.email"
                    type="email"
                    name="email"
                    autocomplete="email"
                    required
                    placeholder="email@dominio.com"
                  />
                  <fa-icon
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-muted-foreground)] text-sm"
                    [icon]="['fas', 'envelope']"
                  ></fa-icon>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-[var(--color-foreground)] mb-1">
                  Contraseña
                </label>
                <div class="relative">
                  <input
                    class="w-full px-3 py-2 pl-10 pr-10 border border-[var(--border)] rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent"
                    [(ngModel)]="loginForm.password"
                    [type]="showPassword ? 'text' : 'password'"
                    name="password"
                    autocomplete="current-password"
                    required
                    placeholder="••••••••"
                  />
                  <fa-icon
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-muted-foreground)] text-sm"
                    [icon]="['fas', 'lock']"
                  ></fa-icon>
                  <button
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
                    (click)="togglePasswordVisibility()"
                    type="button"
                  >
                    <fa-icon
                      [icon]="showPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']"
                    ></fa-icon>
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <app-checkbox
                  [checked]="loginForm.remember"
                  (checkedChange)="onRememberChange($event)"
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

              <button
                class="w-full bg-[var(--color-primary)] text-[var(--color-foreground)] py-2 px-4 rounded-lg font-medium hover:bg-[var(--color-primary)]/90 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                [disabled]="!isFormValid()"
                type="submit"
              >
                <fa-icon class="mr-2" [icon]="['fas', 'sign-in-alt']"></fa-icon>
                Iniciar Sesión
              </button>
            </form>

            <div class="mt-4 pt-4 border-t border-[var(--border)] text-center">
              <p class="text-sm text-[var(--color-foreground)]">
                ¿No tienes cuenta?
                <button
                  class="text-[var(--color-primary)] hover:underline ml-1"
                  (click)="register()"
                >
                  Crear cuenta
                </button>
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class LandingLogin {
  /**
   * Controls the visibility of the login dropdown menu.
   */
  isDropdownOpen = false

  /**
   * Controls password visibility toggle.
   */
  showPassword = false

  /**
   * Login form data model.
   */
  loginForm = {
    email: '',
    password: '',
    remember: false,
  }

  /**
   * Toggles the dropdown menu visibility.
   */
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen
  }

  /**
   * Toggles password visibility.
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword
  }

  /**
   * Handles remember me checkbox change.
   * @param checked - The new checked state.
   */
  onRememberChange(checked: boolean): void {
    this.loginForm.remember = checked
  }

  /**
   * Validates if the form is ready for submission.
   * @returns True if form is valid, false otherwise.
   */
  isFormValid(): boolean {
    return (
      this.loginForm.email.trim() !== '' &&
      this.loginForm.password.trim() !== '' &&
      this.loginForm.email.includes('@')
    )
  }

  /**
   * Handles user login action.
   */
  login(): void {
    if (this.isFormValid()) {
      this.isDropdownOpen = false
      alert(`Iniciando sesión para: ${this.loginForm.email}`)
      this.loginForm = { email: '', password: '', remember: false }
    }
  }

  /**
   * Handles user registration action.
   */
  register(): void {
    this.isDropdownOpen = false
    alert('Crear cuenta - funcionalidad por implementar')
  }

  /**
   * Handles forgot password action.
   */
  forgotPassword(): void {
    this.isDropdownOpen = false
    alert('Recuperar contraseña - funcionalidad por implementar')
  }
}
