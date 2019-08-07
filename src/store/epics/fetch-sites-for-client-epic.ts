import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { IAppAction } from '../app-action';
import { IAppState } from '../state';
import { ISiteLookup, IAppError, IEpicDependency } from '../../models';
import { purchaseDataStateActions, fetchSitesForClientByLocationSuccess, fetchSitesForClientByLocationError } from '../actions';
// import { routes } from '../../routes';
// import { appHistory } from '../../app-history';

export const fetchSitesForClientByLocationEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api,
    endPointKeys }: IEpicDependency): Observable<IAppAction> => action$.pipe(
        ofType(purchaseDataStateActions.FETCH_SITES_FOR_CLIENT_BY_LOCATION),
        mergeMap(({ payload }) => {
            return api.get(endPointKeys.base, `site?clientId=${payload.searchModel.clientId}&searchText=${payload.searchModel.searchText}
    &latitude=${payload.searchModel.latitude}&longitude=${payload.searchModel.longitude}&town=${payload.searchModel.town}&pageSize=${payload.searchModel.pageSize}`).pipe(
                map(res => res.data.data),
                map((sites: Array<ISiteLookup>) => {
                    return fetchSitesForClientByLocationSuccess(sites, payload.purchase.town)

                }),
                catchError(error => {
                    const appError: IAppError = { error, message: 'Failed to retrieve sites' };
                    return of(fetchSitesForClientByLocationError(appError))
                })
            )
        })
    );




export const fetchSitesForClientByLocationSuccessEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency):
    Observable<IAppAction> => action$.pipe(
        ofType(purchaseDataStateActions.FETCH_SITES_FOR_CLIENT_BY_LOCATION_SUCCESS),
        mergeMap(({ payload }) => {
            // appHistory().push(routes.purchasePermitSite());
            return EMPTY;
        })
    );

