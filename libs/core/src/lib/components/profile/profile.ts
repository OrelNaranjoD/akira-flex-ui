import { Component, signal, ChangeDetectionStrategy, computed, inject } from '@angular/core'
import { Router } from '@angular/router'
import { Button } from 'primeng/button'
import { Avatar } from 'primeng/avatar'
import { MenuItem } from 'primeng/api'
import { Menu } from 'primeng/menu'
import { AuthService } from '../../services/auth'

/**
 * Profile component displaying user info and a dropdown menu.
 */
@Component({
  selector: 'app-profile',
  imports: [Button, Avatar, Menu],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile.html',
})
export class Profile {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  items = signal<MenuItem[]>([
    {
      label: $localize`:@@viewProfile:View Profile`,
      icon: 'pi pi-user',
      command: () => this.viewProfile(),
    },
    {
      label: $localize`:@@settings:Settings`,
      icon: 'pi pi-cog',
      command: () => this.settings(),
    },
    {
      separator: true,
    },
    {
      label: $localize`:@@logout:Log Out`,
      icon: 'pi pi-sign-out',
      command: () => this.logout(),
    },
  ])

  /**
   * Returns the localized label for a given role.
   * @param role The role identifier (e.g., 'admin', 'manager').
   * @returns The localized label for the role.
   */
  getRoleLabel(role: string): string {
    switch (role) {
      case 'admin':
        return $localize`:@@role.admin:Administrator`
      case 'manager':
        return $localize`:@@role.manager:Manager`
      case 'auditor':
        return $localize`:@@role.auditor:Auditor`
      case 'viewer':
        return $localize`:@@role.viewer:Viewer`
      case 'tenant':
        return $localize`:@@role.tenant:Tenant`
      default:
        return role
    }
  }

  /**
   * Returns the initials of the current user.
   */
  userInitials = computed(() => {
    const user = this.authService.currentUser()
    if (!user) return ''
    return (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase()
  })

  /**
   * Returns the full name of the current user.
   */
  userName = computed(() => {
    const user = this.authService.currentUser()
    if (!user) return ''
    return `${user.firstName} ${user.lastName}`
  })

  /**
   * Returns the first role of the current user.
   */
  userPrimaryRole = computed(() => {
    const user = this.authService.currentUser()
    if (!user) return ''
    return user.roles[0]
  })

  /**
   * Navigates to the profile page.
   */
  viewProfile(): void {
    this.router.navigate(['profile'])
  }

  /**
   * Navigates to the settings page.
   */
  settings(): void {
    this.router.navigate(['settings'])
  }

  /**
   * Logs out the current user by invoking the AuthService.
   */
  logout(): void {
    this.authService.logout()
  }
}
