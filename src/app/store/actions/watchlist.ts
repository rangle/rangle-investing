import { Action } from '@ngrx/store';

export const ADD = '[Watchlist] Add Stock';
export const REMOVE = '[Watchlist] Remove Stock';

export class AddAction implements Action {
  readonly type = ADD;
  constructor(public payload: string) { }
}

export class RemoveAction implements Action {
  readonly type = REMOVE;
  constructor(public payload: string) { }
}

export type Actions = AddAction | RemoveAction;
