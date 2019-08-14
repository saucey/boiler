import { IAppAction } from '../app-action';
import { IAppError, IPayment, ICustomer } from '../../models';
import { IBankAccountAndSubscription, IBankAccountAndSubscriptionResult } from '../../models/direct-debits';

export const paymentDataStateActions = {

    INSERT_CARD_CHARGE: 'INSERT_CARD_CHARGE',
    INSERT_CARD_CHARGE_SUCCESS: 'INSERT_CARD_CHARGE_SUCCESS',
    // INSERT_CARD_CHARGE_ERROR: 'INSERT_CARD_CHARGE_ERROR',
    INSERT_DIRECT_DEBIT_CUSTOMER: 'INSERT_DIRECT_DEBIT_CUSTOMER',
    INSERT_DIRECT_DEBIT_CUSTOMER_SUCCESS: 'INSERT_DIRECT_DEBIT_CUSTOMER_SUCCESS',
    INSERT_DIRECT_DEBIT_SUBSCRIPTION: 'INSERT_DIRECT_DEBIT_SUBSCRIPTION',
    INSERT_DIRECT_DEBIT_SUBSCRIPTION_SUCCESS: 'INSERT_DIRECT_DEBIT_SUBSCRIPTION_SUCCESS',
    INSERT_DIRECT_DEBIT_SUBSCRIPTION_ERROR: 'INSERT_DIRECT_DEBIT_SUBSCRIPTION_ERROR',
    SAVE_PAYMENT_TO_LOCAL_ACTION: 'SAVE_PAYMENT_TO_LOCAL_ACTION',
    RESET_PAYMENT_STATE: 'RESET_PAYMENT_STATE',

}

export const insertCardCharge = (charge: IPayment, customerId: string): IAppAction => ({
    type: paymentDataStateActions.INSERT_CARD_CHARGE,
    payload: {charge, customerId}
});

export const resetPaymentState = (): IAppAction => ({
    type: paymentDataStateActions.RESET_PAYMENT_STATE,
    payload: null
});


export const savePaymentToLocalStorage = (charge: IPayment ): IAppAction => ({
    type: paymentDataStateActions.SAVE_PAYMENT_TO_LOCAL_ACTION,
    payload: charge
});

export const insertCardChargeSuccess = (charge: IPayment): IAppAction => ({
    type: paymentDataStateActions.INSERT_CARD_CHARGE_SUCCESS,
    payload: charge
});

export const insertDirectDebitCustomer = (customer): IAppAction => ({
    type: paymentDataStateActions.INSERT_DIRECT_DEBIT_CUSTOMER,
    payload: customer
});

export const insertDirectDebitCustomerSuccess = (customer: ICustomer): IAppAction => ({
    type: paymentDataStateActions.INSERT_DIRECT_DEBIT_CUSTOMER_SUCCESS,
    payload: customer
});

export const insertDirectDebitSubscription = (customerId: number, bankAccountAndSubscription: IBankAccountAndSubscription): IAppAction => ({
    type: paymentDataStateActions.INSERT_DIRECT_DEBIT_SUBSCRIPTION,
    payload: {customerId, bankAccountAndSubscription}
});

export const insertDirectDebitSubscriptionSuccess = (directDebitBankAccount: IBankAccountAndSubscriptionResult): IAppAction => ({
    type: paymentDataStateActions.INSERT_DIRECT_DEBIT_SUBSCRIPTION_SUCCESS,
    payload: directDebitBankAccount
});

export const insertDirectDebitSubscriptionError = (appError: IAppError): IAppAction => ({
    type: paymentDataStateActions.INSERT_DIRECT_DEBIT_SUBSCRIPTION_ERROR,
    payload: appError
});

