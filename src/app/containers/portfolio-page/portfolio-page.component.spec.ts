import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioPageComponent } from './portfolio-page.component';
import { NavbarItemComponent } from '../../components/navbar-item/navbar-item.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PortfolioPageComponent', () => {
  let component: PortfolioPageComponent;
  let fixture: ComponentFixture<PortfolioPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioPageComponent ]
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
