import { TestBed, inject, async } from '@angular/core/testing';

import { WatchlistService } from './watchlist.service';
import { StoreModule, Store } from '@ngrx/store';
import { reducers, AppState } from '../store';
import { AddAction, RemoveAction } from '../store/actions/watchlist';

describe('WatchlistService', () => {
  let watchlistService: WatchlistService;
  let store: Store<AppState>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot(reducers) ],
      providers: [ WatchlistService ]
    });
  }));

  beforeEach(inject([WatchlistService, Store], (service: WatchlistService, injectedStore: Store<AppState>) => {
    watchlistService = service;
    store = injectedStore;
    spyOn(store, 'dispatch');
  }));

  it('should be injected', inject([WatchlistService], (service: WatchlistService) => {
    expect(service).toBeTruthy();
  }));

  describe('WatchlistService method tests', () => {
    describe('add method', () => {
      it('should exist', () => {
        expect(watchlistService.add).toEqual(jasmine.any(Function));
      });
      it('should accept one argument', () => {
        expect(watchlistService.add.length).toEqual(1);
      });
      it('should call store.dispatch with "AddAction"', () => {
        watchlistService.add('X');
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(AddAction));
      });
    });
    describe('remove method', () => {
      it('should exist', () => {
        expect(watchlistService.remove).toEqual(jasmine.any(Function));
      });
      it('should accept one argument', () => {
        expect(watchlistService.remove.length).toEqual(1);
      });
      it('should call store.dispatch with "RemoveAction"', () => {
        watchlistService.remove('X');
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(RemoveAction));
      });
    });
    describe('inWatchlist method', () => {
      it('should exist', () => {
        expect(watchlistService.inWatchlist).toEqual(jasmine.any(Function));
      });
      it('should accept one argument', () => {
        expect(watchlistService.inWatchlist.length).toEqual(1);
      });
    });
  });
});
