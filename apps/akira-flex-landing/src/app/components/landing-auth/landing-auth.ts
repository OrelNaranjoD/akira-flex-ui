import { Component, inject, output, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { LandingLogin } from '../landing-login/landing-login'
import { LandingRegister } from '../landing-register/landing-register'
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog'

/**
 * Component that manages the login/register dropdown in the landing page header.
 */
@Component({
  selector: 'app-landing-auth',
  imports: [FormsModule, ButtonModule, DynamicDialogModule],
  providers: [DialogService],
  template: `
    <div class="relative flex items-center gap-2">
      <p-button class="px-3 py-2 text-sm font-medium mouse-pointer" (click)="openLoginDialog()">
        <span>Iniciar Sesión</span>
        <i class="pi pi-sign-in ml-2 text-xs"></i>
      </p-button>

      <p-button
        [raised]="true"
        [rounded]="true"
        (click)="openRegisterDialog()"
        size="small"
        aria-label="Solicitar Demo"
        label="Solicitar Demo"
      />
    </div>
  `,
})
export class LandingAuth {
  private readonly dialogService = inject(DialogService)

  loginSuccess = output<void>()

  isRegisterOpen = signal(false)
  isDropdownOpen = signal(false)

  /**
   * Toggles the visibility of the login/register dropdown.
   */
  toggleDropdown(): void {
    this.isDropdownOpen.set(!this.isDropdownOpen())
    if (!this.isDropdownOpen()) {
      this.isRegisterOpen.set(false)
    }
  }

  /**
   * Opens the dropdown and selects whether to show the register form.
   * @param showRegister True to open the register form, false for login.
   */
  openDropdown(showRegister: boolean): void {
    if (this.isDropdownOpen() && this.isRegisterOpen() === showRegister) {
      this.isDropdownOpen.set(false)
      this.isRegisterOpen.set(false)
      return
    }

    this.isDropdownOpen.set(true)
    this.isRegisterOpen.set(showRegister)
  }

  /**
   * Handle successful login event emitted by the login child component.
   */
  handleLogin(): void {
    this.isDropdownOpen.set(false)
    this.loginSuccess.emit()
  }

  /**
   * Opens the registration form in a dialog.
   */
  openRegisterDialog(): void {
    const ref = this.dialogService.open(LandingRegister, {
      header: 'Crear Cuenta',
      width: '480px',
      modal: true,
      dismissableMask: true,
      baseZIndex: 1000,
    })

    if (ref) {
      ref.onClose.subscribe((result) => {
        if (result === 'login') {
          this.openLoginDialog()
        } else if (result) {
          this.handleLogin()
        }
      })
    }
  }

  /**
   * Opens the login form in a dialog.
   */
  openLoginDialog(): void {
    const ref = this.dialogService.open(LandingLogin, {
      header: 'Iniciar Sesión',
      width: '400px',
      modal: true,
      dismissableMask: true,
      baseZIndex: 1000,
    })

    if (ref) {
      ref.onClose.subscribe((result) => {
        if (result === 'register') {
          this.openRegisterDialog()
        } else if (result) {
          this.loginSuccess.emit()
        }
      })
    }
  }
}
