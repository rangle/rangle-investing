import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { LoadAction as StocksLoadAction } from '../../store/actions/stocks';
import { mockStocksData } from '../../data/finance-data';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit{
  title = 'Best Stocks App';
  stocks: any[];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {

    this.store.dispatch(new StocksLoadAction(this.mockDataToPayload(mockStocksData)));

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
