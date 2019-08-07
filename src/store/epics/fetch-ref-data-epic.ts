import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { IAppAction } from '../app-action';
import { IAppState } from '../state';
import { IAppError, IEpicDependency, ISiteLookup, IProductFrequency, IClient } from '../../models';
import {
    referenceDataStateActions, fetchRefDataProductFrequenciesSuccess, fetchRefDataProductFrequenciesError,
    fetchRefDataSiteTownsForClientSuccess, fetchRefDataSiteTownsForClientError, fetchRefDataClientsSuccess, fetchRefDataClientsError
} from '../actions';

export const fetchRefDataProductFrequenciesEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency):
    Observable<IAppAction> => action$.pipe(
        ofType(referenceDataStateActions.FETCH_PRODUCT_FREQUENCIES),
        mergeMap(() => {
            return api.get(endPointKeys.base, 'permitproduct/frequencies').pipe(
                map(res => res.data.data),
                map((frequencies: Array<IProductFrequency>) => fetchRefDataProductFrequenciesSuccess(frequencies)),
                catchError(error => {
                    const appError: IAppError = { error, message: 'Failed to retrieve product frequencies' };
                    return of(fetchRefDataProductFrequenciesError(appError))
                })
            )
        })
    );

const CLIENT_ID = `${process.env.REACT_APP_CLIENT_ID}`;

export const fetchRefDataSiteTownsForClientEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency):
    Observable<IAppAction> => action$.pipe(
        ofType(referenceDataStateActions.FETCH_REF_DATA_SITE_TOWNS_FOR_CLIENT),
        mergeMap(() => {
            return api.get(endPointKeys.base, `site/clients/${CLIENT_ID}/towns`).pipe(
                map(res => res.data.data),
                map((towns: Array<ISiteLookup>) => {
                    return fetchRefDataSiteTownsForClientSuccess(towns)
                }),
                catchError(error => {
                    const appError: IAppError = { error, message: 'Failed to retrieve towns' };
                    return of(fetchRefDataSiteTownsForClientError(appError))
                })
            )
        })
    );

export const fetchRefDataClientsEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency):
    Observable<IAppAction> => action$.pipe(
        ofType(referenceDataStateActions.FETCH_REF_DATA_CLIENTS),
        mergeMap(() => {
            return api.get(endPointKeys.base, 'siteclient').pipe(
                map(res => res.data.data),
                map((clients: Array<IClient>) => fetchRefDataClientsSuccess(clients)),
                catchError(error => {
                    const appError: IAppError = { error, message: 'Failed to retrieve clients' };
                    return of(fetchRefDataClientsError(appError))
                })
            )
        })
    );    