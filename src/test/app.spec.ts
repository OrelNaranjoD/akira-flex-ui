import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { Layout } from '../app/core/components/layout/layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FontAwesomeService } from '../app/core/services/font-awesome.service';

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

describe('App (Layout bootstrap)', () => {
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

  it('should create the layout', () => {
    expect(component).toBeTruthy();
  });

  it('should render layout with router outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should have header, menu, and footer components', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
    expect(compiled.querySelector('app-menu')).toBeTruthy();
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });

  it('should navigate to home route by default', async () => {
    const homeComponent = await harness.navigateByUrl('/', MockHomeComponent);
    expect(homeComponent).toBeTruthy();
  });
});
