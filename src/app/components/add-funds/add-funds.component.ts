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
  fundsAmountString = '';
  showErrorMsg = false;
  errorMsg = '';

  private fundsStringValid(funds: string) {
    const fundsRegex = new RegExp(/^\d+\.\d{2}$/, 'g'); // 12312392.02
    return fundsRegex.test(funds);
  }

  addFundsHandler() {
    if (!this.fundsStringValid(this.fundsAmountString)) {
      this.showErrorMsg = true;
      this.errorMsg = 'The string must be a positive number, followed by two decimals, e.g. 1000.00';
    } else {
      this.showErrorMsg = false;
      this.errorMsg = '';
      this.addFunds.emit(this.fundsAmountString);
    }
  }
}
