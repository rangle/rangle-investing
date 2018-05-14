import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { AccountBalanceComponent } from './account-balance/account-balance.component';
import { MoversShakersComponent } from './movers-shakers/movers-shakers.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { StockItemComponent } from '../stock-item/stock-item.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        SearchResultsComponent,
        AccountBalanceComponent,
        MoversShakersComponent,
        NewsfeedComponent,
        StockItemComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
