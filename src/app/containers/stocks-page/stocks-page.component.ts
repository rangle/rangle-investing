import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-stocks-page',
  templateUrl: './stocks-page.component.html',
  styleUrls: ['./stocks-page.component.css']
})
export class StocksPageComponent implements OnInit {
  stocks$: Observable<any[]>;
  searchStocks: any[];
  searchQuery = '';
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.stocks$ = this.store.select('stocks');
  }

  onSearch(query: string) {
    this.searchQuery = query;
    if (query !== '') {
      this.stocks$.subscribe(stocks => {
        this.searchStocks = stocks.filter(stock => stock.name.search(new RegExp(query, 'i')) >= 0);
      });
    }
  }
}
