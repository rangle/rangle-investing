import { Action } from '@ngrx/store';
import * as stocks from '../actions/stocks';

export function reducer(state: any[] = [], action: stocks.LoadAction) {
  switch (action.type) {
    case stocks.LOAD:
    	// this only works because our stocks data is static, if it's not static, this needs to be replaced, not appended
    	if (state === undefined || state.length === 0) { // only append when loading for the first time
    		return [...state, ...action.payload];		
    	} else {
    		return state;
    	}
    default:
      return state;
  }
}
