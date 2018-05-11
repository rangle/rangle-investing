export interface AppState {
  stocks: any[];
};

import { reducer as stocksReducer } from './reducers/stocks';

export const reducers = {
  stocks: stocksReducer,
};
