import { Component, inject } from '@angular/core'
import { ThemeService, ThemeMode } from '../../services/theme.service'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

/**
 * Segmented theme switch (system / light / dark).
 */
@Component({
  selector: 'app-theme-switch',
  imports: [FontAwesomeModule],
  styles: `
    .slider-container {
      position: relative;
    }

    .slider-indicator {
      position: absolute;
      top: 4px;
      width: 32px;
      height: 32px;
      background: var(--background);
      border-radius: 50%;
      box-shadow:
        0 1px 3px 0 rgb(0 0 0 / 0.1),
        0 1px 2px -1px rgb(0 0 0 / 0.1);
      border: 1px solid var(--border);
      transition: left 300ms ease-out;
      z-index: 1;
    }

    .slider-system {
      left: 4px;
    }

    .slider-light {
      left: 36px;
    }

    .slider-dark {
      left: 68px;
    }

    /* Disabled button styles */
    button:disabled {
      pointer-events: none;
    }

    button:disabled:hover {
      transform: none !important;
    }

    button:disabled fa-icon {
      opacity: 1;
    }
  `,
  template: `
    <div
      class="slider-container relative inline-flex rounded-full bg-[var(--muted)] p-1 text-[var(--muted-foreground)] shadow-sm"
    >
      <!-- Indicador deslizante -->
      <div class="slider-indicator" [class]="'slider-' + currentMode()"></div>

      <!-- Opción Sistema -->
      <button
        class="relative z-10 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:scale-110"
        [class.cursor-not-allowed]="currentMode() === 'system'"
        [class.cursor-pointer]="currentMode() !== 'system'"
        [disabled]="currentMode() === 'system'"
        (click)="currentMode() !== 'system' && setMode('system')"
        type="button"
        aria-label="System theme"
      >
        <fa-icon
          class="transition-all duration-200"
          [icon]="['fas', 'display']"
          [fixedWidth]="true"
          [class]="
            currentMode() === 'system'
              ? 'text-[var(--primary)]'
              : 'text-[var(--muted-foreground)] hover:text-[var(--primary)]'
          "
          aria-hidden="true"
        ></fa-icon>
      </button>

      <!-- Opción Claro -->
      <button
        class="relative z-10 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:scale-110"
        [class.cursor-not-allowed]="currentMode() === 'light'"
        [class.cursor-pointer]="currentMode() !== 'light'"
        [disabled]="currentMode() === 'light'"
        (click)="currentMode() !== 'light' && setMode('light')"
        type="button"
        aria-label="Light theme"
      >
        <fa-icon
          class="transition-all duration-200"
          [icon]="['fas', 'sun']"
          [fixedWidth]="true"
          [class]="
            currentMode() === 'light'
              ? 'text-yellow-500'
              : 'text-[var(--muted-foreground)] hover:text-yellow-500'
          "
          aria-hidden="true"
        ></fa-icon>
      </button>

      <!-- Opción Oscuro -->
      <button
        class="relative z-10 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:scale-110"
        [class.cursor-not-allowed]="currentMode() === 'dark'"
        [class.cursor-pointer]="currentMode() !== 'dark'"
        [disabled]="currentMode() === 'dark'"
        (click)="currentMode() !== 'dark' && setMode('dark')"
        type="button"
        aria-label="Dark theme"
      >
        <fa-icon
          class="transition-all duration-200"
          [icon]="['fas', 'moon']"
          [fixedWidth]="true"
          [class]="
            currentMode() === 'dark'
              ? 'text-blue-400'
              : 'text-[var(--muted-foreground)] hover:text-blue-400'
          "
          aria-hidden="true"
        ></fa-icon>
      </button>
    </div>
  `,
})
export class ThemeSwitch {
  private readonly theme = inject(ThemeService)

  /**
   * Current theme mode signal from the theme service.
   * @returns {Signal<ThemeMode>} The current ThemeMode signal ('light'|'dark'|'system').
   */
  readonly currentMode = this.theme.currentMode

  /**
   * Set the theme mode.
   * @param mode The new theme mode ('light'|'dark'|'system').
   */
  setMode(mode: ThemeMode) {
    this.theme.setMode(mode)
  }
}
