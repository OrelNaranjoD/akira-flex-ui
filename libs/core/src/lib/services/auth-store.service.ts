import { Injectable, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  User,
  LoginRequest,
  RegisterRequest,
  VerifyEmailRequest,
  ResendVerificationRequest,
} from '../shared'
import * as AuthActions from '../store/auth/auth.actions'
import * as AuthSelectors from '../store/auth/auth.selectors'

/**
 * Service for accessing authentication state from NgRx store.
 * This service provides reactive access to auth state and dispatches auth actions.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private readonly store = inject(Store)

  // State selectors
  readonly user$ = this.store.select(AuthSelectors.selectUser)
  readonly token$ = this.store.select(AuthSelectors.selectToken)
  readonly isAuthenticated$ = this.store.select(AuthSelectors.selectIsAuthenticated)
  readonly isLoading$ = this.store.select(AuthSelectors.selectIsLoading)
  readonly error$ = this.store.select(AuthSelectors.selectError)
  readonly isInitialized$ = this.store.select(AuthSelectors.selectIsInitialized)

  // Get current values (non-reactive)
  /**
   * Get the current authenticated user.
   * @returns The current user or null if not authenticated.
   */
  get user(): User | null {
    let user: User | null = null
    this.user$.subscribe((u) => (user = u)).unsubscribe()
    return user
  }

  /**
   * Get the current authentication token.
   * @returns The current token or null if not authenticated.
   */
  get token(): string | null {
    let token: string | null = null
    this.token$.subscribe((t) => (token = t)).unsubscribe()
    return token
  }

  /**
   * Check if the user is currently authenticated.
   * @returns True if authenticated, false otherwise.
   */
  get isAuthenticated(): boolean {
    let isAuth = false
    this.isAuthenticated$.subscribe((auth) => (isAuth = auth)).unsubscribe()
    return isAuth
  }

  /**
   * Check if an authentication operation is currently loading.
   * @returns True if loading, false otherwise.
   */
  get isLoading(): boolean {
    let loading = false
    this.isLoading$.subscribe((l) => (loading = l)).unsubscribe()
    return loading
  }

  /**
   * Get the current error message.
   * @returns The current error message or null if no error.
   */
  get error(): string | null {
    let error: string | null = null
    this.error$.subscribe((e) => (error = e)).unsubscribe()
    return error
  }

  // Action dispatchers
  /**
   * Dispatch login action with user credentials.
   * @param credentials The login credentials.
   */
  login(credentials: LoginRequest): void {
    this.store.dispatch(AuthActions.login({ credentials }))
  }

  /**
   * Dispatch register action with user registration data.
   * @param userData The registration data.
   */
  register(userData: RegisterRequest): void {
    this.store.dispatch(AuthActions.register({ userData }))
  }

  /**
   * Dispatch email verification action.
   * @param verificationData The email verification data.
   */
  verifyEmail(verificationData: VerifyEmailRequest): void {
    this.store.dispatch(AuthActions.verifyEmail({ verificationData }))
  }

  /**
   * Dispatch resend verification action.
   * @param requestData The resend verification request data.
   */
  resendVerification(requestData: ResendVerificationRequest): void {
    this.store.dispatch(AuthActions.resendVerification({ requestData }))
  }

  /**
   * Dispatch action to set authentication data from JWT.
   * @param token The JWT token.
   * @param user The user data.
   */
  setAuthFromJwt(token: string, user: User): void {
    this.store.dispatch(AuthActions.setAuthFromJwt({ token, user }))
  }

  /**
   * Dispatch action to load user profile from server.
   */
  loadUserProfile(): void {
    this.store.dispatch(AuthActions.loadUserProfile())
  }

  /**
   * Dispatch logout action.
   */
  logout(): void {
    this.store.dispatch(AuthActions.logout())
  }

  /**
   * Dispatch action to initialize authentication state.
   */
  initializeAuth(): void {
    this.store.dispatch(AuthActions.initializeAuth())
  }

  // Utility methods
  /**
   * Check if the current user has a specific role.
   * @param role The role to check for.
   * @returns True if the user has the role, false otherwise.
   */
  hasRole(role: string): boolean {
    const user = this.user
    return user?.roles?.includes(role) ?? false
  }
}
