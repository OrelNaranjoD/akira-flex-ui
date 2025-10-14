import { Component, input, output, ChangeDetectionStrategy } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { InputGroupModule } from 'primeng/inputgroup'
import { InputGroupAddonModule } from 'primeng/inputgroupaddon'

/**
 * Reusable Search Box Component.
 */
@Component({
  selector: 'app-search-box',
  imports: [FormsModule, InputTextModule, ButtonModule, InputGroupModule, InputGroupAddonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-box.html',
})
export class SearchBox {
  placeholder = input('Search...')
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
