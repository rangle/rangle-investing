import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
	mockSearchResults = [
		{
			stockSymbol: "AAPL",
			inWatchlist: false,
			currency: "USD",
			stockPrice: 189.26,
			stockPriceChange: 0.67,
		},
		{
			stockSymbol: "MSFT",
			inWatchlist: false,
			currency: "USD",
			stockPrice: 98.23,
			stockPriceChange: 0.56,
		}
	];
	searchResultsCount = this.mockSearchResults.length;
	
  constructor() { }

  ngOnInit() {
  }

}
