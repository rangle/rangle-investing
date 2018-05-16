import { Action } from '@ngrx/store';

export const BUY = '[Portfolio] Buy stocks';
export const SELL = '[Portfolio] Sell stocks';

export interface PortfolioPayload {
  stockId?: string;
  symbol: string;
  units: number;
  pricePerUnit: number;
};

export class BuyAction implements Action {
  readonly type = BUY;
  constructor(public payload: PortfolioPayload) { }
};

export class SellAction implements Action {
  readonly type = SELL;
  constructor(public payload: PortfolioPayload) { }
};

export type Actions = BuyAction | SellAction;
