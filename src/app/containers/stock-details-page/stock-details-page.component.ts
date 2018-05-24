import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { map } from 'rxjs/operators/map';
import { AppState } from '../../store';
import { BuyAction, SellAction, PortfolioPayload } from '../../store/actions/portfolio';
import { PortfolioTransaction, PortfolioStockItem } from '../../store/reducers/portfolio';

@Component({
  selector: 'app-stock-details-page',
  templateUrl: './stock-details-page.component.html',
  styleUrls: ['./stock-details-page.component.css']
})
export class StockDetailsPageComponent implements OnInit, OnDestroy {
  @ViewChild('purchaseUnits') buyInput: ElementRef;
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
   *  @param {string} upperTickerSymbol This component's ticker symbol in upper case (retrieved from router params).
   *  @description Check if stock name matches the ticker symbol (upper case). Called 'isThisStock' because we want to
   check if the provided stock matches the tickerSymbol of the component.
   *  @return {Function} Function signature of callback in Array.prototype.find(callback) / Array.prototype.findIndex(callback).
   */
  isThisStock(upperTickerSymbol: string) {
    return stock => stock.name === upperTickerSymbol;
  }

  /**
   *  @param {string} tickerSymbol
   *  @description See if stock exists in stocks array.
   */
  stockExists(tickerSymbol: string): Boolean {
    if (tickerSymbol) {
      const upperTickerSymbol = tickerSymbol.toUpperCase();
      const stockIndex = this.stocks.findIndex(this.isThisStock(upperTickerSymbol));

      return (stockIndex === -1) ? false : true;
    }

    return false;
  }

  /**
   *  @description Set up tickerSymbol (router param), stocks, stock, portfolio, currentHoldings, purchaseCost, quantity class variables.
   */
  ngOnInit() {
    const subscriptionParams = this.activatedRoute.params.subscribe(params => {
      this.tickerSymbol = params['tickerSymbol'];
      const upperTickerSymbol = this.tickerSymbol.toUpperCase();

      const subscriptionStocks = this.store.select('stocks').subscribe(stocks => {
        this.stocks = stocks;
        this.stock = stocks.find(this.isThisStock(upperTickerSymbol));

        // prevent direct navigation with non existent symbol
        if (!this.stockExists(this.tickerSymbol)) {
          this.route.navigate(['']); // placed in subscription block because stocks needs to be populated
        }
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

    const subscriptionBuyForm = this.buyInputValidator();

    this.subscriptions.push(subscriptionParams, subscriptionBuyForm);
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
   *  @description Prevents user from entering non-digit input. (Things like punctuation, letters are deleted from input.)
   */
  buyInputValidator(): Subscription {
    const emitter = fromEvent(this.buyInput.nativeElement, 'input').pipe(map(value => value));
    const subscriber = emitter.subscribe(event => {
      const oneDigitRegex = new RegExp(/^\d{1}$/);
      if (!oneDigitRegex.test((event as any).data)) {
        const currVal = this.buyInput.nativeElement.value;
        this.buyInput.nativeElement.value = currVal.slice(0, -1);
      }
    });

    return subscriber;
  }

  isInteger(input: string) {
    const intRegex = new RegExp(/^\d+$/);
    return intRegex.test(input);
  }

  /**
   *  @param {string} units Number of units of stock user wants to buy.
   *  @description If purchase units is an integer, dispatch buy action. Otherwise shows error message (invalid input).
   */
  buy(units: string): void {
    if (!this.isInteger(units)) { // if input has a decimal, this catches it
      return;
    }
    const iUnits = parseInt(units, 10);
    const upperTickerSymbol = this.tickerSymbol.toUpperCase();

    if (Number.isFinite(iUnits)) {
      this.showBuyError = false;
      const currentStockData = this.stocks.find(this.isThisStock(upperTickerSymbol));

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
  enoughStock(id: string, targetUnits: number): Boolean {
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
    if (!this.isInteger(units)) { // if input has a decimal, this catches it
      return;
    }
    const iUnits = parseInt(units, 10);
    const upperTickerSymbol = this.tickerSymbol.toUpperCase();

    if (Number.isFinite(iUnits) && this.enoughStock(id, iUnits)) {
      const stock: PortfolioPayload = {
        stockId: id,
        symbol: upperTickerSymbol,
        units: iUnits,
        pricePerUnit: this.stocks.find(this.isThisStock(upperTickerSymbol)).latestPrice
      };

      this.store.dispatch(new SellAction(stock));
    }
  }
}
