import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page.component';
import { NavbarItemComponent } from '../../components/navbar-item/navbar-item.component';
import { StockListItemComponent } from '../../components/stock-list-item/stock-list-item.component';
import { StockListComponent } from '../../components/stock-list/stock-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';
import { WatchlistButtonComponent } from '../../components/watchlist-button/watchlist-button.component';
import { WatchlistService } from '../../services/watchlist.service';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        StoreModule.forRoot(reducers)
      ],
      declarations: [
        HomePageComponent,
        StockListComponent,
        StockListItemComponent,
        WatchlistButtonComponent,
      ],
      providers: [ WatchlistService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('updateWatchlist method', () => {
    it('should exist', () => {
      expect(component.updateWatchlist).toEqual(jasmine.any(Function));
    });

    it('should accept only one argument', () => {
      expect(component.updateWatchlist.length).toEqual(1);
    });

    it('should return a list of stocks that are included in the watchlist', () => {
      component.stocks = [
        {
          name: 'AAPL',
          quote: {
            symbol: 'symbol',
            price: 123,
            percent: '12%'
          }
        },
        {
          name: 'FB',
          quote: {
            symbol: 'symbol',
            price: 123,
            percent: '12%'
          }
        }
      ];

      const result = component.updateWatchlist(['AAPL']);

      expect(result.length).toEqual(1);
      expect(result).toEqual([{
        name: 'AAPL',
        quote: {
          symbol: 'symbol',
          price: 123,
          percent: '12%'
        }
      }]);
    });
  });
});
