import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../store';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { FundsState } from '../../store/reducers/funds';
import { AddAction as AddFundsAction } from '../../store/actions/funds';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  funds: number;
  portfolio: any[]; // create a copy of the original instead of subscribing every time
                    // because data is static for now
  filteredPortfolio: any[];
  showAddFunds = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('funds').subscribe((funds: any) => this.funds = funds.totalAmount);
    this.store.select('stocks').subscribe((stocks) => {
      // randomize portfolio until we add mock data for portfolio
      this.portfolio = stocks.filter((stock) => {
          const randomInt = Math.floor(Math.random() * 2);
          return (randomInt === 1) ? true : false;
      });

      this.filteredPortfolio = this.portfolio;
    });
  }

  addFunds(funds: string) {
    const fundsRegex = new RegExp(/^\d+\.\d{2}$/, 'g'); // 12312392.02
    if (fundsRegex.test(funds) === true) {
      this.store.dispatch(new AddFundsAction(parseInt(funds, 10)));
    }
  }

  searchPortfolio(searchTerm: string) {
    this.filteredPortfolio = this.portfolio.filter((stock) => {
      const searchRegex = new RegExp(searchTerm, 'i');
      return stock.name.search(searchRegex) >= 0;
    });
  }
}
