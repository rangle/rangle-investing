import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoversShakersComponent } from './movers-shakers.component';
import { StockItemComponent } from '../../stock-item/stock-item.component';

describe('MoversShakersComponent', () => {
  let component: MoversShakersComponent;
  let fixture: ComponentFixture<MoversShakersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MoversShakersComponent,
        StockItemComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoversShakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
