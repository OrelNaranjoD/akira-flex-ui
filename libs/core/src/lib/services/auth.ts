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
  MOCK_USER_CREDENTIALS,
} from '../shared'
import {
  getCookie,
  setSecureCookie,
  removeCookie,
  getJwtExpiration,
  getDaysUntilExpiration,
  parseJwtPayload,
} from '../utils/cookie-utils'

import { GlobalConfigService } from './global-config'

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
  private readonly _isLoading = signal(true)
  private readonly _isInitialized = signal(false)
  readonly isAuthenticated = computed(() => this._isAuthenticated())
  readonly currentUser = computed(() => this._currentUser())
  readonly isLoading = computed(() => this._isLoading())
  readonly isInitialized = computed(() => this._isInitialized())

  constructor() {
    this.initializeAuthState()
  }
  /**
   * Initialize authentication state from stored tokens.
   */
  private initializeAuthState(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this._isLoading.set(false)
      this._isInitialized.set(true)
      return
    }

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

    this._isLoading.set(false)
    this._isInitialized.set(true)
  }
  /**
   * Login user with credentials (hardcoded for testing).
   * @param credentials The login credentials.
   * @returns Observable that emits AuthTokenResponse on success.
   */
  loginHardcoded(credentials: LoginRequest): Observable<AuthTokenResponse> {
    this._isLoading.set(true)

    // Simulate API delay
    return new Observable<AuthTokenResponse>((observer) => {
      setTimeout(() => {
        const validCredentials = MOCK_USER_CREDENTIALS

        const isValid = validCredentials.some(
          (cred: { email: string; password: string }) =>
            cred.email === credentials.email && cred.password === credentials.password
        )

        if (isValid) {
          const mockResponse: AuthTokenResponse = {
            accessToken: 'mock-jwt-token-' + Date.now(),
            tokenType: 'Bearer',
            expiresIn: 3600,
          }

          let mockUser: User

          if (credentials.email === 'sysadmin@akiraflex.com') {
            mockUser = {
              id: 'sysadmin-001',
              email: credentials.email,
              firstName: 'System',
              lastName: 'Administrator',
              roles: ['admin', 'system'],
            }
          } else if (credentials.email === 'superadmin@akiraflex.com') {
            mockUser = {
              id: 'superadmin-001',
              email: credentials.email,
              firstName: 'Super',
              lastName: 'Administrator',
              roles: ['admin', 'system', 'superadmin'],
            }
          } else if (credentials.email === 'admin@tenant.com') {
            mockUser = {
              id: '1',
              email: credentials.email,
              firstName: 'Admin',
              lastName: 'Tenant',
              roles: ['admin', 'tenant'],
            }
          } else {
            mockUser = {
              id: '2',
              email: credentials.email,
              firstName: 'User',
              lastName: 'Tenant',
              roles: ['user', 'tenant'],
            }
          }

          this.setMockSession(mockResponse, mockUser)
          this._isLoading.set(false)
          observer.next(mockResponse)
          observer.complete()
        } else {
          this._isLoading.set(false)
          observer.error({
            status: 401,
            message: 'Invalid credentials',
            error: 'Unauthorized',
          })
        }
      }, 1000)
    }).pipe(
      catchError((error) => {
        this._isLoading.set(false)
        return throwError(() => error)
      })
    )
  }

  /**
   * Set mock user session for testing.
   * @param response Mock auth token response.
   * @param user Mock user data.
   */
  private setMockSession(response: AuthTokenResponse, user: User): void {
    if (!isPlatformBrowser(this.platformId)) return

    setSecureCookie(this.TOKEN_KEY, response.accessToken, {
      days: 7,
      secure: false,
      sameSite: 'Lax',
    })

    setSecureCookie(this.USER_KEY, JSON.stringify(user), {
      days: 7,
      secure: false,
      sameSite: 'Lax',
    })

    this._currentUser.set(user)
    this._isAuthenticated.set(true)
  }

  /**
   * Logout current user.
   */
  logout(): void {
    this.clearStoredAuth()
    this._isAuthenticated.set(false)
    this._currentUser.set(null)
    this.router.navigate(['auth', 'sign-in'])
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
  getToken(): string | null {
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
      error: () => {
        const payload = parseJwtPayload(response.accessToken)
        if (payload) {
          const user: User = {
            id: payload['sub'] as string,
            email: payload['email'] as string,
            firstName: '',
            lastName: '',
            roles: (payload['roles'] as string[]) || [],
            phone: undefined,
          }

          setSecureCookie(this.USER_KEY, JSON.stringify(user), {
            days: daysUntilExpiration,
            secure: false,
            sameSite: 'Lax',
          })

          this._currentUser.set(user)
          this._isAuthenticated.set(true)
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
      } catch {
        this.clearStoredAuth()
        observer.next(null)
        observer.complete()
      }
    })
  }
}
