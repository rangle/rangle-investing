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

  describe('onSearch method', () => {
    it('should exist', () => {
      expect(component.onSearch).toEqual(jasmine.any(Function));
    });
    it('should accept one argument', () => {
      expect(component.onSearch.length).toEqual(1);
    });
    it('should set value of searchQuery to that of incoming argument', () => {
      component.onSearch('test');
      expect(component.searchQuery).toEqual('test');
    });
  });
  describe('matchStockSymbol method', () => {
    it('should exist', () => {
      expect(component.onSearch).toEqual(jasmine.any(Function));
    });
    it('should accept one argument', () => {
      expect(component.onSearch.length).toEqual(1);
    });
    describe('Return value', () => {
      it('should be a function', () => {
        const result = component.matchStockSymbol('test');
        expect(result).toEqual(jasmine.any(Function));
      });
      it('should accept one argument', () => {
        const result = component.matchStockSymbol('test');
        expect(result.length).toEqual(1);
      });
      it('should return true when query string matches', () => {
        const result = component.matchStockSymbol('a');
        expect(result({ name: 'AAPL'})).toEqual(true);
      });
      it('should return false when query string does not match', () => {
        const result = component.matchStockSymbol('t');
        expect(result({ name: 'AAPL'})).toEqual(false);
      });
    });
  });
});
