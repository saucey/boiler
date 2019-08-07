import { combineReducers, Reducer } from 'redux';
import { connectRouter, RouterState, LocationChangeAction } from 'connected-react-router';
import { reducers } from './reducers';
import { History} from 'history'

export const rootReducer = (history: History) => combineReducers({...reducers, 
    router: (connectRouter(history) as unknown) as Reducer<RouterState,LocationChangeAction> });
    
    
    // connectRouter(appHistory()) });

// export const rootReducer = (state: IAppState, action: IAppAction, history: History) => {
//     return appReducer(state, action, history);
// };

// export const rootReducer = (state: IAppState, action: IAppAction, history: History) => 
//     combineReducers({...reducers, router: connectRouter(history)});
