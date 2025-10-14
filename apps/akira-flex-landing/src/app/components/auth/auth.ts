import { Component, ChangeDetectionStrategy, output, ViewChild } from '@angular/core'
import { Button } from 'primeng/button'
import { SignIn } from './sign-in/sign-in'
import { SignUp } from './sign-up/sign-up'

/**
 * Authentication Component for Landing Page Header.
 * Provides "Sign In" and "Request Demo" buttons that open respective modal dialogs.
 */
@Component({
  selector: 'landing-auth',
  imports: [Button, SignIn, SignUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './auth.html',
})
export class Auth {
  @ViewChild('signInComponent') signInComponent!: SignIn
  @ViewChild('signUpComponent') signUpComponent!: SignUp

  public readonly loginSuccess = output<void>()

  /**
   * Opens the sign-up form ('Sign Up') in a modal dialog.
   * Handles navigation to the sign-in dialog if the user chooses to switch.
   */
  public openSignUpDialog(): void {
    this.signUpComponent.show()
  }

  /**
   * Opens the sign-in form ('Sign In') in a modal dialog.
   * Handles navigation to the sign-up dialog if the user chooses to switch.
   */
  public openSignInDialog(): void {
    this.signInComponent.show()
  }

  /**
   * Handles successful login.
   */
  onLoginSuccess(): void {
    this.loginSuccess.emit()
  }

  /**
   * Switches from sign-in to sign-up modal.
   */
  switchToSignUp(): void {
    this.signUpComponent.show()
  }

  /**
   * Switches from sign-up to sign-in modal.
   */
  switchToSignIn(): void {
    this.signInComponent.show()
  }

  /**
   * Handles forgot password action.
   */
  onForgotPassword(): void {
    // TODO: Implement forgot password functionality
  }
}
