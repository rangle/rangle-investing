import { Injectable } from '@angular/core';
import { mockStocksData } from '../data/finance-data';
import { Observable } from 'rxjs';

@Injectable()
export class StocksService {
	constructor() { }

	private static _stockExists(tickerSymbol: string): boolean {
		if (mockStocksData[tickerSymbol] === true) return true;

		return false;
	}

	getQuote(tickerSymbol: string): Observable<any> {
		return new Observable((observer) => {
			const { next, error, complete } = observer;

			if (StocksService._stockExists(tickerSymbol)) {
				if (mockStocksData[tickerSymbol]["quote"]) {
					next(mockStocksData[tickerSymbol]["quote"]);
					complete();
				} else {
					error("Error retrieving quote data.");
				}	
			} else {
				error(`Stock by ticker symbol ${tickerSymbol} doesn't seem to exist.`);
			}
		});
	}

	getChart(tickerSymbol: string): Observable<any> {
		return new Observable((observer) => {
			const { next, error, complete } = observer;

			if (StocksService._stockExists(tickerSymbol)) {
				if (mockStocksData[tickerSymbol]["chart"]) {
					next(mockStocksData[tickerSymbol]["chart"]);
					complete();
				} else {
					error("Error retrieving chart data.");
				}
			} else {
				error(`Stock by ticker symbol ${tickerSymbol} doesn't seem to exist.`);
			}
		});
	}

	getChartByDate(tickerSymbol: string, dateString: string): Observable<any> {
		return new Observable((observer) => {
			const { next, error, complete } = observer;

			if (StocksService._stockExists(tickerSymbol)) {
				if (mockStocksData[tickerSymbol]["chart"]) {
					let chartAtDate = mockStocksData[tickerSymbol]["chart"][dateString];
					if (chartAtDate) {
						next(chartAtDate);
						complete();
					} else {
						error("Cannot find chart entry for specified date.");
					}
				} else {
					error("Error retrieving chart data.");
				}
			} else {
				error(`Stock by ticker symbol ${tickerSymbol} doesn't seem to exist.`);
			}
		});
	}
}
