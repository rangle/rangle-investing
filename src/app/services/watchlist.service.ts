import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { AddAction, RemoveAction } from '../store/actions/watchlist';

@Injectable()
export class WatchlistService {
  watchlist: string[] = [];

  constructor(private store: Store<AppState>) {
    this.store.select('watchlist')
      .subscribe(watchlist => this.watchlist = watchlist);
  }

  inWatchlist(symbol: string) {
    return this.watchlist.includes(symbol);
  }

  add(symbol) {
    this.store.dispatch(new AddAction(symbol));
  }

  remove(symbol) {
    this.store.dispatch(new RemoveAction(symbol));
  }

}
