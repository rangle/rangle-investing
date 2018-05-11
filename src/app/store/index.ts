import { Action } from '@ngrx/store';

export const STOCKS_LOAD = 'STOCKS_LOAD';

export class StocksLoadAction implements Action {
  readonly type = STOCKS_LOAD;

  constructor(public payload: any[]) { }
}

export interface AppState {
  stocks: any[];
};

export function stocksReducer(state: any[] = [], action: StocksLoadAction) {
  switch (action.type) {
    case STOCKS_LOAD:
      return [...state, ...action.payload];
    default:
      return state;
  }
}
