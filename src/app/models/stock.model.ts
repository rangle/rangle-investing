export class Stock {
	symbol: string;
	companyName: string;
	primaryExchange: string;
	open: number;
	close: number;
	avgTotalVolume: number;
	week52High: number;
	week52Low: number;
	iexVolume: number;
	marketCap: number;
	peRatio: number;
	latestPrice: number;

	constructor(obj?: any) {
		this.symbol = 			obj && obj.symbol 			|| "";
		this.companyName = 		obj && obj.companyName 		|| "";
		this.primaryExchange = 	obj && obj.primaryExchange 	|| "";
		this.open = 			obj && obj.open 			|| 0;
		this.close = 			obj && obj.close 			|| 0;
		this.avgTotalVolume = 	obj && obj.avgTotalVolume 	|| 0;
		this.week52High = 		obj && obj.week52High 		|| 0;
		this.week52Low = 		obj && obj.week52Low 		|| 0;
		this.iexVolume = 		obj && obj.iexVolume 		|| 0;
		this.marketCap = 		obj && obj.marketCap 		|| 0;
		this.peRatio = 			obj && obj.peRatio 			|| 0;
		this.latestPrice = 		obj && obj.latestPrice 		|| 0;
	}
}