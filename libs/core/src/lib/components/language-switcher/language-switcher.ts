import { Component, ChangeDetectionStrategy, inject, LOCALE_ID } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { ButtonModule } from 'primeng/button'
import { TooltipModule } from 'primeng/tooltip'

/**
 * Language switcher component to toggle between 'en' and 'es'.
 */
@Component({
  selector: 'app-language-switcher',
  imports: [ButtonModule, TooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './language-switcher.html',
})
export class LanguageSwitcher {
  private document = inject(DOCUMENT)
  currentLanguage = inject(LOCALE_ID)

  /**
   * Toggle between 'en' and 'es' by navigating to the new locale route.
   * This causes a full page reload to apply the new locale translations.
   */
  toggleLanguage(): void {
    const newLang = this.currentLanguage === 'en' ? 'es' : 'en'
    const currentUrl = this.document.location.pathname + this.document.location.search

    const pathWithoutLocale = currentUrl.startsWith(`/${this.currentLanguage}/`)
      ? currentUrl.substring(`/${this.currentLanguage}/`.length - 1)
      : currentUrl.startsWith(`/${this.currentLanguage}`)
        ? currentUrl.substring(`/${this.currentLanguage}`.length)
        : currentUrl

    this.document.location.href = `/${newLang}${pathWithoutLocale}`
  }
}
