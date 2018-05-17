import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDetailsPageComponent } from './stock-details-page.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';
import { RouterTestingModule } from '@angular/router/testing';

describe('StockDetailsPageComponent', () => {
  let component: StockDetailsPageComponent;
  let fixture: ComponentFixture<StockDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
        RouterTestingModule
      ],
      declarations: [ StockDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
