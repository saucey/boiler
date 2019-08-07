import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators'
import { IAppAction } from '../app-action';
import { IAppState } from '../state';
import { IAppError, IEpicDependency, IPermit } from '../../models';
import { fetchPermitsSuccess, fetchPermitsError, permitDataStateActions, fetchPermitSuccess, fetchPermitError } from '../actions';

export const fetchPermitsEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency):
    Observable<IAppAction> => action$.pipe(
        ofType(permitDataStateActions.FETCH_PERMITS),
        mergeMap(({ payload }) => {
            const customerId = payload.customerId;
            const clientId = payload.clientId;
            const searchText = payload.searchText;
            return api.get(endPointKeys.base, `permit?customerId=${customerId}&clientId=${clientId}&searchtext=${searchText}`).pipe(
                map(res => res.data.data),
                map((permits: Array<IPermit>) => {
                    return fetchPermitsSuccess(permits);
                },
                    catchError(error => {
                        const appError: IAppError = { error, message: 'Failed to retrieve permits' };
                        return of(fetchPermitsError(appError))
                    }))
            )
        })
    );

export const fetchPermitEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency):
    Observable<IAppAction> => action$.pipe(
        ofType(permitDataStateActions.FETCH_PERMIT),
        mergeMap(({ payload }) => {
            const permitId = payload;
            return api.get(endPointKeys.base, `permit/${permitId}`).pipe(
                map(res => res.data.data),
                map((permit: IPermit) => {
                    return fetchPermitSuccess(permit)
                },
                catchError(error => {
                    const appError: IAppError = { error, message: 'Failed to retrieve product' };
                    return of(fetchPermitError(appError))
                }))
            )
        })
    );
