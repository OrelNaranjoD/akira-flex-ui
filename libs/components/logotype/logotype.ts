import { Component, input } from '@angular/core'
import { RouterLink } from '@angular/router'

/**
 * Component for displaying the AkiraFlex logotype.
 * Includes navigation to home page when clicked.
 */
@Component({
  selector: 'app-logotype',
  imports: [RouterLink],
  template: `
    <a class="flex items-center gap-1" routerLink="/">
      <img [class]="'w-auto ' + logoSize()" src="/logotype.svg" alt="AkiraFlex Logo" />
      <span [class]="'font-poppins font-bold text-[var(--color-company)] ' + textSize()">
        AkiraFlex
      </span>
    </a>
  `,
})
export class Logotype {
  /**
   * Size variant for the logotype component.
   * @default 'normal'
   */
  size = input<'small' | 'normal' | 'large'>('large')

  /**
   * Get logo image size class based on size input.
   * @returns The CSS class string for logo size.
   */
  logoSize(): string {
    const sizeMap = {
      small: 'h-6',
      normal: 'h-9',
      large: 'h-11',
    }
    return sizeMap[this.size()]
  }

  /**
   * Get text size class based on size input.
   * @returns The CSS class string for text size.
   */
  textSize(): string {
    const sizeMap = {
      small: 'text-normal',
      normal: 'text-2xl',
      large: 'text-3xl',
    }
    return sizeMap[this.size()]
  }
}
