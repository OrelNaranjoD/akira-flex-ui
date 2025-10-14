import './test'
import { TestBed } from '@angular/core/testing'
import { Title } from '@angular/platform-browser'
import { vi } from 'vitest'
import { PageTitleService } from '../lib/services/page-title'

/**
 * Unit tests for PageTitleService.
 */
describe('PageTitleService', () => {
  let service: PageTitleService
  let titleMock: { setTitle: ReturnType<typeof vi.fn> }

  beforeEach(() => {
    titleMock = {
      setTitle: vi.fn(),
    }
    TestBed.configureTestingModule({
      providers: [PageTitleService, { provide: Title, useValue: titleMock }],
    })
    service = TestBed.inject(PageTitleService)
  })

  it('should set the title for tenant with name and slogan', () => {
    service.setTenantTitle('CompanyX', 'SloganX')
    expect(titleMock.setTitle).toHaveBeenCalledWith('CompanyX - SloganX')
  })

  it('should prepend the page subtitle if provided', () => {
    service.setTenantTitle('CompanyX', 'SloganX', 'Dashboard')
    expect(titleMock.setTitle).toHaveBeenCalledWith('Dashboard - CompanyX - SloganX')
  })

  it('should set the title with only the name if no slogan or subtitle', () => {
    service.setTenantTitle('CompanyX')
    expect(titleMock.setTitle).toHaveBeenCalledWith('CompanyX')
  })

  it('should set the fixed title for landing', () => {
    service.setLandingTitle()
    expect(titleMock.setTitle).toHaveBeenCalledWith('AkiraFlex - Sistema de Gestión Empresarial')
  })

  it('should set the fixed title for platform', () => {
    service.setPlatformTitle()
    expect(titleMock.setTitle).toHaveBeenCalledWith('AkiraFlex - Administración')
  })
})
