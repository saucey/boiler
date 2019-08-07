import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { IAppAction } from '../app-action';
import { IAppState } from '../state';
import { IAppError, IEpicDependency, ICustomer, ICustomerAddForm } from '../../models';
import { upsertCustomerSuccess, upsertCustomerError, purchaseDataStateActions } from '../actions';
import { appHistory } from '../../app-history';
import { routes } from '../../routes';
import { user } from '../../helpers';

const customerData = (customerId: number, form: ICustomerAddForm): ICustomer => {
    let client = form.client && form.client ? {
        clientId: form.client.clientId,
        clientName: form.client.clientName,
        shouldShowSites: form.client.shouldShowSites }: null;
    let country = form.country && form.country ? {
        countryId: form.country.countryId,
        countryName: form.country.countryName }: null;

    return {
        customerId: customerId, 
        firstName: form.firstName,
        lastName: form.lastName,
        customerName: form.customerName,
        company: form.company,
        client: client,
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        town: form.town,
        county: form.county,
        postcode: form.postcode,
        country: country,
        phoneNumber: form.phoneNumber,
        emailAddress: form.emailAddress,
        password: form.password,
        notes: form.notes,
        isActive: true,
        createdDate: new Date(), 
        createdBy: user().userId,
        updatedDate: new Date(), 
        updatedBy: user().userId,
        permits: [],
        directDebitCustomerId: ''
    }
};

export const upsertCustomerEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency): 
Observable<IAppAction> => action$.pipe(
    ofType(purchaseDataStateActions.UPSERT_CUSTOMER),
    mergeMap(({ payload }) => {
        const form = payload.customerForm;
        const customerId = payload.customerId;
        let customer = customerData(customerId, {...form});
        //let data = new FormData();
        let c = JSON.stringify(customer);
        //data.append('customer', JSON.stringify(customer));
        return api.put(endPointKeys.base, `Customer/${customerId}`, c).pipe(
            map(res => res.data.data),
            map((customer: ICustomer) => upsertCustomerSuccess(customer)),
            catchError(error => {
                const appError: IAppError = { error, message:'Failed to save customer'};
                return of(upsertCustomerError(appError));
            })        
        )
    })
);

export const upsertCustomerSuccessEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency): 
Observable<IAppAction> => action$.pipe(
    ofType(purchaseDataStateActions.UPSERT_CUSTOMER_SUCCESS),
    mergeMap( ({ payload }) => {
        const customer = payload;
        appHistory().push(routes.customerEdit(customer.customerId.toString() ));
        return EMPTY;
    })
);
