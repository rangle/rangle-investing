import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';

@Component({
  selector: 'app-add-funds',
  templateUrl: './add-funds.component.html',
  styleUrls: ['./add-funds.component.css']
})
export class AddFundsComponent implements OnInit {
  @Input() addFunds: Function;
  @Input() funds;
  showAddFunds;

  constructor(private store: Store<AppState>) { } // store injected for addFunds

  ngOnInit() {
    this.showAddFunds = false;
  }
}
