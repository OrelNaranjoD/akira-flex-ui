import '../../../test'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { PLATFORM_ID } from '@angular/core'
import { provideHttpClient } from '@angular/common/http'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { vi } from 'vitest'
import { SignIn } from '../../../../app/components/auth/sign-in/sign-in'
import { SignInService } from '../../../../app/components/auth/sign-in/sign-in.service'

describe('SignIn', () => {
  let component: SignIn
  let fixture: ComponentFixture<SignIn>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignIn, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideNoopAnimations(),
        SignInService,
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(SignIn)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize form with empty values', () => {
    expect(component.signInForm.get('email')?.value).toBe('')
    expect(component.signInForm.get('password')?.value).toBe('')
    expect(component.signInForm.get('remember')?.value).toBe(false)
  })

  it('should validate email field as required', () => {
    const emailControl = component.signInForm.get('email')
    emailControl?.setValue('')
    emailControl?.markAsTouched()
    expect(emailControl?.hasError('required')).toBe(true)
  })

  it('should validate email format', () => {
    const emailControl = component.signInForm.get('email')
    emailControl?.setValue('invalid-email')
    emailControl?.markAsTouched()
    expect(emailControl?.hasError('email')).toBe(true)
  })

  it('should validate password minimum length', () => {
    const passwordControl = component.signInForm.get('password')
    passwordControl?.setValue('short')
    expect(passwordControl?.hasError('minlength')).toBe(true)
  })

  it('should not submit if form is invalid', () => {
    const signInService = TestBed.inject(SignInService)
    const loginSpy = vi.spyOn(signInService, 'login')
    component.signInForm.get('email')?.setValue('')
    component.signInForm.get('password')?.setValue('')
    component.signInSubmit()
    expect(loginSpy).not.toHaveBeenCalled()
  })

  it('should submit form successfully with valid credentials', async () => {
    component.signInForm.get('email')?.setValue('admin@tenant.com')
    component.signInForm.get('password')?.setValue('admin123')
    const emitSpy = vi.spyOn(component.loginSuccess, 'emit')
    component.signInSubmit()
    await new Promise((resolve) => setTimeout(resolve, 1100))
    expect(emitSpy).toHaveBeenCalled()
    expect(component.visible).toBe(false)
  })

  it('should handle login error with invalid credentials', async () => {
    component.signInForm.get('email')?.setValue('wrong@example.com')
    component.signInForm.get('password')?.setValue('wrongpassword')
    component.signInSubmit()
    await new Promise((resolve) => setTimeout(resolve, 1100))
    expect(component.serverError()).toBeTruthy()
  })

  it('should emit requestSignUp event', () => {
    const emitSpy = vi.spyOn(component.requestSignUp, 'emit')
    component.onRequestSignUp()
    expect(emitSpy).toHaveBeenCalled()
    expect(component.visible).toBe(false)
  })

  it('should emit forgot event', () => {
    const emitSpy = vi.spyOn(component.forgot, 'emit')
    component.forgotPassword()
    expect(emitSpy).toHaveBeenCalled()
  })

  it('should show modal', () => {
    component.show()
    expect(component.visible).toBe(true)
  })

  it('should hide modal', () => {
    component.visible = true
    component.hide()
    expect(component.visible).toBe(false)
  })
})
