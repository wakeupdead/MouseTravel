import { NgModule, isDevMode } from '@angular/core';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './app.reducer';


// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),

    // Instrumentation must be imported after importing StoreModule (config is optional)
    isDevMode ?
      StoreDevtoolsModule.instrument({
        maxAge: 25 // Retains last 25 states
      })
      : []


  ],
  exports: [
    StoreModule
  ]
})
export class AppStoreModule { }
