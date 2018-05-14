import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { LoadAction as StocksLoadAction } from '../../store/actions/stocks';
import { mockStocksData } from '../../data/finance-data';

@Component({
  selector: 'app-stock-summary',
  templateUrl: './stock-summary.component.html',
  styleUrls: ['./stock-summary.component.css']
})
export class StockSummaryComponent implements OnInit {
  stockSymbol: string;
  allStocks: any[];
  stock: any;
  constructor(private route: ActivatedRoute,
              private store: Store<AppState>) {
    // get stock symbol, get stocks from store, get stock data
    route.params.subscribe(params => this.stockSymbol = params['stockSymbol']);
    this.store.select('stocks').subscribe( (stocks: any[]) => {
      this.allStocks = [...stocks];
      if (stocks.length > 0) {
        let result = stocks.filter(stock => stock.name === this.stockSymbol)
        this.stock = result[0].quote;
      }
    });
  }

  ngOnInit() {
  }

}
