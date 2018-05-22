import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { filter } from 'rxjs/operators';
import { FundsState } from '../../store/reducers/funds';
import { AddAction as AddFundsAction } from '../../store/actions/funds';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css']
})
export class PortfolioPageComponent implements OnInit {
  funds: number;
  portfolio: any[];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('funds').subscribe((funds: any) => this.funds = funds.totalAmount);
    this.store.select('stocks').subscribe((stocks) => {
      this.portfolio = stocks.filter((stock) => { // randomize portfolio until we add mock data for portfolio
          const randomInt = Math.floor(Math.random() * 2);
          return (randomInt === 1) ? true : false;
      });
    });
  }

  onAddFunds(funds: string) {
    const fundsRegex = new RegExp(/^\d+\.\d{2}$/, 'g'); // 12312392.02
    if (fundsRegex.test(funds) === true) {
      this.store.dispatch(new AddFundsAction(parseFloat(funds)));
    }
  }

  searchPortfolio(searchTerm: string, portfolio: any[]) {
    return portfolio.filter((stock) => { // this should really be an updated value from a data store
                                         // , but we're randomizing "portfolio" for now, so it's okay
                                         // to pass it in as a variable
      const searchRegex = new RegExp(searchTerm, 'i');
      return stock.name.search(searchRegex) >= 0;
    });
  }
}
