import { Injectable, Renderer2, RendererFactory2, inject, signal, computed } from '@angular/core'
import { DOCUMENT } from '@angular/common'

export type Domain = 'landing' | 'tenant' | 'platform'
export type ThemeMode = 'light' | 'dark' | 'system'

/**
 * Service to manage theme modes (light, dark, system) across different application domains.
 * It persists user preferences in localStorage and dynamically loads corresponding stylesheets.
 * The service also listens to system theme changes when 'system' mode is active.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly rendererFactory = inject(RendererFactory2)
  private readonly document = inject(DOCUMENT)
  private readonly renderer: Renderer2
  private readonly isBrowser: boolean

  private readonly _currentDomain = signal<Domain>('landing')
  private readonly _domainModes = signal<Partial<Record<Domain, ThemeMode>>>({})

  readonly currentDomain = this._currentDomain.asReadonly()
  readonly domainModes = this._domainModes.asReadonly()

  readonly currentMode = computed(() => {
    const domain = this._currentDomain()
    const modes = this._domainModes()
    return modes[domain] || 'system'
  })

  readonly resolvedMode = computed(() => {
    const mode = this.currentMode()
    return mode === 'system' ? this.getSystemMode() : mode
  })

  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null)
    this.isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined'

    if (this.isBrowser) {
      const modes: Partial<Record<Domain, ThemeMode>> = {}
      ;(['landing', 'tenant', 'platform'] as Domain[]).forEach((domain) => {
        modes[domain] = this.loadModeForDomain(domain)
      })
      this._domainModes.set(modes)

      this.applyCurrentTheme()
      this.listenToSystemThemeChanges()
    } else {
      this.applyCurrentTheme()
    }
  }

  /**
   * Sets the active domain and applies its theme.
   * Also persists the current mode for that domain.
   * @param domain The domain to set as active.
   */
  setDomain(domain: Domain): void {
    this._currentDomain.set(domain)
    this.applyCurrentTheme()

    if (this.isBrowser) {
      const modes = this._domainModes()
      const mode = modes[domain] || 'system'
      this.saveModeForDomain(domain, mode)
    }
  }

  /**
   * Sets the theme mode for the current domain and persists it.
   * @param mode The new theme mode ('light'|'dark'|'system').
   */
  setMode(mode: ThemeMode): void {
    const currentDomain = this._currentDomain()
    const currentModes = this._domainModes()

    this._domainModes.set({
      ...currentModes,
      [currentDomain]: mode,
    })

    this.applyCurrentTheme()

    if (this.isBrowser) {
      this.saveModeForDomain(currentDomain, mode)
    }
  }

  /**
   * Returns the theme mode for the current domain.
   * @returns The current theme mode ('light'|'dark'|'system').
   */
  getMode(): ThemeMode {
    return this.currentMode()
  }

  /**
   * Returns the theme mode for a specific domain.
   * @param domain The domain to get the theme mode for.
   * @returns The theme mode for the specified domain.
   */
  getModeForDomain(domain: Domain): ThemeMode {
    const modes = this._domainModes()
    return modes[domain] || 'system'
  }

  /**
   * Returns the currently active domain.
   * @returns The current domain ('landing'|'tenant'|'platform').
   */
  getDomain(): Domain {
    return this._currentDomain()
  }

  /**
   * Toggles between light and dark theme modes for the current domain.
   */
  toggleMode(): void {
    const resolvedMode = this.resolvedMode()
    const newMode = resolvedMode === 'light' ? 'dark' : 'light'
    this.setMode(newMode)
  }

  /**
   * Applies the theme for the current domain.
   */
  private applyCurrentTheme(): void {
    const currentDomain = this._currentDomain()
    const resolvedMode = this.resolvedMode()

    this.applyDomain(currentDomain)
    this.applyModeWithTransition(resolvedMode)
    this.loadThemeForDomain(currentDomain, resolvedMode)
  }

  /**
   * Applies the given domain as an attribute on the document root.
   * @param domain The domain to apply ('landing'|'tenant'|'platform').
   */
  private applyDomain(domain: Domain): void {
    const root = this.document.documentElement
    root.setAttribute('data-domain', domain)
  }

  /**
   * Applies the given theme mode as an attribute on the document root.
   * @param mode The theme mode to apply ('light'|'dark').
   */
  private applyMode(mode: 'light' | 'dark'): void {
    const root = this.document.documentElement
    root.setAttribute('data-theme', mode)
  }

  /**
   * Applies the given theme mode with a smooth transition animation.
   * @param mode The theme mode to apply ('light'|'dark').
   */
  private applyModeWithTransition(mode: 'light' | 'dark'): void {
    if (!this.isBrowser) {
      this.applyMode(mode)
      return
    }

    const root = this.document.documentElement
    const currentMode = root.getAttribute('data-theme')

    // Skip animation if it's the same mode
    if (currentMode === mode) {
      return
    }

    // Add transition class for smooth color transitions
    root.classList.add('theme-transitioning')

    // Apply new theme immediately, CSS transitions will handle the animation
    this.applyMode(mode)

    // Remove transition class after animation completes
    setTimeout(() => {
      root.classList.remove('theme-transitioning')
    }, 300)
  }

  /**
   * Gets the system's preferred color scheme.
   * @returns 'light' or 'dark' based on system preference.
   */
  private getSystemMode(): 'light' | 'dark' {
    if (!this.isBrowser || !window.matchMedia) return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  /**
   * Resolves 'system' into either 'light' or 'dark' based on system preference.
   * @param mode The theme mode to resolve.
   * @returns 'light' or 'dark'.
   */
  private getResolvedMode(mode: ThemeMode): 'light' | 'dark' {
    return mode === 'system' ? this.getSystemMode() : mode
  }

  /**
   * Dynamically loads the stylesheet for the given domain and mode.
   * @param domain The domain to load the theme for.
   * @param mode The theme mode to apply ('light'|'dark').
   */
  private loadThemeForDomain(domain: Domain, mode: 'light' | 'dark'): void {
    this.removeThemeLinks()

    if (!this.isBrowser) return

    const link = this.renderer.createElement('link')
    this.renderer.setAttribute(link, 'rel', 'stylesheet')
    this.renderer.setAttribute(link, 'href', `/assets/themes/${domain}-${mode}.css`)
    this.renderer.setAttribute(link, 'id', 'theme-styles')

    this.renderer.appendChild(this.document.head, link)
  }

  /**
   * Persists the theme mode for a specific domain into localStorage.
   * @param domain The domain to save the theme mode for.
   * @param mode The theme mode to save ('light'|'dark'|'system').
   */
  private saveModeForDomain(domain: Domain, mode: ThemeMode): void {
    if (!this.isBrowser) return
    localStorage.setItem(this.getStorageKey(domain), mode)
  }

  /**
   * Loads the persisted theme mode for a domain from localStorage.
   * Returns 'system' if not found.
   * @param domain The domain to load the theme mode for.
   * @returns The loaded ThemeMode ('light'|'dark'|'system').
   */
  private loadModeForDomain(domain: Domain): ThemeMode {
    if (!this.isBrowser) return 'system'
    const mode = localStorage.getItem(this.getStorageKey(domain)) as ThemeMode | null
    return mode && this.isValidMode(mode) ? mode : 'system'
  }

  /**
   * Builds the localStorage key for a given domain.
   * @param domain The domain to build the key for.
   * @returns The localStorage key string.
   */
  private getStorageKey(domain: Domain): string {
    return `akiraflex-theme-${domain}`
  }

  /**
   * Registers a listener to update the theme if the system theme changes
   * while the current domain is set to 'system'.
   */
  private listenToSystemThemeChanges(): void {
    if (!this.isBrowser || !window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (this.currentMode() === 'system') {
        this.applyCurrentTheme()
      }
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    }
  }

  /**
   * Removes the existing theme <link> element from the document head.
   */
  private removeThemeLinks(): void {
    const existingLink = this.document.getElementById('theme-styles')
    if (existingLink) {
      this.renderer.removeChild(this.document.head, existingLink)
    }
  }

  /**
   * Validates if a string is a supported theme mode.
   * @param mode The mode string to validate.
   * @returns True if valid, false otherwise.
   */
  private isValidMode(mode: string): mode is ThemeMode {
    return ['light', 'dark', 'system'].includes(mode)
  }
}
