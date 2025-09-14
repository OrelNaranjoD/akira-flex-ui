import { Component, input } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

/**
 * Platform Menu Component - Dashboard navigation with collapsible support.
 */
@Component({
  selector: 'app-platform-menu',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  template: `
    <nav class="space-y-2">
      <!-- Dashboard -->
      <a
        [class]="
          'flex items-center h-10 rounded-lg hover:bg-[var(--color-muted)] text-sm leading-none text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-all duration-200 group' +
          (isCollapsed() ? ' justify-center px-0' : ' gap-3 px-3 py-0')
        "
        [attr.title]="isCollapsed() ? 'Dashboard' : null"
        routerLink="dashboard"
        routerLinkActive="bg-[var(--color-muted)] text-[var(--color-primary)] font-medium"
      >
        <fa-icon
          class="flex items-center justify-center h-5 w-5 min-w-[1.25rem] flex-shrink-0"
          [icon]="['fas', 'chart-line']"
        ></fa-icon>
        <span [class]="isCollapsed() ? 'hidden' : 'block'">Dashboard</span>
      </a>

      <!-- Analytics -->
      <a
        [class]="
          'flex items-center h-10 rounded-lg hover:bg-[var(--color-muted)] text-sm leading-none text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-all duration-200 group' +
          (isCollapsed() ? ' justify-center px-0' : ' gap-3 px-3 py-0')
        "
        [attr.title]="isCollapsed() ? 'Analytics' : null"
        routerLink="analytics"
        routerLinkActive="bg-[var(--color-muted)] text-[var(--color-primary)] font-medium"
      >
        <fa-icon
          class="flex items-center justify-center h-5 w-5 min-w-[1.25rem] flex-shrink-0"
          [icon]="['fas', 'chart-bar']"
        ></fa-icon>
        <span [class]="isCollapsed() ? 'hidden' : 'block'">Analytics</span>
      </a>

      <!-- Users -->
      <a
        [class]="
          'flex items-center h-10 rounded-lg hover:bg-[var(--color-muted)] text-sm leading-none text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-all duration-200 group' +
          (isCollapsed() ? ' justify-center px-0' : ' gap-3 px-3 py-0')
        "
        [attr.title]="isCollapsed() ? 'Users' : null"
        routerLink="users"
        routerLinkActive="bg-[var(--color-muted)] text-[var(--color-primary)] font-medium"
      >
        <fa-icon
          class="flex items-center justify-center h-5 w-5 min-w-[1.25rem] flex-shrink-0"
          [icon]="['fas', 'users']"
        ></fa-icon>
        <span [class]="isCollapsed() ? 'hidden' : 'block'">Users</span>
      </a>

      <!-- Tenants -->
      <a
        [class]="
          'flex items-center h-10 rounded-lg hover:bg-[var(--color-muted)] text-sm leading-none text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-all duration-200 group' +
          (isCollapsed() ? ' justify-center px-0' : ' gap-3 px-3 py-0')
        "
        [attr.title]="isCollapsed() ? 'Tenants' : null"
        routerLink="tenants"
        routerLinkActive="bg-[var(--color-muted)] text-[var(--color-primary)] font-medium"
      >
        <fa-icon
          class="flex items-center justify-center h-5 w-5 min-w-[1.25rem] flex-shrink-0"
          [icon]="['fas', 'building']"
        ></fa-icon>
        <span [class]="isCollapsed() ? 'hidden' : 'block'">Tenants</span>
      </a>

      <!-- Roles -->
      <a
        [class]="
          'flex items-center h-10 rounded-lg hover:bg-[var(--color-muted)] text-sm leading-none text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-all duration-200 group' +
          (isCollapsed() ? ' justify-center px-0' : ' gap-3 px-3 py-0')
        "
        [attr.title]="isCollapsed() ? 'Roles' : null"
        routerLink="roles"
        routerLinkActive="bg-[var(--color-muted)] text-[var(--color-primary)] font-medium"
      >
        <fa-icon
          class="flex items-center justify-center h-5 w-5 min-w-[1.25rem] flex-shrink-0"
          [icon]="['fas', 'user-tag']"
        ></fa-icon>
        <span [class]="isCollapsed() ? 'hidden' : 'block'">Roles</span>
      </a>

      <!-- Divider -->
      <div
        [class]="
          isCollapsed()
            ? 'border-t border-[var(--color-border)] my-2 mx-3'
            : 'border-t border-[var(--color-border)] my-4'
        "
      ></div>

      <!-- Settings -->
      <a
        [class]="
          'flex items-center h-10 rounded-lg hover:bg-[var(--color-muted)] text-sm leading-none text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-all duration-200 group' +
          (isCollapsed() ? ' justify-center px-0' : ' gap-3 px-3 py-0')
        "
        [attr.title]="isCollapsed() ? 'Settings' : null"
        routerLink="settings"
        routerLinkActive="bg-[var(--color-muted)] text-[var(--color-primary)] font-medium"
      >
        <fa-icon
          class="flex items-center justify-center h-5 w-5 min-w-[1.25rem] flex-shrink-0"
          [icon]="['fas', 'cog']"
        ></fa-icon>
        <span [class]="isCollapsed() ? 'hidden' : 'block'">Settings</span>
      </a>

      <!-- Audit -->
      <a
        [class]="
          'flex items-center h-10 rounded-lg hover:bg-[var(--color-muted)] text-sm leading-none text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-all duration-200 group' +
          (isCollapsed() ? ' justify-center px-0' : ' gap-3 px-3 py-0')
        "
        [attr.title]="isCollapsed() ? 'Audit' : null"
        routerLink="audit"
        routerLinkActive="bg-[var(--color-muted)] text-[var(--color-primary)] font-medium"
      >
        <fa-icon
          class="flex items-center justify-center h-5 w-5 min-w-[1.25rem] flex-shrink-0"
          [icon]="['fas', 'clipboard-list']"
        ></fa-icon>
        <span [class]="isCollapsed() ? 'hidden' : 'block'">Audit</span>
      </a>
    </nav>
  `,
})
export class PlatformMenu {
  isCollapsed = input(false)
}
