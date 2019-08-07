import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { IAppAction } from '../app-action';
import { IAppState } from '../state';
import { IAppError, IEpicDependency, IPayment, ICustomer } from '../../models';
import { paymentDataStateActions, insertCardChargeSuccess, insertCardChargeError, insertDirectDebitCustomerSuccess, insertDirectDebitSubscriptionSuccess, insertDirectDebitSubscriptionError, setAppError } from '../actions';
import { IBankAccountAndSubscriptionResult } from '../../models/direct-debits';
// import { appHistory } from '../../app-history';
// import { routes } from '../../routes';

export const insertCardChargeEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency):
    Observable<IAppAction> => action$.pipe(
        ofType(paymentDataStateActions.INSERT_CARD_CHARGE),
        mergeMap(({ payload }) => {
            const payment = payload.charge;
            const customerId = payload.customerId;
            let p = JSON.stringify(payment);
            return api.post(endPointKeys.base, `Payment/Stripe/${customerId}`, p).pipe(
                map(res => res.data),
                map((payment: IPayment) => insertCardChargeSuccess(payment)),
                catchError(error => {
                    const appError: IAppError = { error, message: 'Unable to make payment' };
                    return of(insertCardChargeError(appError));
                })
            )
        })
    );

export const insertDirectDebitCustomerEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency) => action$.pipe(
    ofType(paymentDataStateActions.INSERT_DIRECT_DEBIT_CUSTOMER),
    mergeMap(({ payload }) => {
        const customer = payload;
        let c = JSON.stringify(customer);
        return api.post(endPointKeys.base, `Payment/GoCardless/Customer/${customer.customerId.toString()}`, c).pipe(
            map(res => res.data),
            map((c: ICustomer) => insertDirectDebitCustomerSuccess(c)  ),
            catchError(error => {
                const appError: IAppError = { error, message: 'Unable to make payment' };
                return of(insertCardChargeError(appError));
            })
        )
    })
);

export const insertDirectDebitSubscriptionEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency):
    Observable<IAppAction> => action$.pipe(
        ofType(paymentDataStateActions.INSERT_DIRECT_DEBIT_SUBSCRIPTION),
        mergeMap(({ payload }) => {
            const customerId = payload.customerId;
            const bankAccount = payload.bankAccountAndSubscription;
            let ba = JSON.stringify(bankAccount);
            return api.post(endPointKeys.base, `Payment/GoCardless/BankAccount/${customerId.toString()}`, ba).pipe(
                map(res => res.data),
                map((bankAccount: IBankAccountAndSubscriptionResult) => { 
                    return insertDirectDebitSubscriptionSuccess(bankAccount)
                }),
                catchError(error => {
                    const message: string = error.response.data;
                    const appError: IAppError = { error, message: message };
                    return of(insertDirectDebitSubscriptionError(appError));
                })
            )
        })
    );

export const insertDirectDebitSubscriptionErrorEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency):
    Observable<IAppAction> => action$.pipe(
        ofType(paymentDataStateActions.INSERT_DIRECT_DEBIT_SUBSCRIPTION_ERROR),
        mergeMap(({ payload }) => {
            const appError: IAppError = payload;
            return of(setAppError(appError));
        })
    );

// export const upsertCustomerSuccessEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency): 
// Observable<IAppAction> => action$.pipe(
//     ofType(purchaseDataStateActions.UPSERT_CUSTOMER_SUCCESS),
//     mergeMap( ({ payload }) => {
//         const customer = payload;
//         appHistory().push(routes.customerEdit(customer.customerId.toString() ));
//         return EMPTY;
//     })
// );
