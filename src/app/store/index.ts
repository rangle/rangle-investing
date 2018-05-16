export interface AppState {
  stocks: any[];
  watchlist: any[];
  routerUrl: string;
}

import { reducer as stocksReducer } from './reducers/stocks';
import { reducer as watchlistReducer } from './reducers/watchlist';
import { reducer as routerUrlReducer } from './reducers/navigation';
import { reducer as fundsReducer } from './reducers/funds';

export const reducers = {
  stocks: stocksReducer,
  watchlist: watchlistReducer,
  routerUrl: routerUrlReducer,
  funds: fundsReducer,
};
