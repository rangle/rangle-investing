import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { filter } from 'rxjs/operators';
import { FundsState } from '../../store/reducers/funds';
import { AddAction as AddFundsAction } from '../../store/actions/funds';
import { PortfolioState, PortfolioTransaction } from '../../store/reducers/portfolio';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css']
})
export class PortfolioPageComponent implements OnInit {
  funds: number;
  portfolio: any[];
  transactions: any[];
  filteredStocks;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('funds').subscribe((funds: any) => this.funds = funds.totalAmount);
    this.store.select('portfolio').subscribe((portfolio) => {
      this.transactions = portfolio.transactions;
      this.filteredStocks = portfolio.transactions;
    });
  }

  onSearch(searchString: string) {
    this.filteredStocks = this.transactions.filter((transaction: PortfolioTransaction) => {
        const searchRegex = new RegExp(searchString, 'i');
        return transaction.symbol.search(searchRegex) >= 0;
    });
  }

  onAddFunds(funds: string) {
      this.store.dispatch(new AddFundsAction(parseFloat(funds)));
  }
}
