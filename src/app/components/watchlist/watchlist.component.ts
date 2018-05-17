import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';

import { AddAction } from '../../store/actions/watchlist';
@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  selectedStock: any;
  allStocks: any[];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('stocks').subscribe((stocks) => {
      this.allStocks = stocks;
    });
  }

  updateSelectedStock(stock: any) {
    this.selectedStock = stock;
  }

  addToWatchlist(stock: any) {
    this.store.dispatch(new AddAction(stock));
  }
}
