import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AddFundsComponent } from './add-funds.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';

describe('AddFundsComponent', () => {
  let component: AddFundsComponent;
  let fixture: ComponentFixture<AddFundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        StoreModule.forRoot(reducers), 
        FormsModule
      ],
      declarations: [ AddFundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
