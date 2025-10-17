import '../test'
import { TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { vi } from 'vitest'
import { AuthService } from '@core'
import { adminGuard } from '../../app/guards/admin.guard'

describe('adminGuard', () => {
  let mockAuthService: {
    isAuthenticated: ReturnType<typeof vi.fn>
    currentUser: ReturnType<typeof vi.fn>
  }
  let mockRouter: { navigate: ReturnType<typeof vi.fn> }

  beforeEach(() => {
    mockAuthService = {
      isAuthenticated: vi.fn(),
      currentUser: vi.fn(),
    }
    mockRouter = {
      navigate: vi.fn(),
    }

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    })
  })

  it('should allow access for authenticated admin users', () => {
    mockAuthService.isAuthenticated.mockReturnValue(true)
    mockAuthService.currentUser.mockReturnValue({
      id: '1',
      email: 'user@akiraflex.cl',
      firstName: 'Admin',
      lastName: 'User',
      roles: ['admin'],
    })

    const result = TestBed.runInInjectionContext(() => adminGuard({} as never, {} as never))

    expect(result).toBe(true)
    expect(mockRouter.navigate).not.toHaveBeenCalled()
  })

  it('should redirect to sign-in if user is not authenticated', () => {
    mockAuthService.isAuthenticated.mockReturnValue(false)
    mockAuthService.currentUser.mockReturnValue(null)

    const result = TestBed.runInInjectionContext(() => adminGuard({} as never, {} as never))

    expect(result).toBe(false)
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/sign-in'])
  })

  it('should redirect to sign-in if user does not have admin role', () => {
    mockAuthService.isAuthenticated.mockReturnValue(true)
    mockAuthService.currentUser.mockReturnValue({
      id: '1',
      email: 'user@system.com',
      firstName: 'Regular',
      lastName: 'User',
      roles: ['user'],
    })

    const result = TestBed.runInInjectionContext(() => adminGuard({} as never, {} as never))

    expect(result).toBe(false)
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/sign-in'])
  })

  it('should redirect to sign-in if current user is null', () => {
    mockAuthService.isAuthenticated.mockReturnValue(true)
    mockAuthService.currentUser.mockReturnValue(null)

    const result = TestBed.runInInjectionContext(() => adminGuard({} as never, {} as never))

    expect(result).toBe(false)
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/sign-in'])
  })
})
