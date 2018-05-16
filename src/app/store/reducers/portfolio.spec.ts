import * as portfolio from '../actions/portfolio';
import { reducer, PortfolioState, PortfolioTransactionTypes } from './portfolio';
import { FundTransactionTypes } from './funds';

describe('Portfolio Reducer', () => {
  describe('Default Action', () => {
    it('should return the state with zero transactions and stock items', () => {
      const action = {} as any;
      const result = reducer(undefined, action);
      expect(result.transactions.length).toEqual(0);
      expect(result.stockItems.length).toEqual(0);
    });
  });
  describe('Buy Action', () => {
    it('should return new state with new stock and transaction', () => {
      const state: PortfolioState = { transactions: [], stockItems: []};
      const action = new portfolio.BuyAction({
        symbol: 'AAPL',
        units: 100,
        pricePerUnit: 500
      });
      const result = reducer(state, action);
      expect(result.transactions.length).toEqual(1);
      expect(result.transactions[0].amount).toEqual(50000);
      expect(result.transactions[0].type).toEqual(PortfolioTransactionTypes.Buy);
      expect(result.stockItems[0].id).toEqual(result.transactions[0].stockId);
    });
  });
  describe('Sell Action', () => {
    it('should return new state substrating the units from given stock item', () => {
      const state: PortfolioState = { transactions: [], stockItems: []};
      let result = reducer(state, new portfolio.BuyAction({
        symbol: 'AAPL',
        units: 100,
        pricePerUnit: 500
      }));
      result = reducer(result, new portfolio.SellAction({
        stockId: result.stockItems[0].id,
        symbol: 'AAPL',
        units: 20,
        pricePerUnit: 600
      }));
      expect(result.transactions.length).toEqual(2);
      expect(result.transactions[1].amount).toEqual(12000);
      expect(result.transactions[1].type).toEqual(PortfolioTransactionTypes.Sell);
      expect(result.stockItems.length).toEqual(1);
      expect(result.stockItems[0].units).toEqual(80);
    });
  });
});
