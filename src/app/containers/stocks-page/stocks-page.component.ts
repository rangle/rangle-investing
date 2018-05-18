import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-stocks-page',
  templateUrl: './stocks-page.component.html',
  styleUrls: ['./stocks-page.component.css']
})
export class StocksPageComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  onSearch(query) {
  }
}
