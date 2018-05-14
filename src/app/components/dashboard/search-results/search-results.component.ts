import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input() searchInput: string;
  mockSearchResults = [];
  searchResultsCount = this.mockSearchResults.length;
  showSearchResults = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  searchStocks(searchString: string) {
    if (searchString !== '') {
      this.store.select('stocks').subscribe((stocks: any[]) => {
        const searchRegex = new RegExp(searchString, 'i');
        this.mockSearchResults = stocks.filter(stock => stock.name.search(searchRegex) >= 0);
        this.searchResultsCount = this.mockSearchResults.length;

        this.showSearchResults = (this.searchResultsCount > 0) ? true : false;
      });
    } else {
      this.showSearchResults = false;
    }
  }
}
