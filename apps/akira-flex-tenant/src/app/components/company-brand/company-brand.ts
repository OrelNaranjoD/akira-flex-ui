import { Component, input } from '@angular/core'

/**
 * Company brand display component showing logo, name and slogan.
 * Supports different sizes and responsive design.
 */
@Component({
  selector: 'tenant-company-brand',
  templateUrl: './company-brand.html',
})
export class CompanyBrand {
  /**
   * Logo image URL for the company.
   */
  logo = input<string>('')

  /**
   * Company name to display.
   */
  name = input<string>('')

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
