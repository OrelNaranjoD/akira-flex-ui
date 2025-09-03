import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Footer } from '../../../app/core/components/layout/footer/footer'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

describe('Footer', () => {
  let component: Footer
  let fixture: ComponentFixture<Footer>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer, FontAwesomeModule],
    }).compileComponents()

    fixture = TestBed.createComponent(Footer)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
