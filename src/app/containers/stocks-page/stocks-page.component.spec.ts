import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { StocksPageComponent } from './stocks-page.component';
import { FormsModule } from '@angular/forms';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { StockListComponent } from '../../components/stock-list/stock-list.component';
import { StockListItemComponent } from '../../components/stock-list-item/stock-list-item.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';
import { WatchlistButtonComponent } from '../../components/watchlist-button/watchlist-button.component';
import { WatchlistService } from '../../services/watchlist.service';

describe('StocksPageComponent', () => {
  let component: StocksPageComponent;
  let fixture: ComponentFixture<StocksPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StocksPageComponent,
        SearchbarComponent,
        StockListComponent,
        StockListItemComponent,
        WatchlistButtonComponent
      ],
      providers: [ WatchlistService ],
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
