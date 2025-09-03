import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Menu } from '../../../app/core/components/layout/menu/menu'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

describe('Menu', () => {
  let component: Menu
  let fixture: ComponentFixture<Menu>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu, FontAwesomeModule],
    }).compileComponents()

    fixture = TestBed.createComponent(Menu)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
