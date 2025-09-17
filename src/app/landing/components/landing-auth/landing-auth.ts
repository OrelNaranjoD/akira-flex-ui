import { Component, EventEmitter, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { LandingLogin } from '../landing-login/landing-login'
import { LandingRegister } from '../landing-register/landing-register'

/**
 * Component that manages the login/register dropdown in the landing page header.
 */
@Component({
  selector: 'app-landing-auth',
  imports: [FormsModule, FontAwesomeModule, LandingLogin, LandingRegister],
  template: `
    <div class="relative flex items-center gap-2">
      <button
        class="px-3 py-2 text-sm font-medium text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors rounded-lg"
        (click)="openDropdown(false)"
      >
        <span>Iniciar Sesión</span>
        <fa-icon
          class="inline-block text-xs text-[var(--color-muted-foreground)] transition-transform"
          [icon]="['fas', 'chevron-down']"
          [style.transform]="isDropdownOpen && !isRegisterOpen ? 'rotate(180deg)' : 'none'"
        ></fa-icon>
      </button>

      <button
        class="px-4 py-2 text-sm text-white rounded-full hover:shadow-lg bg-linear-to-br from-[var(--color-primary)] to-[var(--color-accent)] border-white border hover:from-[var(--color-primary)]/70 hover:to-[var(--color-accent)]/70 hover:!text-white"
        (click)="openDropdown(true)"
      >
        Solicitar Demo
      </button>

      <!-- Login panel -->
      <app-landing-login
        [isDropdownOpen]="isDropdownOpen"
        [isRegisterOpen]="isRegisterOpen"
        (submitLogin)="handleLogin()"
        (requestSwitch)="openDropdown($event)"
      ></app-landing-login>

      <!-- Register panel -->
      <app-landing-register
        [isDropdownOpen]="isDropdownOpen"
        [isRegisterOpen]="isRegisterOpen"
        (requestSwitch)="openDropdown($event)"
      ></app-landing-register>
    </div>
  `,
  styleUrls: ['./landing-auth.css'],
})
export class LandingAuth {
  @Output() loginSuccess = new EventEmitter<void>()

  isRegisterOpen = false
  isDropdownOpen = false

  /**
   * Toggles the visibility of the login/register dropdown.
   */
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen
    if (!this.isDropdownOpen) {
      this.isRegisterOpen = false
    }
  }

  /**
   * Opens the dropdown and selects whether to show the register form.
   * @param showRegister True to open the register form, false for login.
   */
  openDropdown(showRegister: boolean): void {
    if (this.isDropdownOpen && this.isRegisterOpen === showRegister) {
      this.isDropdownOpen = false
      this.isRegisterOpen = false
      return
    }

    this.isDropdownOpen = true
    this.isRegisterOpen = showRegister
  }

  /**
   * Handle successful login event emitted by the login child component.
   */
  handleLogin(): void {
    this.isDropdownOpen = false
    this.loginSuccess.emit()
  }
}
