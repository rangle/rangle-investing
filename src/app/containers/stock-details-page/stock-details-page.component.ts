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
  buyErrorMsg = 'Please enter a whole number, e.g. 10000.';
  showBuyError = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private store: Store<AppState>
    ) { }

  /**
   *  @param {string} tickerSymbol
   *  @description See if stock exists in stocks array.
   */
  private stockExists(tickerSymbol: string): Boolean {
    const stockIndex = this.stocks.findIndex(stock => stock.name === tickerSymbol.toUpperCase());

    return (stockIndex === -1) ? false : true;
  }

  /**
   *  @description Set up tickerSymbol (router param), stocks, stock, portfolio, currentHoldings, purchaseCost, quantity class variables.
   */
  ngOnInit() {
    const subscriptionParams = this.activatedRoute.params.subscribe(params => {
      this.tickerSymbol = params['tickerSymbol'];

      // prevent direct navigation with non existent symbol
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

        this.purchaseCost = portfolio.stockItems.reduce((total: number, curr: PortfolioStockItem) => {
          return total + (curr.pricePerUnitOnPurchaseDate * curr.units);
        }, 0);
        this.quantity = portfolio.stockItems.reduce((total: number, curr: PortfolioStockItem) => total + curr.units, 0);
      });

      this.subscriptions.push(subscriptionPortfolio, subscriptionStocks);
    });

    this.subscriptions.push(subscriptionParams);
  }

  /**
   *  @description Unsubscribe to subscriptions.
   */
  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      if (subscription) {
        subscription.unsubscribe();
      }
    }
  }

  /**
   *  @param {string} units Number of units of stock user wants to buy.
   *  @description If purchase units is an integer, dispatch buy action. Otherwise shows error message (invalid input).
   */
  buy(units: string): void {
    const iUnits = parseInt(units, 10);
    const upperTickerSymbol = this.tickerSymbol.toUpperCase();

    if (Number.isFinite(iUnits)) {
      this.showBuyError = false;
      const currentStockData = this.stocks.find(stock => stock.name === upperTickerSymbol);

      if (currentStockData && currentStockData.quote) {
        const stock = {
          symbol: upperTickerSymbol,
          units: iUnits,
          pricePerUnit: currentStockData.quote.latestPrice
        };

        this.store.dispatch(new BuyAction(stock));
      }
    } else {
      this.showBuyError = true;
    }
  }

  /**
   @param {string} id This is the id field in the PortfolioStockItem interface. Identifies stock transaction.
   @param {number} targetUnits Number of units of stock user wants to sell.
   @param {string} tickerSymbol
   @description Checks if user has enough units of stock to sell. This only checks for stocks under the provided id,
   which means that other transactions made for the same stock will be ignored.
   */
  private enoughStock(id: string, targetUnits: number, tickerSymbol: string): Boolean {
    if (this.portfolio.stockItems) {
       const stocksInHolding: PortfolioStockItem = this.portfolio.stockItems.find(stockItem => stockItem.id === id);

       return (stocksInHolding && stocksInHolding.units >= targetUnits) ? true : false;
    }
    return false;
  }

  /**
  @param {string} units Number of units of stock user wants to sell.
  @param {string} id This is the id field in the PortfolioStockItem interface. Identifies stock transaction.
  @description Checks that units is valid and user holds enough of that stock, and dispatches sell action.
   */
  sell(units: string, id: string): void {
    const iUnits = parseInt(units, 10);
    const upperTickerSymbol = this.tickerSymbol.toUpperCase();

    if (Number.isFinite(iUnits) && this.enoughStock(id, iUnits, this.tickerSymbol)) {
      const stock: PortfolioPayload = {
        stockId: id,
        symbol: upperTickerSymbol,
        units: iUnits,
        pricePerUnit: this.stocks.find(currentStock => currentStock.name === upperTickerSymbol).latestPrice
      };

      this.store.dispatch(new SellAction(stock));
    }
  }
}
