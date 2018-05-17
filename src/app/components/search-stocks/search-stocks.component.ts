import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-stocks',
  templateUrl: './search-stocks.component.html',
  styleUrls: ['./search-stocks.component.css']
})
export class SearchStocksComponent implements OnInit {
  @Input() searchPortfolio: Function;
  @Input() portfolio; // for the searchPortfolio function
  filteredPortfolio;

  constructor() { }

  ngOnInit() {
    this.filteredPortfolio = this.portfolio; // populate search results initially
  }
}
