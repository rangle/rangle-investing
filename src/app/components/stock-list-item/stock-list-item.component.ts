import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-stock-list-item',
  templateUrl: './stock-list-item.component.html',
  styleUrls: ['./stock-list-item.component.css']
})
export class StockListItemComponent implements OnInit {
  @Input() stock: any;
  constructor() { }

  ngOnInit() {}

}
