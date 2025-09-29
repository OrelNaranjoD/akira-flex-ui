import { Component, input, output, ChangeDetectionStrategy } from '@angular/core'

/**
 * Reusable checkbox component with theme support.
 */
@Component({
  selector: 'app-checkbox',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="flex items-center cursor-pointer group">
      <div class="relative flex items-center justify-center">
        <input
          class="peer h-5 w-5 cursor-pointer transition-all duration-200 appearance-none rounded shadow border border-[var(--border)] checked:bg-[var(--p-primary)] checked:border-transparent checked:shadow-md hover:border-[var(--p-primary)] hover:bg-[var(--p-primary)]/20 focus:outline-none focus:ring-1"
          [checked]="checked()"
          (change)="onToggle($event)"
          type="checkbox"
        />
        <span
          class="absolute inset-0 flex items-center justify-center text-[var(--p-foreground)] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity duration-200"
          aria-hidden="true"
        >
          <i class="text-[10px] leading-none" icon="pi pi-check"></i>
        </span>
      </div>
      @if (label()) {
        <span
          class="ml-2 text-sm text-[var(--p-foreground)] leading-4 transition-colors duration-200 group-hover:text-[var(--p-primary)]"
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
