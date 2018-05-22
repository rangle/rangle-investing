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
    this.watchlistStocks = result;
  }

  addToWatchlist(stock: any) {
    this.store.dispatch(new AddWatchlistItemAction(stock));
  }

  deleteWatchlistItem(stock: any) {
    this.store.dispatch(new RemoveWatchlistItemAction(stock));
  }

}
