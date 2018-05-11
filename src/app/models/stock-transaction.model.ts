export class StockTransaction {
	symbol: string;
	type: number;
	volume: number;
	price: number;

	constructor(obj?: any) {
		this.symbol 	= obj && obj.symbol 	|| "";
		this.type		= obj && obj.type 		|| 0;
		this.volume		= obj && obj.volume 	|| 0;		
		this.price		= obj && obj.price 		|| 0;
	}
}

export const BUY = 0; 	// type in StockTransaction
export const SELL = 1;