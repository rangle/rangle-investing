import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStocksComponent } from './search-stocks.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';

describe('SearchStocksComponent', () => {
  let component: SearchStocksComponent;
  let fixture: ComponentFixture<SearchStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot(reducers) ],
      declarations: [ SearchStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
