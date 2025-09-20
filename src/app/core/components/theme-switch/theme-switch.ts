import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ThemeService } from '../../services/theme.service'
import { ButtonModule } from 'primeng/button'

/**
 * Toggle theme switch (light / dark).
 */
@Component({
  selector: 'app-theme-switch',
  imports: [ButtonModule, FormsModule],
  template: `
    <p-button
      class="relative z-10 flex items-center justify-center scale-80"
      [raised]="true"
      [icon]="isDarkMode() ? 'pi pi-moon' : 'pi pi-sun'"
      [style]="{ color: isDarkMode() ? 'var(--p-blue-500)' : 'var(--p-orange-400)' }"
      (click)="toggleTheme()"
      rounded="full"
      type="button"
      aria-label="Theme Switch"
    >
    </p-button>
  `,
})
export class ThemeSwitch {
  private readonly themeService = inject(ThemeService)

  /**
   * Checks if the current theme is dark mode.
   * @returns {boolean} True if dark mode is active.
   */
  isDarkMode(): boolean {
    const mode = this.themeService.currentMode$()
    return mode === 'dark'
  }

  /**
   * Toggles between light and dark theme.
   */
  toggleTheme(): void {
    this.themeService.toggleMode()
  }
}
