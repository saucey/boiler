import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators'
import { IAppAction } from '../app-action';
import { IAppState } from '../state';
import { IAppError, IEpicDependency, /*IPurchase,*/ IPermit, IProductFrequency, IPermitProduct, /*IProductFrequency, IPermitProduct*/ } from '../../models';
import { upsertPermitSuccess, upsertPermitSuccessUpdate, upsertPermitError, purchaseDataStateActions, updatePendingCardPayment } from '../actions';
import { /*getClient,*/ user } from '../../helpers';
import { Store } from 'redux';
import { IPermitEditForm } from '../../models/permit-forms';
// import { routes } from '../../routes';
import { appHistory } from '../../app-history';
import { routes } from '../../routes';
// import { getClient, user } from '../../helpers';
import Moment from 'moment';

const permitData = (permitId: number, form: IPermitEditForm, paymentAmount: number, PayingDeposit: boolean, permitUpdate: boolean = false): IPermit => {

    let client = form.client && form.client ? {
        clientId: form.client.clientId,
        clientName: form.client.clientName,
        shouldShowSites: form.client.shouldShowSites
    } : null;

    let startDate = form.startDate && form.startDate ? form.startDate.toDate().toDateString() : new Date().toDateString();
    let endDate = form.endDate && form.endDate && form.endDate.toDate().toDateString() !== 'Invalid Date' ? form.endDate.toDate().toDateString() : '';
    let requestCancellationDate = form.endDate && form.endDate && form.endDate.toDate().toDateString() !== 'Invalid Date' ? form.endDate.toDate().toDateString() : '';
    let discountEndDate = form.discountEndDate && form.discountEndDate && form.discountEndDate.toDate().toDateString() !== 'Invalid Date' ? form.discountEndDate.toDate().toDateString() : '';

    if (endDate === 'Invalid Date') { endDate = ''; }
    if (requestCancellationDate === 'Invalid Date') { requestCancellationDate = ''; }
    if (discountEndDate === 'Invalid Date') { discountEndDate = ''; }
    let newFreq: IProductFrequency | null = form.productFrequency ? form.productFrequency : { productFrequencyId: 0, productFrequencyName: '', productFrequencyPeriodName: '', timeOrder: 0, price: 0, productFrequencyDescription: '' };
    let prod: IPermitProduct | null = form.product && form.product ? form.product : null;
    if (prod !== null) {
        prod.client = null;
        prod.prices = [];
        prod.sites = [];
        prod.permits = [];
    }
    return {
        permitId: permitId,
        product: prod,
        client: client,
        spaces: form.spaces,
        deposit: form.deposit,
        productFrequencyName: PayingDeposit ? form.productFrequency.productFrequencyName : '',
        directDebitBankAccountId: PayingDeposit ? form.directDebitBankAccount && form.directDebitBankAccount !== undefined ? form.directDebitBankAccount.directDebitBankAccountId : form['directDebitBankAccountId'] : '',
        directDebitAccountHolderName: PayingDeposit ? form.directDebitBankAccount && form.directDebitBankAccount !== undefined ? form.directDebitBankAccount.directDebitAccountHolderName : form['directDebitAccountHolderName'] : '',
        directDebitAccountEnding: PayingDeposit ? form.directDebitBankAccount && form.directDebitBankAccount !== undefined ? form.directDebitBankAccount.directDebitAccountEnding : form['directDebitAccountEnding'] : '',
        directDebitCreatedDate: PayingDeposit ? form.directDebitBankAccount && form.directDebitBankAccount !== undefined ? form.directDebitBankAccount.directDebitCreatedAt : form['directDebitCreatedDate'] : '',
        directDebitMandateId: PayingDeposit ? form.directDebitBankAccount && form.directDebitBankAccount !== undefined ? form.directDebitBankAccount.directDebitMandateId : form['directDebitMandateId'] : '',
        directDebitSubscriptionId: PayingDeposit ? form.directDebitBankAccount && form.directDebitBankAccount !== undefined ? form.directDebitBankAccount.directDebitSubscriptionId : form['directDebitSubscriptionId'] : '',

        cardPaymentToken: form.cardPaymentToken,
        startDate: startDate,
        endDate: endDate,
        requestedCancellationDate: requestCancellationDate,
        isActive: true,
        createdDate: new Date(),
        createdBy: user().userId,
        updatedDate: new Date(),
        updatedBy: user().userId,
        customer: form.customer ? form.customer : null,
        customerId: form.customer && form.customer ? form.customer.customerId : null,
        productFrequency: form.productFrequency ? form.productFrequency : newFreq,
        permitProductPriceId: 0,
        price: 0,
        discountPercentage: form.discountPercentage,
        discountEndDate: discountEndDate,
        initialPayment: permitUpdate ? form['initialPayment'] : paymentAmount > 0 ? paymentAmount / 100 : 0,
        balance: 0,
        vrms: form.vrms && form.vrms ? form.vrms : [],
        permitActivity: []
    }
};

