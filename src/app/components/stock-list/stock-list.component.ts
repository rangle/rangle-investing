import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { Observable } from 'rxjs/Observable';

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
    this.store.select('stocks').subscribe((stocks: any[]) => this.stocks = [...stocks]);
  }
}
