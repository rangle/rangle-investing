import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule } from '@angular/router';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppComponent } from './app.component';

import { routes } from './app.routes';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { StocksPageComponent } from './containers/stocks-page/stocks-page.component';
import { PortfolioPageComponent } from './containers/portfolio-page/portfolio-page.component';
import { SettingsPageComponent } from './containers/settings-page/settings-page.component';
import { StockDetailsPageComponent } from './containers/stock-details-page/stock-details-page.component';
import { NavbarComponent } from './containers/navbar/navbar.component';
import { NavbarItemComponent } from './components/navbar-item/navbar-item.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { StockItemComponent } from './components/stock-item/stock-item.component';
import { LayoutPageComponent } from './containers/layout-page/layout-page.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { WatchlistItemComponent } from './components/watchlist-item/watchlist-item.component';
import { AddFundsComponent } from './components/add-funds/add-funds.component';
import { SearchStocksComponent } from './components/search-stocks/search-stocks.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    StocksPageComponent,
    PortfolioPageComponent,
    SettingsPageComponent,
    StockDetailsPageComponent,
    NavbarComponent,
    NavbarItemComponent,
    SearchbarComponent,
    StockListComponent,
    StockItemComponent,
    LayoutPageComponent,
    WatchlistComponent,
    WatchlistItemComponent,
    AddFundsComponent,
    SearchStocksComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    RouterModule.forRoot(routes),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    })
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
