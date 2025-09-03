import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from '../../../app/core/components/layout/header/header';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header, FontAwesomeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
