import { TestBed } from '@angular/core/testing';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FontAwesomeService } from '../../app/core/services/font-awesome.service';

describe('FontAwesomeService', () => {
  let service: FontAwesomeService;
  let librarySpy: jasmine.SpyObj<FaIconLibrary>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj<FaIconLibrary>('FaIconLibrary', ['addIcons']);

    TestBed.configureTestingModule({
      providers: [FontAwesomeService, { provide: FaIconLibrary, useValue: spy }],
    });

    service = TestBed.inject(FontAwesomeService);
    librarySpy = TestBed.inject(FaIconLibrary) as jasmine.SpyObj<FaIconLibrary>;
  });

  it('should be created and register icons', () => {
    expect(service).toBeTruthy();
    expect(librarySpy.addIcons).toHaveBeenCalled();
    expect(librarySpy.addIcons.calls.count()).toBeGreaterThanOrEqual(1);
  });
});
