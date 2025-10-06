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
  ResendVerificationRequest,
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
  parseJwtPayload,
} from '../utils/cookie-utils'

import { GlobalConfigService } from './global-config.service'
import { AuthStoreService } from './auth-store.service'

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
  private readonly authStore = inject(AuthStoreService)
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

    console.log('Initializing auth state from cookies:')
    console.log('Token:', token ? 'present' : 'null')
    console.log('User cookie:', user)

    if (token && user) {
      try {
        const userData = JSON.parse(user)
        console.log('Parsed user data:', userData)
        this._currentUser.set(userData)
        this._isAuthenticated.set(true)
      } catch (error) {
        console.error('Error parsing user data from cookie:', error)
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
          console.log('Raw login response from backend:', response)
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

    console.log('Login response:', response)
    console.log('User data:', response.user)

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

    console.log('Setting current user:', response.user)
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
          this.setTokenAfterVerification(response)
          this._isLoading.set(false)
        }),
        catchError((error) => {
          this._isLoading.set(false)
          return throwError(() => error)
        })
      )
  }

  /**
   * Resend email verification code.
   * @param requestData The resend verification request data.
   * @returns Observable that emits void on success.
   */
  resendVerification(requestData: ResendVerificationRequest): Observable<void> {
    this._isLoading.set(true)
    return this.http
      .post<void>(this.globalConfig.apiEndpoints.auth.resendVerification, requestData)
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
      error: (error) => {
        console.warn('Failed to load user profile after login, falling back to JWT payload:', error)

        // Fallback: extract user info from JWT token
        const payload = parseJwtPayload(response.accessToken)
        if (payload) {
          const user: User = {
            id: payload['sub'] as string,
            email: payload['email'] as string,
            firstName: '', // JWT doesn't contain firstName/lastName
            lastName: '',
            roles: (payload['roles'] as string[]) || [],
            phone: undefined,
          }

          setSecureCookie(this.USER_KEY, JSON.stringify(user), {
            days: daysUntilExpiration,
            secure: false,
            sameSite: 'Lax',
          })

          // Update store with JWT data
          this.authStore.setAuthFromJwt(response.accessToken, user)
        }
      },
    })
  }

  /**
   * Set token after email verification and load user profile.
   * @param response The auth token response from server.
   */
  private setTokenAfterVerification(response: AuthTokenResponse): void {
    if (!isPlatformBrowser(this.platformId)) return

    const expTimestamp = getJwtExpiration(response.accessToken)
    const daysUntilExpiration = expTimestamp ? getDaysUntilExpiration(expTimestamp) : 7

    setSecureCookie(this.TOKEN_KEY, response.accessToken, {
      days: daysUntilExpiration,
      secure: true,
      sameSite: 'Strict',
    })

    // For email verification, we need to load user profile to complete authentication
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
      error: (error) => {
        console.warn('Could not load user profile after verification:', error)
        // Still mark as authenticated since we have a valid token
        this._isAuthenticated.set(true)
      },
    })
  }

  /**
   * Get current user profile from server.
   * @returns Observable with user profile data.
   */
  getUserProfile(): Observable<User> {
    return this.http
      .get<User>(this.globalConfig.apiEndpoints.auth.me, { headers: this.getAuthHeaders() })
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
   * Initialize authentication state from stored data.
   * @returns Observable with user and token data if available.
   */
  initializeAuth(): Observable<{ user: User; token: string } | null> {
    return new Observable((observer) => {
      if (!isPlatformBrowser(this.platformId)) {
        observer.next(null)
        observer.complete()
        return
      }

      const token = getCookie(this.TOKEN_KEY)
      const userCookie = getCookie(this.USER_KEY)

      if (!token || !userCookie) {
        observer.next(null)
        observer.complete()
        return
      }

      try {
        const user = JSON.parse(userCookie)
        observer.next({ user, token })
        observer.complete()
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        this.clearStoredAuth()
        observer.next(null)
        observer.complete()
      }
    })
  }
}
