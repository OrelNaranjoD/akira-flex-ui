import { Injectable, PLATFORM_ID, signal, computed, effect, inject } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { usePreset } from '@primeuix/themes'
import { LandingPreset } from '@landing/themes/landing-preset'
import { PlatformPreset } from '@platform/themes/platform-preset'
import { TenantPreset } from '@tenant/themes/tenant-preset'
import { DomainType, ThemeMode } from '@flex-shared-lib'
import { setCookie, getCookie, getThemeModeCookieKey, THEME_COOKIES } from '../utils/cookie-utils'

/**
 * ThemeService manages application theming based on domain and user preferences.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID)
  private readonly isBrowser = isPlatformBrowser(this.platformId)
  private readonly currentDomain = signal<DomainType>(this.getInitialDomain())
  private readonly currentMode = signal<ThemeMode>(this.getInitialMode(this.getInitialDomain()))
  private readonly effectiveMode = computed<Exclude<ThemeMode, 'system'>>(() => {
    const mode = this.currentMode()
    if (mode === 'system' && this.isBrowser) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return mode as Exclude<ThemeMode, 'system'>
  })
  public readonly themeReady = signal(false)

  public currentDomain$ = computed(() => this.currentDomain())
  public currentMode$ = computed(() => this.currentMode())
  public effectiveMode$ = computed(() => this.effectiveMode())

  constructor() {
    effect(() => {
      const domain = this.currentDomain()
      const mode = this.effectiveMode()
      this.applyTheme(domain, mode)
    })
    this.initializeTheme()

    if (this.isBrowser) {
      setTimeout(() => {
        this.syncWithHtmlScript()
      }, 0)
    }
  }

  /**
   * Sets the current domain and updates the theme accordingly.
   * @param domain The domain to set ('landing' | 'platform' | 'tenant').
   */
  setDomain(domain: DomainType): void {
    this.themeReady.set(false)
    this.currentDomain.set(domain)
    if (this.isBrowser) {
      setCookie(THEME_COOKIES.DOMAIN, domain)
    }
    const mode = this.getInitialMode(domain)
    this.currentMode.set(mode)
  }

  /**
   * Sets the current theme mode.
   * @param mode The theme mode to set ('light' | 'dark' | 'system').
   */
  setMode(mode: ThemeMode): void {
    this.themeReady.set(false)
    this.currentMode.set(mode)
    if (this.isBrowser) {
      setCookie(getThemeModeCookieKey(this.currentDomain()), mode)
    }
  }

  /**
   * Toggles the current theme mode between 'light' and 'dark'.
   */
  toggleMode(): void {
    this.currentMode.update((current) => {
      let next: ThemeMode
      if (current === 'system') {
        next = this.effectiveMode() === 'light' ? 'dark' : 'light'
      } else {
        next = current === 'light' ? 'dark' : 'light'
      }
      if (this.isBrowser) {
        setCookie(getThemeModeCookieKey(this.currentDomain()), next)
      }
      return next
    })
  }

  /**
   * Initializes the theme service.
   */
  private initializeTheme(): void {
    if (this.isBrowser) {
      if (!getCookie(THEME_COOKIES.DOMAIN)) {
        this.detectDomainFromHostname()
      }
      this.setupSystemThemeListener()
    }
  }

  /**
   * Synchronizes the service state with the HTML script state after hydration.
   */
  private syncWithHtmlScript(): void {
    if (!this.isBrowser) return

    // Sync domain
    interface AkiraWindow extends Window {
      __AKIRA_DOMAIN__?: string
    }
    const htmlDomain = (window as AkiraWindow).__AKIRA_DOMAIN__
    if (htmlDomain && htmlDomain !== this.currentDomain()) {
      this.currentDomain.set(htmlDomain as DomainType)
    }

    // Sync theme mode
    interface AkiraWindow extends Window {
      __AKIRA_THEME_MODE__?: string
    }
    const htmlMode = (window as AkiraWindow).__AKIRA_THEME_MODE__
    if (htmlMode && htmlMode !== this.currentMode()) {
      this.currentMode.set(htmlMode as ThemeMode)
    }
  }

  /**
   * Initial theme mode retrieval.
   * @param domain The domain to check.
   * @returns {ThemeMode} The initial theme mode.
   */
  private getInitialMode(domain: DomainType): ThemeMode {
    if (typeof window !== 'undefined') {
      // Extend the Window interface to include __AKIRA_THEME_MODE__
      interface AkiraWindow extends Window {
        __AKIRA_THEME_MODE__?: string
      }
      const akiraWindow = window as AkiraWindow
      // First check if mode was set by HTML script
      if (akiraWindow.__AKIRA_THEME_MODE__) {
        const mode = akiraWindow.__AKIRA_THEME_MODE__
        if (mode === 'light' || mode === 'dark' || mode === 'system') {
          return mode as ThemeMode
        }
      }

      // Then check cookies
      const stored = getCookie(getThemeModeCookieKey(domain))
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored as ThemeMode
      }
    }
    return 'system'
  }

  /**
   * Obtains the initial domain from cookies, HTML script, DOM classes, or defaults to 'landing'.
   * @returns {DomainType} The initial domain.
   */
  private getInitialDomain(): DomainType {
    if (typeof window !== 'undefined') {
      const win = window as unknown as { __AKIRA_DOMAIN__?: unknown }
      if (
        typeof win.__AKIRA_DOMAIN__ === 'string' &&
        (win.__AKIRA_DOMAIN__ === 'landing' ||
          win.__AKIRA_DOMAIN__ === 'platform' ||
          win.__AKIRA_DOMAIN__ === 'tenant')
      ) {
        return win.__AKIRA_DOMAIN__ as DomainType
      }

      // Then check cookies
      const stored = getCookie(THEME_COOKIES.DOMAIN)
      if (stored === 'landing' || stored === 'platform' || stored === 'tenant') {
        return stored as DomainType
      }

      // Finally check DOM classes applied by HTML script
      const htmlElement = document.documentElement
      if (htmlElement.classList.contains('domain-platform')) {
        return 'platform'
      } else if (htmlElement.classList.contains('domain-tenant')) {
        return 'tenant'
      }
    }
    return 'landing'
  }

  /**
   * Detects the domain based on the hostname.
   */
  private detectDomainFromHostname(): void {
    if (!this.isBrowser) return

    const hostname = window.location.hostname
    let domain: DomainType = 'landing'

    if (hostname.includes('platform') || hostname.includes('app')) {
      domain = 'platform'
    } else if (hostname.includes('tenant') || hostname.includes('client')) {
      domain = 'tenant'
    }

    this.currentDomain.set(domain)
  }

  /**
   * Sets up a listener for system theme changes.
   */
  private setupSystemThemeListener(): void {
    if (!this.isBrowser) return

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.currentMode() === 'system') {
        this.currentMode.set('system')
      }
    })
  }

  /**
   * Applies the theme based on the current domain and mode.
   * @param domain The current domain.
   * @param mode The effective theme mode ('light' | 'dark').
   */
  private applyTheme(domain: DomainType, mode: 'light' | 'dark'): void {
    if (!this.isBrowser) return

    const htmlElement = document.documentElement
    let needsUpdate = false

    // Check and apply dark mode
    const hasDarkMode = htmlElement.classList.contains('dark-mode')
    if (mode === 'dark' && !hasDarkMode) {
      htmlElement.classList.add('dark-mode')
      needsUpdate = true
    } else if (mode === 'light' && hasDarkMode) {
      htmlElement.classList.remove('dark-mode')
      needsUpdate = true
    }

    // Check and apply domain class
    const currentDomainClass = `domain-${domain}`
    if (!htmlElement.classList.contains(currentDomainClass)) {
      htmlElement.classList.remove('domain-landing', 'domain-platform', 'domain-tenant')
      htmlElement.classList.add(currentDomainClass)
      needsUpdate = true
    }

    // Only update preset if something changed or it's the first time
    if (needsUpdate || !this.themeReady()) {
      this.updatePresetForDomain(domain)
    }

    this.themeReady.set(true)
  }

  /**
   * Updates the preset based on the current domain.
   * @param domain The current domain.
   */
  private updatePresetForDomain(domain: DomainType): void {
    if (!this.isBrowser) return

    switch (domain) {
      case 'landing':
        usePreset(LandingPreset)
        break
      case 'platform':
        usePreset(PlatformPreset)
        break
      case 'tenant':
        usePreset(TenantPreset)
        break
      default:
        usePreset(LandingPreset)
    }
  }
}
