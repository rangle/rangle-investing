import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioComponent } from '../../components/portfolio/portfolio.component';
import { PortfolioPageComponent } from './portfolio-page.component';
import { NavbarItemComponent } from '../../components/navbar-item/navbar-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';

describe('PortfolioPageComponent', () => {
  let component: PortfolioPageComponent;
  let fixture: ComponentFixture<PortfolioPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot(reducers) ],
      declarations: [
        PortfolioPageComponent,
        PortfolioComponent
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
