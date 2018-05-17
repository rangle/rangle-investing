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
  showBuy: boolean;
  tickerSymbol: string;
  stocks: any[]; // stocks store
  portfolio: { transactions: PortfolioTransaction[], stockItems: PortfolioStockItem[] };
  currentHoldings: PortfolioStockItem[];
  stock: any; // current stock
  purchaseCost: number;
  quantity: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private store: Store<AppState>
    ) { }

  private stockExists(stocks: any[], tickerSymbol: string) {
    const stockIndex = stocks.findIndex(stock => stock.name === tickerSymbol.toUpperCase());

    return (stockIndex === -1) ? false : true;
  }

  ngOnInit() {
    this.showBuy = false;
    const subscriptionParams = this.activatedRoute.params.subscribe(params => {
      this.tickerSymbol = params['tickerSymbol'];
      const subscriptionStocks = this.store.select('stocks').subscribe(stocks => {
        this.stocks = stocks;
        this.stock = stocks.find(stock => stock.name === this.tickerSymbol.toUpperCase());
      });
      const subscriptionPortfolio = this.store.select('portfolio').subscribe(portfolio => {
        this.portfolio = portfolio;
        this.currentHoldings = portfolio.stockItems;

        this.purchaseCost = portfolio.stockItems.reduce((prev: number, curr: PortfolioStockItem) => {
          return prev + (curr.pricePerUnitOnPurchaseDate * curr.units);
        }, 0);

        this.quantity = portfolio.stockItems.reduce((prev: number, curr: PortfolioStockItem) => {
          return prev + curr.units;
        }, 0);
      });

      this.subscriptions.push(subscriptionParams, subscriptionPortfolio, subscriptionStocks);

      // guard against direct navigation with spurious param (non-existent symbol)
      if (!this.stockExists(this.stocks, this.tickerSymbol)) {
        this.route.navigate(['']);
      }
    });
  }

  ngOnDestroy() {
      for (const subscription of this.subscriptions) {
        if (subscription) {
          subscription.unsubscribe();
        }
      }
  }

  buy(units: string) {
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

  private enoughStock(id: string, targetUnits: number, stockItems: PortfolioStockItem[], tickerSymbol: string) {
    if (stockItems) {
       const stocksInHolding: PortfolioStockItem = stockItems.find(stockItem => stockItem.id === id);

       return (stocksInHolding && stocksInHolding.units > targetUnits) ? true : false;
    }
  }

  sell(units: string, id: string) {
    if (this.enoughStock(id, parseInt(units, 10), this.portfolio.stockItems, this.tickerSymbol)) {
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
