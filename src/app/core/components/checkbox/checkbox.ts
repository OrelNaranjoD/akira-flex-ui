import { Component, input, output } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

/**
 * Reusable checkbox component with theme support.
 */
@Component({
  selector: 'app-checkbox',
  imports: [FontAwesomeModule],
  template: `
    <label class="flex items-center cursor-pointer group">
      <div class="relative flex items-center justify-center">
        <input
          class="peer h-5 w-5 cursor-pointer transition-all duration-200 appearance-none rounded shadow border border-[var(--border)] checked:bg-[var(--color-primary)] checked:border-transparent checked:shadow-md hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/20 focus:outline-none focus:ring-1"
          [checked]="checked()"
          (change)="onToggle($event)"
          type="checkbox"
        />
        <span
          class="absolute inset-0 flex items-center justify-center text-[var(--color-foreground)] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity duration-200"
          aria-hidden="true"
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
  checked = input<boolean>(false)
  label = input<string>('')
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
