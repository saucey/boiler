import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { of, concat, Observable, forkJoin } from 'rxjs';
import { flatMap, mergeMap, take } from 'rxjs/operators';
import { IAppAction } from '../app-action'; 
import { IAppState } from '../state';
import { appContainerStateActions, referenceDataStateActions,initialized, initializing, fetchRefDataProductFrequencies, fetchRefDataSiteTownsForClient, fetchRefDataClients
} from '../actions';
import { IEpicDependency } from '../../models';

// const API_USER =`${process.env.REACT_APP_API_USERNAME}`;
// const PASSWORD =`${process.env.REACT_APP_API_PASSWORD}`;

// export const appPreInitializeEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, {api, endPointKeys}: IEpicDependency): Observable<IAppAction> => action$.pipe(
//     ofType(appContainerStateActions.APP_PREINITIALIZE),
//     flatMap(() => {
//            return concat(of(setClient(parseInt(CLIENT_ID))),
//                          of(initialize({userName:API_USER,password:PASSWORD}))
//         );
// }));

export const appInitializeEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, {api, endPointKeys}: IEpicDependency): Observable<IAppAction> => action$.pipe(
        ofType(appContainerStateActions.APP_INITIALIZE),
        mergeMap(({ payload }) => {
            return of(initializing());
        //     let a = JSON.stringify(payload);
        //     return api.post(endPointKeys.base, 'Authorise', a).pipe(
        //         map(res => res.data),
        //         map((token: string) => initializing(token)),
        //         catchError(error => {
        //             //const appError: IAppError = { error, message:'Failed to get authorisation from the API'};
        //             return of(initializing(''))
        //     })
        //     );
}));

// export const appInitializeEpic = (action$: ActionsObservable<IAppAction>, store: Store<IAppState>, {api, endPointKeys}: IEpicDependency): Observable<IAppAction> => action$.pipe(
//     ofType(appContainerStateActions.APP_INITIALIZE),
//     mergeMap(({ payload }) => {
//         let a = JSON.stringify(payload);
//         return api.post(endPointKeys.base, 'Authorise', a).pipe(
//             map(res => res.data),
//             map((user: IAppUser) => initializing(user)),
//             catchError(error => {
//                 //const appError: IAppError = { error, message:'Failed to get authorisation from the API'};
//                 console.log(error.toString());
//                 return of(initializing(new AppUser));
//         })
//         );
// }));



export const appInitializingEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, {api}) => action$.pipe(
ofType(appContainerStateActions.APP_INITIALIZING),
flatMap(() => {
return concat(
    of(fetchRefDataClients()),
    of(fetchRefDataProductFrequencies()),
    of(fetchRefDataSiteTownsForClient()),
        )
    })
);

export const appInitializedEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, {api}) => action$.pipe(
    ofType(
    referenceDataStateActions.FETCH_REF_DATA_CLIENTS_SUCCESS,
    referenceDataStateActions.FETCH_REF_DATA_SITE_TOWNS_FOR_CLIENT_SUCCESS,
    referenceDataStateActions.FETCH_PRODUCT_FREQUENCIES_SUCCESS,
    ),
    mergeMap(() => { 
        return forkJoin(action$.ofType(
        referenceDataStateActions.FETCH_REF_DATA_CLIENTS_SUCCESS,
        referenceDataStateActions.FETCH_REF_DATA_SITE_TOWNS_FOR_CLIENT_SUCCESS,
        referenceDataStateActions.FETCH_PRODUCT_FREQUENCIES_SUCCESS,
        ).pipe(take(2))).pipe(
            flatMap(() => of(initialized() )))
        })
    );


