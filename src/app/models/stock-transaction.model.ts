export interface StockTransaction {
  symbol: string;
  type: number;
  volume: number;
  price: number;
}

export const BUY = 0; 	// type in StockTransaction
export const SELL = 1;
