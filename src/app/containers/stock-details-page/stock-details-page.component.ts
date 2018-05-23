import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { BuyAction, SellAction, PortfolioPayload } from '../../store/actions/portfolio';
import { PortfolioTransaction, PortfolioStockItem } from '../../store/reducers/portfolio';

@Component({
  selector: 'app-stock-details-page',
  templateUrl: './stock-details-page.component.html',
  styleUrls: ['./stock-details-page.component.css']
})
export class StockDetailsPageComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  tickerSymbol: string;
  stock: any; // current stock
  stocks: any[] = []; // stocks store
  portfolio: { transactions: PortfolioTransaction[], stockItems: PortfolioStockItem[] };
  currentHoldings: PortfolioStockItem[];
  purchaseCost: number;
  quantity: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private store: Store<AppState>
    ) { }

  private stockExists(tickerSymbol: string) {
    const stockIndex = this.stocks.findIndex(stock => stock.name === tickerSymbol.toUpperCase());

    return (stockIndex === -1) ? false : true;
  }

  ngOnInit() {
    const subscriptionParams = this.activatedRoute.params.subscribe(params => {
      this.tickerSymbol = params['tickerSymbol'];

      // guard against direct navigation with spurious param (non-existent symbol)
      if (!this.stockExists(this.tickerSymbol)) {
        this.route.navigate(['']);
      }

      const subscriptionStocks = this.store.select('stocks').subscribe(stocks => {
        this.stocks = stocks;
        this.stock = stocks.find(stock => stock.name === this.tickerSymbol.toUpperCase());
      });

      const subscriptionPortfolio = this.store.select('portfolio').subscribe(portfolio => {
        this.portfolio = portfolio;
        this.currentHoldings = portfolio.stockItems;

        this.purchaseCost = portfolio.stockItems.reduce((total: number, curr: PortfolioStockItem) => total + (curr.pricePerUnitOnPurchaseDate * curr.units), 0);
        this.quantity = portfolio.stockItems.reduce((total: number, curr: PortfolioStockItem) => total + curr.units, 0);
      });

      this.subscriptions.push(subscriptionPortfolio, subscriptionStocks);
    });

    this.subscriptions.push(subscriptionParams);
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      if (subscription) {
        subscription.unsubscribe();
      }
    }
  }

  private isNumber(input: string) {
    const numberRegex = new RegExp(/^\d+$/, 'g');
    return numberRegex.test(input);
  }

  buy(units: string) {
    if (this.isNumber(units)) {
      const currentStockData = this.stocks.find(stock => stock.name === this.tickerSymbol.toUpperCase());

      if (currentStockData && currentStockData.quote) {
        const stock = {
          symbol: this.tickerSymbol.toUpperCase(),
          units: parseInt(units, 10),
          pricePerUnit: currentStockData.quote.latestPrice
        };

        this.store.dispatch(new BuyAction(stock));
      }
    }
  }

  private enoughStock(id: string, targetUnits: number, tickerSymbol: string) {
    if (this.portfolio.stockItems) {
       const stocksInHolding: PortfolioStockItem = this.portfolio.stockItems.find(stockItem => stockItem.id === id);

       return (stocksInHolding && stocksInHolding.units >= targetUnits) ? true : false;
    }
  }

  sell(units: string, id: string) {
    if (this.isNumber(units) && this.enoughStock(id, parseInt(units, 10), this.tickerSymbol)) {
      const stock: PortfolioPayload = {
        stockId: id,
        symbol: this.tickerSymbol.toUpperCase(),
        units: parseInt(units, 10),
        pricePerUnit: this.stocks.find(currentStock => currentStock.name === this.tickerSymbol.toUpperCase()).latestPrice
      };

      this.store.dispatch(new SellAction(stock));
    }
  }
}
