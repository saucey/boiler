import 'rxjs';
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'connected-react-router';
// import { logger } from 'redux-logger';
import { api, endPointKeys } from '../config';
import { IEpicDependency } from '../models';
import { rootReducer } from './root-reducer';
import { rootEpic } from './root-epic';
import { appHistory } from '../app-history';
import { IAppAction } from './app-action';
import { IAppState } from './state';
import { saveState, loadState } from './localStorage';
// import { save/*load*/ } from "redux-localstorage-simple"

//export type MyEpic = Epic<IAppAction, IAppAction, IAppState, IEpicDependency>;
const persistedState = loadState();
const dependenciesObject: IEpicDependency = { api, endPointKeys };
//const epic = createEpicMiddleware(rootEpic, { dependencies });
//const epic = createEpicMiddleware({dependencies:dependenciesObject});
const epic = createEpicMiddleware<IAppAction, IAppAction, IAppState, IEpicDependency>({ dependencies: dependenciesObject });
const middlewareList = [epic, routerMiddleware(appHistory())];
const windowlfDefined = typeof window === 'undefined' ? null : window as any;
const composeEnhancers = windowlfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = composeEnhancers(applyMiddleware(...middlewareList));
let store = createStore(rootReducer(appHistory()), persistedState, middlewares);

store.subscribe(() => {
    if(store.getState().purchaseContainer.pendingPayment) {
        saveState(store.getState());
    }
});

epic.run(rootEpic);
export { store };

// const dependencies: IEpicDependency = { api, endPointKeys };user custom!!!!
// //const epic = createEpicMiddleware(rootEpic, { dependencies });
// const epic = createEpicMiddleware({ ...rootEpic, dependencies });
// const middlewareList = [epic, logger, routerMiddleware(appHistory())];
// const windowlfDefined = typeof window === 'undefined' ? null: window as any;
// const composeEnhancers = windowlfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__	|| compose;
// const middlewares = composeEnhancers( applyMiddleware(... middlewareList));
// const store = createStore(rootReducer, middlewares);
// export { store };