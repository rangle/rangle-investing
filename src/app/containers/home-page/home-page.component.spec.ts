import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { WatchlistItemComponent } from '../../components/watchlist-item/watchlist-item.component';
import { WatchlistComponent } from '../../components/watchlist/watchlist.component';
import { NavbarItemComponent } from '../../components/navbar-item/navbar-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot(reducers) ],
      declarations: [
        HomePageComponent,
        WatchlistComponent,
        WatchlistItemComponent
      ]
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
