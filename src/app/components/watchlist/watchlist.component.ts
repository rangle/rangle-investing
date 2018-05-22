import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';

import { AddAction } from '../../store/actions/watchlist';
@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  @Output() addToWatchlist = new EventEmitter<string>();
  @Input() stocks: any[];
  @Input() watchlistStocks: any[];

  selectedStock: any;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  updateSelectedStock(stock: any) {
    this.selectedStock = stock;
  }

  addToWatchlistEmitter(stock: any) {
    this.addToWatchlist.emit(stock);
  }
}
