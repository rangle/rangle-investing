import { StockInvestment } from "./stock-investment.model";

export class Portfolio {
	stocks: Array<StockInvestment>;
	userId: number; 

	constructor(obj?: any) {
		this.stocks = obj && obj.stocks || new Array();
		this.userId = obj && obj.userId || 0;
	}
}