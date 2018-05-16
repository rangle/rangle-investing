import { Action } from '@ngrx/store';
import * as funds from '../actions/funds';

export enum FundTransactionTypes {
  Add,
  Withdraw
}

export interface FundTransaction {
  date: number;
  amount: number;
  type: FundTransactionTypes;
}

export interface FundsState {
  transactions: FundTransaction[];
  totalAmount: number;
}

const DEFAULT_STATE: FundsState = {
  transactions: [],
  totalAmount: 0,
};

const createTransaction = (amount: number, type: FundTransactionTypes): FundTransaction => ({
  amount,
  date: Date.now(),
  type
});

export function reducer(state: FundsState = DEFAULT_STATE, action: funds.Actions): FundsState {
  switch (action.type) {
    case funds.ADD:
      return {
        transactions: [
          ...state.transactions,
          createTransaction(action.payload, FundTransactionTypes.Add),
        ],
        totalAmount: state.totalAmount + action.payload,
      };
    case funds.WITHDRAW:
      return {
        transactions: [
          ...state.transactions,
          createTransaction(action.payload, FundTransactionTypes.Withdraw),
        ],
        totalAmount: state.totalAmount - action.payload,
      };
    default:
      return state;
  }
}
