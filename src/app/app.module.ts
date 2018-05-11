import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { stocksReducer } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ stocks: stocksReducer}),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
