import { Action } from '@ngrx/store';
import * as watchlist from '../actions/watchlist';

export function reducer(state: string[] = [], action: watchlist.Actions): string[] {
  switch (action.type) {
    case watchlist.ADD:
      return [...state, action.payload];
    case watchlist.REMOVE:
      return state.filter(stock => stock !== action.payload);
    default:
      return state;
  }
}
