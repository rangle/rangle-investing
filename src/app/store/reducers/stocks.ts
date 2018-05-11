import { Action } from '@ngrx/store';
import * as stocks from '../actions/stocks';

export function reducer(state: any[] = [], action: stocks.LoadAction) {
  switch (action.type) {
    case stocks.LOAD:
      return [...state, ...action.payload];
    default:
      return state;
  }
}
