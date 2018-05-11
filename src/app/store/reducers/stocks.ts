import { Action } from '@ngrx/store';
import * as stocks from '../actions/stocks';

export function reducer(state: any[] = [], action: stocks.LoadAction) {
  switch (action.type) {
    case stocks.LOAD:
    	if (state === undefined || state.length === 0) {
    		return [...state, ...action.payload];		
    	} else {
    		return state;
    	}
    default:
      return state;
  }
}
