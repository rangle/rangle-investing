import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksPageComponent } from './stocks-page.component';
import { FormsModule } from '@angular/forms';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';

describe('StocksPageComponent', () => {
  let component: StocksPageComponent;
  let fixture: ComponentFixture<StocksPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StocksPageComponent,
        SearchbarComponent
      ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
