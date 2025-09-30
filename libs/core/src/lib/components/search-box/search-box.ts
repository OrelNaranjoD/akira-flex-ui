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
  template: `
    <p-inputGroup [style]="{ width: width() }">
      <p-inputGroupAddon>
        <i class="pi pi-search"></i>
      </p-inputGroupAddon>
      <input
        [(ngModel)]="searchValue"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        (input)="onSearch()"
        (keyup.enter)="onEnter()"
        pInputText
      />
      @if (searchValue && !disabled()) {
        <p-inputGroupAddon>
          <p-button
            [text]="true"
            [rounded]="true"
            (click)="clearSearch()"
            aria-label="Clear search"
            icon="pi pi-times"
          ></p-button>
        </p-inputGroupAddon>
      }
    </p-inputGroup>
  `,
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
