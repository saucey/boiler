import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators'
import { IAppAction } from '../app-action';
import { IAppState } from '../state';
import { IAppError, IEpicDependency, IPermitProduct } from'../../models';
import { purchaseDataStateActions, fetchPermitProductsForSiteSuccess, fetchPermitProductsForSiteError } from '../actions';
    
export const fetchPermitProductsForSiteEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency): 
Observable<IAppAction> => action$.pipe(
ofType(purchaseDataStateActions.FETCH_PERMIT_PRODUCTS_FOR_SITE),
mergeMap(({ payload }) => {

    const clientId = payload.clientId;
    const searchText = payload.searchText;
    const siteId = payload.siteId;
    return api.get(endPointKeys.base, `permitProduct?clientId=${clientId}&searchText=${searchText}&siteId=${siteId}`).pipe(
        map(res => res.data.data),
        map((permitProducts: Array<IPermitProduct>) => {             
        //     var start = new Date().getTime();
        //     var end = start;
        //     while(end < start + 3000) {
        //       end = new Date().getTime();
        //    }
            return fetchPermitProductsForSiteSuccess(permitProducts)
    }
        ),
        catchError(error => {
            const appError: IAppError = { error, message:'Failed to retrieve permit products' };
            return of(fetchPermitProductsForSiteError(appError))
    })
  )}) 
);    