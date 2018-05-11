import { StockInvestment } from "./stock-investment.model";

export interface Portfolio {
	stocks: Array<StockInvestment>;
	userId: number; 
}