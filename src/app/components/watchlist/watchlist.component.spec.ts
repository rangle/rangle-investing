import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistComponent } from './watchlist.component';
import { StockListItemComponent } from '../stock-list-item/stock-list-item.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';
import { WatchlistButtonComponent } from '../watchlist-button/watchlist-button.component';
import { WatchlistService } from '../../services/watchlist.service';

describe('WatchlistComponent', () => {
  let component: WatchlistComponent;
  let fixture: ComponentFixture<WatchlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot(reducers) ],
      declarations: [
        WatchlistComponent,
        StockListItemComponent,
        WatchlistButtonComponent,
       ],
       providers: [ WatchlistService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
