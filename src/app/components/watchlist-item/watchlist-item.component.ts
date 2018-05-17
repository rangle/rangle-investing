import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';

import { RemoveAction } from '../../store/actions/watchlist';

@Component({
  selector: 'app-watchlist-item',
  templateUrl: './watchlist-item.component.html',
  styleUrls: ['./watchlist-item.component.css']
})
export class WatchlistItemComponent implements OnInit {
  @Input() stocks: any[];
  @Input() deleteWatchlistItem: Function;
  @Input() watchlistStocks: any[];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }
}

