import { Injectable, inject, signal, computed } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'
import { Observable, tap, catchError, throwError } from 'rxjs'
import { isPlatformBrowser } from '@angular/common'
import { PLATFORM_ID } from '@angular/core'
import {
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  VerifyEmailRequest,
  AuthTokenResponse,
  LoginResponse,
  User,
} from '../shared'
import {
  getCookie,
  setSecureCookie,
  removeCookie,
  getJwtExpiration,
  getDaysUntilExpiration,
} from '../utils/cookie-utils'

import { GlobalConfigService } from './global-config.service'

/**
 * Global authentication service for managing user sessions.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient)
  private readonly router = inject(Router)
  private readonly platformId = inject(PLATFORM_ID)
  private readonly globalConfig = inject(GlobalConfigService)
  private readonly TOKEN_KEY = 'akira_access_token'
  private readonly USER_KEY = 'akira_user'
  private readonly _isAuthenticated = signal(false)
  private readonly _currentUser = signal<User | null>(null)
  private readonly _isLoading = signal(false)
  readonly isAuthenticated = computed(() => this._isAuthenticated())
  readonly currentUser = computed(() => this._currentUser())
  readonly isLoading = computed(() => this._isLoading())
  constructor() {
    this.initializeAuthState()
  }
  /**
   * Initialize authentication state from stored tokens.
   */
  private initializeAuthState(): void {
    if (!isPlatformBrowser(this.platformId)) return
    const token = getCookie(this.TOKEN_KEY)
    const user = getCookie(this.USER_KEY)
    if (token && user) {
      try {
        const userData = JSON.parse(user)
        this._currentUser.set(userData)
        this._isAuthenticated.set(true)
      } catch {
        this.clearStoredAuth()
      }
    }
  }
  /**
   * Login user with credentials.
   * @param credentials The login credentials.
   * @returns Observable that emits AuthTokenResponse on success.
   */
  login(credentials: LoginRequest): Observable<AuthTokenResponse> {
    this._isLoading.set(true)
    return this.http
      .post<AuthTokenResponse>(this.globalConfig.apiEndpoints.auth.login, credentials)
      .pipe(
        tap((response) => {
          this.setTokenSession(response)
          this._isLoading.set(false)
        }),
        catchError((error) => {
          this._isLoading.set(false)
          return throwError(() => error)
        })
      )
  }
  /**
   * Logout current user.
   */
  logout(): void {
    this.clearStoredAuth()
    this._isAuthenticated.set(false)
    this._currentUser.set(null)
    this.router.navigate(['/'])
  }
  /**
   * Check if user has specific role.
   * @param role The role to check.
   * @returns True if user has the role.
   */
  hasRole(role: string): boolean {
    const user = this._currentUser()
    return user?.roles?.includes(role) ?? false
  }
  /**
   * Get authorization headers for HTTP requests.
   * @returns HttpHeaders with authorization token.
   */
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken()
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders()
  }
  /**
   * Refresh user data from server.
   * @returns Observable with updated user data.
   */
  refreshUser(): Observable<LoginResponse['user']> {
    return this.http
      .get<
        LoginResponse['user']
      >(this.globalConfig.apiEndpoints.auth.me, { headers: this.getAuthHeaders() })
      .pipe(
        tap((user) => {
          this._currentUser.set(user)

          const token = this.getToken()
          const expTimestamp = token ? getJwtExpiration(token) : null
          const daysUntilExpiration = expTimestamp ? getDaysUntilExpiration(expTimestamp) : 7

          setSecureCookie(this.USER_KEY, JSON.stringify(user), {
            days: daysUntilExpiration,
            secure: false,
            sameSite: 'Lax',
          })
        })
      )
  }
  /**
   * Get stored access token.
   * @returns The stored access token or null.
   */
  private getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null
    return getCookie(this.TOKEN_KEY)
  }
  /**
   * Set user session after successful login.
   * @param response The login response from server.
   */
  private setSession(response: LoginResponse): void {
    if (!isPlatformBrowser(this.platformId)) return

    const expTimestamp = getJwtExpiration(response.accessToken)
    const daysUntilExpiration = expTimestamp ? getDaysUntilExpiration(expTimestamp) : 7

    setSecureCookie(this.TOKEN_KEY, response.accessToken, {
      days: daysUntilExpiration,
      secure: true,
      sameSite: 'Strict',
    })

    setSecureCookie(this.USER_KEY, JSON.stringify(response.user), {
      days: daysUntilExpiration,
      secure: false,
      sameSite: 'Lax',
    })

    this._currentUser.set(response.user)
    this._isAuthenticated.set(true)
  }
  /**
   * Clear stored authentication data.
   */
  private clearStoredAuth(): void {
    if (!isPlatformBrowser(this.platformId)) return
    removeCookie(this.TOKEN_KEY)
    removeCookie(this.USER_KEY)
  }

  /**
   * Register new user.
   * @param userData The registration data.
   * @returns Observable that emits RegisterResponse on success.
   */
  register(userData: RegisterRequest): Observable<RegisterResponse> {
    this._isLoading.set(true)
    return this.http
      .post<RegisterResponse>(this.globalConfig.apiEndpoints.auth.register, userData)
      .pipe(
        tap(() => {
          this._isLoading.set(false)
        }),
        catchError((error) => {
          this._isLoading.set(false)
          return throwError(() => error)
        })
      )
  }

  /**
   * Verify user email with token.
   * @param verificationData The email verification data.
   * @returns Observable that emits AuthTokenResponse on success.
   */
  verifyEmail(verificationData: VerifyEmailRequest): Observable<AuthTokenResponse> {
    this._isLoading.set(true)
    return this.http
      .post<AuthTokenResponse>(this.globalConfig.apiEndpoints.auth.verifyEmail, verificationData)
      .pipe(
        tap((response) => {
          this.setTokenSession(response)
          this._isLoading.set(false)
        }),
        catchError((error) => {
          this._isLoading.set(false)
          return throwError(() => error)
        })
      )
  }

  /**
   * Set user session with token response.
   * @param response The auth token response from server.
   */
  private setTokenSession(response: AuthTokenResponse): void {
    if (!isPlatformBrowser(this.platformId)) return

    const expTimestamp = getJwtExpiration(response.accessToken)
    const daysUntilExpiration = expTimestamp ? getDaysUntilExpiration(expTimestamp) : 7

    setSecureCookie(this.TOKEN_KEY, response.accessToken, {
      days: daysUntilExpiration,
      secure: true,
      sameSite: 'Strict',
    })

    this.refreshUser().subscribe({
      next: (user) => {
        setSecureCookie(this.USER_KEY, JSON.stringify(user), {
          days: daysUntilExpiration,
          secure: false,
          sameSite: 'Lax',
        })
        this._currentUser.set(user)
        this._isAuthenticated.set(true)
      },
      error: () => {
        this.clearStoredAuth()
      },
    })
  }
}
