import * as watchlist from '../actions/watchlist';
import { reducer } from './watchlist';

describe('Watchlist Reducer', () => {
  describe('Default Action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const result = reducer(undefined, action);
      expect(result).toEqual([]);
    });
  });
  describe('Add Action', () => {
    it('should return new state with extra item', () => {
      const state = [];
      const actionS1 = new watchlist.AddAction('s1');
      const result = reducer(state, actionS1);
      expect(result.length).toEqual(1);
      expect(result).toContain('s1');
      expect(state.length).toEqual(0);
    });
  });
  describe('Remove Action', () => {
    it('should return new state without given item', () => {
      const state = ['s1', 's2'];
      const actionRS2 = new watchlist.RemoveAction('s2');
      const result = reducer(state, actionRS2);
      expect(result.length).toEqual(1);
      expect(state.length).toEqual(2);
      expect(result.indexOf('s2')).toEqual(-1);
    });
  });
});
