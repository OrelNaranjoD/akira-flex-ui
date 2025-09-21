import './test'
import { TestBed } from '@angular/core/testing'
import { Title } from '@angular/platform-browser'
import { PageTitleService } from '../services/page-title.service'

describe('PageTitleService', () => {
  let service: PageTitleService
  let titleSpy: jasmine.SpyObj<Title>

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Title', ['setTitle'])
    TestBed.configureTestingModule({
      providers: [PageTitleService, { provide: Title, useValue: spy }],
    })
    service = TestBed.inject(PageTitleService)
    titleSpy = TestBed.inject(Title) as jasmine.SpyObj<Title>
  })

  it('should set the title for tenant with name and slogan', () => {
    service.setTenantTitle('CompanyX', 'SloganX')
    expect(titleSpy.setTitle).toHaveBeenCalledWith('CompanyX - SloganX')
  })

  it('should prepend the page subtitle if provided', () => {
    service.setTenantTitle('CompanyX', 'SloganX', 'Dashboard')
    expect(titleSpy.setTitle).toHaveBeenCalledWith('Dashboard - CompanyX - SloganX')
  })

  it('should set the title with only the name if no slogan or subtitle', () => {
    service.setTenantTitle('CompanyX')
    expect(titleSpy.setTitle).toHaveBeenCalledWith('CompanyX')
  })

  it('should set the fixed title for landing', () => {
    service.setLandingTitle()
    expect(titleSpy.setTitle).toHaveBeenCalledWith('AkiraFlex - Sistema de Gestión Empresarial')
  })

  it('should set the fixed title for platform', () => {
    service.setPlatformTitle()
    expect(titleSpy.setTitle).toHaveBeenCalledWith('AkiraFlex - Administración')
  })
})
