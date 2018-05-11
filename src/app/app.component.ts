import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, STOCKS_LOAD } from './store';
import { mockStocksData } from './data/finance-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Best Stocks App';
  stocks: any[];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {

    this.store.dispatch({
      type: STOCKS_LOAD,
      payload: this.mockDataToPayload(mockStocksData),
    });

    this.store
      .select('stocks')
      .subscribe((stocks: any[]) => this.stocks = [...stocks]);
  }

  private mockDataToPayload(data) {
    let result: any[] = [];
    for (let key in data) {
      let val = { ...data[key]};
      val.name = key;
      result.push(val);
    }
    return result;
  }
}
