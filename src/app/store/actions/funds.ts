import { Action } from '@ngrx/store';

export const ADD = '[Funds] Add amount';
export const WITHDRAW = '[Funds] Withdraw amount';

export class AddAction implements Action {
  readonly type = ADD;
  constructor(public payload: number) { }
}

export class WithdrawAction implements Action {
  readonly type = WITHDRAW;
  constructor(public payload: number) { }
}

export type Actions = AddAction | WithdrawAction;
