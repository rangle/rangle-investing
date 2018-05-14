import { Routes } from '@angular/router';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { StockItemComponent } from './components/stock-item/stock-item.component';
import { StockSummaryComponent } from './components/stock-summary/stock-summary.component';

export const routes: Routes = [
  { path: '', component: StockListComponent, pathMatch: 'full' },
  { path: 'stock-item/:stockSymbol', component: StockItemComponent },         // purchased stock
  { path: 'stock-summary/:stockSymbol', component: StockSummaryComponent },   // generic info
  { path: '**', redirectTo: '' }
];