export const upsertPermitEpic = (action$: ActionsObservable<IAppAction>, store: Store<IAppState>, { api, endPointKeys }: IEpicDependency):
    Observable<IAppAction> => action$.pipe(
        ofType(purchaseDataStateActions.UPSERT_PERMIT),
        mergeMap(({ payload }) => {
            const form = payload.permitForm;
            const permitId = payload.permitId;
            const isNew = payload.isNew;
            const amount = payload.paymentAmount;
            const isPayingDeposit = payload.payingDeposit;
            let permit = permitData(permitId, { ...form }, amount, isPayingDeposit);

            let p = JSON.stringify(permit);
            return api.put(endPointKeys.base, `Permit/${permitId}`, p).pipe(
                map(res => {
                    return res.data.data
                }),
                map((permit: IPermit) => {
                    return upsertPermitSuccess(permit, isNew)
                },
                catchError(error => {
                    const appError: IAppError = { error, message: 'Failed to save permit' };
                    return of(upsertPermitError(appError));
                })
            )
        )})
    );

export const upsertPermitEpicUpdate = (action$: ActionsObservable<IAppAction>, store: Store<IAppState>, { api, endPointKeys }: IEpicDependency):
    Observable<IAppAction> => action$.pipe(
        ofType(purchaseDataStateActions.UPSERT_PERMIT_UPDATE),
        mergeMap(({ payload }) => {

            const permitId = payload.permitId;
            const form = payload.permitForm;
            
            form.startDate = Moment(form.startDate);
            form.endDate = Moment(form.endDate);

            let permit = permitData(permitId, { ...form }, form['initialPayment'], true, true);
            let p = JSON.stringify(permit);


            return api.put(endPointKeys.base, `Permit/${permitId}`, p).pipe(
                map(res => res.data.data),
                map((permit: IPermit) => upsertPermitSuccessUpdate(permit)),
                catchError(error => {
                    const appError: IAppError = { error, message: 'Failed to save permit' };
                    return of(upsertPermitError(appError));
                })
            )
        })
    );

export const upsertPermitSuccessEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency):
    Observable<IAppAction> => action$.pipe(
        ofType(purchaseDataStateActions.UPSERT_PERMIT_SUCCESS),
        mergeMap(({ payload }) => {
            updatePendingCardPayment(false);
            appHistory().push(routes.purchasePermitConfirmation());
            return EMPTY;
        })
    );

// export const upsertPermitVrmsEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency):
//     Observable<IAppAction> => action$.pipe(
//         ofType(purchaseDataStateActions.UPSERT_PERMIT),
//         mergeMap(({ payload }) => {
//             const form = payload.permitForm;
//             const permitId = payload.permitId;
//             let permit = permitData(permitId, { ...form });
//             let p = JSON.stringify(permit);
//             return api.put(endPointKeys.base, `Permit/${permitId}`, p).pipe(
//                 map(res => res.data.data),
//                 map((permit: IPermit) => upsertPermitSuccess(permit, true)),
//                 catchError(error => {
//                     const appError: IAppError = { error, message: 'Failed to save product' };
//                     return of(upsertPermitError(appError));
//                 })
//             )
//         })
//     );
