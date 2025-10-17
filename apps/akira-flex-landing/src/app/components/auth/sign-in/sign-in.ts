import {
  Component,
  inject,
  output,
  signal,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  PLATFORM_ID,
} from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { LoginRequest, LoginResponse } from '@core'
import { DialogModule } from 'primeng/dialog'
import { InputText } from 'primeng/inputtext'
import { IconField } from 'primeng/iconfield'
import { InputIcon } from 'primeng/inputicon'
import { Checkbox } from 'primeng/checkbox'
import { Button } from 'primeng/button'
import { Message } from 'primeng/message'
import { Password } from 'primeng/password'
import { SignInService } from './sign-in.service'

/**
 * Component for the sign-in form in the landing page header.
 */
@Component({
  selector: 'landing-sign-in',
  imports: [
    DialogModule,
    Checkbox,
    InputText,
    ReactiveFormsModule,
    IconField,
    InputIcon,
    Message,
    Button,
    Password,
  ],
  providers: [SignInService],
  template: `
    <p-dialog
      [(visible)]="visible"
      [modal]="true"
      [style]="{ width: '400px' }"
      [dismissableMask]="true"
      header="Sign In"
      i18n-header="@@signIn"
    >
      <div class="p-6">
        <form
          class="flex flex-col gap-4"
          [formGroup]="signInForm"
          (ngSubmit)="signInSubmit(); $event.preventDefault()"
        >
          <div class="flex flex-col gap-2">
            <label class="font-medium" i18n="@@email" for="email-input">Email</label>
            <p-iconfield>
              <p-inputIcon class="pi pi-envelope" />
              <input
                id="email-input"
                formControlName="email"
                type="email"
                pInputText
                autocomplete="username"
                placeholder="email@domain.com"
                required
                fluid
                autofocus
              />
            </p-iconfield>
            @if (
              signInForm.get('email')?.invalid &&
              (signInForm.get('email')?.dirty || signInForm.get('email')?.touched)
            ) {
              <div class="text-xs mt-1">
                @if (signInForm.get('email')?.hasError('required')) {
                  <p-message i18n="@@emailRequired" severity="error" variant="simple" size="small"
                    >Email is required</p-message
                  >
                }
                @if (signInForm.get('email')?.hasError('email')) {
                  <p-message i18n="@@emailInvalid" severity="error" variant="simple" size="small"
                    >Enter a valid email address</p-message
                  >
                }
              </div>
            }
          </div>

          <div class="flex flex-col gap-2">
            <label class="font-medium" i18n="@@password" for="password-input">Password</label>
            <p-iconfield>
              <p-inputIcon class="pi pi-lock" />
              <p-password
                [toggleMask]="true"
                [feedback]="false"
                inputId="password-input"
                fluid
                formControlName="password"
                autocomplete="current-password"
                required
                placeholder="********"
              />
            </p-iconfield>
            @if (
              signInForm.get('password')?.invalid &&
              (signInForm.get('password')?.dirty || signInForm.get('password')?.touched)
            ) {
              <div class="text-xs mt-1">
                @if (signInForm.get('password')?.hasError('required')) {
                  <p-message
                    i18n="@@passwordRequired"
                    severity="error"
                    variant="simple"
                    size="small"
                    >Password is required.</p-message
                  >
                }
                @if (signInForm.get('password')?.hasError('minlength')) {
                  <p-message
                    i18n="@@passwordMinlength"
                    severity="error"
                    variant="simple"
                    size="small"
                    >Password must be at least 6 characters.</p-message
                  >
                }
              </div>
            }
          </div>

          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center gap-2">
              <p-checkbox [binary]="true" formControlName="remember" inputId="remember" />
              <label class="text-sm cursor-pointer" i18n="@@remember" for="remember"
                >Remember me</label
              >
            </div>

            <p-button
              (onClick)="forgotPassword()"
              i18n-label="@@forgotPassword"
              label="Forgot password"
              i18n-aria-label="@@forgotPassword"
              aria-label="Forgot password"
              type="button"
              link
            />
          </div>

          @if (serverError()) {
            <div class="mt-2">
              <p-message styleClass="w-full" severity="error" variant="simple" size="small">
                {{ serverError() }}
              </p-message>
            </div>
          }

          <p-button
            [rounded]="true"
            [raised]="true"
            [disabled]="signInForm.invalid"
            [label]="'Sign in'"
            i18n-label="@@signIn"
            styleClass="w-full mt-4"
            type="submit"
            i18n-aria-label="@@signIn"
            aria-label="Sign in"
          />

          <div class="pt-4 border-t text-center mt-4">
            <p class="text-sm">
              Don't have an account?
              <p-button
                (click)="onRequestSignUp()"
                i18n-label="@@createAccount"
                label="Create account"
                i18n-aria-label="@@createAccount"
                aria-label="Create account"
                type="button"
                link
              />
            </p>
          </div>
        </form>
      </div>
    </p-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignIn implements AfterViewInit {
  visible = false
  loginSuccess = output<LoginResponse>()
  requestSignUp = output<void>()
  forgot = output<void>()

  serverError = signal<string | null>(null)
  private fb = inject(FormBuilder)
  private loginService = inject(SignInService)
  private cdr = inject(ChangeDetectorRef)
  private platformId = inject(PLATFORM_ID)

  signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false],
  })

  /**
   * Handles the sign-in form submission.
   */
  signInSubmit(): void {
    this.signInForm.markAllAsTouched()
    if (this.signInForm.invalid) return

    this.serverError.set(null)

    const payload = this.signInForm.value as LoginRequest

    this.loginService.login(payload).subscribe({
      next: (response: LoginResponse) => {
        this.loginSuccess.emit(response)
        this.signInForm.reset()
        this.visible = false
      },
      error: (err: unknown) => {
        this.serverError.set(
          err instanceof Error
            ? err.message
            : $localize`:@@error.signIn:Error signing in. Please try again.`
        )
      },
    })
  }

  /**
   * Handles the request to open the sign-up form.
   */
  onRequestSignUp(): void {
    this.requestSignUp.emit()
    this.visible = false
    this.cdr.detectChanges()
  }

  /**
   * Shows the sign-in modal.
   */
  show(): void {
    this.visible = true
    this.cdr.detectChanges()
  }

  /**
   * Hides the sign-in modal.
   */
  hide(): void {
    this.visible = false
    this.cdr.detectChanges()
  }

  /**
   * Handles the forgot password action.
   */
  forgotPassword(): void {
    this.forgot.emit()
  }

  /**
   * Lifecycle hook that runs after the view has been initialized.
   * Ensures the email input gets focus after modal opens.
   */
  ngAfterViewInit(): void {
    // Cambio 2: Proteger el acceso al DOM
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const emailInput = document.getElementById('email-input') as HTMLInputElement
        if (emailInput) {
          emailInput.focus()
        }
      }, 100)
    }
  }
}
