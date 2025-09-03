import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { Layout } from '../../../app/core/components/layout/layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FontAwesomeService } from '../../../app/core/services/font-awesome.service';

// Mock components para las rutas de test
@Component({
  selector: 'app-mock-home',
  template: '<div>Mock Home Page</div>',
})
class MockHomeComponent {}

@Component({
  selector: 'app-mock-dashboard',
  template: '<div>Mock Dashboard Page</div>',
})
class MockDashboardComponent {}

describe('Layout', () => {
  let component: Layout;
  let fixture: ComponentFixture<Layout>;
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    const fontAwesomeSpy = jasmine.createSpyObj('FontAwesomeService', ['initializeIcons']);

    await TestBed.configureTestingModule({
      imports: [Layout, FontAwesomeModule],
      providers: [
        { provide: FontAwesomeService, useValue: fontAwesomeSpy },
        provideRouter([
          { path: '', component: MockHomeComponent },
          { path: 'dashboard', component: MockDashboardComponent },
          { path: '**', redirectTo: '' },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Layout);
    component = fixture.componentInstance;
    harness = await RouterTestingHarness.create();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render layout with router outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should have header component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
  });

  it('should have menu component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-menu')).toBeTruthy();
  });

  it('should have footer component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });

  it('should navigate to different routes', async () => {
    const homeComponent = await harness.navigateByUrl('/', MockHomeComponent);
    expect(homeComponent).toBeTruthy();

    const dashboardComponent = await harness.navigateByUrl('/dashboard', MockDashboardComponent);
    expect(dashboardComponent).toBeTruthy();
  });
});
