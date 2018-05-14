import { StockTransaction } from './stock-transaction.model';

export interface StockInvestment {
  symbol: string;
  amountOfStock: number;
  currentValue: number;
  transactions: Array<StockTransaction>;
}
