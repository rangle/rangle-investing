export interface Stock {
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
}
