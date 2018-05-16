import { reducer as stocksReducer } from './reducers/stocks';
import { reducer as watchlistReducer } from './reducers/watchlist';
import { reducer as routerUrlReducer } from './reducers/navigation';
import { reducer as fundsReducer, FundsState } from './reducers/funds';
import { reducer as portfolioReducer, PortfolioState } from './reducers/portfolio';

export interface AppState {
  stocks: any[];
  watchlist: any[];
  routerUrl: string;
  funds: FundsState;
  portfolio: PortfolioState;
}

export const reducers = {
  stocks: stocksReducer,
  watchlist: watchlistReducer,
  routerUrl: routerUrlReducer,
  funds: fundsReducer,
  portfolio: portfolioReducer,
};
// Adding this comment as incoming change is older than branch change.

