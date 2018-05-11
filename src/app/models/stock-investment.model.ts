import { StockTransaction } from "./stock-transaction.model";

export class StockInvestment {
	symbol: string;
	amountOfStock: number;
	currentValue: number;
	transactions: Array<StockTransaction>;

	constructor(obj?: any) {
		this.symbol 	= obj && obj.symbol 				|| "";
		this.amountOfStock		= obj && obj.amountOfStock 	|| 0;
		this.currentValue		= obj && obj.currentValue 	|| 0;		
		this.transactions		= obj && obj.price 			|| new Array();
	}
}