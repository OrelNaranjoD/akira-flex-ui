import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
  LOCALE_ID,
} from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { ButtonModule } from 'primeng/button'
import { TooltipModule } from 'primeng/tooltip'

/**
 * Language switcher component to toggle between 'en' and 'es'.
 */
@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [ButtonModule, TooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-button
      class="relative z-10 flex items-center justify-center scale-80"
      [rounded]="true"
      [pTooltip]="tooltipText()"
      (click)="toggleLanguage()"
      tooltipPosition="bottom"
    >
      <img
        class="h-5 w-5"
        [src]="currentLanguage() === 'en' ? '/flags/us.svg' : '/flags/es.svg'"
        [alt]="altText()"
      />
    </p-button>
  `,
})
export class LanguageSwitcher {
  private document = inject(DOCUMENT)
  currentLanguage = signal(inject(LOCALE_ID))

  tooltipText = computed(() => {
    if (this.currentLanguage() === 'en') {
      return $localize`:@@languageSwitcher.tooltip.es:Switch to Spanish`
    } else {
      return $localize`:@@languageSwitcher.tooltip.en:Cambiar a Inglés`
    }
  })

  altText = computed(() => {
    if (this.currentLanguage() === 'en') {
      return $localize`:@@languageSwitcher.alt.en:English flag`
    } else {
      return $localize`:@@languageSwitcher.alt.es:Bandera de España`
    }
  })

  /**
   * Toggle between 'en' and 'es' by changing the URL path.
   */
  toggleLanguage(): void {
    const newLang = this.currentLanguage() === 'en' ? 'es' : 'en'
    const currentPath = this.document.location.pathname
    const pathWithoutLocale = currentPath.substring(3)
    this.document.location.href = `/${newLang}/${pathWithoutLocale}`
  }
}
