import { Action } from '@ngrx/store';

export const ROUTER_NAVIGATION = 'ROUTER_NAVIGATION';

export class NavigateAction implements Action {
  readonly type = ROUTER_NAVIGATION;
  constructor(public payload: any) { }
}

export type Actions = NavigateAction;
