import { Component, input, ChangeDetectionStrategy } from '@angular/core'
import { RouterLink } from '@angular/router'

/**
 * Component for displaying the AkiraFlex logotype.
 * Includes navigation to home page when clicked.
 */
@Component({
  selector: 'app-logotype',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './logotype.html',
})
export class Logotype {
  /**
   * Size variant for the logotype component.
   * - 'small': For footer and compact spaces (32px logo).
   * - 'normal': For mobile devices up to 768px (40px logo).
   * - 'large': For tablet and desktop 768px+ (64px logo).
   * @default 'normal'
   */
  size = input<'small' | 'normal' | 'large'>('normal')

  /**
   * Get logo image size class based on size input.
   * @returns The CSS class string for logo size.
   */
  logoSize(): string {
    return this.getResponsiveClasses('logo')
  }

  /**
   * Get text size class based on size input.
   * @returns The CSS class string for text size.
   */
  textSize(): string {
    return this.getResponsiveClasses('text')
  }

  /**
   * Get slogan size class based on size input with automatic proportional sizing.
   * @returns The CSS class string for slogan size.
   */
  sloganSize(): string {
    return this.getResponsiveClasses('slogan')
  }

  /**
   * Generate responsive classes based on size input.
   * @param type The type of classes to generate ('logo', 'text', or 'slogan').
   * @returns The responsive CSS classes string with mobile-first breakpoints.
   */
  private getResponsiveClasses(type: 'logo' | 'text' | 'slogan'): string {
    const sizeMap = {
      logo: {
        small: 'h-8',
        normal: 'h-10 md:h-16',
        large: 'h-16',
      },
      text: {
        small: 'text-lg',
        normal: 'text-2xl md:text-4xl',
        large: 'text-4xl',
      },
      slogan: {
        small: 'text-[10px]',
        normal: 'text-xs md:text-lg',
        large: 'text-lg',
      },
    }
    const currentSize = this.size()
    return sizeMap[type][currentSize] || sizeMap[type].normal
  }
}
