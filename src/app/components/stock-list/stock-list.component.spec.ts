import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { StockListComponent } from './stock-list.component';
import { StockListItemComponent } from '../stock-list-item/stock-list-item.component';
import { WatchlistButtonComponent } from '../watchlist-button/watchlist-button.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';
import { WatchlistService } from '../../services/watchlist.service';

describe('StockListComponent', () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule
      ],
      declarations: [
        StockListComponent,
        StockListItemComponent,
        WatchlistButtonComponent
      ],
      imports: [ StoreModule.forRoot(reducers) ],
      providers: [ WatchlistService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
