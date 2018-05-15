import { Action } from '@ngrx/store';
import * as navigation from '../actions/navigation';

export function reducer(state: string = '/', action: navigation.Actions): string {
  switch (action.type) {
    case navigation.ROUTER_NAVIGATION:
      return action.payload.routerState.url;
    default:
      return state;
  }
}
