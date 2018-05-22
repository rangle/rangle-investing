import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';

@Component({
  selector: 'app-add-funds',
  templateUrl: './add-funds.component.html',
  styleUrls: ['./add-funds.component.css']
})
export class AddFundsComponent {
  @Input() funds;
  @Output() addFunds = new EventEmitter<string>();
  showAddFunds = false;

  addFundsHandler(amount: string) {
    this.addFunds.emit(amount);
  }
}
