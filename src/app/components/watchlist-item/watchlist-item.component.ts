import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';

@Component({
  selector: 'app-watchlist-item',
  templateUrl: './watchlist-item.component.html',
  styleUrls: ['./watchlist-item.component.css']
})
export class WatchlistItemComponent implements OnInit {
  watchlistStocks: any[];
  allStocks: any[];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.watchlistStocks = [];
    this.store.select('stocks').subscribe((stocks) => {
      this.allStocks = stocks;
    });

    this.store.select('watchlist').subscribe((watchlistStock) => {
      const result = this.allStocks.filter(stock => watchlistStock.includes(stock.name));

      if (result.length) {
        this.watchlistStocks = (result.map(((stock: any) => {
          const subsetOfStock = {
            name: stock.name,
            percent: stock.quote.change,
            latestPrice: stock.quote.latestPrice
          };
          return subsetOfStock;
        })));
      }
    });
  }

}

