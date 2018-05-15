import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDetailsPageComponent } from './stock-details-page.component';

describe('StockDetailsPageComponent', () => {
  let component: StockDetailsPageComponent;
  let fixture: ComponentFixture<StockDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
