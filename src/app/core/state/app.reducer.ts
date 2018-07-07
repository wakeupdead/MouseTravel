import { Action } from '@ngrx/store';
import { createSelector, ActionReducerMap } from '@ngrx/store';
import { User } from 'firebase/app';
import * as fromActions from './app.actions';


export interface AppState {
  isAuthenticated: boolean;
  appUser: User;
  settings: any;
  activePage: string;

}

export const initialState: AppState = {
  isAuthenticated: false,
  appUser: undefined,
  settings: undefined,
  activePage: undefined
}


export function AppReducer(state: AppState = initialState, action: Action): AppState {
    switch (action.type) {

        case fromActions.APP_LOGIN:
            // your action code here
            return state;

        default:
            return state;
    }
}


/**
 * Combined app reducer and state
 */
export interface State {
  app: AppState;
}

export const reducers: ActionReducerMap<State> = {
  app: AppReducer
};

/*
    Below are the selectors for this reducer. Make sure to make compact selectors as per
    requirements of your application.
*/

export const getAppState = (state: State) => state.app;

