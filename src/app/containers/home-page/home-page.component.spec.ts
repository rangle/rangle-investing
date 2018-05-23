import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { WatchlistComponent } from '../../components/watchlist/watchlist.component';
import { NavbarItemComponent } from '../../components/navbar-item/navbar-item.component';
import { StockListItemComponent } from '../../components/stock-list-item/stock-list-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';
import { WatchlistButtonComponent } from '../../components/watchlist-button/watchlist-button.component';
import { WatchlistService } from '../../services/watchlist.service';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot(reducers) ],
      declarations: [
        HomePageComponent,
        WatchlistComponent,
        StockListItemComponent,
        WatchlistButtonComponent,
      ],
      providers: [ WatchlistService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
