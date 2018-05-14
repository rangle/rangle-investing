import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { StockItemComponent } from './components/stock-item/stock-item.component';
import { StockSummaryComponent } from './components/stock-summary/stock-summary.component';

import { routes } from './app.routes';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchResultsComponent } from './components/dashboard/search-results/search-results.component';
import { AccountBalanceComponent } from './components/dashboard/account-balance/account-balance.component';
import { MoversShakersComponent } from './components/dashboard/movers-shakers/movers-shakers.component';
import { NewsfeedComponent } from './components/dashboard/newsfeed/newsfeed.component';

@NgModule({
  declarations: [
    AppComponent,
    StockListComponent,
    StockItemComponent,
    StockSummaryComponent,
    DashboardComponent,
    SearchResultsComponent,
    AccountBalanceComponent,
    MoversShakersComponent,
    NewsfeedComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    RouterModule.forRoot(routes)
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
