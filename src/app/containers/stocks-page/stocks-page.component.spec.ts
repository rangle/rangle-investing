import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { StocksPageComponent } from './stocks-page.component';
import { FormsModule } from '@angular/forms';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { StockListComponent } from '../../components/stock-list/stock-list.component';
import { StockItemComponent } from '../../components/stock-item/stock-item.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';

describe('StocksPageComponent', () => {
  let component: StocksPageComponent;
  let fixture: ComponentFixture<StocksPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StocksPageComponent,
        SearchbarComponent,
        StockListComponent,
        StockItemComponent
      ],
      imports: [
        RouterModule,
        FormsModule,
        StoreModule.forRoot(reducers)
      ]
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
