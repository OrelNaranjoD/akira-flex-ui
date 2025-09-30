import { Component, signal, ChangeDetectionStrategy, inject, computed } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { AvatarModule } from 'primeng/avatar'
import { AuthService } from '../../services'

/**
 * Component for displaying user profile information.
 */
@Component({
  selector: 'app-profile',
  imports: [ButtonModule, AvatarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative">
      <p-button
        class="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--color-muted)]"
        [text]="true"
        (click)="toggleDropdown()"
      >
        <p-avatar
          [label]="userInitials()"
          size="normal"
          shape="circle"
          styleClass="bg-blue-500 text-white border border-gray-300 text-xs font-semibold"
        ></p-avatar>
        <div class="hidden sm:flex flex-col justify-center">
          <span class="font-medium text-[var(--color-foreground)] leading-tight">
            {{ userName() }}
          </span>
          <span class="text-xs text-[var(--color-muted-foreground)] leading-tight">
            {{ userRole() }}
          </span>
        </div>
        <i
          class="pi pi-chevron-down text-xs text-[var(--color-muted-foreground)] transition-transform"
          [class.rotate-180]="isDropdownOpen()"
        ></i>
      </p-button>

      @if (isDropdownOpen()) {
        <div
          class="absolute right-0 top-full mt-2 w-40 bg-[var(--color-background)] border border-[var(--border)] rounded-lg shadow-lg z-50"
        >
          <div class="py-2 text-right">
            <button
              class="w-full px-4 py-2 text-sm hover:bg-[var(--color-muted)] flex items-center justify-end gap-2"
              (click)="viewProfile()"
            >
              <span>View Profile</span>
              <i class="pi pi-user"></i>
            </button>
            <button
              class="w-full px-4 py-2 text-sm hover:bg-[var(--color-muted)] flex items-center justify-end gap-2"
              (click)="settings()"
            >
              <span>Settings</span>
              <i class="pi pi-cog"></i>
            </button>
            <hr class="my-2 border-[var(--border)]" />
            <button
              class="w-full px-4 py-2 text-sm hover:bg-[var(--color-muted)] flex items-center justify-end gap-2"
              (click)="logout()"
            >
              <span>Logout</span>
              <i class="pi pi-sign-out"></i>
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
  isDropdownOpen = signal(false)

  private authService = inject(AuthService)

  /**
   * Current user data from auth service.
   */
  currentUser = computed(() => this.authService.currentUser())

  /**
   * Gets the user initials from the full name.
   * Takes the first letter of each word in the name.
   * @returns The user initials (maximum 2 characters).
   */
  userInitials = computed(() => {
    const user = this.currentUser()
    if (!user?.firstName || !user?.lastName) return 'U'
    return (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase()
  })

  /**
   * Gets the user's full name.
   * @returns The user's full name.
   */
  userName = computed(() => {
    const user = this.currentUser()
    if (!user?.firstName || !user?.lastName) return 'Usuario'
    return `${user.firstName} ${user.lastName}`
  })

  /**
   * Gets the user's role.
   * @returns The user's role.
   */
  userRole = computed(() => {
    const user = this.currentUser()
    return user?.roles?.[0] || 'Usuario'
  })

  /**
   * Toggles the dropdown menu visibility.
   */
  toggleDropdown(): void {
    this.isDropdownOpen.update((open) => !open)
  }

  /**
   * Handles view profile action.
   */
  viewProfile(): void {
    this.isDropdownOpen.set(false)
  }

  /**
   * Handles settings action.
   */
  settings(): void {
    this.isDropdownOpen.set(false)
  }

  /**
   * Handles user logout action.
   */
  logout(): void {
    this.isDropdownOpen.set(false)
    this.authService.logout()
  }
}
