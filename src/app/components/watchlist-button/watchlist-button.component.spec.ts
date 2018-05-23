import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { WatchlistButtonComponent } from './watchlist-button.component';
import { WatchlistService } from '../../services/watchlist.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: `app-wlb-test-host`,
  template: `<app-watchlist-button stockSymbol="AAPL"></app-watchlist-button>`
})
class WlbTestHostComponent {
  @ViewChild(WatchlistButtonComponent)
  public wlbComponent: WatchlistButtonComponent;
}

describe('WatchlistButtonComponent', () => {
  let watchlistService: WatchlistService;
  let inWatchListSpy: jasmine.Spy;
  let component: WatchlistButtonComponent;
  let fixture: ComponentFixture<WlbTestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchlistButtonComponent, WlbTestHostComponent ],
      imports: [ StoreModule.forRoot(reducers ) ],
      providers: [ WatchlistService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WlbTestHostComponent);
    component = fixture.componentInstance.wlbComponent;
    fixture.detectChanges();
  });

  beforeEach(inject([ WatchlistService ], (service: WatchlistService) => {
    watchlistService = service;
    spyOn(watchlistService, 'add');
    spyOn(watchlistService, 'remove');
    inWatchListSpy = spyOn(watchlistService, 'inWatchlist');
  }));

  describe('Component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should have stockSymbol set to "AAPL"', () => {
      expect(component.stockSymbol).toBe('AAPL');
    });
    it('should have inWatchlist boolean property', () => {
      expect(component.inWatchlist).toEqual(jasmine.any(Boolean));
    });
    describe('onWatchlistAction method', () => {
      it('should exist', () => {
        expect(component.onWatchlistAction).toEqual(jasmine.any(Function));
      });
      it('should accept zero argument', () => {
        expect(component.onWatchlistAction.length).toEqual(0);
      });
      it('should call watchlistService.add method when inWatchlist is false', () => {
        component.onWatchlistAction();
        expect(watchlistService.add).toHaveBeenCalledTimes(1);
        expect(watchlistService.add).toHaveBeenCalledWith('AAPL');
      });
      it('should call watchlistService.remove method when inWatchlist is true', () => {
        inWatchListSpy.and.returnValue(true);
        component.onWatchlistAction();
        expect(watchlistService.remove).toHaveBeenCalledTimes(1);
        expect(watchlistService.remove).toHaveBeenCalledWith('AAPL');
      });
    });
  });

  describe('WatchlistButton template', () => {
    describe('Button element', () => {
      it('should exist', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        const button = compiled.querySelector('button');
        expect(button).toBeTruthy();
      }));
      it('should have class "wl-btn"', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        const button = compiled.querySelector('button');
        expect(button.classList).toContain('wl-btn');
      }));
      describe('Icon', () => {
        it('should exist', async(() => {
          const compiled = fixture.debugElement.nativeElement;
          const icon = compiled.querySelector('button')
            .querySelector('i');
          expect(icon).toBeTruthy();
        }));
        it('should have class "fa"', async(() => {
          const compiled = fixture.debugElement.nativeElement;
          const icon = compiled.querySelector('button')
            .querySelector('i');
          expect(icon.classList).toContain('fa');
        }));
        it('should have class "fa-plus" when stockItem is not in watchlist', async(() => {
          const compiled = fixture.debugElement.nativeElement;
          const icon = compiled.querySelector('button')
            .querySelector('i');
          expect(icon.classList).toBeTruthy('fa-plus');
        }));
        it('should have class "fa-minus" when stockItem is in watchlist', async(() => {
          const compiled = fixture.debugElement.nativeElement;
          component.inWatchlist = true;
          const icon = compiled.querySelector('button')
            .querySelector('i');
          expect(icon.classList).toBeTruthy('fa-minus');
        }));
      });
    });
  });
});
