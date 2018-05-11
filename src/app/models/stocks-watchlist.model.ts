export class StocksWatchlist {
	userId: number;
	symbol: Array<string>;

	constructor(obj?: any) {
		this.userId = 	obj && obj.userId 	|| 0;
		this.symbol = 	obj && obj.symbol 	|| new Array();
	}
}