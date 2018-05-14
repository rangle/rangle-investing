import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movers-shakers',
  templateUrl: './movers-shakers.component.html',
  styleUrls: ['./movers-shakers.component.css']
})
export class MoversShakersComponent implements OnInit {
	mockMoversShakers = [ 
		{
			stockSymbol: "AAPL",
			inWatchlist: false,
			currency: "USD",
			stockPrice: 189.26,
			stockPriceChange: 0.67,
		}
	];

  constructor() { }

  ngOnInit() {
  }

}
