import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'
import { ThemeService } from '../../services'
import { ButtonModule } from 'primeng/button'
import { TooltipModule } from 'primeng/tooltip'

/**
 * A UI component that allows the user to toggle the application's theme
 * between light and dark mode. It displays a sun or moon icon based on the
 * current effective theme.
 */
@Component({
  selector: 'app-theme-switch',
  imports: [ButtonModule, TooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './theme-switch.html',
})
export class ThemeSwitch {
  private readonly themeService = inject(ThemeService)

  /**
   * Determines if the effective theme is dark mode.
   * @protected
   */
  protected readonly isDarkMode = computed(() => this.themeService.effectiveMode$() === 'dark')

  /**
   * Computes the appropriate icon class based on the current theme.
   * @protected
   */
  protected readonly iconClass = computed(() => (this.isDarkMode() ? 'pi pi-moon' : 'pi pi-sun'))

  /**
   * Computes the appropriate icon color based on the current theme.
   * @protected
   */
  protected readonly iconColor = computed(() =>
    this.isDarkMode() ? 'var(--p-blue-400)' : 'var(--p-orange-400)'
  )

  /**
   * Computes the translated tooltip text based on the current theme.
   * @protected
   */
  protected readonly tooltipText = computed(() => {
    return this.isDarkMode()
      ? $localize`:@@themeSwitcherTooltipLight:switch to light mode`
      : $localize`:@@themeSwitcherTooltipDark:switch to dark mode`
  })

  /**
   * Toggles the application theme by calling the theme service.
   */
  public toggleTheme(): void {
    this.themeService.toggleMode()
  }
}
