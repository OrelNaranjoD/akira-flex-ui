import { Component } from '@angular/core'

/**
 * Component for displaying user profile information.
 */
@Component({
  selector: 'app-profile',
  imports: [],
  template: `
    <div class="relative">
      <button
        class="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--color-muted)]"
        (click)="toggleDropdown()"
      >
        <div
          class="h-8 w-8 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] flex items-center justify-center text-xs font-semibold border border-[var(--border)]"
        >
          {{ userInitials }}
        </div>
        <div class="hidden sm:flex flex-col justify-center">
          <span class="font-medium text-[var(--color-foreground)] leading-tight">
            {{ this.profileUser.userName }}
          </span>
          <span class="text-xs text-[var(--color-muted-foreground)] leading-tight">
            {{ this.profileUser.role }}
          </span>
        </div>
        <i
          class="text-xs text-[var(--color-muted-foreground)] transition-transform"
          [class.rotate-180]="isDropdownOpen"
          icon="pi pi-chevron-down"
        ></i>
      </button>

      @if (isDropdownOpen) {
        <div
          class="absolute right-0 top-full mt-2 w-40 bg-[var(--color-background)] border border-[var(--border)] rounded-lg shadow-lg z-50"
        >
          <div class="py-2 text-right">
            <button
              class="w-full px-4 py-2 text-sm hover:bg-[var(--color-muted)] flex items-center justify-end gap-2"
              (click)="viewProfile()"
            >
              <span>Ver Perfil</span>
              <i icon="pi pi-user"></i>
            </button>
            <button
              class="w-full px-4 py-2 text-sm hover:bg-[var(--color-muted)] flex items-center justify-end gap-2"
              (click)="settings()"
            >
              <span>Configuración</span>
              <i icon="pi pi-cog"></i>
            </button>
            <hr class="my-2 border-[var(--border)]" />
            <button
              class="w-full px-4 py-2 text-sm hover:bg-[var(--color-muted)] flex items-center justify-end gap-2"
              (click)="logout()"
            >
              <span>Cerrar Sesión</span>
              <i icon="pi pi-sign-out-alt"></i>
            </button>
          </div>
        </div>
      }
    </div>
  `,
})
export class Profile {
  /**
   * Controls the visibility of the profile dropdown menu.
   */
  isDropdownOpen = false

  /**
   * Hardcoded profile user.
   */
  profileUser = {
    userName: 'Juan Pérez',
    userEmail: 'juan.perez@ejemplo.com',
    role: 'Administrador',
  }

  /**
   * Gets the user initials from the full name.
   * Takes the first letter of each word in the name.
   * @returns The user initials (maximum 2 characters).
   */
  get userInitials(): string {
    return this.profileUser.userName
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2)
  }

  /**
   * Toggles the dropdown menu visibility.
   */
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen
  }

  /**
   * Handles view profile action.
   */
  viewProfile(): void {
    this.isDropdownOpen = false
  }

  /**
   * Handles settings action.
   */
  settings(): void {
    this.isDropdownOpen = false
  }

  /**
   * Handles user logout action.
   */
  logout(): void {
    this.isDropdownOpen = false
  }
}
