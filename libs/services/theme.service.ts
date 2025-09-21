import { Injectable, PLATFORM_ID, signal, computed, effect, inject } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { setCookie, getCookie } from '../utils/cookie-utils'
import { ThemeMode, THEME_COOKIES } from '../flex-shared-lib'

/**
 * Service to manage application theme (light, dark, system).
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID)
  private readonly isBrowser = isPlatformBrowser(this.platformId)
  private readonly currentMode = signal<ThemeMode>(this.getInitialMode())
  private readonly effectiveMode = computed<Exclude<ThemeMode, 'system'>>(() => {
    const mode = this.currentMode()
    if (mode === 'system') {
      if (this.isBrowser && typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      return 'light'
    }
    return mode
  })

  public readonly themeReady = signal(false)
  public currentMode$ = computed(() => this.currentMode())
  public effectiveMode$ = computed(() => this.effectiveMode())

  constructor() {
    effect(() => {
      const mode = this.effectiveMode()
      this.applyTheme(mode)
    })
    if (this.isBrowser) {
      this.setupSystemThemeListener()
    }
  }

  /**
   * Sets the theme mode.
   * @param mode The desired theme mode ('light', 'dark', 'system').
   */
  setMode(mode: ThemeMode): void {
    this.themeReady.set(false)
    this.currentMode.set(mode)
    if (this.isBrowser) {
      setCookie(THEME_COOKIES.MODE, mode)
    }
  }

  /**
   * Toggles between theme modes ('light', 'dark', 'system').
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
        setCookie(THEME_COOKIES.MODE, next)
      }
      return next
    })
  }

  /**
   * Gets the initial theme mode from cookies (SSR friendly).
   * @returns The initial theme mode ('light', 'dark' or 'system').
   */
  private getInitialMode(): ThemeMode {
    if (this.isBrowser) {
      const stored = getCookie(THEME_COOKIES.MODE)
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored
      }
    }
    return 'system'
  }

  /**
   * Listens to OS theme changes if in browser.
   */
  private setupSystemThemeListener(): void {
    if (typeof window === 'undefined') return
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.currentMode() === 'system') {
        this.currentMode.set('system')
      }
    })
  }

  /**
   * Applies the theme class to the root HTML element.
   * @param mode Theme mode ('light' | 'dark').
   */
  private applyTheme(mode: 'light' | 'dark'): void {
    if (!this.isBrowser || typeof document === 'undefined') return
    const htmlElement = document.documentElement
    htmlElement.classList.toggle('dark', mode === 'dark')
    this.themeReady.set(true)
  }
}
