export class StocksWatchlist {
	userId: number;
	symbols: Array<string>;

	constructor(obj?: any) {
		this.userId = 	obj && obj.userId 	|| 0;
		this.symbols = 	obj && obj.symbols 	|| new Array();
	}
}