import * as funds from '../actions/funds';
import { FundsState, FundTransactionTypes, reducer } from './funds';

describe('Funds Reducer', () => {
  describe('Default Action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const result = reducer(undefined, action);
      expect(result.totalAmount).toEqual(0);
      expect(result.transactions.length).toEqual(0);
    });
  });
  describe('Add Action', () => {
    it('should return new state with extra amount', () => {
      const state: FundsState = { transactions: [], totalAmount: 0};
      const actionS1 = new funds.AddAction(1200);
      const result = reducer(state, actionS1);
      expect(result.transactions.length).toEqual(1);
      expect(result.transactions[0].amount).toEqual(1200);
      expect(result.transactions[0].type).toEqual(FundTransactionTypes.Add);
      expect(result.totalAmount).toEqual(1200);
    });
  });
  describe('Withdraw Action', () => {
    it('should return new state substracting given amount', () => {
      const state: FundsState = { transactions: [], totalAmount: 0};
      let result = reducer(state, new funds.AddAction(1200));
      result = reducer(result, new funds.WithdrawAction(200));
      expect(result.transactions.length).toEqual(2);
      expect(result.transactions[1].amount).toEqual(200);
      expect(result.transactions[1].type).toEqual(FundTransactionTypes.Withdraw);
      expect(result.totalAmount).toEqual(1000);
    });
  });
});
