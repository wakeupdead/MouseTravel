import { Action } from '@ngrx/store';

export const APP_LOGIN =           '[APP] Login';
export const APP_LOGOUT =           '[APP] Logout';

export class AppLoginAction implements Action {
  readonly type = APP_LOGIN;

  constructor(public payload: any) { }
}

export class AppLogoutAction implements Action {
    readonly type = APP_LOGOUT;

    constructor(public payload: any) { }
  }

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AppActions
= AppLoginAction
| AppLogoutAction;
