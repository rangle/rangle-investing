export interface AppState {
  stocks: any[];
  watchlist: any[];
  routerUrl: string;
}

import { reducer as stocksReducer } from './reducers/stocks';
import { reducer as watchlistReducer } from './reducers/watchlist';
import { reducer as routerUrlReducer } from './reducers/navigation';

export const reducers = {
  stocks: stocksReducer,
  watchlist: watchlistReducer,
  routerUrl: routerUrlReducer,
};
