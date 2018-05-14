import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent implements OnInit {
	@Input() stockSymbol: string;
	@Input() inWatchlist: boolean;
	@Input() currency: string;
	@Input() stockPrice: number;
	@Input() stockPriceChange: number;

  constructor() { }

  ngOnInit() {
  }

}
