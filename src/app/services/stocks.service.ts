import { Injectable } from '@angular/core';
import { mockStocksData } from '../data/finance-data';
import { Observable } from 'rxjs';

@Injectable()
export class StocksService {
	constructor() { }

	/**
	 *	@param {string} tickerSymbol Stock ticker symbol
	 *	@return {boolean} Whether the stock exists or not
	 */
	private static _stockExists(tickerSymbol: string): boolean {
		return false;
	}

	/**
	 *	@param {string} tickerSymbol Stock ticker symbol
	 *	@return {Observable<any>} Returns an Observable that emits
	 *	stock quote once and completes. 
	 */
	getQuote(tickerSymbol: string): Observable<any> {
		return new Observable((observer) => {
			const { next, error, complete } = observer;

		});
	}

	/**
	 *	@param {string} tickerSymbol Stock ticker symbol
	 *	@return {Observable<any>} Returns an Observable that emits
	 *	stock chart once and completes. 
	 */
	getChart(tickerSymbol: string): Observable<any> {
		return new Observable((observer) => {
			const { next, error, complete } = observer;

		});
	}

	/**
	 *	@param {string} tickerSymbol Stock ticker symbol
	 *	@param {string} dateString Date in this format "yyyy-mm-dd"
	 *	@return {Observable<any>} Returns an Observable that emits
	 *	stock chart at specified date once and completes. 
	 */
	getChartByDate(tickerSymbol: string, dateString: string): Observable<any> {
		return new Observable((observer) => {
			const { next, error, complete } = observer;

		});
	}
}
