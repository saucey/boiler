import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators'
import { IAppAction } from '../app-action';
import { IAppState } from '../state';
import { IAppError, IEpicDependency, ICustomer } from '../../models';
import { fetchCustomerSuccess, fetchCustomerError, purchaseDataStateActions } from '../actions';

export const fetchCustomerEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency): 
Observable<IAppAction> => action$.pipe(
    ofType(purchaseDataStateActions.FETCH_CUSTOMER),
    mergeMap(({ payload }) => {
        const customerId = payload.toString();
        return api.get(endPointKeys.base, `customer/${customerId}`).pipe(
            map(res => res.data.data),
            map((customer: ICustomer) => fetchCustomerSuccess(customer)),      
            catchError(error => {
                const appError: IAppError = { error, message:'Failed to retrieve customer' };
                    return of(fetchCustomerError(appError))
            })        
        )
    })
);

