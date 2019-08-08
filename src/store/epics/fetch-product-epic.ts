import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators'
import { Store } from 'redux';
import { IAppAction } from '../app-action';
import { IAppState } from '../state';
import { IAppError, IEpicDependency, IPermitProduct } from '../../models';
import { purchaseDataStateActions, fetchPermitProductSuccess, fetchPermitProductError } from '../actions';

export const fetchPermitProductEpic = (action$: ActionsObservable<IAppAction>, store: Store<IAppState>, { api, endPointKeys }: IEpicDependency):
    Observable<IAppAction> => action$.pipe(
        ofType(purchaseDataStateActions.FETCH_PERMIT_PRODUCT)
        ,mergeMap(({ payload }) => {
            return api.get(endPointKeys.base, `permitProduct/${payload}`).pipe(
                map(res => res.data.data),
                map((product: IPermitProduct) => {
                    //     var start = new Date().getTime();
                    //     var end = start;
                    //     while(end < start + 3000) {
                    //       end = new Date().getTime();
                    //    }
                    return fetchPermitProductSuccess(product)
                }),
                catchError(error => {
                    const appError: IAppError = { error, message: 'Failed to retrieve permit product' };
                    return of(fetchPermitProductError(appError))
                })
            )
        })
    );
