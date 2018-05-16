import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistComponent } from './watchlist.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';

describe('WatchlistComponent', () => {
  let component: WatchlistComponent;
  let fixture: ComponentFixture<WatchlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot(reducers) ],
      declarations: [ WatchlistComponent ]
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
