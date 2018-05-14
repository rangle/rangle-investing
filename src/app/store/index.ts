export interface AppState {
  stocks: any[];
};

import { reducer as stocksReducer } from './reducers/stocks';
import { reducer as watchlistReducer } from './reducers/watchlist';

export const reducers = {
  stocks: stocksReducer,
  watchlist: watchlistReducer,
};
