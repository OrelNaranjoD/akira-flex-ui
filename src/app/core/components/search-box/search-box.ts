import { Component, input, output } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule } from '@angular/forms'

/**
 * Reusable Search Box Component.
 */
@Component({
  selector: 'app-search-box',
  imports: [FontAwesomeModule, FormsModule],
  template: `
    <div class="relative" [style.width]="width()">
      <fa-icon
        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-muted-foreground)] text-sm"
        [icon]="['fas', 'search']"
      ></fa-icon>
      <input
        class="w-full pl-9 pr-3 py-2 text-sm bg-[var(--color-muted)] border border-[var(--color-border)] rounded-md text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200"
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
          class="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-[var(--color-card)] transition-colors duration-200"
          (click)="clearSearch()"
          aria-label="Clear search"
        >
          <fa-icon
            class="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] text-xs"
            [icon]="['fas', 'times']"
          ></fa-icon>
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
