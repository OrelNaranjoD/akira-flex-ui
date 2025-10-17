import { isPlatformBrowser } from '@angular/common'
import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core'
import { REQUEST } from '@angular/core'
import { THEME_COOKIES, ThemeMode } from '../shared'
import { getCookie, getCookieFromString, setSecureCookie } from '../utils/cookie-utils'

/**
 * Manages the application's visual theme (light, dark, or system-based).
 * It persists the user's preference in a cookie and applies the effective
 * theme by toggling a 'dark' class on the root HTML element. The service is
 * server-side rendering (SSR) aware.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID))
  private readonly request = inject(REQUEST, { optional: true })
  private readonly userPreference = signal<ThemeMode>(this.getInitialMode())
  private readonly systemPreferenceChanged = signal(0)

  /**
   * The user's selected theme preference ('light', 'dark', or 'system').
   * This signal is readonly and should be modified only via the service's public API.
   */
  public readonly currentMode$ = this.userPreference.asReadonly()

  /**
   * The actual theme being applied ('light' or 'dark').
   * This computes the theme based on the user's preference and the system's
   * color scheme if 'system' is selected.
   */
  public readonly effectiveMode$ = computed<'light' | 'dark'>(() => {
    this.systemPreferenceChanged()

    const mode = this.userPreference()
    if (mode === 'system') {
      if (this.isBrowser) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      return 'light'
    }
    return mode
  })

  constructor() {
    effect(() => {
      this.applyTheme(this.effectiveMode$())
    })

    if (this.isBrowser) {
      this.setupSystemThemeListener()
    }
  }

  /**
   * Sets the user's desired theme mode and persists it in a cookie.
   * @param mode The theme mode to set.
   */
  public setMode(mode: ThemeMode): void {
    this.userPreference.set(mode)
    if (this.isBrowser) {
      setSecureCookie(THEME_COOKIES.MODE, mode, { days: 365, secure: true, sameSite: 'Lax' })
    }
  }

  /**
   * Toggles the effective theme between 'light' and 'dark' and sets it as the new
   * user preference.
   */
  public toggleMode(): void {
    const nextMode = this.effectiveMode$() === 'light' ? 'dark' : 'light'
    this.setMode(nextMode)
  }

  /**
   * Retrieves the initial theme mode from the browser cookie or server request.
   * Defaults to 'system' if no cookie is found or if running on the server.
   * @returns The stored theme preference or 'system'.
   */
  private getInitialMode(): ThemeMode {
    let stored: string | null = null

    if (this.isBrowser) {
      stored = getCookie(THEME_COOKIES.MODE)
    } else if (this.request) {
      const req = this.request as { headers?: { cookie?: string }; get?: (key: string) => string }
      const cookieHeader = req.headers?.cookie || req.get?.('cookie') || ''
      stored = getCookieFromString(cookieHeader, THEME_COOKIES.MODE)
    }

    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored
    }
    return 'system'
  }

  /**
   * Sets up a listener for changes in the operating system's color scheme.
   * When a change is detected, it triggers an update to the effective theme.
   */
  private setupSystemThemeListener(): void {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      this.systemPreferenceChanged.update((v) => v + 1)
    })
  }

  /**
   * Applies the theme to the document's root element by toggling the 'dark' class.
   * Works on both server and browser.
   * @param mode The effective theme mode to apply ('light' or 'dark').
   */
  private applyTheme(mode: 'light' | 'dark'): void {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', mode === 'dark')
    }
  }
}
