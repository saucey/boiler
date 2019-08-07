import { ActionsObservable, StateObservable, ofType } from "redux-observable";
import { Observable, of } from "rxjs";
import { mergeMap, map, catchError, switchMap } from "rxjs/operators";
import { IEpicDependency, IAppUser } from "../../models";
import { appContainerStateActions, loginSuccess, loginError, registerSuccess, registerError, fetchCustomerProduct, fetchPermitProduct, fetchPreProductSuccess /*loginPurchaseSuccess*/ } from "../actions";
import { IAppAction } from "../app-action";
import { IAppState } from "../state";
import { IPreProduct } from "../../models/pre-product";

export const appLoginEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency): Observable<any> => action$.pipe(
    ofType(appContainerStateActions.LOG_IN),
    mergeMap(({ payload }) => {
        let a = JSON.stringify(payload);

        return api.post(endPointKeys.base, 'Authorise', a).pipe(
            map(res => res.data),
            switchMap((user: IAppUser) => [
                loginSuccess(user),
                fetchCustomerProduct(user.userId)
            ]),
            catchError(error => {
                //const appError: IAppError = { error, message:'Failed to get authorisation from the API'};
                return of(loginError(error));
            })
        );
    }));

export const appFetchCustomerProductEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency): Observable<any> => action$.pipe(
    ofType(appContainerStateActions.FETCH_CUSTOMER_PRODUCT),
    mergeMap(({ payload }) => {
        return api.get(endPointKeys.base, `permit/rgu/${payload.customerId}`).pipe(
            map(res => {
                res.data.isPreProduct = true;
                return res.data
            }),
            switchMap((product: IPreProduct) => [
                fetchPermitProduct(product.permitProductId.toString()),
                fetchPreProductSuccess(product)
            ]),
            catchError(error => {
                //const appError: IAppError = { error, message:'Failed to get authorisation from the API'};
                return of(loginError(error));
            })
        );
    }));

export const appEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency): Observable<any> => action$.pipe(
    ofType(appContainerStateActions.LOG_IN),
    mergeMap(({ payload }) => {
        let a = JSON.stringify(payload);

        return api.post(endPointKeys.base, 'Authorise', a).pipe(
            map(res => res.data),
            switchMap((user: IAppUser) => [
                loginSuccess(user),
                fetchCustomerProduct(user.userId)
            ]),
            catchError(error => {
                //const appError: IAppError = { error, message:'Failed to get authorisation from the API'};
                return of(loginError(error));
            })
        );
    }));

export const appRegisterEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency): Observable<IAppAction> => action$.pipe(
    ofType(appContainerStateActions.REGISTER),
    mergeMap(({ payload }) => {
        return api.post(endPointKeys.base, 'Register', payload).pipe(
            map(res => res.data),
            map((user: IAppUser) => registerSuccess(user)),
            catchError(error => {
                //const appError: IAppError = { error, message:'Failed to get authorisation from the API'};
                return of(registerError(error));
            })
        );
    }));

