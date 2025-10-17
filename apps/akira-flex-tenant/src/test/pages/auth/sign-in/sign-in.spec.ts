import '../../../test'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router'
import { provideHttpClient } from '@angular/common/http'
import { of } from 'rxjs'
import { SignIn } from '../../../../app/pages/auth/sign-in/sign-in'
import { AuthService } from '@core'

describe('SignIn', () => {
  let component: SignIn
  let fixture: ComponentFixture<SignIn>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignIn, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        AuthService,
        Router,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {}, queryParams: {} },
            params: of({}),
            queryParams: of({}),
          },
        },
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
    expect(emailControl?.hasError('invalidEmail')).toBe(true)
  })

  it('should validate password minimum length', () => {
    const passwordControl = component.signInForm.get('password')
    passwordControl?.setValue('short')
    expect(passwordControl?.hasError('minlength')).toBe(true)
  })

  it('should not submit if form is invalid', () => {
    component.signInForm.get('email')?.setValue('')
    component.signInForm.get('password')?.setValue('')
    component.onSubmit()
    expect(component.signInForm.valid).toBe(false)
  })

  it('should login successfully with valid credentials', async () => {
    component.signInForm.get('email')?.setValue('admin@tenant.com')
    component.signInForm.get('password')?.setValue('admin123')
    component.onSubmit()
    await new Promise((resolve) => setTimeout(resolve, 1100))
    const authService = TestBed.inject(AuthService)
    expect(authService.isAuthenticated()).toBe(true)
  })

  it('should handle login error with invalid credentials', async () => {
    component.signInForm.get('email')?.setValue('wrong@tenant.com')
    component.signInForm.get('password')?.setValue('wrongpassword')
    component.onSubmit()
    await new Promise((resolve) => setTimeout(resolve, 1100))
    expect(component.errorMessage()).toBeTruthy()
  })

  it('should increment failed attempts on error', async () => {
    const email = 'wrong@tenant.com'
    component.signInForm.get('email')?.setValue(email)
    component.signInForm.get('password')?.setValue('wrongpassword')
    component.onSubmit()
    await new Promise((resolve) => setTimeout(resolve, 1100))
    expect(component.errorMessage()).toBeTruthy()
  })

  it('should lock account after 5 failed attempts', async () => {
    const email = 'wrong@tenant.com'
    component.signInForm.get('email')?.setValue(email)
    component.signInForm.get('password')?.setValue('wrongpassword')

    for (let i = 0; i < 5; i++) {
      component.onSubmit()
      await new Promise((resolve) => setTimeout(resolve, 1100))
    }

    expect(component.isAccountLocked()).toBe(true)
    expect(component.errorMessage()).toContain('locked')
  }, 10000)

  it('should not allow submission when account is locked', () => {
    component.isAccountLocked.set(true)
    component.signInForm.get('email')?.setValue('admin@tenant.com')
    component.signInForm.get('password')?.setValue('admin123')
    component.onSubmit()
    expect(component.errorMessage()).toContain('locked')
  })

  it('should display company data', () => {
    expect(component.companyData).toBeDefined()
    expect(component.companyData.name).toBeDefined()
  })
})
