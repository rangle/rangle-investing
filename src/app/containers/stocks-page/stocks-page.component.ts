import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';
import { AddAction as WatchlistAddAction, RemoveAction as WatchlistRemoveAction } from '../../store/actions/watchlist';

@Component({
  selector: 'app-stocks-page',
  templateUrl: './stocks-page.component.html',
  styleUrls: ['./stocks-page.component.css']
})
export class StocksPageComponent implements OnInit {
  stocks$: Observable<any[]>;
  searchStocks: any[];
  searchQuery = '';
  watchlist: string[] = [];
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.stocks$ = this.store.select('stocks');
    this.store.select('watchlist')
      .subscribe(this.setWatchlist);
  }

  setWatchlist = watchlist => this.watchlist = watchlist;

  onSearch(query: string) {
    this.searchQuery = query;
    if (query !== '') {
      this.stocks$.subscribe(stocks => {
        this.searchStocks = stocks.filter(stock => stock.name.search(new RegExp(query, 'i')) >= 0);
      });
    }
  }

  onAddToWatchList(symbol: string) {
    this.store.dispatch(new WatchlistAddAction(symbol));
  }

  onRemoveFromWatchlist(symbol: string) {
    this.store.dispatch(new WatchlistRemoveAction(symbol));
  }

  inWatchlist = (symbol: string) => this.watchlist.includes(symbol);
}
