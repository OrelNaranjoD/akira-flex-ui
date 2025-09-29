import { Component, input, output, ChangeDetectionStrategy } from '@angular/core'
import { FormsModule } from '@angular/forms'

/**
 * Reusable Search Box Component.
 */
@Component({
  selector: 'app-search-box',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative" [style.width]="width()">
      <i
        class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-muted-foreground)] text-sm"
      ></i>
      <input
        class="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
        [(ngModel)]="searchValue"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        (input)="onSearch()"
        (keyup.enter)="onEnter()"
        type="text"
      />

      <!-- Clear button -->
      @if (searchValue && !disabled()) {
        <button
          class="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors duration-200"
          (click)="clearSearch()"
          aria-label="Clear search"
        >
          <i class="pi pi-times text-xs"></i>
        </button>
      }
    </div>
  `,
})
export class SearchBox {
  placeholder = input('Buscar...')
  width = input('100%')
  disabled = input(false)
  debounceMs = input(300)
  searchQuery = output<string>()
  enterPressed = output<string>()
  cleared = output<void>()

  searchValue: string = ''
  private searchTimeout?: number

  /**
   * Handle search input with debouncing.
   */
  onSearch() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }

    this.searchTimeout = window.setTimeout(() => {
      this.searchQuery.emit(this.searchValue)
    }, this.debounceMs())
  }

  /**
   * Handle Enter key press.
   */
  onEnter() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }

    this.enterPressed.emit(this.searchValue)
    this.searchQuery.emit(this.searchValue)
  }

  /**
   * Clear search input and emit events.
   */
  clearSearch() {
    this.searchValue = ''

    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }

    this.cleared.emit()
    this.searchQuery.emit('')
  }
}
