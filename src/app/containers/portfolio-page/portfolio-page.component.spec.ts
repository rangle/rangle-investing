import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { PortfolioPageComponent } from './portfolio-page.component';
import { NavbarItemComponent } from '../../components/navbar-item/navbar-item.component';
import { AddFundsComponent } from '../../components/add-funds/add-funds.component';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';

describe('PortfolioPageComponent', () => {
  let component: PortfolioPageComponent;
  let fixture: ComponentFixture<PortfolioPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
        FormsModule
      ],
      declarations: [
        PortfolioPageComponent,
        AddFundsComponent,
        SearchbarComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
