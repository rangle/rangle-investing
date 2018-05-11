import { Action } from '@ngrx/store';

export const LOAD = 'LOAD';

export class LoadAction implements Action {
  readonly type = LOAD;
  constructor(public payload: any[]) { }
}
