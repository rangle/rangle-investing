import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { Observable } from 'rxjs/Observable';

import { AddAction as AddWatchlistItemAction } from '../../store/actions/watchlist';
import { RemoveAction as RemoveWatchlistItemAction } from '../../store/actions/watchlist';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  stocks: any[];
  watchlistStocks: any[];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('stocks').subscribe((stocks) => {
      this.stocks = stocks;
    });
    this.store.select('watchlist').subscribe((watchlistStocks) => {
      this.updateWatchlist(watchlistStocks);
    });
  }

  updateWatchlist(watchlistStocks: any[]) {
    const result = this.stocks.filter(stock => watchlistStocks.includes(stock.name));

      if (result.length) {
        this.watchlistStocks = result.map(((stock: any) => {
          const subsetOfStock = {
            name: stock.name,
            percent: stock.quote.change,
            latestPrice: stock.quote.latestPrice
          };
          return subsetOfStock;
        }));
      } else {
        this.watchlistStocks = result;
      }
  }

  addToWatchlist(stock: any, store: Store<AppState>) {
    store.dispatch(new AddWatchlistItemAction(stock));
  }

  deleteWatchlistItem(stock: any, store: Store<AppState>) {
    store.dispatch(new RemoveWatchlistItemAction(stock));
  }

}
