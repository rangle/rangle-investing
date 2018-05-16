import { Action } from '@ngrx/store';
import * as portfolio from '../actions/portfolio';
import uuid from '../../lib/uuid';

export enum PortfolioTransactionTypes {
  Buy,
  Sell
}

export interface PortfolioTransaction {
  date: number;
  stockId: string;
  symbol: string;
  units: number;
  amount: number;
  pricePerUnit: number;
  type: PortfolioTransactionTypes;
}

export interface PortfolioStockItem {
  id: string;
  purchasedOn: number;
  symbol: string;
  units: number;
  pricePerUnitOnPurchaseDate: number;
}

export interface PortfolioState {
  transactions: PortfolioTransaction[];
  stockItems: PortfolioStockItem[];
}

const DEFAULT_STATE: PortfolioState = {
  transactions: [],
  stockItems: [],
};

const createTransaction = (
  {
    stockId,
    symbol,
    units,
    pricePerUnit
  }: portfolio.PortfolioPayload,
  type: PortfolioTransactionTypes
): PortfolioTransaction => ({
  date: Date.now(),
  stockId,
  symbol,
  units,
  pricePerUnit,
  amount: units * pricePerUnit,
  type
} as PortfolioTransaction);

export function reducer(
  state: PortfolioState = DEFAULT_STATE,
  action: portfolio.Actions
): PortfolioState {
  let stockId;
  switch (action.type) {
    case portfolio.BUY:
      const { symbol, units, pricePerUnit } = action.payload;
      stockId = uuid();
      return {
        transactions: [
          ...state.transactions,
          createTransaction({...action.payload, stockId}, PortfolioTransactionTypes.Buy),
        ],
        stockItems: [
          ...state.stockItems,
          {
            id: stockId,
            purchasedOn: Date.now(),
            symbol,
            units,
            pricePerUnitOnPurchaseDate: pricePerUnit,
          } as PortfolioStockItem
        ],
      };
    case portfolio.SELL:
      return {
        transactions: [
          ...state.transactions,
          createTransaction(action.payload, PortfolioTransactionTypes.Sell),
        ],
        stockItems: state.stockItems.map(stockItem => {
          if (stockItem.id === action.payload.stockId) {
            return { ...stockItem, units: stockItem.units - action.payload.units };
          }
          return stockItem;
        })
      };
    default:
      return state;
  }
}
