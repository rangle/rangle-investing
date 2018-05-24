import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';

import { StockDetailsPageComponent } from './stock-details-page.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';
import { Store } from '@ngrx/store';
import { BuyAction, SellAction } from '../../store/actions/portfolio';


describe('StockDetailsPageComponent', () => {
  let component: StockDetailsPageComponent;
  let fixture: ComponentFixture<StockDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
        RouterTestingModule,
      ],
      declarations: [ StockDetailsPageComponent ],
      providers: [
        Store,
        { provide: ActivatedRoute, useValue: { params: of({tickerSymbol: 'aapl'}) } }
      ]
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

  describe('isThisStock method', () => {
    it('should return a function', () => {
      expect(component.isThisStock('AAPL')).toEqual(jasmine.any(Function));
    });
  });

  describe('buyInputValidator method', () => {
    it('should return a subscription', () => {
      expect(component.buyInputValidator()).toEqual(jasmine.any(Subscription));
    });
  });

  describe('stockExists method', () => {
    beforeEach(() => {
      component.stocks = [ {'name': 'AAPL'}, {'name': 'MSFT'} ];
    });

    it('should return true if stock exists', () => {
      expect(component.stockExists('AAPL')).toEqual(true);
    });

    it('should return true if stock exists (ignoring case)', () => {
      expect(component.stockExists('aapl')).toEqual(true);
    });

    it('should return false if stock doesn\'t exist', () => {
      expect(component.stockExists('A')).toEqual(false);
    });

    it('should return false if stock is an empty string', () => {
      expect(component.stockExists('')).toEqual(false);
    });

    it('should return false if stock is a string with a space', () => {
      expect(component.stockExists(' ')).toEqual(false);
    });

    it('should return false if input is incorrect (undefined)', () => {
      expect(component.stockExists(undefined)).toEqual(false);
    });

    it('should return false if input is incorrect (null)', () => {
      expect(component.stockExists(null)).toEqual(false);
    });
  });

  describe('isInteger method', () => {
    it('should return true if integer', () => {
      expect(component.isInteger('10500')).toBeTruthy();
    });

    it('should return false if decimal', () => {
      expect(component.isInteger('10500.00')).toBeFalsy();
    });

    it('should return false if there are spaces', () => {
      expect(component.isInteger('10500 ')).toBeFalsy();
    });

    it('should return false if there are dollar signs', () => {
      expect(component.isInteger('$10500')).toBeFalsy();
    });

    it('should return false if there are non number digits', () => {
      expect(component.isInteger('Apples!')).toBeFalsy();
    });
  });

  describe('buy method', () => {
    let store, storeSpy;

    beforeEach(() => {
      store = fixture.debugElement.injector.get(Store);
      storeSpy = spyOn(store, <never>'dispatch');
      component.tickerSymbol = 'aapl'; // pretend AAPL stocks are bought
      component.stocks = [
        {'name': 'AAPL', 'quote': { 'latestPrice': 100.00 } },
        {'name': 'MSFT', 'quote': { 'latestPrice': 90.00 } }
      ];
    });

    it('should buy units of a stock if units valid', () => {
      component.buy('10000');
      expect(storeSpy).toHaveBeenCalled();
    });

    it('should return (undefined) if units invalid (floating point value)', () => {
      const result = component.buy('10000.01');
      expect(result).toBeUndefined();
    });

    it('should not buy units of a stock if units invalid (NaN)', () => {
      component.buy('NaN');
      expect(storeSpy).not.toHaveBeenCalled();
    });

    it('should not buy units of a stock if units invalid (null)', () => {
      component.buy(null);
      expect(storeSpy).not.toHaveBeenCalled();
    });
  });

  describe('sell method', () => {
    let store, storeSpy;
    // for mock selling below, pretend AAPL stocks are sold (portfolio.stockItems[0])
    const buyStocks = [
      { symbol: 'aapl', units: 20, pricePerUnit: 80.0 },
      { symbol: 'msft', units: 20, pricePerUnit: 60.0 }
    ];

    beforeEach(() => {
      store = fixture.debugElement.injector.get(Store);

      // have to buy stocks before setting up spy (no callThrough)
      store.dispatch(new BuyAction(buyStocks[0]));
      store.dispatch(new BuyAction(buyStocks[1]));

      storeSpy = spyOn(store, <never>'dispatch');
      component.tickerSymbol = 'aapl';
      component.stocks = [
        {'name': 'AAPL', 'quote': { 'latestPrice': 100.00 } },
        {'name': 'MSFT', 'quote': { 'latestPrice': 90.00 } }
      ];
    });

    it('should return (undefined) if units invalid (floating point value)', () => {
      const result = component.sell('10000.01', '100');
      expect(result).toBeUndefined();
    });

    it('should sell units of a stock if units valid and enough stocks (target units < stocks held)', () => {
      store.select('portfolio').subscribe((portfolio) => {
        const id = portfolio.stockItems[0].id;
        component.sell('10', id);
        expect(storeSpy).toHaveBeenCalledWith(jasmine.any(SellAction));
      });
    });

    it('should sell units of a stock if units valid and enough stocks (target units = stocks held)', () => {
      store.select('portfolio').subscribe((portfolio) => {
        const id = portfolio.stockItems[0].id;
        component.sell('20', id);
        expect(storeSpy).toHaveBeenCalledWith(jasmine.any(SellAction));
      });
    });

    it('should not sell units of a stock if units invalid or not enough stocks (target units > stocks held)', () => {
      store.select('portfolio').subscribe((portfolio) => {
        const id = portfolio.stockItems[0].id;
        component.sell('30', id);
        expect(storeSpy).not.toHaveBeenCalledWith(jasmine.any(SellAction));
      });
    });

    it('should not sell units of a stock if units invalid or not enough stocks (id invalid)', () => {
      store.select('portfolio').subscribe((portfolio) => {
        const id = portfolio.stockItems[0].id;
        component.sell('20', 'A');
        expect(storeSpy).not.toHaveBeenCalledWith(jasmine.any(SellAction));
      });
    });

    it('should not sell units of a stock if units invalid or not enough stocks (invalid and not enough stocks)', () => {
      store.select('portfolio').subscribe((portfolio) => {
        const id = portfolio.stockItems[0].id;
        component.sell('30', 'A');
        expect(storeSpy).not.toHaveBeenCalledWith(jasmine.any(SellAction));
      });
    });
  });

  describe('enoughStock method', () => {
    let store;
    // for mock selling below, pretend AAPL stocks are checked (portfolio.stockItems[0])
    const stocks = [
      { symbol: 'aapl', units: 20, pricePerUnit: 80.0 },
      { symbol: 'msft', units: 20, pricePerUnit: 60.0 }
    ];

    beforeEach(() => {
      store = fixture.debugElement.injector.get(Store);

      store.dispatch(new BuyAction(stocks[0]));
      store.dispatch(new BuyAction(stocks[1]));
    });

    it('should return false if portfolio is empty', () => {
      component.portfolio.stockItems = null;
      expect(component.enoughStock('100', 0)).toBeFalsy();  // this returns in the second exit route, not the one in the if statement
    });

    it('should return true if there are enough units of a stock (target units < stocks held)', () => {
      store.select('portfolio').subscribe((portfolio) => {
        const id = portfolio.stockItems[0].id;
        expect(component.enoughStock(id, 10)).toBeTruthy();
      });
    });

    it('should return true if there are enough units of a stock (target units = stocks held)', () => {
      store.select('portfolio').subscribe((portfolio) => {
        const id = portfolio.stockItems[0].id;
        expect(component.enoughStock(id, 20)).toBeTruthy();
      });
    });

    it('should return false if id incorrect', () => {
      store.select('portfolio').subscribe((portfolio) => {
        const id = portfolio.stockItems[0].id;
        expect(component.enoughStock('300', 10)).toBeFalsy();
      });
    });

    it('should return false if there are not enough units of a stock', () => {
      store.select('portfolio').subscribe((portfolio) => {
        const id = portfolio.stockItems[0].id;
        expect(component.enoughStock(id, 30)).toBeFalsy();
      });
    });

    it('should return false if id incorrect and there are not enough units of a stock', () => {
      store.select('portfolio').subscribe((portfolio) => {
        const id = portfolio.stockItems[0].id;
        expect(component.enoughStock('300', 30)).toBeFalsy();
      });
    });

    it('should return false if inputs are incorrect (id is incorrect, units NaN)', () => {
      store.select('portfolio').subscribe((portfolio) => {
        const id = portfolio.stockItems[0].id;
        expect(component.enoughStock('300', NaN)).toBeFalsy();
      });
    });

    it('should return false if inputs are incorrect (id null, target units > stocks held)', () => {
      store.select('portfolio').subscribe((portfolio) => {
        const id = portfolio.stockItems[0].id;
        expect(component.enoughStock(null, 30)).toBeFalsy();
      });
    });
  });
});
