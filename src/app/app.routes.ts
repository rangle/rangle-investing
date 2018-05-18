import { Routes } from '@angular/router';

import { HomePageComponent } from './containers/home-page/home-page.component';
import { SettingsPageComponent } from './containers/settings-page/settings-page.component';
import { StocksPageComponent } from './containers/stocks-page/stocks-page.component';
import { PortfolioPageComponent } from './containers/portfolio-page/portfolio-page.component';
import { StockDetailsPageComponent } from './containers/stock-details-page/stock-details-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'stocks', component: StocksPageComponent },
  { path: 'stocks/:tickerSymbol', component: StockDetailsPageComponent },
  { path: 'portfolio', component: PortfolioPageComponent },
  { path: 'settings', component: SettingsPageComponent },
  { path: '**', redirectTo: '' }
];

