import { Component, input, output } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

/**
 * Reusable checkbox component with theme support.
 *
 * Uses Angular signals for reactive state management and provides
 * a consistent styled checkbox across the application.
 */
@Component({
  selector: 'app-checkbox',
  imports: [FontAwesomeModule],
  template: `
    <label class="flex items-center cursor-pointer group">
      <div class="relative flex items-center justify-center">
        <input
          class="peer h-5 w-5 cursor-pointer transition-all duration-200 appearance-none rounded shadow hover:shadow-md border border-[var(--border)] checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] hover:border-[var(--color-primary)]/60 hover:bg-[var(--color-muted)]/50"
          [checked]="checked()"
          (change)="onToggle($event)"
          type="checkbox"
        />
        <span
          class="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity duration-200"
        >
          <fa-icon class="text-[10px] leading-none" [icon]="['fas', 'check']"></fa-icon>
        </span>
      </div>
      @if (label()) {
        <span
          class="ml-2 text-sm text-[var(--color-foreground)] leading-4 transition-colors duration-200 group-hover:text-[var(--color-primary)]"
        >
          {{ label() }}
        </span>
      }
    </label>
  `,
})
export class Checkbox {
  /**
   * Whether the checkbox is checked.
   */
  checked = input<boolean>(false)

  /**
   * Label text for the checkbox.
   */
  label = input<string>('')

  /**
   * Event emitted when checkbox state changes.
   */
  checkedChange = output<boolean>()

  /**
   * Handles checkbox toggle event.
   * @param event - The checkbox change event.
   */
  onToggle(event: Event): void {
    const target = event.target as HTMLInputElement
    this.checkedChange.emit(target.checked)
  }
}
