import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistButtonComponent } from './watchlist-button.component';
import { WatchlistService } from '../../services/watchlist.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';

describe('WatchlistButtonComponent', () => {
  let component: WatchlistButtonComponent;
  let fixture: ComponentFixture<WatchlistButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchlistButtonComponent ],
      imports: [ StoreModule.forRoot(reducers ) ],
      providers: [ WatchlistService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
