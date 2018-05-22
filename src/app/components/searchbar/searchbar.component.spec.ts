import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarComponent } from './searchbar.component';
import { FormsModule } from '@angular/forms';

describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchbarComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Searchbar Section', () => {
    it('should render searchbar section', async(() => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.searchbar')).toBeTruthy();
    }));
    describe('Searchbar Icon', () => {
      it('should render', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        const searchbarIcon = compiled.querySelector('.searchbar > i');
        expect(searchbarIcon).toBeTruthy();
      }));
      it('should have class fa', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        const searchbarIcon = compiled.querySelector('.searchbar > i');
        expect(searchbarIcon.classList).toContain('fa');
      }));
      it('should have class fa-search', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        const searchbarIcon = compiled.querySelector('.searchbar > i');
        expect(searchbarIcon.classList).toContain('fa-search');
      }));
      it('should have class searchbar-item', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        const searchbarIcon = compiled.querySelector('.searchbar > i');
        expect(searchbarIcon.classList).toContain('searchbar-item');
      }));
    });

    describe('Searchbar Input', () => {
      it('should render', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        const searchbarInput = compiled.querySelector('.searchbar > input');
        expect(searchbarInput).toBeTruthy();
      }));
      it('should have class searchbar-input', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        const searchbarInput = compiled.querySelector('.searchbar > input');
        expect(searchbarInput.classList).toContain('searchbar-input');
      }));
      it('should have class searchbar-item', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        const searchbarInput = compiled.querySelector('.searchbar > input');
        expect(searchbarInput.classList).toContain('searchbar-item');
      }));
    });
  });
});
