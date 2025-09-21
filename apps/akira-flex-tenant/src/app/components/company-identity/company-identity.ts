import { Component, input } from '@angular/core'

/**
 * Component to display company identity with logo, name and slogan.
 */
@Component({
  selector: 'app-tenant-company-identity',
  standalone: true,
  imports: [],
  template: `
    <div class="flex items-center gap-2">
      @if (logo()) {
        <img
          [src]="logo()"
          [alt]="name() + ' Logo'"
          [class]="'h-10 w-auto rounded bg-[var(--color-card)] ' + logoClass()"
        />
      } @else {
        <div
          class="h-10 w-10 rounded bg-[var(--color-muted)] flex items-center justify-center text-[var(--color-muted-foreground)]"
        >
          <i class="fas fa-building"></i>
        </div>
      }
      <div class="flex flex-col">
        <span [class]="'font-bold text-[var(--p-primary-color)] ' + textClass()">
          {{ name() }}
        </span>
        @if (slogan()) {
          <span class="text-xs text-[var(--p-primary-color)] font-medium">{{ slogan() }}</span>
        }
      </div>
    </div>
  `,
  styles: [],
})
export class CompanyIdentity {
  /**
   * Logo image URL for the company.
   */
  logo = input<string>('')

  /**
   * Company name to display.
   */
  name = input<string>('Empresa')

  /**
   * Slogan to display below the company name.
   */
  slogan = input<string>('')

  /**
   * Size variant for the identity component.
   * @default 'normal'
   */
  size = input<'small' | 'normal' | 'large'>('normal')

  /**
   * Get logo image size class based on size input.
   * @returns {string} The CSS class for the logo size.
   */
  logoClass(): string {
    const sizeMap = {
      small: 'h-8',
      normal: 'h-10',
      large: 'h-16',
    }
    return sizeMap[this.size()]
  }

  /**
   * Get text size class based on size input.
   * @returns {string} The CSS class for the text size.
   */
  textClass(): string {
    const sizeMap = {
      small: 'text-lg',
      normal: 'text-xl',
      large: 'text-3xl',
    }
    return sizeMap[this.size()]
  }
}
